import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";

const ConnectDatabase = require("./data/Connection.data");

dotenv.config({
    path:"./config/.env"
})

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const router = require("./router/Router.router");

app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());
app.use(cors({
    credentials: true,
}));


ConnectDatabase();
app.use(router);

server.listen(port,() => {
    console.log(`Server running on http://localhost:${port}`);
});
