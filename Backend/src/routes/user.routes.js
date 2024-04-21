//creating user routes here.
import { Router } from 'express'
import { upload } from '../middlewares/multer.middleware.js'
import { verifyToken } from '../middlewares/auth.middleware.js'
const userRouter = Router();

// userRouter.route("/").get();
import { registerUser } from '../controllers/user/user.controller.js'
import { userLogin, logoutUser, getCurrentUser } from "../controllers/user/login.controller.js"
import { updateProfile, updateAvatar, changeUserPassword, refreshAccessToken } from '../controllers/user/update.controller.js'
import { getUserPost, getUserComment } from '../controllers/user/getUser.controller.js';
userRouter.route("/register").post(upload.single("avatar"), registerUser); //route to register a user
userRouter.route("/login").post(userLogin);
userRouter.route("/refresh-accesstoken").post(refreshAccessToken);

//these are protected route verifying jwt token
userRouter.route("/logout").post(verifyToken, logoutUser);
userRouter.route("/get-currentUser").get(verifyToken, getCurrentUser);
userRouter.route("/update-profile").patch(verifyToken, updateProfile);
userRouter.route("/update-avatar").patch(verifyToken, upload.single("avatar"), updateAvatar);
userRouter.route("/change-password").patch(verifyToken, changeUserPassword)

//TODO:
//endpoint for get users post
//get user all posts
userRouter.route("/user-posts").get(verifyToken, getUserPost);
//emdpoint for get user comments
userRouter.route("/user-comments").get(verifyToken, getUserComment);

export default userRouter;