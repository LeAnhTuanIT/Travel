import express, { Request, Response, NextFunction } from "express";
import asyncMiddleware from "../middleware/CatchAsyncError.middleware";
import ErrorHandler from "../utils/ErrorHandler.utils";
import Tour from "../model/Tour.model";
import User from "../model/User.model";
import Review from "../model/Review.model";
import Blog from "../model/Blog.model";

const router = express.Router();

router.post("/create-review-tour", asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    try {
        
        const reviewData = req.body;
        const user = await User.findById(reviewData.userId);
        const tour = await Tour.findById(reviewData.tourId);

        const ReviewData = {
            rating: reviewData.rating,
            comments: reviewData.comments,
            user: user,
        }
        const createReview = await Review.create(ReviewData);

        const SubmitTour = await Tour.findByIdAndUpdate(tour?._id, {
            $push: {reviews: createReview._id}
        })

        console.log(SubmitTour);

        if(!SubmitTour) {
            res.status(500).json({
                success: false,
                message: "error comment",
                data: reviewData
            })

        }
        res.status(201).json({
            success: true,
            message: "Review summited",
            data: SubmitTour
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
}))


router.post("/create-review-blog", asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    try {
        
        const reviewData = req.body;
        const user = await User.findById(reviewData.userId);
        const blog = await Blog.findById(reviewData.blogId);

        const ReviewData = {
            rating: reviewData.rating,
            comments: reviewData.comments,
            user: user,
        }
        const createReview = await Review.create(ReviewData);

        const SubmitBlog = await Blog.findByIdAndUpdate(blog?._id, {
            $push: {reviews: createReview._id}
        })

        console.log(SubmitBlog);

        if(!SubmitBlog) {
            res.status(500).json({
                success: false,
                message: "error comment",
                data: reviewData
            })

        }
        res.status(201).json({
            success: true,
            message: "Review summited",
            data: SubmitBlog
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
}))


router.put("/update-review/:id", asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    try {
        const user_Id = req.params.userId;
        const tour_Id = req.params.tourId;
        const reviewId = req.params.id;
        const {rating, comments} = req.body;
        const reviewData: any = await Review.findOne({_id:reviewId});

        if(user_Id !== reviewData.userId) {
            res.status(403).json({
                success: false,
                message: "User Forbidden"
            })
        }
        else {
            const user = await User.findOne({user_Id});
            console.log(user)
            const tour = await Tour.findOne({tour_Id});

            const reviewUpdate = {
                rating: rating,
                comments: comments,
                user: user,
                tour: tour,
            };

    
            const update = await Review.findByIdAndUpdate({_id: reviewId},reviewUpdate)
            console.log(reviewUpdate)
            res.status(200).json({
                sucess: true,
                message:"updated review",
                data: update,
            });
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

router.delete("/delete-review/:id", asyncMiddleware(async (req:any, res: Response, next: NextFunction) => {
   try {
        const reviewId = req.params.id;
        const currentReview: any = await Review.findOne({reviewId});
        const deleteReview = await Review.deleteOne(currentReview);

        res.status(200).json({
            success: true,
            message: "deleted review",
            data: deleteReview
        })
   } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
   } 
}))


// get all review
router.get("/get-all-reviews", asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = await Review.find({});
        res.status(200).json({
            success: true,
            message: "get all review",
            data: review
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
}))

module.exports = router;