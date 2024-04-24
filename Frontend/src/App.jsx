
// import useAuth from "./utlis/useAuth"
import {AuthProvider} from './contexts/AuthContext'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
// import Profile from './components/Profile'
import ProtectedRoute from './router/protectedRoute'

const App = () => {


  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route  path='/home' element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
      
    </>
  )
}

export default App
