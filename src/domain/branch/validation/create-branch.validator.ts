import { check } from 'express-validator';
import { AppErrorCode } from '../../../shared';

export const createBranchValidator = [
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
        .isLength({ min: 3 })
        .withMessage({
            code: AppErrorCode.InvalidLength,
            error: 'Invalid field length',
            message: 'The field name must be at least 3 characters'
        }),
    /**
     * Field latitude
     */
    check('latitude')
        .exists({ checkNull: true })
        .withMessage({
            code: AppErrorCode.IsRequired,
            error: 'Field is required',
            message: 'The field latitude is required'
        })
        .isFloat()
        .withMessage({
            code: AppErrorCode.InvalidType,
            error: 'Invalid field type',
            message: 'The field latitude must be a float number'
        }),
    /**
     * Field longitude
     */
    check('longitude')
        .exists({ checkNull: true })
        .withMessage({
            code: AppErrorCode.IsRequired,
            error: 'Field is required',
            message: 'The field longitude is required'
        })
        .isFloat()
        .withMessage({
            code: AppErrorCode.InvalidType,
            error: 'Invalid field type',
            message: 'The field longitude must be a float number'
        }),
    /**
     * Field opening_hours
     */
    check('opening_hours')
        .exists({ checkNull: true })
        .withMessage({
            code: AppErrorCode.IsRequired,
            error: 'Field is required',
            message: 'The field opening_hours is required'
        })
        .isNumeric()
        .withMessage({
            code: AppErrorCode.InvalidType,
            error: 'Invalid field type',
            message: 'The field opening_hours must be a number'
        })
];