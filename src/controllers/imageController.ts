import ErrorCodes from '../utils/errorCodes';
import ResMessages from '../utils/resMessages';
import { appConfig } from '../config/appConfig';
import { responseHandler } from '../utils/errorHandler';
import { Request, Response, NextFunction } from 'express';

class UploadController {
  public async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.file) {
        const imageUrl = appConfig.baseUrl + '/upload/' + req.file.filename;

        return responseHandler.handleSuccess(res, { url: imageUrl }, ResMessages.IMAGE_UPLOAD_SUCCESS);
      }
      return responseHandler.handleError(res, ResMessages.IMAGE_NOT_FOUND, ErrorCodes.BAD_REQUEST);
    } catch (error) {
      return next(error);
    }
  }

  public async uploadImages(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        const fileUrls = req.files.map((file: Express.Multer.File) => appConfig.baseUrl + '/upload/' + file.filename);

        return responseHandler.handleSuccess(res, fileUrls, ResMessages.IMAGES_UPLOAD_SUCCESS);
      }
      return responseHandler.handleError(res, ResMessages.IMAGE_NOT_FOUND, ErrorCodes.BAD_REQUEST);
    } catch (error) {
      return next(error);
    }
  }
}

export const uploadController = new UploadController();
