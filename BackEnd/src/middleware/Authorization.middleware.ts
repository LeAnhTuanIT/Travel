import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler.utils";
import jwt from "jsonwebtoken";
import catchAsyncError from "../middleware/CatchAsyncError.middleware";
import User from "../model/User.model";



export const isAuthenticated = catchAsyncError(async (req: any, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.cookie;
  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  if(!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY environment variable is not defined.');
  }

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }


  req.user = user;
  next();
});

export default isAuthenticated;