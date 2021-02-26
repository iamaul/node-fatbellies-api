import { ValidationError } from 'express-validator';
import { AppHttpResponseError } from '../models';

/**
 * Formats a given express-validator validation error
 * @param expressValidationErr The express-validator validation error
 */
export function validationErrorFormatter(expressValidationErr: ValidationError): AppHttpResponseError {
    const appErr: AppHttpResponseError = expressValidationErr.msg ? expressValidationErr.msg : {}

    appErr.source = expressValidationErr.param;

    return appErr;
}