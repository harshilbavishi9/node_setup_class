import fs from 'fs';
import path from 'path';
import { Request } from 'express';
import ResMessages from './resMessages';
import multer, { StorageEngine } from 'multer';

if (!fs.existsSync('./upload')) {
  fs.mkdirSync('./upload');
}

const allowedTypes = /jpeg|jpg|png|gif/;

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) && allowedTypes.test(file.mimetype);

  if (isValid) {
    cb(null, true);
  } else {
    cb(ResMessages.INVALID_FILE, false);
  }
};

const uploads = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single('image');

const uploads2 = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).array('images', 10);

export { uploads, uploads2 };
