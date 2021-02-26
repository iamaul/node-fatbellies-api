import { Op } from 'sequelize';
import { Route, Get, Post, Put, Path, Query, Body, Tags, Delete } from 'tsoa';
import { Database, DataResult, paginate, generatePagination } from '../../../shared';
import { MealPlanDTO, CreateMealPlanDTO, UpdateMealPlanDTO } from '../dto';

/**
 * Represents a MealPlan Data Access Object
 */
@Route('mealplans')
@Tags('mealplans')
export class MealPlanDAO {

    @Get()
    public async fetch(@Query('page') page: number, @Query('limit') pageSize: number): Promise<DataResult<MealPlanDTO[]>> {
        const result: DataResult<MealPlanDTO[]> = {};

        try {
            page = page || 1;
            pageSize = pageSize || 10;
            const { offset, limit } = paginate(page, pageSize);

            const mealplans = await Database.MealPlans.findAndCountAll({
                include: [{ model: Database.Branches }],
                offset,
                limit,
                nest: true
            }); 

            result.data = mealplans.rows as MealPlanDTO[];
            result.pagination = generatePagination(page, pageSize, mealplans.count, mealplans.rows.length);
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
    ): Promise<DataResult<MealPlanDTO[]>> {
        const result: DataResult<MealPlanDTO[]> = {};
        
        try {
            page = page || 1;
            pageSize = pageSize || 10;
            const { offset, limit } = paginate(page, pageSize);

            columnOrder = columnOrder || 'createdAt';
            order = order || 'desc';

            const mealplans = await Database.MealPlans.findAndCountAll({
                where: {
                    [column]: {
                        [Op.iLike]: `%${keyword}%`
                    }
                },
                include: [{ model: Database.Branches }],
                order: [[columnOrder, order]],
                offset,
                limit,
                nest: true
            });
            
            result.data = mealplans.rows as MealPlanDTO[];
            result.pagination = generatePagination(page, pageSize, mealplans.count, mealplans.rows.length);
        } catch (error) {
            result.error = error;
        }
        return result;
    }

    @Post()
    public async create(@Body() data: CreateMealPlanDTO): Promise<DataResult<MealPlanDTO>> {
        const result: DataResult<MealPlanDTO> = {};

        try {
            const mealplan = await Database.MealPlans.create(data);
            result.data = (await this.findById(mealplan.id)).data;
        } catch (error) {
            result.error = error;
        }

        return result;
    }

    @Put()
    public async update(@Body() data: UpdateMealPlanDTO): Promise<DataResult<MealPlanDTO>> {
        const result: DataResult<MealPlanDTO> = {};

        try {
            const mealplan = await Database.MealPlans.findByPk(data.id);
            if (!mealplan) {
                result.isNotFound = true;
                return result;
            }

            await mealplan.update(data);
            
            result.data = (await this.findById(data.id)).data;
        } catch (error) {
            result.error = error;
        }

        return result;
    }

    @Delete('{id}')
    public async delete(@Path() id: string): Promise<DataResult<MealPlanDTO>> {
        const result: DataResult<MealPlanDTO> = {};
        
        try {
            const mealplan = await Database.MealPlans.findByPk(id, {
                include: [{ model: Database.Branches }]
            });
            if (!mealplan) {
                result.isNotFound = true;
                return result;
            }

            await mealplan.destroy();

            result.data = mealplan.get({ plain: true }) as MealPlanDTO;
        } catch (error) {
            result.error = error;
        }

        return result;
    }

    @Get('{id}')
    public async findById(@Path() id: string): Promise<DataResult<MealPlanDTO>> {
        const result: DataResult<MealPlanDTO> = {};

        try {
            result.data = (await Database.MealPlans.findByPk(id, {
                include: [{ model: Database.Branches }],
                nest: true
            })) as MealPlanDTO;
            result.isNotFound = !result.data;
        } catch (error) {
            result.error = error;
        }

        return result;
    }
}