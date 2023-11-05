import express from "express";

const tour = require("../controller/Tour.controller");
const router = express.Router();

router.use(tour);

module.exports = router;