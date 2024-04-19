//make user controller for register login, password reset, update his profile

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import { requestHandler } from '../utils/requestHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { cloudinaryLink } from '../utils/uploadOnCloudinary.js'


//making controller for register a user or create a user
const registerUser = requestHandler(async (req, res) => {
    const { email, name, username, password } = req.body;

    //check the field are not empty
    if ([email, name, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are requied!");
    }

    //checking if the user already registered
    const existedUser = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    email: email
                },
                {
                    username: username
                }
            ]
        }
    });

    if (existedUser) {
        throw new ApiError(401, "User Already registered!");
    }

    //checking if the file is ther on req or not by using multer middleware.
    const avatarLocalPath = req.file?.url;
    //if user has provide file then we will upload otherise not 
    if (avatarLocalPath) {
        const uploadMsg = await cloudinaryLink(avatarLocalPath);
        console.log(`file uploaded successfully!, ${uploadMsg}`);
    }

    //logic foe hasing password before savinf in the database.





});

export { registerUser };