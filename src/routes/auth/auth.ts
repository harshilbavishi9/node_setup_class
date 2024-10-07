import express from 'express';
import { userValidator } from '../../middlewares/validators';
import { authController } from '../../controllers/authController';

const routes = express.Router();

routes.post('/login', userValidator.loginUserValidation(), authController.loginUser);
routes.post('/register', userValidator.registerUserValidation(), authController.registerUser);

export default routes;
