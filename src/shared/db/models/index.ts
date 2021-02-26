import { Branch } from './branch.model';
import { MealPlan } from './meal-plan.model';

export * from './branch.model';
export * from './meal-plan.model';

Branch.hasMany(MealPlan, {
    sourceKey: 'id',
    foreignKey: 'fk_branch_id',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION'
});

MealPlan.belongsTo(Branch, {
    foreignKey: 'fk_branch_id',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION'
});