import Logger from '../utils/winston';
import { redisUrl } from '../../cred.json';
import { createClient, RedisClientType } from 'redis';

class RedisClient {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: redisUrl,
    });

    this.initialize();
  }

  private async initialize() {
    try {
      await this.client.connect();
      Logger.info('Redis connected.');
    } catch (err) {
      Logger.error('Redis connection error.');

      throw err;
    }
  }

  public getClient(): RedisClientType {
    return this.client;
  }

  public async disconnect() {
    await this.client.quit();
  }
}

const redisClientInstance = new RedisClient();

export const redisClient = redisClientInstance.getClient();
