import express from 'express';
import AuthController from '../controllers/auth.controller';
import validateResource from '../middlewares/validateResource';
import { createSessionSchema } from '../schema/auth.schema';

const authRouter = express.Router();

const controller = new AuthController();

authRouter.post('/session', validateResource(createSessionSchema), controller.createSessionHandler);

authRouter.get('/session/refresh', controller.refreshAccessTokenHandler);

export default authRouter;
