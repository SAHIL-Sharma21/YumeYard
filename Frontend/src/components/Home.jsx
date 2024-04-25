// import useAuth from "@/utlis/useAuth"
// import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {Separator} from '@/components/ui/separator'

//here we will show all the post to users

const Home = () => {
// const navigate = useNavigate();
  // const profilePage = () => {
  //   navigate("custom-domain");
  // }



  return (
    <>
        <Navbar />
        <div className="h-screen mt-5">
          <div className="md:w-[80%] mx-auto rounded-md flex flex-col items-center bg-slate-500">
            <h1 className="text-center font-bold text-3xl my-2 text-white">All Posts</h1>
            <Separator className="my-4 md:w-[80%]" />
            <div>
              <h1>for seeing seperator.</h1>
            </div>
          </div>

        </div>
    </>
  )
}

export default Home;