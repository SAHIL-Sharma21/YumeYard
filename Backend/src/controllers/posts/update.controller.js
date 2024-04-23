//writing update post contoller
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import { requestHandler } from '../../utils/requestHandler.js'
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { cloudinaryLink } from "../../utils/uploadOnCloudinary.js"


//update a single post by post id

const updatePost = requestHandler(async (req, res) => {

    //taking the post id from the params to update the post
    const { postId } = req.params;

    //we need to take title and description from the user in body;
    const { newTitle, newDescription } = req.body;

    if (!postId) {
        throw new ApiError(400, "PostId is required to update the post");
    }

    if (!newTitle && !newDescription) {
        throw new ApiError(401, "title or descripttion is required to update the post.");
    }

    const title = newTitle.trim();
    const description = newDescription.trim();

    //checking if the user has given empty string.we dont want to store the empty string in the db.
    if (title === "" || description === "") {
        throw new ApiError(400, "Title and description cannot be empty!");
    }
    //check the valid user only the owner can update the post
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized request.");
    }

    //if every check is done the the user can update the post
    try {
        const updatedPost = await prisma.post.update({
            where: {
                postId,
                authorId: userId,
            },
            data: {
                title: title,
                description: description,
            }
        });

        if (!updatedPost) {
            throw new ApiError(500, "Error while updating the post!");
        }

        //return the response
        return res
            .status(200)
            .json(new ApiResponse(200, updatedPost, "Post updated successfully."));
    } catch (error) {
        throw new ApiError(500, error?.message || "Error while updating post or you can not the owner of the post.")
    }
});

//delete the post by postId only the right owner can delete the post
const deletePost = requestHandler(async (req, res) => {
    //taking post id by params
    const { postId } = req.params;

    if (!postId) {
        throw new ApiError(400, "Post Id is required to delete the post!");
    }

    //for the correct owner we need owner id
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized request.");
    }

    // we will check if that post already exist with that post id or not then we will delete\
    const existedPost = await prisma.post.findUnique({
        where: {
            postId,
        }
    });


    if (existedPost === null) {
        throw new ApiError(500, "Post already deleted!");
    }

    //every check is done then delete the post
    try {
        const deletedPost = await prisma.post.delete(
            {
                where: {
                    postId,
                    authorId: userId,
                }
            }
        );

        // console.log(deletedPost);

        if (!deletedPost) {
            throw new ApiError(500, "Error while deleting the post!");
        }

        //return the response,
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Post deleted successfully!"));
    } catch (error) {
        throw new ApiError(500, error?.message || "Error while deleting the post or you are not the owner of the post.")
    }
});


//update postImage or change post Image
const updatePostImage = requestHandler(async (req, res) => {
    //taking postId from the params to update the postImage.
    const { postId } = req.params;

    if (!postId) {
        throw new ApiError(400, "postId is required!");
    }

    //check for the user if he is presnet
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized request!");
    }

    //check for the file which was uploaded by multer middleware
    const imageLoaclpath = req.file?.path;

    //upload on cloudinary
    const updatePostImage = await cloudinaryLink(imageLoaclpath);

    if (!updatePostImage) {
        throw new ApiError(500, "Image Path does not found.");
    }

    //now we will update the database
    try {
        const updatedPostImage = await prisma.post.update(
            {
                where: {
                    postId,
                    authorId: userId
                },
                data: {
                    postImage: updatePostImage?.url,
                }
            }
        );

        if (!updatedPostImage) {
            throw new ApiError(500, "Error while updating image.");
        }

        //return the response to user
        return res
            .status(200)
            .json(new ApiResponse(200, updatedPostImage, "Post Image updated Successfully."));
    } catch (error) {
        throw new ApiError(500, error?.message || "Error while updating image or you are not the correct owner.");
    }
});

//delete the post Image if user want to delete
const deletPostImage = requestHandler(async (req, res) => {
    //taking postid from params
    const { postId } = req.params;

    if (!postId) {
        throw new ApiError(400, "Post Id is required!");
    }

    //taking user for right owner
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "unauthorized Access!");
    }

    //now will delete the post image by finding post
    try {
        const deletedImage = await prisma.post.update(
            {
                where: {
                    postId,
                    authorId: userId
                },
                data: {
                    postImage: null
                }
            }
        );

        if (!deletedImage) {
            throw new ApiError(500, "Error while deleting the image.");
        }

        //retun the response
        return res
            .status(200)
            .json(new ApiResponse(200, deletedImage, "Post Image removed Successfully!"));
    } catch (error) {
        throw new ApiError(500, error?.message || "Error while deleting the post image or you are not thr owner of the post.")
    }
});

export { updatePost, deletePost, updatePostImage, deletPostImage };