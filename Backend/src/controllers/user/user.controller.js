//make user controller for register login, password reset, update his profile

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import { requestHandler } from '../../utils/requestHandler.js'
import { ApiError } from '../../utils/ApiError.js'
import { ApiResponse } from '../../utils/ApiResponse.js'
import { cloudinaryLink } from '../../utils/uploadOnCloudinary.js'
import { hashPassword } from '../../utils/hashPassword.js'


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
    const avatarLocalPath = req.file?.path;
    //if user has provide file then we will upload otherise not 
    const uploadMsg = await cloudinaryLink(avatarLocalPath);

    // //logic for hasing password before savinf in the database.
    const hashedPassword = await hashPassword(password);

    // after every check then we will create the user in database.
    const createdUser = await prisma.user.create({
        data: {
            email,
            name,
            avatar: uploadMsg?.url,
            username: username?.toLowerCase(),
            password: hashedPassword,
        },
        select: {
            id: true,
            email: true,
            avatar: true,
            username: true,
            name: true,
            createdAt: true,
            updatedAt: true
        }
    }); //returing only true field using select method inbuild qury.

    if (!createdUser) {
        throw new ApiError(500, "Error while registering the user!");
    }

    //if user is registered then we will send the response
    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User registered successfully!"));
});

export { registerUser };