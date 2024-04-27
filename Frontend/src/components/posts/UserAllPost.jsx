//user all posts here.

import { useEffect, useState } from "react"
import Navbar from "../Navbar"
import axios from "axios";
import useAuth from "@/utlis/useAuth";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Trash2, Pencil, ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const UserAllPost = () => {
    const {accessToken} = useAuth();
     const [userPosts, setUserPosts] = useState([]);
     const [editMode, setEditMode] = useState("");
    const {register, handleSubmit, reset} = useForm();
    const navigate = useNavigate();

    const fetchUserAllposts = async() => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/users/user-posts', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setUserPosts(response.data.data.posts);
            console.log(response.data.data);
        } catch (error) {
            console.log(`Error while fetching user all posts, ${error}`);
        }
    }

     useEffect(() => {
       fetchUserAllposts();
     }, [accessToken]);

     const handleEditPost = (postId, title, description) => {
        setEditMode(postId);
        reset({ title, description }); 
    };

    //handeling save edit
    const handleSaveEdit = async(data) => {

        
       try {
        const response = await axios.patch(`http://localhost:8080/api/v1/posts/update/${editMode}`, {
            newTitle: data.title, //bug was here.
            newDescription: data.description
         }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
         });

         setUserPosts(prevPosts => prevPosts.map(post => {
            if (post.postId === editMode) {
                return {
                    ...post,
                    title: data.title,
                    description: data.description
                };
            }
            return post;
        }));

         setEditMode(null);
         console.log(`Post with id ${editMode} edited successfully:`, response.data);
       } catch (error) {
        console.log(`Error while updating the post. ${error}`);
       }
    }

    const handleCancelEdit = () => {
        setEditMode(null); // Exit edit mode
    };

    
    const handleDeletePost = async (postId) => {
        // Same delete post logic as before...
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/posts/delete/${postId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(response.data);
            if(response.data.statusCode === 200){
                fetchUserAllposts();
            }
        } catch (error) {
            console.log(`Error while deleting the post, ${error}`);
        }
    };

  return (
    <>
      <div className=" h-screen bg-gradient-to-r from-gray-800 to-gray-900">
         <Navbar />
         <div className="md:w-[80%] mx-auto my-10">
                <Button onClick={() => navigate("/home")} className="flex justify-center hover:bg-gray-400" variant="outline" size="icon">
                    <ChevronLeft className="h-5 w-5"/>
                </Button>
            </div>
         <div className="container mb-3 p-4 mx-auto mt-5">
            <h1 className="text-white text-2xl font-bold mb-4">Your Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userPosts && userPosts.map((post) => (
                    <div key={post.postId} className="bg-white rounded-md shadow-md p-4">
                        {editMode === post.postId ? (
                            <form onSubmit={handleSubmit(handleSaveEdit)}>
                                <div>
                                    <label htmlFor="title">Title</label>
                                    <input className="mb-2 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500"
                                    id="title" type="text" {...register("title", {required: true})} defaultValue={post.title}/>
                                </div>
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <textarea className="mb-2 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500"
                                    id="description" rows="4" {...register("description", {required: true})}  defaultValue={post.description}/>
                                </div>
                                <div>
                                    <Button type="submit" className="mr-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none">Save</Button>
                                    <Button type="button" onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none">
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <>
                              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                              <p className="text-gray-700 mb-4">{post.description}</p>
                              <div className="flex justify-end space-x-2">
                                 <Button className="text-blue-500 hover:text-blue-700 focus:outline-none"onClick={() => handleEditPost(post.postId, post.title, post.description)}>
                                    <Pencil size={20}/>
                                </Button>
                                <Button className="text-red-500 hover:text-red-700 focus:outline-none" onClick={() => handleDeletePost(post.postId)}>
                                    <Trash2 size={20}/>
                                </Button>
                              </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
         </div>
      </div>
    </>
  )
}

export default UserAllPost