import express, { NextFunction, Request, Response } from "express";
import Tour from "../model/Tour.model";
import User from "../model/User.model";
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
      const {name, country, description, destination, aim, price, sold_out, userId} = req.body;
      const files = req.files;
      const ImagesUrl = files.map((file: {location: any}) => {
        return file.location;
      })
      const user = await User.findOne({userId});
      const tourData = {
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
      

      console.log(tourData);
      const Createtour = await Tour.create(tourData);

      res.status(200).json({
          success: true,
          Createtour,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500))
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
      return next(new ErrorHandler(error.message, 500));
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
    return next(new ErrorHandler(error.message, 500))
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

module.exports = router;