//register and login header

import useAuth from "@/utlis/useAuth"
// import LogoutBtn from "./LogoutBtn";
import UserProfile from "./UserProfile";
import { Button } from "./ui/button";
import { BadgePlus } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const Navbar = () => {

  const {accessToken} = useAuth();
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);


  useEffect(() => {
    setDisableBtn(location.pathname === "/home/create-post");
  }, [location.pathname]);

  return (
    <>
        <div className="bg-gray-700 py-4 flex sm:flex-row sm:justify-between sm:items-center">
          <div className="md:w-3/4 mx-auto flex items-center sm:justify-between">
              <h1 className="text-white sm:font-bold sm:font-mono cursor-pointer" onClick={()=> navigate("/home")}><img src="/Yumeyard.png" className="w-12 rounded-full h-auto"/></h1>
              {/* { accessToken ? <LogoutBtn /> : null} */}
              <div className="flex flex-row justify-between gap-4">
                {accessToken ? <Button className="bg-rose-500 flex flex-row gap-2  items-center" onClick={() => navigate("create-post")} disabled={disableBtn}>
                  <BadgePlus/>Create Post</Button> 
                  : null}
                {accessToken ? <UserProfile /> : null}
              </div>
          </div>   
        </div>
    </>
  )
}

export default Navbar