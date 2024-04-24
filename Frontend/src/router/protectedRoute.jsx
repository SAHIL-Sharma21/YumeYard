//making protected route
import {  useNavigate } from 'react-router-dom';
import useAuth from '../utlis/useAuth.js'


const ProtectedRoute = ({ children }) => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();

    console.log(accessToken);
    if(!accessToken) {
        navigate("/login");
    }
    return children;
}


export default ProtectedRoute;