import { 
    Model, 
    DataTypes, 
    Association, 
    HasManyGetAssociationsMixin, 
    HasManyAddAssociationMixin, 
    HasManyHasAssociationMixin, 
    HasManyCountAssociationsMixin, 
    HasManyCreateAssociationMixin 
} from 'sequelize';
import { Database } from '../helpers';
import { MealPlan } from './meal-plan.model';

export class Branch extends Model {
    public id!: string;
    public name!: string;
    public latitude!: number;
    public longitude!: number;
    public opening_hours!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getMealPlans!: HasManyGetAssociationsMixin<MealPlan>;
    public addMealPlan!: HasManyAddAssociationMixin<MealPlan, string>;
    public hasMealPlan!: HasManyHasAssociationMixin<MealPlan, string>;
    public countMealPlans!: HasManyCountAssociationsMixin;
    public createMealPlan!: HasManyCreateAssociationMixin<MealPlan>;

    public readonly mealPlans?: MealPlan[];

    public static associations: {
        mealPlans: Association<Branch, MealPlan>;
    }
}

/**
 * Define the model structure
 */
Branch.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(125),
        field: 'branch_name',
        allowNull: true
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        defaultValue: 0
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        defaultValue: 0
    },
    opening_hours: {
        type: DataTypes.INTEGER,
        field: 'opening_hours'
    }
}, {
    sequelize: Database.sequelize,
    modelName: 'Branch',
    tableName: 'branches_node'
});