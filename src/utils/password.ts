import bcrypt from 'bcrypt';

class PasswordService {
  private saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  public encryptPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, this.saltRounds, (err: Error | undefined, hash: string) => {
        if (err) {
          return reject(err);
        }
        return resolve(hash);
      });
    });
  }

  public comparePassword(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err: Error | undefined, result: boolean) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
}

export const passwordService = new PasswordService();
