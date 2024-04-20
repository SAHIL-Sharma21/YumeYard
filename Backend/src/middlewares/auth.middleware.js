//making auth middleware for checking access token its like protected route

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import { requestHandler } from '../utils/requestHandler.js'
import { ApiError } from "../utils/ApiError.js"
import jwt from 'jsonwebtoken';



const verifyToken = requestHandler(async (req, res, next) => {

    try {
        //take the token from the cookies or headers
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        //if we did not get token then throw the error
        if (!token) {
            throw new ApiError(401, "You are not authorized");
        }

        //we will decode the token and get the user in formation
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //finding user form that decode token
        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken?.userID,
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
        if (!user) {
            throw new ApiError(401, "Invalid access Token");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid access token!");
    }
});


export { verifyToken };