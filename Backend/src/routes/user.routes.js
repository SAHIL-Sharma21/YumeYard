//creating user routes here.
import { Router } from 'express'
import { upload } from '../middlewares/multer.middleware.js'
const userRouter = Router();

// userRouter.route("/").get();
import { registerUser } from '../controllers/user/user.controller.js'
userRouter.route("/register").post(upload.single("avatar"), registerUser); //route to register a user



export default userRouter;