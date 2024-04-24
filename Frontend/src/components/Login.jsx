//login component
import {useForm} from 'react-hook-form'
import {Button} from "@/components/ui/button"
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../utlis/useAuth.js'


const Login = () => {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const {login} = useAuth();
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

        login(accessToken, refreshToken);

        if(accessToken) {
            navigate("/home");
        }
    }

  return (
    <>
    <Navbar />
        <div className='w-full h-full flex justify-center items-center'>
            {/* form div  */}
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    {/* username field  */}
                    <div>
                        <label htmlFor="email">Username</label>
                        <input className={`mt-1 p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 ${errors.email && 'border-red-500'}`} 
                         id='email' type='email' placeholder='your email' {...register('email', {required: true})}
                        aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email?.type === "required" && <span>Email is required</span>}
                    </div>
                    {/* password is required */}
                    <div>
                        <label  htmlFor='password'>Password</label>
                        <input type="password" id='password' placeholder='password' {...register('password', {required: true})}
                        aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password?.type === "required" && <span>Password is required</span>}
                    </div>
                    {/* login button  */}
                    <div>
                        <Button type="submit">Login</Button>
                    </div>
                    <div>
                        <p>Dont have and account?  <Link to={"/register"}>Register </Link></p>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login