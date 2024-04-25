//single post by its id

import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {ChevronLeft} from 'lucide-react'
import axios from "axios";
import useAuth from "@/utlis/useAuth";

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
        <div className="h-screen  bg-gradient-to-r from-gray-800 to-gray-900">
            <Navbar />
            <div className="md:w-[80%] mx-auto my-10">
                <Button onClick={() => navigate("/home")} className="flex justify-start" variant="outline" size="icon">
                    <ChevronLeft className="h-5 w-5"/>
                </Button>
            </div>

            <div className="flex flex-row justify-between md:w-[80%] mx-auto items-center">
                <div className="w-[60%] h-[60%] mx-auto bg-white rounded-md">
                    <h1 className="text-black text-4xl font-semibold"> single post {post.title}</h1>
                    {/* todo make tilte and post visible and make one component to add comment  */}
                </div>
            </div>
            <div></div>
        </div>
    </>
  )
}

export default SinglePost