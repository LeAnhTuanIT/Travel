import express,{ Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { upload } from "../utils/Multer.utils";
import asyncMiddleware from "../middleware/CatchAsyncError.middleware";
import ErrorHandler from "../utils/ErrorHandler.utils";
import sendMail from "../utils/SendMail.utils";
import User from "../model/User.model";
import base64url from "base64url";
import jwt, { JwtPayload } from "jsonwebtoken";
import sendToken from "../utils/JwtToken.utils";
import isAuthenticated from "../middleware/Authorization.middleware";
// const isAuthenticated = require("../middleware/Authorization.middleware");

const createActivationToken = require("../helper/Hash.helper");


const router = express.Router();

// create user and sendMail
router.post("/create-user", upload.single("avatar"), asyncMiddleware(async (req:any, res: Response, next: NextFunction) => {
    const { name, email, password, phoneNumber } = req.body;
    console.log(req.body);

    const userEmail = await User.findOne({email});

    try {
        if (userEmail) {
          res.status(500).json({ message: "User already exists" });
          return next(new ErrorHandler('User already exists', 400));
        }
        
        console.log(req.file);

        const user = {  
          name: name,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          avatar: req.file?.location,
        };
        console.log(user);

        const activationToken = createActivationToken(user);
        const encodedToken = base64url.encode(activationToken);
        console.log(encodedToken);

        const activationUrl = `${process.env.FE_URL}activation/${encodedToken}`;
        // send email to active
        try {
          await sendMail({
            email: user.email,
            subject: "Activate you account",
            message: `
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;">
            <h1 style="font-size: 24px; margin-top: 0;">Account Activation</h1>
            <p style="font-size: 16px; margin-bottom: 10px;">Hello ${user.name},</p>
            <p style="font-size: 16px; margin-bottom: 10px;">Please click on the link below to activate your account:</p>
            <p><a href="${activationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Click here to create your account!!</a></p>
            <p style="font-size: 16px; margin-bottom: 10px;">Thank you for joining our service.</p>
            <p style="font-size: 16px; margin-bottom: 10px;">Best regards,</p>
            <p style="font-size: 16px; margin-bottom: 10px;">Love Travel</p></div>
          `,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500));
        }

    } catch(error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
}));


// activation
router.post("/activation", asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    console.log("activating");

    try {
        const { activation_token } = req.body;
        const token: string = base64url.decode(activation_token);
        if(!process.env.ACTIVATION_SECRET) {
            throw new Error("ACTIVATION_SECRET environment variable is not defined.")
        }
        const newUser: JwtPayload | String = jwt.verify(token, process.env.ACTIVATION_SECRET);

        if(!newUser) {
            return next(new ErrorHandler("Invalid token", 400));
        }
        const { name, email, password, phoneNumber, avatar } = newUser as JwtPayload;
        let user = await User.findOne({ email });

        if (user) {
            res.status(400).json({
              success: false,
              message: "User already exists",
            });
            return next(new ErrorHandler("User already exists", 400));
        }

        user = await User.create({
            name,
            email,
            avatar,
            password,
            phoneNumber,
        });

        sendToken(user, 201, res);
    }
    catch(error: any) {
        return next(new ErrorHandler(error.message, 400));
    }

}));

// login user 
router.post("/login-user", asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
          return next(new ErrorHandler("Email and password are required", 500));
        }
  
        let user = await User.findOne({ email }).select("+password");
        if (!user) {
          return next(new ErrorHandler("User doesn't exist!", 400));
        }
  
        const isPasswordValid: boolean = await user.comparePassword(password);
  
        if (!isPasswordValid) {
          return next(
            new ErrorHandler("Please provide the correct information", 400)
          );
        }
  
        sendToken(user, 200, res);
    } catch(error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// load user
router.get(
  "/getuser",
  isAuthenticated,
  asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    // router.get("/getuser", catchAsyncError(async (req,res,next) => {
    try {
      const token = req.headers;
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;