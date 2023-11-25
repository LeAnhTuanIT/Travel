import express, { Request, Response, NextFunction } from "express";
import asyncMiddleware from "../middleware/CatchAsyncError.middleware";
import ErrorHandler from "../utils/ErrorHandler.utils";
import Tour from "../model/Tour.model";
import User from "../model/User.model";
import Blog from "../model/Blog.model";
import {upload} from "../utils/Multer.utils";

const router = express.Router();

router.post("/create-blog",upload.array("Images"), asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    try {
        const blogdata = req.body;
        const files = req.files;
        const ImagesUrl = files.map((file: {location: any}) => {
            return file.location;
        });

        const userId = req.params.userId;
        const tourId = req.params.tourId;
        

        const user = await User.findOne({userId});

        const tour = await Tour.findOne({tourId});

        const BlogData = {
            title: blogdata.title,
            description: blogdata.description,
            content: blogdata.content,
            user: user,
            images: ImagesUrl,
            tour: tour,
        }
        console.log(blogdata)
        const createReview = await Blog.create(BlogData);


        if(!createReview) {
            res.status(500).json({
                success: false,
                message: "error comment",
            })

        }

        res.status(201).json({
            success: true,
            message: "Review summited",
            data: BlogData
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
}))


module.exports = router;