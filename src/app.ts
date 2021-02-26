import express, { Application } from 'express';
import * as setup from './setup';
import { unhandledExceptionAndRejectionHandler } from './shared';

/**
 * A singleton instance of Express app
 */
const app: Application = express();

/**
 * Bootstrap the app in the following order
 * 1. Call the unhandled-exception-and-rejection-handler function at the very beginning of node.js application startup
 * 2. Setup the express server
 * 3. Start express server
 */
unhandledExceptionAndRejectionHandler();
setup.setupServer(app);
setup.startServer(app);