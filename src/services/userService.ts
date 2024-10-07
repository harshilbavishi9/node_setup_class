import { Repository } from 'typeorm';
import { User } from '../entities/userEntity';
import { database } from '../config/dbConfig';

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = database.getDataSource().getRepository(User);
  }

  async getAllUsers() {
    return await this.userRepository.find({
      order: { id: 'DESC' },
    });
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: number, userData: Partial<User>) {
    await this.userRepository.update(id, userData);
    return await this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: number) {
    await this.userRepository.delete(id);
    return { id };
  }
}

export const userService = new UserService();
