import { Model, DataTypes, Association } from 'sequelize';
import { Database } from '../helpers';
import { Branch } from './branch.model';

export class MealPlan extends Model {
    public id!: string;
    public fk_branch_id!: string;

    public name!: string;
    public max_capacity!: number;
    public price!: number;

    public day!: string;
    public startTime!: Date;
    public endTime!: Date;

    public readonly branch?: Branch;

    public static readonly associations: {
        branch: Association<MealPlan, Branch>;
    }
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

/**
 * Define the model structure
 */
MealPlan.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(130),
        field: 'meal_plan_name',
        allowNull: true
    },
    max_capacity: {
        type: DataTypes.INTEGER,
        field: 'max_capacity',
        defaultValue: 10
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    },
    day: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    startTime: {
        type: DataTypes.TIME,
        field: 'start_time'
    },
    endTime: {
        type: DataTypes.TIME,
        field: 'end_time'
    }
}, {
    sequelize: Database.sequelize,
    modelName: 'MealPlan',
    tableName: 'branch_meal_plans_node'
});