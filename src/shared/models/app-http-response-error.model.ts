import { AppErrorCode } from './app-error-codes.model';

export interface AppHttpResponseError {
    code?: AppErrorCode;
    source?: string;
    error?: string;
    message?: string;
    success?: boolean;
}