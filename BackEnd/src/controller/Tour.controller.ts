import express, { NextFunction, Request, Response } from "express";
import Tour from "../model/Tour.model";
import User from "../model/User.model";
import { upload } from "../utils/Multer.utils";
import asyncMiddleware from "../middleware/CatchAsyncError.middleware";
import errorHandler from "../utils/ErrorHandler.utils";
import isAuthenticated from "../middleware/Authorization.middleware";
// const isAuthenticated = require("../middleware/Authorization.middleware");
import {FormatAllDate, FormatDateOrderId} from "../middleware/Format.middlewarre";
import queryString from "qs"
import crypto from "crypto"
import config from "config"
import sendMail from '../utils/SendMail.utils';
import ErrorHandler from "../utils/ErrorHandler.utils";

const sortObject = require("sort-object");


function pad2(n: number) {
  return (n < 10 ? "0" : "") + n;
}


function dateFormatAll(date: Date) {
  let dateFormated =
    date.getFullYear() +
    pad2(date.getMonth() + 1) +
    pad2(date.getDate()) +
    pad2(date.getHours()) +
    pad2(date.getMinutes()) +
    pad2(date.getSeconds());

  return dateFormated;
}


const router = express.Router();
// test API tour
router.get("/test", (_, res: Response) => {
    res.sendStatus(200);
})

// create tour
router.post("/create-tour",upload.array("images"),
  asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    try {
      const tourData = req.body;
      console.log(tourData)
      const files = req.files;
      const ImagesUrl = files.map((file: {location: any}) => {
        return file.location;
      })

      tourData.images = ImagesUrl;
      var user = await User.findOne({userId: tourData.userId});
      tourData.user = user

      console.log(tourData);
      const Createtour = await Tour.create(tourData);

      res.status(200).json({
          success: true,
          Createtour,
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 500))
    }
  }
))

// update tour
router.put("/update-tour/:id",upload.array('images'), asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
      try {
        const tourId = req.params.id;
        const {name, country, description, destination, aim, price, sold_out, userId} = req.body;
        const files = req.files;
        const ImagesUrl = files.map((file: {location: any}) => {
          return file.location;
        })

        const user = await User.findOne({userId});
        const TourData = {
          name: name,
          country: country,
          description: description,
          destination: destination,
          aim: aim,
          price: price,
          sold_out: sold_out || undefined,
          images: ImagesUrl,
          user: user,
        }

        const updateTour = await Tour.updateOne({ _id: tourId }, TourData);
  
        res.status(200).json({
          success: true,
          updateTour,
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 500));
    }
  }
));

// delete tour
router.delete("/delete-tour/:id", asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
  try {
    const tourId = req.params.id;

    const currentTour: any = await Tour.findOne({id: tourId});
    const deleteTour: any = await Tour.deleteOne(currentTour);

    res.status(200).json({
      success: true,
      deleteTour
    });
  } catch (error: any) {
    return next(new errorHandler(error.message, 500))
  }  
}));

// get all tour of admin 
router.get("/get-all-tour-admin", asyncMiddleware(async (req:Request, res: Response, next: NextFunction) => {
  try {
    const tours = (await Tour.find({}).populate({
      path: "reviews",
      options: { strictPopulate: false },
    }));

    res.status(200).json({
      success: true,
      tours,
    });
  } catch (error: any) {
    return next(new errorHandler(error.message, 500));
  }}
));

// get all tour
router.get("/get-all-tour", asyncMiddleware(async (req:Request, res: Response, next: NextFunction) => {
    try {
      const limit = 48;

      const tours = await Tour.find({}).populate({ path: "reviews",
      options: { strictPopulate: false },}).sort({createAt: -1}).limit(limit);

      res.status(200).json({
        success: true,
        tours,
      })
    } catch (error: any) {
      return next(new errorHandler(error.message, 500));
    }
}))

// get tour
router.get("/get-tour/:id", asyncMiddleware(async (req:Request, res: Response, next: NextFunction) => {
  try {
    const tour = await Tour.findById(req.params.id).populate({ path: "reviews",
    options: { strictPopulate: false },});
      res.status(200).json({
        success: true,
        tour
      })
  } catch (error: any) {
      return next(new errorHandler(error.message, 500))
  }
}));

// endpoint với từ khóa tìm kiếm
router.get("/search/:name", asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  try {
   
    const tours = await Tour.find({
      name: {
        $regex: req.params.name,
        $options: "i",
      },
    })
    res.status(200).json({
      success: true,
      tours,
    });
  } catch (error: any) {
    return next(new errorHandler(error.message, 500));
  }
}));


// Payment

type ExpressResponse = Response<any>;

function handleRedirect(res: ExpressResponse, url: string): void {
  if (res.headersSent) {
    // Headers have already been sent, so return early
    return;
  }

  res.setHeader('Location', url);
  res.statusCode = 302;
  
}

