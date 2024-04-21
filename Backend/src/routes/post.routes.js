//writing all posts routes here
import { Router } from "express"
import { upload } from '../middlewares/multer.middleware.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

const postsRouter = Router();

//postsRouter use middleare to authhorize a user and then we can use it this middleare will works on all posts.
postsRouter.use(verifyToken);

//will make all the routes here making CRUD on posts


export default postsRouter;