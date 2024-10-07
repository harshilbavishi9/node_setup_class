import dotenv from 'dotenv';

dotenv.config();

interface SmtpConfig {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
}

interface DBConfig {
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
  dbPass: string;
  dbType: 'mysql' | 'postgres';
}

interface AppConfig {
  db: DBConfig;
  smtp: SmtpConfig;
  port: number | undefined;
  baseUrl: string | undefined;
  redisUrl: string | undefined;
  jwtExpiresIn: string | undefined;
  accessTokenSecret: string | undefined;
}

class Config {
  public appConfig: AppConfig;

  constructor() {
    this.appConfig = {
      baseUrl: process.env.BASE_URL,
      redisUrl: process.env.REDIS_URL,
      jwtExpiresIn: process.env.JWT_EXPIRES_IN,
      accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
      port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
      smtp: {
        smtpHost: process.env.SMTP_HOST,
        smtpUser: process.env.SMTP_USER,
        smtpPass: process.env.SMTP_PASS,
        smtpPort: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
      } as SmtpConfig,
      db: {
        dbHost: process.env.DB_HOST,
        dbName: process.env.DB_NAME,
        dbUser: process.env.DB_USER,
        dbPass: process.env.DB_PASS,
        dbType: process.env.DB_TYPE as 'mysql' | 'postgres',
        dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      } as DBConfig,
    };
  }

  public get config() {
    return this.appConfig;
  }
}

export const appConfig = new Config().config;
