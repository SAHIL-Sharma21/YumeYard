//making user login controller here.

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import { requestHandler } from "../../utils/requestHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js"
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateAccess&RefreshToken.js"



const userLogin = requestHandler(async (req, res) => {
    //for login we need user email and password from request body
    let { email, password } = req.body;

    console.log("email", email);
    console.log("password", password)
    //trimming the value if there are white spaces
    email = email.trim();
    password = password.trim();
    //check if email and password is given or not
    if (!email || !password) {
        throw new ApiError(400, "Email and Password are required to login");
    }

    const existedUser = await prisma.user.findUnique(
        {
            where: {
                email: email
            }
        },

    );

    //if user is not in our service then we send him to register first.
    if (!existedUser) {
        throw new ApiError(401, "Please register first and then login");
    }

    console.log("existed user", existedUser);

    //i have to check the password which is write or not usinf bcrypt;
    const isPasswordCorrect = await bcrypt.compare(password, existedUser.password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Password incorrect.");
    }

    //now password and email is checked then we will genereate the access and refresh token for the user
    const userData = {
        userID: existedUser.id,
        userEmail: existedUser.email,
        username: existedUser.username
    }

    //generating access and refresh token 
    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData.userID);

    //saving refresh troken to database before sending response.
    const tokenAddedToDb = await prisma.user.update({
        where: {
            id: existedUser.id,
        },
        data: {
            refreshToken: refreshToken,
        }
    });

    if (!tokenAddedToDb) {
        throw new ApiError(500, "Error while updating the refresh Token in database.")
    }

    //finding unique and updated user
    const updatedUser = await prisma.user.findUnique(
        {
            where: {
                email: email,
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                refreshToken: true,
                avatar: true,
            }
        }
    );

    if (!updatedUser) {
        throw new ApiError(500, "User did not updated!");
    }

    console.log("updated user", updatedUser)

    const options = {
        httpOnly: true,
        secure: true
    }

    //sending aresponse
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(
            200,
            {
                user: {
                    accessToken,
                    user: updatedUser,
                    refreshToken
                }
            },
            "User Logged In successfully!"
        ))
});


const logoutUser = requestHandler(async (req, res) => {
    //find the user with user id we get user from req.user 

    const userId = req.user?.id;
    // console.log(userId);

    //fnd the user by his id and we will unset the refreshtoken filed in the db and then clear the cookies.
    const logoutUser = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            refreshToken: null
        }
    });

    if (!logoutUser) {
        throw new ApiError(500, "Error while logging out the user.");
    }

    //make the cookie clear
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out succesfully!"))
});

//get currentuser
const getCurrentUser = requestHandler(async (req, res) => {
    //get route to get the current logged in user.
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unaouthrized user.");
    }

    //getting the current user
    const currentUser = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            email: true,
            name: true,
            avatar: true,
            username: true,
            createdAt: true,
            updatedAt: true
        }
    });

    if (!currentUser) {
        throw new ApiError(500, "Error while getting current user!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, currentUser, "Current user fetched successfully!"));
});

export { userLogin, logoutUser, getCurrentUser };