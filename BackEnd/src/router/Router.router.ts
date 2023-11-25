import express, {Response} from "express";

const router = express.Router();
const tour = require("../router/Tour.router");
const user = require("../router/User.router");
const payment = require("../router/Payment.router");
const review = require("../router/Review.router");
const blog = require("../router/Blog.router");


router.get("/test", (_, res: Response) => {
    res.sendStatus(200);
})

router.use("/api/v2/user", user);
router.use("/api/v2/tour",tour);
router.use("/api/v2/payment",payment);
router.use("/api/v2/review",review);
router.use("/api/v2/blogs",blog);

module.exports = router;