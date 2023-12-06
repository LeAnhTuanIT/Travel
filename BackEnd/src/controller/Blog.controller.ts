import express, { Request, Response, NextFunction } from "express";
import asyncMiddleware from "../middleware/CatchAsyncError.middleware";
import ErrorHandler from "../utils/ErrorHandler.utils";
import Tour from "../model/Tour.model";
import User from "../model/User.model";
import Blog from "../model/Blog.model";
import {upload} from "../utils/Multer.utils";

const router = express.Router();

router.post("/create-blog",upload.array("images"), asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    try {
        const blogdata = req.body;
        const files = req.files;
        const ImagesUrl = files.map((file: {location: any}) => {
            return file.location;
        });

        const userId = req.params.userId;
        const user = await User.findOne({userId});
        const BlogData = {
            title: blogdata.title,
            description: blogdata.description,
            content: blogdata.content,
            user: user,
            images: ImagesUrl,
            status: '1',
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
            blog: createReview
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
}))


// Post blog 
router.put("/update-blog",upload.array("images"), asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    const blogId = req.params.id;
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const blog = await Blog.findById(blogId);
    if(!blog) {
        res.status(404).json({
            success: false,
            message: "Blog not found",
        })
    }
    else {
        const blogData = {
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            user: user,
            images: req.body.images,
        }
        const updateBlog = await Blog.findByIdAndUpdate(blogId, blogData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })
        res.status(200).json({
            success: true,
            message: "Blog updated",
            blog: updateBlog,
        })
    }
   
}))

router.delete("/delete-blog/:id", asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {

    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if(!blog) {
        res.status(404).json({
            success: false,
            message: "Blog not found",
        })
    }
    else {
        await blog.deleteOne(blogId);
        res.status(200).json({
            success: true,
            message: "Blog deleted",
        })
    }
   
}))



// Get blog by id
router.get("/get-blog/:id", asyncMiddleware(async (req: any, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const blog = (await Blog.findById({_id: id}).populate({
            path: "reviews",
            options: { strictPopulate: false },
          }));
        if(!blog) {
            res.status(404).json({
                success: false,
                message: "Blog not found",
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "get blog",
                blog: blog,
            })
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
}))

// Get all blog
router.get("/get-all-blog", asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = (await Blog.find({}).populate({
            path: "reviews",
            options: { strictPopulate: false },
          }));
        res.status(200).json({
            success: true,
            message: "get blog",
            blogs: blogs,
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
}))

router.put(
    '/paid/:id',
    asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;
        console.log(id);
  
        const blog = await Blog.findByIdAndUpdate({ _id: id },
            {
              status: '2',
            }
          );
  
        console.log(blog);
        res.status(200).json({
          success: true,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    })
  );
  
  router.put(
    '/cancel/:id',
    asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;
        console.log(id);
  
        const blog = await Blog.findByIdAndUpdate({ _id: id },
          {
            status: '0',
          }
        );
  
        console.log(blog);
        res.status(200).json({
          success: true,
        });
      } catch(error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    })
  );




module.exports = router;