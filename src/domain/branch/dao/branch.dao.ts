import { Op, Sequelize } from 'sequelize';
import { Controller, Route, Get, Post, Put, Path, Query, Body, Tags, Delete } from 'tsoa';
import { AppErrorCode, Database, DataResult, paginate, generatePagination } from '../../../shared';
import { BranchDTO, CreateBranchDTO, UpdateBranchDTO } from '../dto';

/**
 * Represents a Branch Data Access Object
 */
@Route('branches')
@Tags('branches')
export class BranchDAO extends Controller {

    @Get()
    public async fetch(@Query('page') page?: number, @Query('limit') pageSize?: number): Promise<DataResult<BranchDTO[]>> {
        const result: DataResult<BranchDTO[]> = {};

        try {
            page = page || 1;
            pageSize = pageSize || 10;
            const { offset, limit } = paginate(page, pageSize);

            const branches = await Database.Branches.findAndCountAll({
                include: [{ model: Database.MealPlans }],
                offset,
                limit,
                nest: true
            }); 

            result.data = branches.rows as BranchDTO[];
            result.pagination = generatePagination(page, pageSize, branches.count, branches.rows.length);
        } catch (error) {
            result.error = error;
        }

        return result;
    }

    @Post('search')
    public async search(
        @Query('column') column: any, 
        @Query('q') keyword: any, 
        @Query('order_column') columnOrder?: any, 
        @Query('order') order?: any,
        @Query('page') page?: number,
        @Query('limit') pageSize?: number
    ): Promise<DataResult<BranchDTO[]>> {
        const result: DataResult<BranchDTO[]> = {};
        
        try {
            page = page || 1;
            pageSize = pageSize || 10;
            const { offset, limit } = paginate(page, pageSize);

            columnOrder = columnOrder || 'createdAt';
            order = order || 'desc';

            const branches = await Database.Branches.findAndCountAll({
                where: {
                    [column]: {
                        [Op.iLike]: `%${keyword}%`
                    }
                },
                include: [{ model: Database.MealPlans }],
                order: [[columnOrder, order]],
                offset,
                limit,
                nest: true
            });
            
            result.data = branches.rows as BranchDTO[];
            result.pagination = generatePagination(page, pageSize, branches.count, branches.rows.length);
        } catch (error) {
            result.error = error;
        }
        return result;
    }

    @Post()
    public async create(@Body() data: CreateBranchDTO): Promise<DataResult<BranchDTO>> {
        const result: DataResult<BranchDTO> = {};

        try {
            if (!!(await Database.Branches.count({ where: { name: data.name } }))) {
                result.validationErrors = [
                    {
                        code: AppErrorCode.ValueExists,
                        source: 'name',
                        error: 'Field value already exists',
                        message: 'The branch name already exists',
                        success: false
                    }
                ];
                return result;
            }

            const branch = await Database.Branches.create(data);
            result.data = (await this.findById(branch.id)).data;
        } catch (error) {
            result.error = error;
        }

        return result;
    }

    @Post('nearby')
    public async nearbyBranch(@Query() long: number, @Query() lat: number): Promise<DataResult<BranchDTO[]>> {
        const result: DataResult<BranchDTO[]> = {};

        try {
            const branches = await Database.Branches.findAll({
                attributes: [
                    'id',
                    'branch_name',
                    'latitude',
                    'longitude',
                    'opening_hours',
                    [
                        Sequelize.literal(`(3959 * acos(cos(radians(${long})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${lat})) + sin(radians(${long})) * sin(radians(latitude))))`),
                        'distance'
                    ],
                ],
                include: [{ model: Database.MealPlans }],
                nest: true
            });

            result.data = branches as BranchDTO[];
        } catch (error) {
            result.error = error;
        }

        return result;
    }

    @Put()
    public async update(@Body() data: UpdateBranchDTO): Promise<DataResult<BranchDTO>> {
        const result: DataResult<BranchDTO> = {};

        try {
            const branch = await Database.Branches.findByPk(data.id);
            if (!branch) {
                result.isNotFound = true;
                return result;
            }

            const branchName = !!(await Database.Branches.count({
                where: {
                    [Op.and]: [{ name: data.name }, { id: { [Op.ne]: branch.id } }]
                }
            }));
            if (branchName) {
                result.validationErrors = [
                    {
                        code: AppErrorCode.ValueExists,
                        source: 'name',
                        error: 'Field value already exists',
                        message: 'The branch name already exists',
                        success: false
                    }
                ];
                return result;
            }

            await branch.update(data);
            
            result.data = (await this.findById(data.id)).data;
        } catch (error) {
            result.error = error;
        }

        return result;
    }

    @Delete('{id}')
    public async delete(@Path() id: string): Promise<DataResult<BranchDTO>> {
        const result: DataResult<BranchDTO> = {};
        
        try {
            const branch = await Database.Branches.findByPk(id, {
                include: [{ model: Database.MealPlans }]
            });
            if (!branch) {
                result.isNotFound = true;
                return result;
            }

            await branch.destroy();

            result.data = branch.get({ plain: true }) as BranchDTO;
        } catch (error) {
            result.error = error;
        }

        return result;
    }

    @Get('{id}')
    public async findById(@Path() id: string): Promise<DataResult<BranchDTO>> {
        const result: DataResult<BranchDTO> = {};

        try {
            result.data = (await Database.Branches.findByPk(id, {
                include: [{ model: Database.MealPlans }],
                nest: true
            })) as BranchDTO;
            result.isNotFound = !result.data;
        } catch (error) {
            result.error = error;
        }

        return result;
    }
}