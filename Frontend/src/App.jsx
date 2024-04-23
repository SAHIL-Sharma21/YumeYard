import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Register from "./components/Register"


function App() {


  return (
    <>
      <Navbar />
      {/* we can use outlet here.  */}
      <Register />
      <Login />
    </>
  )
}

export default App
