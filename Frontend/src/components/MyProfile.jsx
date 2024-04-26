import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import {ChevronLeft} from 'lucide-react'
import useAuth from "@/utlis/useAuth";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

//making userPersonal profile.
const MyProfile = () => {

    const navigate = useNavigate();
    const {currentUser} = useAuth();

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
                    <div className="bg-white w-[60%] rounded-md">
                        <div className="px-4 py-2">
                            <h1 className="text-4xl">Account details</h1>
                        </div>
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
                </div>
                <div className="md:w-[80%] mx-auto my-10 ">
                    <Button >Edit profile</Button>
                </div>
            </div>    
        </>
    )
}

export default MyProfile;