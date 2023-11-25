import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler.utils";
import jwt, {JwtPayload} from "jsonwebtoken";
import catchAsyncError from "../middleware/CatchAsyncError.middleware";
import User, { UserDocument } from "../model/User.model";



export const isAuthenticated = catchAsyncError(async (req: any, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  if(!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY environment variable is not defined.');
  }

  const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }


  req.user = user;
  next();
});

export default isAuthenticated;


// import { Request, Response, NextFunction } from "express";
// const ErrorHandler = require("../utils/ErrorHandler.utils");
// const jwt = require("jsonwebtoken");
// const catchAsyncError = require("./CatchAsyncError.middleware");
// const User = require("../model/User.model");

// const isAuthenticated = catchAsyncError(async (req: any, res: Response, next: NextFunction) => {
//   const token = req.headers.cookies;
//   if (!token) {
//     return next(new ErrorHandler("Please login to continue", 401));
//   }

//   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//   req.user = await User.findById(decoded.id);

//   next();
// });

// export default isAuthenticated;