// Payment tour
router.post("/create-payment-tour", function(req: any, res: Response, next: NextFunction){
    var ipAdr: string | undefined = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.Socket.remoteAddressl;
    var tmnCode: string | undefined = process.env.VNP_TMNCODE;
    var secretKey: string | undefined = process.env.VPN_HASHSECRET;
    var VNP_Url: string | undefined = process.env.VNP_URL;
    var ReturnUrl: string| undefined = process.env.RETURN_URL;
    var date = new Date();
    var createDate: string = dateFormatAll(date);
    var orderId: string= FormatDateOrderId(date);
    var amount: number = Number(req.body.paymentInfo.amount);
    var tourId: string = req.body.paymentInfo.tourId;
    var userId: string = req.body.paymentInfo.userId;
    var bankcode: string =  "";
    var orderInfo: string = req.body.paymentInfo.orderDescription;
    var quantity: number = Number(req.body.paymentInfo.quantity);
    var currCode: string = "VND";
    var VNP_Params: any = {};
    var currCode: string = "VND";
    var vnp_Version: string = "2.1.0";
    var vnp_Command: string = "pay";
    var vnp_OrderType: string = "other";
    var locale: string = req.body.language;
    if(locale === null || locale === "") {
    locale = "vn";
    } 

    

    VNP_Params["vnp_Version"] = vnp_Version;
    VNP_Params["vnp_Command"] = vnp_Command;
    VNP_Params["vnp_TmnCode"] = tmnCode;
    VNP_Params["vnp_Locale"] = locale;
    VNP_Params["vnp_CurrCode"] = currCode;
    VNP_Params["vnp_TxnRef"] = orderId;
    VNP_Params["vnp_OrderInfo"] = orderInfo;
    VNP_Params["vnp_OrderType"] = vnp_OrderType;
    VNP_Params["vnp_Amount"] = amount * 100;
    VNP_Params["vnp_ReturnUrl"] =
    ReturnUrl + `?tourId=${tourId}&userId=${userId}&quantity=${quantity}`;
    VNP_Params["vnp_IpAddr"] = ipAdr;
    VNP_Params["vnp_Locale"] = "vn";
    VNP_Params["vnp_CreateDate"] = createDate;
    if (bankcode !== null && bankcode !== "") {
      VNP_Params["vnp_BankCode"] = bankcode;
    }

    var locale: string = req.body.language;
    if (locale === null || locale === "") {
      locale = "vn";
    }

    // Các thuộc tính phù hợp với định dạng của VNPAY
    VNP_Params = sortObject(VNP_Params);
    console.log(VNP_Params)

    if (bankcode !== null && bankcode !== "") {
      VNP_Params["vnp_BankCode"] = bankcode;
    }

    var querystring = require("qs");
    var signData = querystring.stringify(VNP_Params, { encode: true });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    VNP_Params["vnp_SecureHash"] = signed;
    VNP_Url += "?" + querystring.stringify(VNP_Params, { encode: true });
    if(!secretKey) {
      throw new Error('secretKey environment variable is not defined.');
    }

    // VNP_Url = decodeURIComponent(VNP_Url ? VNP_Url : "");
    
    res.status(201).json({
      success: true,
      VNP_Url,
    })
    console.log(VNP_Url)
    if(!VNP_Url) {
      throw new Error("VNPAY URL envirionment variable is not defined");
    }
    handleRedirect(res, VNP_Url);

});


// success payment
router.get("/success_payment", function(req: Request, res: Response, next: NextFunction) {
    var VNP_Params: any = req.body;
    
    var secureHash: string = VNP_Params["vnp_SecureHash"];
    delete VNP_Params["vnp_SecureHash"];
    delete VNP_Params["vnp_SecureHashType"];
    var tmnCode: string = config.get("vnp_TmnCode");
    var secretKey: string = config.get("vnp_HashSecret");

    var singData = queryString.stringify(VNP_Params, {encode: true});

    if(!secretKey) {
      throw new Error('secretKey environment variable is not defined.');
    }
    
    var hmac = crypto.createHmac("sha512",secretKey);
    var signed = hmac.update(Buffer.from(singData, "utf-8")).digest("hex");
    
    if(secureHash === signed) {
      // Kiem tra
      res.render("success", {code: VNP_Params["vnp_ResponseCode"]});
    } else {
    res.render("success", {code: "97"});
    }
});


// get vnp
router.get("/pay_ipn", function (req: Request, res: Response, next: NextFunction) {
  var vnp_Params = req.query;
  var secureHash = vnp_Params["np_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  var secretKey = process.env.VPN_HASHSECRET;
  var signData = queryString.stringify(vnp_Params, {encode: false});
  if(!secretKey) {
    throw new Error('secretKey environment variable is not defined.');
  }
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  if (secureHash === signed) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({ RspCode: "00", Message: "success" });
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }

})


// Send Discount
router.post("/send-discount", asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await sendMail({
      email: req.body.email,
      subject: "Activate you account",
      message: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;">
    <h1 style="font-size: 24px; margin-top: 0;">Ưu đãi giảm giá</h1>
    <p style="font-size: 16px; margin-bottom: 10px;">Xin chào bạn,</p>
    <p style="font-size: 16px; margin-bottom: 10px;">Chúng tôi rất vui mừng đưa ra một ưu đãi giảm giá đặc biệt cho bạn!</p>
    <p style="font-size: 16px; margin-bottom: 10px;">Cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi. Chúng tôi mong được phục vụ bạn.</p>
    <p style="font-size: 16px; margin-bottom: 10px;">Trân trọng,</p>
    <p style="font-size: 16px; margin-bottom: 10px;">Love Travel</p>
    </div>
    <images src=""/>
    `,
    
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
}))

module.exports = router;