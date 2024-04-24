import useAuth from "@/utlis/useAuth"
// import { Link } from "react-router-dom"


const Home = () => {

    //for logging out from our application.
    const {logout} = useAuth();

    const handleLogout = () => {
        logout();
    }

  return (
    <>
        <h1>This is Home Route</h1>

        <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Home