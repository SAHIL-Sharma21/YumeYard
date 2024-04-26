import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {ChevronLeft} from 'lucide-react'
import axios from "axios";
import useAuth from "@/utlis/useAuth";
import PostComments from "./Comment";

const SinglePost = () => {

    //using useParams hooks to fetch the url id
    const {postId} = useParams();
    const {accessToken} = useAuth();
    const navigate = useNavigate();
    const [post, setPost] = useState({});

    console.log(postId);

    //fetching sinle post by its id
    useEffect(() => {
        const fetchSinglePost = async() => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/posts/get-post/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                      }
                });
                setPost(response.data.data);

            } catch (error) {
                console.log(`Error while fetching single post, ${error}`);
            }
        }

        fetchSinglePost();
    }, [accessToken]);

  return (
    <>
        <div className="bg-gradient-to-r from-gray-800 to-gray-900">
            <Navbar />
            <div className="md:w-[80%] mx-auto my-10">
                <Button onClick={() => navigate("/home")} className="flex justify-start" variant="outline" size="icon">
                    <ChevronLeft className="h-5 w-5"/>
                </Button>
            </div>

            <div className="flex flex-row justify-between md:w-[85%] mx-auto items-center">
                <div className="w-[75%]  mx-auto mb-4 bg-white rounded-md">
                    <h1 className="text-black text-4xl mt-2 text-center p-4 font-semibold">{post.title}</h1>
                    {/* todo make tilte and post visible and make one component to add comment  */}
                    <div className="sm:p-4 sm:w-full h-[40%] ">
                         {post && post.postImage ? <img src={post.postImage} className="w-full  max-h-[500px]" /> : <h2>No Post image</h2>}
                    </div>
                    <div className="p-2 mb-3">
                        {post && post.description ? <p className="text-xl font-medium">{post.description}</p> : <p>No description</p>}
                    </div>
                </div>
            </div>
            {/* comment section  */}
            <div className="md:w-[80%] mx-auto mt-10 pb-5">
                <PostComments postId={post.postId} />
            </div>
            
            <div></div>
        </div>
    </>
  )
}

export default SinglePost