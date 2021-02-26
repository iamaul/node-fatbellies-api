import winston from 'winston';

/**
 * Logger service wrapper
 */
const logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.Console({ level: 'warn' }),
        new winston.transports.File({
            filename: 'logs/errors.log',
            level: 'error',
            options: {
                createDirectory: true,
                flags: 'a'
            }
        }),
        new winston.transports.File({
            filename: 'logs/logs.log',
            level: 'info',
            options: {
                createDirectory: true,
                flags: 'a'
            }
        })
    ]
});

/**
 * Console logger
 */
const consoleLogger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.Console({
            level: 'silly'
        })
    ]
});

/**
 * Logger services
 */
export class Logger {
    public static error(message: string, error?: Error): void {
        const meta = { stack: error ? error.stack : '' }
        logger.error(message, meta);
    }

    public static warn(message: string, meta?: unknown): void {
        logger.warn(message, meta);
    }

    public static info(message: string, meta?: unknown, logConsole?: boolean): void {
        logger.info(message, meta);

        if (logConsole) {
            consoleLogger.info(message, meta);
        }
    }
}