//making comment route here
import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js'

const commentRouter = Router();

//using middleware
commentRouter.use(verifyToken);

//adding comment to post by taking post id
import { addComment, getPostComments } from '../controllers/comments/create.controller.js'
commentRouter.route("/add-comment/:postId").post(addComment);
commentRouter.route("/get-PostComment/:postId").get(getPostComments);

//updating and deleting
import { updateComment } from '../controllers/comments/update.controller.js'
commentRouter.route("/update-comment/:commentId").post(updateComment);
commentRouter.route("/delete-comment/:commentId").delete();


export default commentRouter;