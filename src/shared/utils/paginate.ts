/**
 * Calculates the offset and limit factors
 * @param page the current pagination page number
 * @param pageSize the maximum number of items
 */
export function paginate(page: number, pageSize: number): { offset: number; limit: number } {
    const pagination = { offset: 0, limit: 0 }

    pagination.limit = Math.abs(pageSize) || 0;
    page = (Math.abs(page) || 1) - 1;
    pagination.offset = pagination.limit * page;

    return pagination;
}