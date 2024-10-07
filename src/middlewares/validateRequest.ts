import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

class RequestValidator {
  public validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}

export const requestValidator = new RequestValidator();
