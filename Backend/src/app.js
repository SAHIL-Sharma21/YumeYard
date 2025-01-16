//making our server here
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

//using express builtin middlewares.
app.use(express.json({ limit: "10mb" }));
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));

//here we will make routes
import userRouter from './routes/user.routes.js';
app.use("/api/v1/users", userRouter); //using user route as middleware.

//using post router here
import postRouter from "./routes/post.routes.js"
app.use("/api/v1/posts", postRouter);

//comment router
import commentRouter from './routes/comment.routes.js'
app.use("/api/v1/comments", commentRouter);


app.get("/", (req, res) => {
    res.status(200).json({ message: "This is YumeYard home route." });
});

export { app };