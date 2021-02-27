import express, { Application } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { config } from '../config';
import { errorHandler, Logger, Database } from '../shared';

import { branchesRouter, branchesRoute, mealPlansRouter, mealPlansRoute } from '../routes';

import { RegisterRoutes } from '../routes/routes';
import SwaggerJSON from '../docs/swagger.json';
import SwaggerUI from 'swagger-ui-express';

function setupProduction(app: Application): void {
    if (process.env.NODE_ENV === 'production') {
        app.use(helmet());

        // Gzip compressing: decrease the size of the response body
        app.use(compression());
    }
}

function setRequestOptions(app: Application): void {
    app.use(cors());

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));
}

function setupRoutes(app: Application): void {
    const baseRoute = '/api/';

    /**
     * Register API routes
     */
    app.use(baseRoute + branchesRoute, branchesRouter);
    app.use(baseRoute + mealPlansRoute, mealPlansRouter);
    RegisterRoutes(app);
}

function startSwagger(app: Application): void {
    try {
        app.use('/docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerJSON));
    } catch (error) {
        Logger.error(error);
    }
}

export function setupServer(app: Application): void {
    /**
     * The order.
     */
    setupProduction(app);
    setRequestOptions(app);
    setupRoutes(app);
    startSwagger(app);
    app.use(errorHandler);
}

export function startServer(app: Application): void {
    const port = process.env.PORT || 3000;

    /**
     * The server will start unless database is connected
     */
    Database.connection(true).then(() =>
        app.listen(port, () => Logger.info(`${process.env.APP_NAME} is running on port ${port}`, null, true))
    );
}