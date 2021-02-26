import { Op } from 'sequelize';
import { AppErrorCode, Database, DataResult, paginate, generatePagination } from '../../../shared';
import { MealPlanDTO, CreateMealPlanDTO, UpdateMealPlanDTO } from '../dto';

/**
 * Represents a MealPlan Data Access Object
 */
export class MealPlanDAO {
    public static async fetch(page: number, pageSize: number): Promise<DataResult<MealPlanDTO[]>> {
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

    public static async search(
        column: any, 
        keyword: any, 
        columnOrder: any, 
        order: any,
        page: number,
        pageSize: number
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

    public static async create(data: CreateMealPlanDTO): Promise<DataResult<MealPlanDTO>> {
        const result: DataResult<MealPlanDTO> = {};

        try {
            const mealplan = await Database.MealPlans.create(data);
            result.data = (await this.findById(mealplan.id)).data;
        } catch (error) {
            result.error = error;
        }

        return result;
    }

    public static async update(data: UpdateMealPlanDTO): Promise<DataResult<MealPlanDTO>> {
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

    public static async delete(id: string): Promise<DataResult<MealPlanDTO>> {
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

    public static async findById(id: string): Promise<DataResult<MealPlanDTO>> {
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