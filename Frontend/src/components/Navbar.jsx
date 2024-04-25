//register and login header

import useAuth from "@/utlis/useAuth"
// import LogoutBtn from "./LogoutBtn";
import UserProfile from "./UserProfile";
const Navbar = () => {

  const {accessToken} = useAuth();

  return (
    <>
        <div className="bg-gray-700 py-4 flex sm:flex-row sm:justify-between sm:items-center">
          <div className="md:w-3/4 mx-auto flex items-center sm:justify-between">
              <h1 className="text-white sm:font-bold sm:font-mono">YumeYard</h1>
              {/* { accessToken ? <LogoutBtn /> : null} */}
              {accessToken ? <UserProfile /> : null}
          </div>
          
        </div>
    </>
  )
}

export default Navbar