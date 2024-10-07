import ErrorCodes from '../utils/errorCodes';
import ResMessages from '../utils/resMessages';
import { redisClient } from '../config/redisConfig';
import { userService } from '../services/userService';
import { responseHandler } from '../utils/errorHandler';
import { Request, Response, NextFunction } from 'express';

class UserController {
  public async allUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const cachedUsers = await redisClient.get('all_users');

      if (cachedUsers) {
        return responseHandler.handleSuccess(res, JSON.parse(cachedUsers), ResMessages.USERS_FETCH_SUCCESS);
      }

      const users = await userService.getAllUsers();

      await redisClient.setEx('all_users', 3600, JSON.stringify(users));

      return responseHandler.handleSuccess(res, users, ResMessages.USERS_FETCH_SUCCESS);
    } catch (error) {
      return next(error);
    }
  }

  public async getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(+id);

      if (!user) {
        return responseHandler.handleError(res, ResMessages.USER_NOT_FOUND, ErrorCodes.NOT_FOUND_ERROR);
      }

      return responseHandler.handleSuccess(res, user, ResMessages.USER_FETCH_SUCCESS);
    } catch (error) {
      return next(error);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const updatedUser = await userService.updateUser(+id, req.body);

      await redisClient.del('all_users');

      return responseHandler.handleSuccess(res, updatedUser, ResMessages.USER_UPDATE_SUCCESS);
    } catch (error) {
      return next(error);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const deletedUser = await userService.deleteUser(+id);

      await redisClient.del('all_users');

      return responseHandler.handleSuccess(res, deletedUser, ResMessages.USER_DELETE_SUCCESS);
    } catch (error) {
      return next(error);
    }
  }
}

export const userController = new UserController();
