//making comment component it will show comment for a single video

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import useAuth from "@/utlis/useAuth";
import axios from "axios";
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { Trash2 } from 'lucide-react';

const PostComments = ({postId}) => {

    const {handleSubmit ,reset, register, formState:{errors}} = useForm();
    const {accessToken, currentUser} = useAuth();
    const [comment, setComment] = useState([]);
    const [totalComment, setTotalComment] = useState(0);

    const fetchComments = async(postId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/comments/get-PostComment/${postId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(response.data.data);
            setComment(response.data.data.comments);
            setTotalComment(response.data.data.totalComment);
        } catch (error) {
            console.log(`Error while fetching comments or zero comments ${error}`);
        }
    }

    console.log(totalComment);
    //fetching all comments for this posts
    useEffect(() => {
        fetchComments(postId);
    }, [postId ,accessToken]); //dependency will be on postId as the post id changes the fetch call again happen

//handle add comment
const addComment = async(data) => {
    console.log(data);

    //add post request
    const response = await axios.post(`http://localhost:8080/api/v1/comments/add-comment/${postId}`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if(response.data.statusCode === 200) {
        fetchComments(postId);
    }
    reset();
}

//deleting comment logic
const deleteComment  = async(commentId) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/comments/delete-comment/${commentId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if(response.data.statusCode === 200) {
            fetchComments(postId);
        }
    } catch (error) {
        console.log(`Error while deleting the post, ${error}`);
    }
}

    return (
        <>
        <div className="flex flex-row justify-between items-end my-4 py-4">
            <form onSubmit={handleSubmit(addComment)} className="sm:w-3/4">
                <input className={`mt-1 p-2 border min-w-full border-gray-800 rounded-sm  focus:border-blue-500 ${errors.email && 'border-red-500'}`} 
                placeholder="Add Comment" type="text" name="content" {...register('content', {required: true})}
                aria-invalid={errors.content ? "true" : "false"}
                />
                {errors.content?.type === 'required' && <span className="text-white my-2">content is required</span>}
            </form>
            <Button  variant="destructive" onClick={handleSubmit(addComment)}>Add Comment</Button>
        </div>
        {comment && <h1 className="text-white text-4xl my-3">Total Comment:{totalComment}</h1>}
        <div className="flex flex-col gap-3 mb-3">
            {comment.length > 0 && comment.map((comment) => (
                <div key={comment.commentId}>
                    <div className="bg-rose-500 p-4 text-white rounded-md flex flex-row justify-between">
                        <div>
                            <p className="ml-4 text-black text-sm"> <span className="text-white font-normal text-base">UserId</span>: {comment.authorId}</p>
                            <h1 className="text-white ml-4 text-xl font-medium ">{comment.content}</h1>
                        </div>
                        {/* current user se uski id ko compare krr rahe hai comment ke author id se tb button show kreag wrna nhi  */}
                        {currentUser && currentUser.id === comment.authorId && 
                            <Button className="bg-white hover:bg-red-300" size="icon" onClick={()=>deleteComment(comment.commentId)}>
                               <Trash2  className="text-black"/>
                           </Button>
                        } 
                    </div>   
                </div>
            ))}
        </div>    
    </>
    )
}

PostComments.propTypes = {
    postId: PropTypes.string.isRequired,
};

export default PostComments;