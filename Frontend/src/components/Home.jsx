// import useAuth from "@/utlis/useAuth"
import {  Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Profile from "./Profile";

//here we will show all the post to users

const Home = () => {
const navigate = useNavigate();
  const profilePage = () => {
    navigate("custom-domain");
    <Navigate><Profile/></Navigate>
  }
  return (
    <>

        <Navbar />
        <h1>This is Home Route</h1>
        <button onClick={profilePage}>Profile page</button>
    </>
  )
}

export default Home;