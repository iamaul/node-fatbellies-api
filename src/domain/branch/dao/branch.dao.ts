import { Op } from 'sequelize';
import { AppErrorCode, Database, DataResult, paginate, generatePagination } from '../../../shared';
import { BranchDTO, CreateBranchDTO, UpdateBranchDTO } from '../dto';

/**
 * Represents a Branch Data Access Object
 */
export class BranchDAO {
    public static async fetch(page: number, pageSize: number): Promise<DataResult<BranchDTO[]>> {
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

    public static async search(
        column: any, 
        keyword: any, 
        columnOrder: any, 
        order: any,
        page: number,
        pageSize: number
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

    public static async create(data: CreateBranchDTO): Promise<DataResult<BranchDTO>> {
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

    public static async update(data: UpdateBranchDTO): Promise<DataResult<BranchDTO>> {
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

    public static async delete(id: string): Promise<DataResult<BranchDTO>> {
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

    public static async findById(id: string): Promise<DataResult<BranchDTO>> {
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