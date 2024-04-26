// import useAuth from "@/utlis/useAuth"
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {Separator} from '@/components/ui/separator'
import axios from "axios";
import useAuth from "@/utlis/useAuth";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

//here we will show all the post to users

const Home = () => {
// const navigate = useNavigate();
  // const profilePage = () => {
  //   navigate("custom-domain");
  // }
  const navigate = useNavigate();
  const {accessToken} = useAuth();
  const [allPosts, setAllPosts] = useState([]);

   const fetchAllPost = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/posts/all-posts', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setAllPosts(response.data.data);// use spread operator and spread previous allposts 

    } catch (error) {
      console.log("Error while fetching data.", error);
    }
}
//calling the methoid
  //fetching all posts here
  useEffect(() => {
    fetchAllPost();
  }, [accessToken]);

  console.log(allPosts);

  return (
    <>
        <Navbar />
        <div className=" mt-5"> 
          <div className="md:w-[80%] mx-auto rounded-md flex flex-col md:h-auto mb-6 items-center bg-gradient-to-t  from-gray-800 to-gray-900">
            <h1 className="text-center font-bold text-3xl my-2 text-white">All Posts</h1>
            <Separator className="my-4 md:w-[80%]" />
            <div className="mx-10 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-x-4">
                {allPosts && allPosts.map((post) => (
                  <div key={post.postId} className="bg-rose-500 rounded-md p-2 mb-4"> 
                    <img
                    src={post.postImage}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-md"
                    />
                    <div className="flex flex-row justify-between items-center my-4">
                      <h2 className="text-lg text-white font-semibold mt-2">{post.title}</h2>
                      <Button onClick={() => navigate(`post/${post.postId}`)}>View post</Button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-end mx-10 mb-5">
              <Button onClick={fetchAllPost} className="my-3">Refresh Post</Button>
            </div>
          </div>

        </div>
    </>
  )
}

export default Home;