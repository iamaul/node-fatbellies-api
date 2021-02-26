export interface MealPlanDTO {
    id: string;
    fk_branch_id: string;
    name: string;
    day: string;
    max_capacity: number;
    price: number;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
}