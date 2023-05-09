import { RequestHandler } from 'express';

const catchAsync = (fn: Function) => {
  const funcToReturn: RequestHandler = (req, res, next) => {
    fn(req, res, next).catch(next);
  };
  return funcToReturn;
};

export default catchAsync;
