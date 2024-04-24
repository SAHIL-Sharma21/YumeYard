//login component
import {useForm} from 'react-hook-form'
import {Button} from "@/components/ui/button"
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../utlis/useAuth.js'
import { useEffect } from 'react';


const Login = () => {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const {login, getCurrentUser, accessToken} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async(data) => {
        console.log(data);
        const response = await axios.post('http://localhost:8080/api/v1/users/login', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const accessToken = response.data.data.user.accessToken;
        const refreshToken = response.data.data.user.refreshToken;
        const currentUser = response.data.data?.user?.user;
     
        getCurrentUser(currentUser);
        login(accessToken, refreshToken);

        // if(accessToken) {
        //     navigate("/home");
        // }
    }

    useEffect(() => {
     if(accessToken) {
        navigate("/home")
     }
    }, [accessToken, navigate]);



  return (
    <>

    <div className='h-screen flex flex-col justify-between '> 
        <Navbar />
        <div className='w-full flex justify-center items-center  overflow-hidden'>
            {/* form div  */}
            <div className='bg-rose-700  rounded-md w-[35%] flex flex-col items-center'>
                <h2 className='text-white text-center mb-2 text-2xl font-semibold mt-2'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)} className='space-y-4 mb-2'>
                    {/* username field  */}
                    <div>
                        <label htmlFor="email" className='text-white block' >Username</label>
                        <input className={`mt-1 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 ${errors.email && 'border-red-500'}`} 
                         id='email' type='email' placeholder='your email' {...register('email', {required: true})}
                        aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email?.type === "required" && <span className='text-white text-sm'>Email is required</span>}
                    </div>
                    {/* password is required */}
                    <div>
                        <label  htmlFor='password' className='text-white'>Password</label>
                        <input className={`mt-1 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 ${errors.email && 'border-red-500'}`}
                        type="password" id='password' placeholder='password' {...register('password', {required: true})}
                        aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password?.type === "required" && <span className='text-white text-sm'>Password is required</span>}
                    </div>
                    {/* login button  */}
                    <div>
                        <Button type="submit" className='w-full'>Login</Button>
                    </div>
                    <div>
                        <p className='text-white text-center'>Dont have and account?  <Link to={"/register"} className='text-blue-400 hover:underline'>Register </Link></p>
                    </div>
                </form>
            </div>
        </div>
        <div></div>
    </div>
    
    </>
  )
}

export default Login