import express from 'express';
import AuthController from '../controllers/auth.controller';

const authRouter = express.Router();

const controller = new AuthController();

authRouter.post('/register', controller.register);

export default authRouter;
