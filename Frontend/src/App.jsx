
// import useAuth from "./utlis/useAuth"
import {AuthProvider} from './contexts/AuthContext'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
// import Profile from './components/Profile'
import ProtectedRoute from './router/protectedRoute'
import LandingPage from './components/LandingPage'
import Profile from './components/Profile'
import SinglePost from './components/posts/SinglePost'
import MyProfile from './components/MyProfile'
import CreatePost from './components/posts/CreatePost'
import UserAllPost from './components/posts/UserAllPost'


const App = () => {


  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          {/* protected routed  */}
          <Route  path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='home/custom-domain' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
          <Route path='home/post/:postId' element={<ProtectedRoute><SinglePost /></ProtectedRoute>} />
          <Route path='home/my-profile/:id' element={<ProtectedRoute><MyProfile /></ProtectedRoute>}/>
          <Route path='home/create-post' element={<ProtectedRoute><CreatePost /></ProtectedRoute>}/>
          <Route path='home/my-profile/:id/all-posts' element={<ProtectedRoute><UserAllPost /></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
      
    </>
  )
}

export default App
