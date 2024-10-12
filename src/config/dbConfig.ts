import { appConfig } from './cred.json';
import { DataSource, DataSourceOptions } from 'typeorm';

class Database {
  private dataSource: DataSource;

  constructor() {
    const dbConfig: DataSourceOptions = {
      type: 'postgres',
      host: appConfig.db.dbHost,
      port: appConfig.db.dbPort,
      username: appConfig.db.dbUser,
      password: appConfig.db.dbPass,
      database: appConfig.db.dbName,
      synchronize: true,
      logging: false,
      entities: ['src/entities/**/*.ts'],
    };

    this.dataSource = new DataSource(dbConfig);
  }

  public async initialize() {
    try {
      await this.dataSource.initialize();
      console.log('Database connected.');
    } catch (error) {
      console.error('Error connecting to the database', error);
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
