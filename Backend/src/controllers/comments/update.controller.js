//writing update and delete a comment functionality.
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import { requestHandler } from '../../utils/requestHandler.js'
import { ApiError } from '../../utils/ApiError.js'
import { ApiResponse } from '../../utils/ApiResponse.js'


const updateComment = requestHandler(async (req, res) => {
    // we will update a comment by the comment id and id we will take from params
    const { commentId } = req.params;

    if (!commentId) {
        throw new ApiError(400, "Comment ID is required!");
    }

    console.log(commentId);
});

export { updateComment };