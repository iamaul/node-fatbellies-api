import { AppHttpResponseError } from './app-http-response-error.model';
import { AppHttpResponseMeta } from './app-http-response-meta.model';

export interface AppHttpResponse {
    code?: number;
    message?: string;
    data?: unknown;
    meta?: AppHttpResponseMeta;
    errors?: AppHttpResponseError[];
    success?: boolean;
}