//writing all posts routes here
import { Router } from "express"
import { upload } from '../middlewares/multer.middleware.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

const postsRouter = Router();

//postsRouter use middleare to authhorize a user and then we can use it this middleare will works on all posts.
postsRouter.use(verifyToken);

//will make all the routes here making CRUD on posts

import { createPost, getSinglePost, getAllPosts } from '../controllers/posts/post.controller.js'
postsRouter.route("/create-post").post(upload.single("postImage"), createPost);
postsRouter.route("/get-post/:postId").get(getSinglePost);
postsRouter.route("/all-posts").get(getAllPosts);

export default postsRouter;