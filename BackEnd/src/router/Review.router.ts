import express from "express";

const review = require("../controller/Review.controller");
const router = express.Router();

router.use(review);


module.exports = router;