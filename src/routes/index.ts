import express from 'express';
import authRoutes from './auth/auth';
import JWTService from '../utils/token';
import userRoutes from './protected/user';
import { uploads, uploads2 } from '../utils/multer';
import { uploadController } from '../controllers/imageController';

const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/user', JWTService.verifyToken, userRoutes);

routes.post('/upload/image', uploads, uploadController.uploadImage);
routes.post('/upload/images', uploads2, uploadController.uploadImages);

export default routes;
