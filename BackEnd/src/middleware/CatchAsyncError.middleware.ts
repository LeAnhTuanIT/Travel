import { Request, Response, NextFunction, RequestHandler } from 'express';

const asyncMiddleware = (theFunc: RequestHandler): RequestHandler => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};

export default asyncMiddleware;