//user profile protected route

import { Link } from "react-router-dom"



const Profile = () => {
  return (
    <div>This is user profile .

      <h1>here is user details</h1>
      <Link to={"/home"}> go to home</Link>
    </div>
    
  )
}

export default Profile