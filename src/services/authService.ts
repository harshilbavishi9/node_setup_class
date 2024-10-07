import { Repository } from 'typeorm';
import JWTService from '../utils/token';
import { generateOTP } from '../utils/otp';
import { Otp } from '../entities/otpEntity';
import ErrorCodes from '../utils/errorCodes';
import { User } from '../entities/userEntity';
import { database } from '../config/dbConfig';
import ResMessages from '../utils/resMessages';
import { sendEmail } from '../utils/nodemailer';
import { otpTemplate } from '../utils/templates';
import { redisClient } from '../config/redisConfig';
import { passwordService } from '../utils/password';

class AuthService {
  private otpRepository: Repository<Otp>;
  private userRepository: Repository<User>;

  constructor() {
    this.otpRepository = database.getDataSource().getRepository(Otp);
    this.userRepository = database.getDataSource().getRepository(User);
  }

  async registerUser(userData: { name: string; email: string; password: string }) {
    const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
      return { message: ResMessages.USER_ALREADY_EXISTS, success: false, code: ErrorCodes.ALREADY_EXISTS, data: null };
    }

    const otp = await generateOTP();
    const otpExpiry = new Date(Date.now() + 1 * 60 * 1000);
    const hashedPassword = await passwordService.encryptPassword(userData.password);

    await sendEmail(otpTemplate(otp.toString(), userData.email));

    const user = this.userRepository.create({
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
    });
    const newUser = await this.userRepository.save(user);

    await this.otpRepository.save({
      otp,
      userid: newUser,
      expire_at: otpExpiry,
    });

    await redisClient.del('all_users');

    return {
      message: ResMessages.USER_REGISTER_SUCCESS,
      code: ErrorCodes.CREATED,
      success: true,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        created_at: newUser.created_at,
        updated_at: newUser.updated_at,
      },
    };
  }

  async loginUser(credentials: { email: string; password: string }) {
    const user = await this.userRepository.findOne({ where: { email: credentials.email } });

    if (!user) {
      return { message: ResMessages.USER_NOT_FOUND, success: false, code: ErrorCodes.NOT_FOUND_ERROR, data: null };
    }

    const isMatch = await passwordService.comparePassword(credentials.password, user.password);
    if (!isMatch) {
      return { message: ResMessages.WRONG_PASSWORD, success: false, code: ErrorCodes.BAD_REQUEST, data: null };
    }

    const token = await JWTService.encrypt({ id: user.id, email: user.email });
    await this.userRepository.update(user.id, { token });

    return {
      message: ResMessages.USER_LOGIN_SUCCESS,
      code: ErrorCodes.SUCCESS,
      success: true,
      data: {
        token,
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    };
  }
}

export const authService = new AuthService();
