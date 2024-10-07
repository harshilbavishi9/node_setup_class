import { authService } from '../services/authService';
import { responseHandler } from '../utils/errorHandler';
import { NextFunction, Request, Response } from 'express';

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

class AuthController {
  public async registerUser(req: Request<object, object, RegisterRequestBody>, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const result = await authService.registerUser(userData);

      if (!result.success) {
        return responseHandler.handleError(res, result.message, result.code);
      }

      return responseHandler.handleSuccess(res, result.data, result.message, result.code);
    } catch (error) {
      return next(error);
    }
  }

  public async loginUser(req: Request<object, object, LoginRequestBody>, res: Response, next: NextFunction) {
    try {
      const credentials = req.body;

      const result = await authService.loginUser(credentials);
      if (!result.success) {
        return responseHandler.handleError(res, result.message, result.code);
      }

      return responseHandler.handleSuccess(res, result.data, result.message, result.code);
    } catch (error) {
      return next(error);
    }
  }
}

export const authController = new AuthController();
