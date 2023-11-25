import express from "express";

const blog = require("../controller/Blog.controller");
const router = express.Router();

router.use(blog);
router.get("/test", (_, res) => {
    res.sendStatus(200);
    }
);


module.exports = router;