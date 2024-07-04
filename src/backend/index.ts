import express, { Request, Response } from "express";
import { errorHandler } from "./src/utils/error.utils";
import cors from "cors";
import cookieParser from "cookie-parser";
import { requireAuthorization } from "./src/utils/auth.utils";
import path from "path";

const { PORT } = process.env || 4001;

// Instantiate an Express Application

const app = express();

const allowedHeaders = "*";
const options: cors.CorsOptions = {
  origin: ["http://localhost:4000", "http://127.0.0.1:4000"],
  methods: "GET, POST, DELETE",
  credentials: true,
  preflightContinue: true,
  exposedHeaders: "*",
  optionsSuccessStatus: 204,
  allowedHeaders,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(options));
app.use(requireAuthorization);

// This middleware adds the json header to every response
app.use("*", (_req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Assign Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Handle errors
app.use(errorHandler);

// Handle not valid route
app.use("*", (_req, res) => {
  res.status(404).json({ status: false, message: "Endpoint Not Found" });
});

// Open Server on configurated Port

app.listen(PORT, () => {
  console.info("Server listening on port ", PORT);
  console.log(`\n
 _                               _                     _ 
(_)                             | |                   | |
 _       _____ _   _ ____   ____| |__  ____  _____  __| |
| |     (____ | | | |  _ \\ / ___)  _ \\|  _ \\(____ |/ _  |
| |_____/ ___ | |_| | | | ( (___| | | | |_| / ___ ( (_| |
|_______)_____|____/|_| |_|\\____)_| |_|  __/\\_____|\\____|
                                      |_|                
`);
});
