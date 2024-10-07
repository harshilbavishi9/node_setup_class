import { Response } from 'express';
import ErrorCodes from './errorCodes';

class ResponseHandler {
  public handleError(res: Response, message: string, statusCode: number) {
    return res.status(statusCode).json({ message });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public handleSuccess(res: Response, data: any, message: string = 'Success', statusCode: number = ErrorCodes.SUCCESS) {
    return res.status(statusCode).json({ message, data });
  }
}

export const responseHandler = new ResponseHandler();
