import { Pagination } from './pagination.model';
import { AppHttpResponseError } from './app-http-response-error.model';

export interface DataResult<DataType> {
    data?: DataType | null;
    pagination?: Pagination;
    validationErrors?: AppHttpResponseError[];
    isNotFound?: boolean;
    error?: Error;
    success?: boolean;
}