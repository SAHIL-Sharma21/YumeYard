//making post controller here 
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { requestHandler } from "../../utils/requestHandler.js"
import { cloudinaryLink } from "../../utils/uploadOnCloudinary.js"


const createPost = requestHandler(async (req, res) => {
    //taking post details from body
    const { title, description } = req.body;

    //check if these are not given
    if (!title || !description) {
        throw new ApiError(400, "Title and Description are required filed");
    }

    //now check if the user is there then he can only post the user who is logfed it
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized user. please login");
    }

    //checking for the postImage which will be given by multer middleware
    const postImageLocal = req.file?.path;

    //upload on cloudinary
    const postImageUrl = await cloudinaryLink(postImageLocal);

    if (!postImageUrl) {
        throw new ApiError(400, "Post Image is required.");
    }

    //now create the post
    const postCreated = await prisma.post.create(
        {
            data: {
                title,
                description,
                postImage: postImageUrl?.url,
                authorId: userId
            }
        }
    );

    if (!postCreated) {
        throw new ApiError(500, "Error while creating post!");
    }
    return res
        .status(201)
        .json(new ApiResponse(200, postCreated, "Post created successfully!"));
});

//get a user post by postid
const getSinglePost = requestHandler(async (req, res) => {
    //we will get the postId from the params
    const { postId } = req.params;

    if (!postId) {
        throw new ApiError(401, "Post Id is required to get the user post.");
    }
    //check for user if he is login or not
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "You are not authorized!");
    }

    //finding the post by its id
    const getPost = await prisma.post.findUnique(
        {
            where: {
                postId,
                // authorId: userId, // we have to remove this as any user can see the single post ->> i got issue in frontend.
            },
        }
    );

    if (!getPost) {
        throw new ApiError(500, "Error while getting post.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, getPost, "Post fetched successfully"));
});

//get all published post
const getAllPosts = requestHandler(async (req, res) => {
    //find the user for authorization
    //taing page number and page size to skip the paghes and showing min numbers ofv record
    const { pageNumber = 1, pageSize = 10 } = req.query; //my mistake have to take from query.

    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "You are not authorized!");
    }

    //converting to number as it can come in strings also
    const pageNum = parseInt(pageNumber);
    const pageSi = parseInt(pageSize);

    //findind the posts which are published
    //todo implement skip and page limit functionality
    const allPosts = await prisma.post.findMany(
        {
            where: {
                published: true
            },
            take: pageSi, // will give value till 10 post per page
            // skip: (pageNum - 1) * pageSi,
        }
    );

    if (!allPosts) {
        throw new ApiError(500, "Error while fetching all posts!");
    }

    //if all post were unpublished 
    if (allPosts?.length === 0) {
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "All posts are Unpublished."));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, allPosts, "All post are fetched!"));
});


const togglePost = requestHandler(async (req, res) => {
    const { postId } = req.params;

    //getting the user
    const userId = req.user?.id;

    //finding the post by the post id
    const gettingPost = await prisma.post.findUnique(
        {
            where: {
                postId,
                authorId: userId,
            }
        }
    );

    //toggline the publisheed status
    try {
        const toggleStatus = await prisma.post.update({
            where: {
                postId,
                authorId: userId,
            },
            data: {
                published: !gettingPost?.published,
            }
        });

        if (!toggleStatus) {
            throw new ApiError(500, "Error while toggling status.");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, toggleStatus, "Toggling the publish field successfull."))
    } catch (error) {
        throw new ApiError(500, error?.message || "you cannot publish the status.")
    }
});

export { createPost, getSinglePost, getAllPosts, togglePost };