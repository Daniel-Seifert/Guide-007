import * as Express from 'express';
import { applyMiddlewares } from './middlewares';
import { StaticRoutes } from './routes/StaticRoutes';
import { SSRRoutes } from './routes/SSRRoutes';
import { LoginRoutes } from './routes/LoginRoutes';

export const app: Express.Application = Express();

app.disable('x-powered-by');

applyMiddlewares(app);

/**
 * core routes, don't delete these
 */
StaticRoutes(app);
SSRRoutes(app);
LoginRoutes(app);