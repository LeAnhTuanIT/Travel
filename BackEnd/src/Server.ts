import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
// import { Server } from "socket.io";

const ConnectDatabase = require("./data/Connection.data");

dotenv.config({
  path: "./config/.env",
});

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const router = require("./router/Router.router");

app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://travellove.local",
      "https://www.facebo",
    ],
    // origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

ConnectDatabase();
app.use(router);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
