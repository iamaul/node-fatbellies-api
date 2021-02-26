import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    APP: {
        NAME: process.env.APP_NAME,
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT
    },
    DATABASE: {
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        HOST: process.env.DB_HOST,
        PORT: process.env.DB_PORT,
        NAME: process.env.DB_NAME
    }
}