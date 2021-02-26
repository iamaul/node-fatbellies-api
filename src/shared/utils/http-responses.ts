import { Response } from 'express';
import { AppHttpResponse, AppErrorCode } from '../models';

/**
 * Returns a succeeded response with 200 status code
 * @param response Http-response
 * @param body An optional body that sent the response body
 */
export function Res(response: Response, body?: AppHttpResponse): Response {
    return body ? response.send(body) : response.send();
}

/**
 * Returns a bad request response with 400 status code
 * @param response Http-response
 * @param body An optional body that sent the response body
 */
export function BadRequest(response: Response, body?: AppHttpResponse): Response {
    return body ? response.status(400).send(body) : response.status(400).send();
}

/**
 * Returns a unauthenticated response with 401 status code
 * @param response Http-response
 * @param body An optional body that sent the response body
 */
export function Unauthenticated(response: Response): Response {
    const body: AppHttpResponse = {
        errors: [
            {
                code: AppErrorCode.Unauthenticated,
                error: 'Not authenticated',
                message: 'No valid access',
                success: false
            }
        ]
    } 
    
    return response.status(401).send(body);
}

/**
 * Returns a forbidden response with 403 status code
 * @param response Http-response
 * @param body An optional body that sent the response body
 */
export function Forbidden(response: Response): Response {
    const body: AppHttpResponse = {
        errors: [
            {
                code: AppErrorCode.Forbidden,
                error: 'Access denied',
                message: 'Access unauthorized',
                success: false
            }
        ]
    }

    return response.status(403).send(body);
}

/**
 * Returns a not found response with 404 status code
 * @param response Http-response
 * @param body An optional body that sent the response body
 */
export function NotFound(response: Response, body?: AppHttpResponse): Response {
    return body ? response.status(404).send(body) : response.status(404).send();
}

/**
 * Returns a internal server error response with 500 status code
 * @param response Http-response
 * @param body An optional body that sent the response body
 */
export function InternalServerError(response: Response, error: string | Error): Response {
    const body: AppHttpResponse = {
        errors: [
            {
                code: AppErrorCode.InternalServerErr,
                error: 'Internal server error',
                message: typeof error === 'string' ? error : error.message,
                success: false
            }
        ]
    }

    return response.status(500).send(body);
}