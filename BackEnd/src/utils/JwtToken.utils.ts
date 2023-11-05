import { Response } from "express";
import { UserDocument } from "../model/User.model";

const sendToken = (user: UserDocument, statusCode: number, res: Response): void => {
  const token: string = user.getJwtToken();
  
  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  console.log(options);

  res.status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      user,
      token,
      options,
    });
};

export default sendToken;