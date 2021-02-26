import { Logger } from '..';

/**
 * Handles any unhandled exception
 */
export function unhandledExceptionAndRejectionHandler(): void {
    process.on('uncaughtException', (error: Error) => {
        error.message = `An uncaught exception => ${error.message}`;
        Logger.error(error.message, error);
    });

    process.on('unhandledRejection', error => {
        if (error instanceof Error) {
            error.message = `An uncaught exception => ${error.message}`;
            Logger.error(error.message, error);
        } else {
            Logger.error(`An uncaught exception => ${error}`);
        }
    });
}