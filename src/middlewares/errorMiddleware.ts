import { Request, Response } from 'express';
import ErrorCodes from '../utils/errorCodes';
import ResMessages from '../utils/resMessages';
import { responseHandler } from '../utils/errorHandler';

interface CustomError extends Error {
  status?: number;
}

class ErrorHandler {
  public handleError(err: CustomError, req: Request, res: Response) {
    const statusCode = err.status || ErrorCodes.SERVER_ERROR;

    return responseHandler.handleError(res, err.message || ResMessages.SOMETHING_WENT_WRONG, statusCode);
  }
}

const errorMiddleware = new ErrorHandler().handleError;

export default errorMiddleware;
