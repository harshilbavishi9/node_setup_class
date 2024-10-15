import express from 'express';
import userRoutes from './user';
import { uploads, uploads2 } from '../utils/multer';
import { uploadController } from '../controllers/imageController';

const routes = express.Router();

routes.use('/user', userRoutes);

routes.post('/upload/image', uploads, uploadController.uploadImage);
routes.post('/upload/images', uploads2, uploadController.uploadImages);

export default routes;
