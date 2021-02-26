import { Router, Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { 
    Res, 
    NotFound, 
    validationErrorFormatter, 
    BadRequest,
    DataResult
} from '../../shared';
import {
    BranchDAO,
    createBranchValidator,
    CreateBranchDTO,
    updateBranchValidator,
    UpdateBranchDTO,
    BranchDTO
} from '../../domain';

/**
 * The branches-module router that handles all routes
 */
export const branchesRouter = Router();

export const branchesRoute = 'branches';

interface IBranchDAO {
    fetch(page: number, pageSize: number): Promise<DataResult<BranchDTO[]>>;
    search(column: any, keyword: any, columnOrder: any, order: any, page: number, pageSize: number): Promise<DataResult<BranchDTO[]>>;
    findById(id: string): Promise<DataResult<BranchDTO>>;
    create(data: CreateBranchDTO): Promise<DataResult<BranchDTO>>;
    update(data: UpdateBranchDTO): Promise<DataResult<BranchDTO>>;
    delete(id: string): Promise<DataResult<BranchDTO>>;
}

const branchDAO: IBranchDAO = new BranchDAO();

/**
 * @method GET
 * @url /api/branches
 * @description Get a list of branches
 * @dao func fetch()
 */
branchesRouter.get('', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationErrors = validationResult(req)
            .formatWith(validationErrorFormatter)
            .array({ onlyFirstError: true });

        if (validationErrors.length) {
            return BadRequest(res, { errors: validationErrors, success: false });
        } 

        const result = await branchDAO.fetch(parseInt(req.query.page as string), parseInt(req.query.limit as string));

        if (result.error) {
            next(result.error);
        } else if (result.data) {
            Res(res, {
                code: 200,
                message: 'Fetched data successfully', 
                data: result.data,
                meta: { ...result.pagination },
                success: true,
            });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @method POST
 * @url /api/search/branches
 * @description Search & filter branches
 * @dao func search()
 */
branchesRouter.post('/search', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationErrors = validationResult(req)
            .formatWith(validationErrorFormatter)
            .array({ onlyFirstError: true });

        if (validationErrors.length) {
            return BadRequest(res, { errors: validationErrors, success: false });
        } 

        const result = await branchDAO.search(
            req.query.column,
            req.query.q,
            req.query.order_column,
            req.query.order,
            parseInt(req.query.page as string), 
            parseInt(req.query.limit as string)
        );

        if (result.error) {
            next(result.error);
        } else if (result.data) {
            Res(res, {
                code: 200,
                message: 'Filtered data successfully', 
                data: result.data,
                meta: { ...result.pagination },
                success: true,
            });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @method GET
 * @url /api/branches/:id
 * @description Find branch by id
 * @dao func findById()
 */
branchesRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationErrors = validationResult(req)
            .formatWith(validationErrorFormatter)
            .array({ onlyFirstError: true });

        if (validationErrors.length) {
            return BadRequest(res, { errors: validationErrors, success: false });
        }
        
        const result = await branchDAO.findById(req.params.id);

        if (result.error) {
            next(result.error);
        } else if (result.isNotFound) {
            NotFound(res, { success: false });
        } else if (result.data) {
            Res(res, {
                code: 200,
                message: 'Fetched data successfully',  
                data: result.data,
                success: true 
            });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @method POST
 * @url /api/branches
 * @description Create a new branch
 * @dao func create()
 */
branchesRouter.post('', createBranchValidator, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationErrors = validationResult(req)
            .formatWith(validationErrorFormatter)
            .array({ onlyFirstError: true });

        if (validationErrors.length) {
            return BadRequest(res, { errors: validationErrors, success: false });
        }

        const data: CreateBranchDTO = req.body;
        const result = await branchDAO.create(data);

        if (result.error) {
            next(result.error);
        } else if (result.validationErrors && result.validationErrors.length) {
            BadRequest(res, { errors: result.validationErrors, success: false });
        } else if (result.data) {
            Res(res, {
                code: 201,
                message: 'Branch created successfully',  
                data: result.data,
                success: true 
            });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @method PUT
 * @url /api/branches
 * @description Update existing branch by id
 * @dao func update()
 */
branchesRouter.put('', updateBranchValidator, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationErrors = validationResult(req)
            .formatWith(validationErrorFormatter)
            .array({ onlyFirstError: true });

        if (validationErrors.length) {
            return BadRequest(res, { errors: validationErrors, success: false });
        }

        const data: UpdateBranchDTO = req.body;
        const result = await branchDAO.update(data);

        if (result.error) {
            next(result.error);
        } else if (result.isNotFound) {
            NotFound(res);
        } else if (result.validationErrors && result.validationErrors.length) {
            BadRequest(res, { errors: result.validationErrors, success: false });
        } else if (result.data) {
            Res(res, {
                code: 200,
                message: 'Branch updated successfully',   
                data: result.data,
                success: true 
            });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @method DELETE
 * @url /api/branches/:id
 * @description Delete branch by id
 * @dao func delete()
 */
branchesRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationErrors = validationResult(req)
            .formatWith(validationErrorFormatter)
            .array({ onlyFirstError: true });

        if (validationErrors.length) {
            return BadRequest(res, { errors: validationErrors, success: false });
        }
        
        const result = await branchDAO.delete(req.params.id);

        if (result.error) {
            next(result.error);
        } else if (result.isNotFound) {
            NotFound(res);
        } else if (result.validationErrors && result.validationErrors.length) {
            BadRequest(res, { errors: result.validationErrors, success: false });
        } else if (result.data) {
            Res(res, { 
                code: 200,
                message: 'Branch deleted successfully',  
                data: result.data,
                success: true 
            });
        }
    } catch (error) {
        next(error);
    }
});