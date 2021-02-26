import { Pagination } from '../models';

/**
 * Generates and returns pagination
 * @param page The current page number
 * @param pageSize The maximum size of page
 * @param totalCount Total items count
 * @param count Items count in the current page
 */
export function generatePagination(
    page: number,
    pageSize: number,
    totalCount: number,
    count: number
): Pagination {
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
        page,
        limit: pageSize,
        count: count,
        total: totalCount,
        prevPage: page - 1 ? page - 1 : undefined,
        nextPage: totalPages > page ? page + 1 : undefined,
        totalPages
    }
}