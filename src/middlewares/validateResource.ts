import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import AppError from '../utils/AppError';

/**
 * This function will request body schema.
 */
const validateResource =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      const errorMessage = error instanceof ZodError ? error.message : 'Invalid data';
      throw new AppError(400, errorMessage);
    }
  };

export default validateResource;
