//making comment route here
import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js'

const commentRouter = Router();

//using middleware
commentRouter.use(verifyToken);

//adding comment to post by taking post id
import { addComment, getPostComments, getComment } from '../controllers/comments/create.controller.js'
commentRouter.route("/add-comment/:postId").post(addComment);
commentRouter.route("/get-PostComment/:postId").get(getPostComments);
commentRouter.route("/get-comment/:commentId").get(getComment);

//updating and deleting
import { updateComment, deleteComment } from '../controllers/comments/update.controller.js'
commentRouter.route("/update-comment/:commentId").patch(updateComment);
commentRouter.route("/delete-comment/:commentId").delete(deleteComment);


export default commentRouter;