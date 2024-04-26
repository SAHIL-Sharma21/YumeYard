//making protected route
import {  useNavigate } from 'react-router-dom';
import useAuth from '../utlis/useAuth.js'
import { useEffect } from 'react';


const ProtectedRoute = ({ children }) => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();

    console.log(accessToken);

    //solved bug as when i try to access home route it allow user to go into that
    useEffect(()=>{
        if(!accessToken) {
            navigate("/login");
        }
    }, [accessToken, navigate]);

    return children;
}

export default ProtectedRoute;