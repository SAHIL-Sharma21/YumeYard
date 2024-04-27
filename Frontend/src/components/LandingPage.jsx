import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Feather} from 'lucide-react';

const LandingPage = () => {
  return (
    <>
      <div className="flex  flex-col justify-center items-center h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white gap-2">
        <div className="md:w-[30%] w-[90%]"> 
          <img src="/graphics/1.png" alt="landing page image" className="w-fit" />
        </div>
        <div className="flex flex-col justify-center items-center">
         <h1 className="text-4xl font-bold md:mb-2 mt-8 flex flex-row items-center gap-3" >
            <span className="text-rose-500">&quot;Dreamer&apos;s Haven</span>
            <Feather />Welcome to Yume Yard&quot;
          </h1>
          <p className="md:mb-8 font-medium">Step into Yume Yard, where dreams thrive and stories come alive, igniting imaginations with each click.</p>
          <div className="space-x-4">
            <Link to={"/login"}>
              <Button className= ' bg-rose-500 hover:bg-rose-400 transition hover:-translate-y-1'>Login</Button>
            </Link>
            <Link to={"/register"}>
              <Button variant="outline" className="text-black  hover:-translate-y-1 transition">Sign Up</Button>
            </Link>   
        </div>        
        </div>
    </div>
    </>
  )
}

export default LandingPage