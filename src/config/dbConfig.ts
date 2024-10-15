import Logger from '../utils/winston';
import { db } from '../../cred.json';
import { DataSource, DataSourceOptions } from 'typeorm';

class Database {
  private dataSource: DataSource;

  constructor() {
    const dbConfig: DataSourceOptions = {
      type: 'postgres',
      host: db.dbHost,
      port: db.dbPort,
      username: db.dbUser,
      password: db.dbPass,
      database: db.dbName,
      synchronize: true,
      logging: false,
      entities: ['src/entities/**/*.ts'],
    };

    this.dataSource = new DataSource(dbConfig);
  }

  public async initialize() {
    try {
      await this.dataSource.initialize();
      Logger.info('Database connected.');
    } catch (error) {
      Logger.error('Database connection error.');
      throw error;
    }
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }

  public isInitialized(): boolean {
    return this.dataSource.isInitialized;
  }
}

const databaseInstance = new Database();

databaseInstance.initialize();

export const database = databaseInstance;
