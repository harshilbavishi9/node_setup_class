import express from 'express';
import { userValidator } from '../middlewares/validators';
import { userController } from '../controllers/userController';

const routes = express.Router();

routes.get('/all', userController.allUsers);
routes.get('/one/:id', userController.getUser);
routes.delete('/delete/:id', userController.deleteUser);
routes.patch('/edit/:id', userValidator.updateUserValidation(), userController.updateUser);

export default routes;
