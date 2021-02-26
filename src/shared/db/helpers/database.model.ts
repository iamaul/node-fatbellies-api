import { Sequelize } from 'sequelize';
import { config } from '../../../config';

import { MealPlan, Branch } from '../models';

/**
 * Database connection
 */

const connectionUri = `postgres://${config.DATABASE.USER}:${config.DATABASE.PASSWORD}@${config.DATABASE.HOST}:${config.DATABASE.PORT}/${config.DATABASE.NAME}`;

/**
 * A singleton instance of sequelize
 */
const sequelize = new Sequelize(connectionUri, {
    dialectOptions: { timezone: 'Etc/GMT+7' },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
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