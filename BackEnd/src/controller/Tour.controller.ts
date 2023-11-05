import express, { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import Tour from "../model/Tour.model";
import { upload } from "../utils/Multer.utils";
import asyncMiddleware from "../middleware/CatchAsyncError.middleware";
import ErrorHandler from "../utils/ErrorHandler.utils";
import isAuthenticated from "../middleware/Authorization.middleware";

const router = express.Router();
// test API tour
router.get("/test", (_, res: Response) => {
    res.sendStatus(200);
})

// create tour
router.post("/create-tour",upload.array("images"),
  asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    try {
      const files = (req.files as Express.Multer.File[]) || [];
      const imageUrls = files.map((file) => {
          return `${file.filename}`;
      });
      const tourData = req.body;

      tourData.images = req.files?.location;
      tourData.user = req.user;

      console.log(Tour);
      const tour = await Tour.create(tourData);

      res.status(200).json({
          success: true,
          tour,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500))
    }
  }
))

// update tour
router.put("/update-tour",upload.array('images'),
    isAuthenticated, asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
      try {
        const files = req.files as Express.Multer.File[];
        console.log(req.files);
        const imageUrls = files.map((file: Express.Multer.File) => {
          return `${file.filename}`;
        });
  
        const tourData: any = req.body;
  
        const currentTour: any = await Tour.findById(tourData.id)!;
  
        tourData.images = [...imageUrls, ...currentTour.images];
  
        tourData.user = req.user;
  
        const tour = await Tour.updateOne({ _id: tourData.id }, tourData);
  
        res.status(201).json({
          success: true,
          tour,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
));

// delete tour
router.delete("/delete-tour/:id", isAuthenticated, asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
  try {
    const tourId = req.params.id;

    const currentTour: any = await Tour.findOne({id: tourId});
    const deleteTour: any = await Tour.deleteOne(currentTour);

    res.status(200).json({
      success: true,
      deleteTour
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500))
  }  
}));

// get all tour of admin 
router.get("/get-all-tour-admin/:id", asyncMiddleware(async (req:Request, res: Response, next: NextFunction) => {
  try {
    const tours = await Tour.find({userId: req.params.id});

    res.status(201).json({
      success: true,
      tours,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }}
));

// get all tour
router.get("/get-all-tour", asyncMiddleware(async (req:Request, res: Response, next: NextFunction) => {
    try {
      const limit = 48;

      const tours = await Tour.find({}).sort({createAt: -1}).limit(limit);

      res.status(200).json({
        success: true,
        tours,
      })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
}))

// get tour
router.get("/get-tour/:id", asyncMiddleware(async (req:Request, res: Response, next: NextFunction) => {
  try {
    const tour = await Tour.findById(req.params.id);
      res.status(200).json({
        success: true,
        tour
      })
  } catch (error: any) {
      return next(new ErrorHandler(error.message, 500))
  }
}));


// create payment
// router.post("/create-payment-url", function(req: Request, res: Response, next: NextFunction ) {
//   var ipAdr = req.headers["x-forwarded-for"] || req.connection.remoteAddress ||
//   req.socket.remoteAddress


// })



function formatDate(n: number) {
  return (n < 10 ? "0": "") + n;
}

function dateFormatAll(date: Date) {
  let dateFormated = date.getFullYear() + formatDate(date.getMonth()+ 1) + formatDate(date.getDay() + 1) 
  + formatDate(date.getHours()) +  formatDate(date.getMinutes()) + formatDate(date.getSeconds());

  return dateFormated;
}


function dateFormatOrderId (date: Date) {
  let dateFormated = formatDate(date.getHours()) + formatDate(date.getMinutes()) + formatDate(date.getSeconds());
  return dateFormated;
}






module.exports = router;