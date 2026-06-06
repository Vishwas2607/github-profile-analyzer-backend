import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import {isDev} from "./api/src/utils/constants.js";
import rateLimit from "express-rate-limit";
import errorHandler from "./api/src/middlewares/errorHandler.js";
import profileRouter from "./api/src/routes/profiles.routes.js";

const app = express();
app.use(helmet());

if(isDev) app.use(morgan('dev'));

app.use(express.json());

const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: isDev ? 1000: 400,
    standardHeaders: true,
    legacyHeaders: true
});

const isTest = process.env.NODE_ENV === "test";

if(!isTest) app.use("/api", limiter);

app.use("/api/profiles", profileRouter);

app.use((req,res,next) => {
    res.status(404).json({message: "Route not found"})
});

app.use(errorHandler);

export default app;