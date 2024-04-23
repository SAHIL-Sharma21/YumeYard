//writing update and delete a comment functionality.
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import { requestHandler } from '../../utils/requestHandler.js'
import { ApiError } from '../../utils/ApiError.js'
import { ApiResponse } from '../../utils/ApiResponse.js'


const updateComment = requestHandler(async (req, res) => {
    // we will update a comment by the comment id and id we will take from params
    const { commentId } = req.params;

    //taking a content from the body.
    const { newContent } = req.body;

    const content = newContent.trim();

    if (!commentId || !content || content === "") {
        throw new ApiError(400, "Comment ID and content are required and content cannot be empty");
    }

    //checking user
    const userId = req.user?.id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized user!")
    }

    //now we will update the comment who is right owner.
    try {
        //update the db find the unique comment by id and right owner
        const updatedComment = await prisma.comment.update(
            {
                where: {
                    commentId,
                    authorId: userId
                },
                data: {
                    content
                }
            }
        );
        //return a response.
        return res
            .status(200)
            .json(new ApiResponse(200, updatedComment, "Comment updated successfully!"));
    } catch (error) {
        throw new ApiError(500, error?.message || "Error while updating comment!");
    }
});

//delete a comment when the user is logged in adnright owner ca delete the comment
const deleteComment = requestHandler(async (req, res) => {
    //we need comment id for deleting the comment
    const { commentId } = req.params;

    if (!commentId) {
        throw new ApiError(400, "Comment id is required to delete the comment.");
    }

    //only a comment owner can delete the comment
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized user");
    }

    console.log(userId);
    // delte ther comment
    try {
        //delete the comment
        await prisma.comment.delete({
            where: {
                commentId,
                authorId: userId
            }
        });

        //retun the response
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Comment deleted successfully"));
    } catch (error) {
        throw new ApiError(500, error?.message || "Error while deleting the comment.");
    }
});

export { updateComment, deleteComment };