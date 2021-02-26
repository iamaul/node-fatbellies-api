import { Request } from 'express';

/**
 * Returns an array of integers by parsing the given query param
 * @param req The express request
 * @param param Query param name
 * @param seperator An optional seperator, default ','
 */
export function getQueryParamAsIntArr(req: Request, param: string, seperator = ','): number[] {
    if (!req.query[param]) {
        return [];
    }

    return (req.query[param] as string).split(seperator).map(item => parseInt(item));
}