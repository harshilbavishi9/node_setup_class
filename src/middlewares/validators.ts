import { requestValidator } from './validateRequest';
import { Request, Response, NextFunction } from 'express';
import { check, ValidationChain } from 'express-validator';
import { validationMessages } from '../utils/validationMessages';

class UserValidator {
  public registerUserValidation(): Array<ValidationChain | ((req: Request, res: Response, next: NextFunction) => void)> {
    return [this.checkName(), this.checkEmail(), this.checkPassword(), this.checkConfirmPassword(), requestValidator.validate];
  }

  public loginUserValidation(): Array<ValidationChain | ((req: Request, res: Response, next: NextFunction) => void)> {
    return [this.checkEmail(), this.checkPassword(), requestValidator.validate];
  }

  public updateUserValidation(): Array<ValidationChain | ((req: Request, res: Response, next: NextFunction) => void)> {
    return [this.checkName(), requestValidator.validate];
  }

  private checkName() {
    return check('name').isLength({ min: 3 }).withMessage(validationMessages.name.minLength).notEmpty().withMessage(validationMessages.name.required);
  }

  private checkEmail() {
    return check('email').isEmail().withMessage(validationMessages.email.invalid).notEmpty().withMessage(validationMessages.email.required);
  }

  private checkPassword() {
    return check('password').isLength({ min: 6 }).withMessage(validationMessages.password.minLength).notEmpty().withMessage(validationMessages.password.required);
  }

  private checkConfirmPassword() {
    return check('confirm_password').isLength({ min: 6 }).withMessage(validationMessages.confirmPassword.minLength).notEmpty().withMessage(validationMessages.confirmPassword.required);
  }
}

export const userValidator = new UserValidator();
