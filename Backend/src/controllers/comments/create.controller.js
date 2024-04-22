//creating comment on a user posts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import { requestHandler } from '../../utils/requestHandler.js'
import { ApiError } from '../../utils/ApiError.js'
import { ApiResponse } from '../../utils/ApiResponse.js'



//creating a comment
//controller for adding comment on a post.
const addComment = requestHandler(async (req, res) => {

    //taking postId from the params to add comment on as specific post
    const { postId } = req.params;

    //we will be taking content for adding comment from the body
    const { content } = req.body;

    const inputContent = content.trim();

    if (!postId || !inputContent) {
        throw new ApiError(400, "PostId and Content are required to comment");
    }

    //taing user who is commenting from the req.user object
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized user.")
    }
    //finding post by postid and check if the post is published or not
    const post = await prisma.post.findUnique(
        {
            where: {
                postId,
            },
            select: {
                published: true
            }
        }
    );

    //checking if post is available or post is published then user can comment and is post contain the right author
    if (!post || post?.published !== true) {
        throw new ApiError(401, "You cannot comment on this post as this post is not published.")
    }

    try {
        //adding comment on the post
        const commentAdded = await prisma.comment.create(
            {
                data: {
                    content: inputContent,
                    authorId: userId,
                    postId: postId,
                }
            }
        );

        //retun the comment added
        return res
            .status(201)
            .json(new ApiResponse(200, commentAdded, "Comment added to post"));

    } catch (error) {
        throw new ApiError(500, "Error while adding a comment to a post!");
    }
});

//get post comments
const getPostComments = requestHandler(async (req, res) => {
    //getting all comments of a post
    const { postId } = req.params;

    if (!postId) {
        throw new ApiError(400, "Post Id is required!");
    }

    //checking for the user
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized request!");
    }

    //finding coments on post model
    try {
        // const postComments = await prisma.post.findMany(
        //     {
        //         where: {
        //             postId,
        //         },
        //         include: {
        //             comment: true,
        //         }
        //     }
        // // );
        // if (!postComments || postComments.length === 0) {
        //     throw new ApiError(500, "Error while getting post comments or post has zero comments.");
        // }
        // const totalComment = postComments[0].comment.length;
        // //making output object
        // const totalPostComment = {
        //     postId: postComments[0].postId,
        //     title: postComments[0].title,
        //     description: postComments[0].description,
        //     authorId: postComments[0].authorId,
        //     totalComment: totalComment,
        //     comment: {
        //         commentId: postComments[0]?.comment[0]?.commentId,
        //         content: postComments[0]?.comment[0]?.content,
        //         createdAt: postComments[0]?.comment[0]?.createdAt,
        //         updatedAt: postComments[0]?.comment[0]?.updatedAt
        //     },
        // }
        // console.log(totalPostComment);

        //another approach
        const postComments = await prisma.post.findUnique(
            {
                where: {
                    postId,
                },
                include: {
                    comment: true
                }
            }
        );

        if (!postComments) {
            throw new ApiError(500, "Error while getting post Coments or post has zero coments")
        }

        //destructing the properties
        const { title, description, authorId, comment } = postComments;
        //comment is an array so we are calculating the length to get total comment count.
        const totalComment = comment.length;

        //makingobject to send it response
        const totalPostComments = {
            post_id: postId,
            title,
            description,
            authorId,
            totalComment,
            comments: comment.map(({ commentId, content, createdAt, updatedAt }) => ({
                commentId,
                content,
                createdAt,
                updatedAt
            })),
        }
        //using aggregation : below method only give count of the total comments
        // const totalComments = await prisma.comment.count(
        //     {
        //         where: {
        //             postId,
        //         }
        //     }
        // );
        return res
            .status(200)
            .json(new ApiResponse(200, totalPostComments, "Fetched posts all comments!"))

    } catch (error) {
        throw new ApiError(500, error?.message || "Error while fetching data.")
    }
});

export { addComment, getPostComments };