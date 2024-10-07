import ErrorCodes from './errorCodes';
import ResMessages from './resMessages';
import { User } from '../entities/userEntity';
import { database } from '../config/dbConfig';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { appConfig } from '../config/appConfig';
import { responseHandler } from './errorHandler';
import { NextFunction, Request, Response } from 'express';

const expiresIn: string = appConfig.jwtExpiresIn as string;
const accessTokenSecret: string = appConfig.accessTokenSecret as string;

declare module 'express' {
  interface Request {
    user?: JwtPayload | null;
    client_id?: string;
    tenant_id?: string;
  }
}

class JWTService {
  public static encrypt(payload: object): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, accessTokenSecret, { expiresIn: expiresIn }, (err: Error | null, token: string | undefined) => {
        if (err) {
          return reject(err);
        }
        return resolve(token || '');
      });
    });
  }

  public static decrypt(token: string): Promise<JwtPayload | string> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jwt.verify(token, accessTokenSecret, (err: jwt.VerifyErrors | null, payload: any) => {
        if (err) {
          const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
          return reject(message);
        }
        return resolve(payload as JwtPayload);
      });
    });
  }

  public static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization;
      token = token?.startsWith('Bearer ') ? token.slice(7) : token;

      if (!token) {
        return responseHandler.handleError(res, ResMessages.AUTHORIZATION_TOKEN_MISSING, ErrorCodes.UNAUTHORIZED_ACCESS);
      }

      const decoded = await JWTService.decrypt(token);

      if (typeof decoded === 'string') {
        return responseHandler.handleError(res, decoded, ErrorCodes.UNAUTHORIZED_ACCESS);
      }

      req.user = decoded;

      const id = decoded?.payload?.id;
      const userRepository = database.getDataSource().getRepository(User);
      const user = await userRepository.findOne({ where: { id } });

      if (!user) {
        return responseHandler.handleError(res, ResMessages.UNAUTHORIZED_ACCESS, ErrorCodes.UNAUTHORIZED_ACCESS);
      }

      next();
    } catch (error) {
      console.log(error);
      return responseHandler.handleError(res, ResMessages.UNAUTHORIZED_ACCESS, ErrorCodes.SERVER_ERROR);
    }
  }
}

export default JWTService;
