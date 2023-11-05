import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import ErrorHandler from "../utils/ErrorHandler.utils";


interface ErrorResponse {
  statusCode: number;
  message: string;
  path?: string;
  code?: number;
  keyValue?: any;
}


const errorMiddleware: ErrorRequestHandler = (
  err: Error & ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server Error';

  // wrong mongodb id error
  if (err.name === 'CastError') {
    const message = `Resource not found with this id. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)}`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Your URL is invalid. Please try again later';
    err = new ErrorHandler(message, 400);
  }

  // jwt expired
  if (err.name === 'TokenExpiredError') {
    const message = 'Your URL is expired. Please try again later';
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;