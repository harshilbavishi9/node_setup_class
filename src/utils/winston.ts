import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';

const { combine, timestamp, printf, colorize } = format;

class Logger {
  private logger: WinstonLogger;

  constructor() {
    const logFormat = printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    });

    this.logger = createLogger({
      level: 'info',
      format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), colorize(), logFormat),
      transports: [new transports.Console()],
    });
  }

  log(level: string, message: string): void {
    this.logger.log(level, message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }
}

export default new Logger();
