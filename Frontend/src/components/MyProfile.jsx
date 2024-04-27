import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import { ChevronLeft} from 'lucide-react'
import useAuth from "@/utlis/useAuth";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

//making userPersonal profile.
const MyProfile = () => {

    const navigate = useNavigate();
    const {currentUser, setCurrentUser, accessToken} = useAuth();
    const [editing, setEditing] = useState(false);
    const {register, handleSubmit} = useForm();


    //handling edit functionality
    const updateProfile = async(data) => {
        try {
            const response = await axios.patch(`http://localhost:8080/api/v1/users/update-profile`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if(response.data.statusCode === 200) {
                setCurrentUser({...currentUser, ...data});
                setEditing(false);
            }
            console.log(response.data);
        } catch (error) {
            console.log(`Error while updating post ${error}`);
        }
    }

    return(

        <>
            <div className="h-screen bg-gradient-to-r from-gray-800 to-gray-900">
              <Navbar />
                <div className="md:w-[80%] mx-auto my-10 ">
                    <Button onClick={() => navigate("/home")} className="flex justify-center hover:bg-gray-400" variant="outline" size="icon">
                        <ChevronLeft className="h-5 w-5"/>
                    </Button>
                </div>
                <div className="md:w-[80%] mx-auto mt-4 mb-10 flex flex-col items-center">
                    <div className="bg-white w-[60%] rounded-t-md">
                        <div className="px-4 py-2">
                            <h1 className="text-4xl">Account details</h1>
                        </div>
                    </div>
                        {!editing ? (
                            <>
                            <div className="bg-white w-[60%] rounded-b-md ">
                                <div className="px-4 py-2">
                                    <h1 className="text-lg font-medium">Profile pic</h1>
                                    <Avatar>
                                        <AvatarImage src={currentUser.avatar}/>
                                    </Avatar>
                                </div>
                                <div className="px-4 py-2">
                                    <h1 className="text-lg font-medium">Account Name</h1>
                                    <p className="text-3xl font-semibold">{currentUser.name}</p>
                                </div>
                                <div className="px-4 py-2">
                                    <h1 className="text-lg font-medium">User Email</h1>
                                    <p className="text-3xl font-semibold">{currentUser.email}</p>
                                </div>
                                <div className="px-4 py-2">
                                    <h1 className="text-lg font-medium">User_name</h1>
                                    <p className="text-3xl font-semibold">{currentUser.username}</p>
                                </div>
                            </div>
                            
                <div className="md:w-[80%] mx-auto my-10 flex gap-2">
                    <Button onClick={() => setEditing(true)}>Edit profile</Button>
                    <Button className="bg-rose-500" onClick={() =>navigate("all-posts")}>Get User All posts</Button>
                </div>    
                            </>
                        ) : (
                            <>
                            <div className="bg-white w-[60%] rounded-b-md">
                                <form onSubmit={handleSubmit(updateProfile)}>
                                        <div className="px-4 py-2">
                                            <label htmlFor="name" className="text-lg font-medium block">Name</label>
                                            <input className="text-3xl font-semibold" 
                                            id="name"  type="text" {...register("name")} defaultValue={currentUser.name}/>
                                        </div>
                                        {/* <div className="px-4 py-2">
                                            <label htmlFor="email" className="text-lg font-medium block">Email</label>
                                            <input className="text-3xl font-semibold" 
                                            id="email" type="email" placeholder="Edit email" {...register("email")} defaultValue={currentUser.email}/>
                                        </div> */}
                                        <div className="px-4 py-2">
                                            <label htmlFor="username" className="text-lg font-medium block">User Name</label>
                                            <input className="text-3xl font-semibold"
                                            type="text" id="username"  {...register("username")} defaultValue={currentUser.username} />
                                        </div>
                                        <div className="px-4 py-2 flex flex-row gap-3">
                                            <Button type="submit">Save Changes</Button>
                                            <Button type="button" variant="destructive" onClick={() => setEditing(false)}>Cancel</Button>
                                        </div>
                                </form>
                            </div>
                        </>
                        )}
            </div>    
        </div>
    </>
    )
}

export default MyProfile;