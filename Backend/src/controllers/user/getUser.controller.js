//getting user post and comment

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import { requestHandler } from "../../utils/requestHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"

const getUserPost = requestHandler(async (req, res) => {
    //we will get the id from req.user as we are using verify middleware
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "You are not authorized.");
    }

    //finding the user feom the user id
    const userData = await prisma.user.findUnique(
        {
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true
            }
        }
    );
    const userPost = await prisma.post.findMany(
        {
            where: {
                authorId: userId,
            },
            //in future we have write include for the specific field to send as a response.
        }
    );

    //by using aggregation or group by
    // const postCount = await prisma.post.groupBy(
    //     {
    //         by: ['authorId'],
    //         _count: {
    //             postId: true
    //         }
    //     }
    // );
    // console.log(postCount);

    //total count of the users posts
    const totalPosts = userPost.length;

    //spreading the userData obj and writing 2 properties for total count andpost
    const userPosts = {
        ...userData,
        posts: userPost,
        totalPosts
    }

    if (!userPosts) {
        throw new ApiError(500, "Error while getting user posts");
    }

    //if post length is zero then user has zero post 
    if (userPosts?.posts?.length === 0) {
        return res
            .status(200)
            .json(new ApiResponse(200, userPosts, "User Did not upload any posts yet."))
    } else {
        return res
            .status(200)
            .json(new ApiResponse(200, userPosts, "Users all post fetched."))
    }
});

//get user all comment
const getUserComment = requestHandler(async (req, res) => {

    //taking userId from request user obj by middleware
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unautorized access");
    }


    //find the user and its relared post
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            email: true,
            name: true,
            username: true
        }
    });

    const comment = await prisma.comment.findMany(
        {
            where: {
                authorId: userId
            },
            //in future we have write include for the specific field to send as a response.
        }
    );

    //findingcomment count
    const totalComents = comment.length;

    const userAllComents = {
        ...user,
        comment,
        totalComents
    }

    if (!userAllComents) {
        throw new ApiError(500, "Error while fetching all comments");
    }

    if (userAllComents.comment.length === 0) {
        return res
            .status(200)
            .json(new ApiResponse(200, userAllComents, "User did not comment on any posts."));
    } else {
        return res
            .status(200)
            .json(new ApiResponse(200, userAllComents, "Fetched all user comments successfully"));
    }
});


export { getUserPost, getUserComment };