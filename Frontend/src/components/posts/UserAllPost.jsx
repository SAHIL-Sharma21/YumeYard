//user all posts here.

import { useEffect, useState } from "react"
import Navbar from "../Navbar"
import axios from "axios";
import useAuth from "@/utlis/useAuth";

const UserAllPost = () => {
    const {accessToken} = useAuth();
     const [userPosts, setUserPosts] = useState([]);
    

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


  return (
    <>
      <div className=" bg-gradient-to-r from-gray-800 to-gray-900">
         <Navbar />
         <div>
            {/* <h1 className="text-white">user all posts {userPosts[0].postId} </h1> */}
         </div>
      </div>
    </>
  )
}

export default UserAllPost