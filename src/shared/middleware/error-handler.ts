import { Request, Response, NextFunction } from 'express';
import { Logger, InternalServerError } from '..';

/**
 * A middleware that handles error
 * @param err The error object
 * @param req Express request instance
 * @param res Express response instance
 * @param next Express the next middleware 
 */
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    Logger.error(err.message, err);

    InternalServerError(res, err);
}