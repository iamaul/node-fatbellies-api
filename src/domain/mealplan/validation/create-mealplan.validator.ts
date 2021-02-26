import { check } from 'express-validator';
import { AppErrorCode } from '../../../shared';

export const createMealPlanValidator = [
    /**
     * Field fk_branch_id
     */
    check('fk_branch_id')
        .optional({ checkFalsy: true })
        .isUUID(4)
        .withMessage({
            code: AppErrorCode.InvalidType,
            error: 'Invalid field type',
            message: 'The field branchId must be a UUID with version 4'
        }),
    /**
     * Field name
     */
    check('name')
        .exists({ checkNull: true })
        .withMessage({
            code: AppErrorCode.IsRequired,
            error: 'Field is required',
            message: 'The field name is required'
        })
        .isLength({ min: 2 })
        .withMessage({
            code: AppErrorCode.InvalidLength,
            error: 'Invalid field length',
            message: 'The field name must be at least 2 character'
        }),
    /**
     * Field day
     */
    check('day')
        .exists({ checkNull: true })
        .withMessage({
            code: AppErrorCode.IsRequired,
            error: 'Field is required',
            message: 'The field day is required'
        })
        .isString()
        .withMessage({
            code: AppErrorCode.InvalidType,
            error: 'Invalid field type',
            message: 'The field day must be a characters'
        }),
    /**
     * Field max_capacity
     */
    check('max_capacity')
        .exists({ checkNull: true })
        .withMessage({
            code: AppErrorCode.IsRequired,
            error: 'Field is required',
            message: 'The field max_capacity is required'
        })
        .isNumeric()
        .withMessage({
            code: AppErrorCode.InvalidType,
            error: 'Invalid field type',
            message: 'The field max_capacity must be a number'
        }),
    /**
     * Field price
     */
    check('price')
        .exists({ checkNull: true })
        .withMessage({
            code: AppErrorCode.IsRequired,
            error: 'Field is required',
            message: 'The field price is required'
        })
        .isNumeric()
        .withMessage({
            code: AppErrorCode.InvalidType,
            error: 'Invalid field type',
            message: 'The field price must be a number'
        }),
    /**
     * Field startTime
     */
    check('startTime')
        .exists({ checkNull: true })
        .withMessage({
            code: AppErrorCode.IsRequired,
            error: 'Field is required',
            message: 'The field startTime is required'
        }),
    /**
     * Field endTime
     */
    check('endTime')
        .exists({ checkNull: true })
        .withMessage({
            code: AppErrorCode.IsRequired,
            error: 'Field is required',
            message: 'The field endTime is required'
        })
];