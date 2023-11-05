import express from "express";

const payment = require("../controller/Payment.conroller");
const router = express.Router();

router.use(payment);

module.exports = router;