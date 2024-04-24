//making logging out functionality

import axios from "axios"
// import { Button } from "./ui/button"
import useAuth from "@/utlis/useAuth"
import {LogOut } from "lucide-react"


const LogoutBtn = () => {

    const {accessToken, logout} = useAuth();
//hanle logout functionality
const handleLogout = async() => {
    try {
           const response = await axios.post('http://localhost:8080/api/v1/users/logout', null, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
           });

            if(response.data?.statusCode === 200) {
                logout(null, null);
            }
    } catch (error) {
        console.log(error?.message || "Error while logging out.");
    }
}

  return (
    <>
        <div>
            {/* <Button variant="destructive" onClick={handleLogout}>Logout</Button> */}
            <div onClick={handleLogout} className="flex gap-1 align-middle">
                <LogOut className="mr-2 h-4 w-4 justify-items-center" />
                <p>Log out</p>  
            </div>
        </div>
    </>
  )
}

export default LogoutBtn;