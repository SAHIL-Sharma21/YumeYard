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

    console.log(existedUser);
    //if user is not in our service then we send him to register first.
    if (!existedUser) {
        throw new ApiError(401, "Please register first and then login");
    }

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
                    updatedUser,
                    refreshToken
                }
            },
            "User Logged In successfully!"
        ))
});


export { userLogin };