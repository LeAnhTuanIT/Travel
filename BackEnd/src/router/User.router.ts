import express from "express";

const user = require("../controller/User.controller");
const router = express.Router();

router.use(user);

module.exports = router;