import { Sequelize } from 'sequelize';

import { MealPlan, Branch } from '../models';

/**
 * Database connection
 */

// const connectionUri = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
// console.log(connectionUri);

/**
 * A singleton instance of sequelize
 */
const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
    logging: false
});

/**
 * Database helper that includes all functionalities
 */
export class Database {
    /**
     * A singleton instance of sequelize that will be used accross the app
     */
    public static readonly sequelize: Sequelize = sequelize;

    /**
     * Test connection to the database
     */
    public static testDatabaseConnection(): Promise<void> {
        return sequelize.authenticate();
    }

    /**
     * Sync all defined models to the database
     * @param force will create tables if the table doesn't exists
     */
    public static connection(force?: boolean): Promise<any> {
        return sequelize.sync({ force: force });
    }

    /**
     * The MealPlans model that maps the table in the database
     */
    public static get MealPlans(): typeof MealPlan {
        return MealPlan;
    }

    /**
     * The Branches model that maps the table in the database
     */
    public static get Branches(): typeof Branch {
        return Branch;
    }
}