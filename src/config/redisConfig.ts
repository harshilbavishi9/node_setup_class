import { appConfig } from './cred.json';
import { createClient, RedisClientType } from 'redis';

class RedisClient {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: appConfig.redisUrl,
    });

    this.initialize();
  }

  private async initialize() {
    try {
      await this.client.connect();
      console.log('Redis connected.');
    } catch (err) {
      console.error('Redis connection error:', err);
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
