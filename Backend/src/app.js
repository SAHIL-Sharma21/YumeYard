//making our server here
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

//using express builtin middlewares.
app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));

//here we will make routes
import userRouter from './routes/user.routes.js';
app.use("/api/v1/users", userRouter); //using user route as middleware.


app.get("/", (req, res) => {
    res.status(200).json({ message: "This is YumeYard home route." });
});

export { app };