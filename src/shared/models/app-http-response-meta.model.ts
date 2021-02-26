export interface AppHttpResponseMeta {
    page?: number;
    limit?: number;
    count?: number;
    total?: number;
    prevPage?: number | undefined;
    nextPage?: number | undefined;
    totalPages?: number;
}