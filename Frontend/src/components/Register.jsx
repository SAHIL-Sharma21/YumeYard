// jsx code for registering a user..

//we will be using reatc hook form for register and login
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { useState } from 'react';

const Register = () => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [alert, setAlert] = useState(false);
    const [loading, setIsloading] = useState(false);


    //handle create account
    const createAccount = async (data) => {
        
        try {
                    setIsloading(true);
                    //makiong post request to create account
                    const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/register`, data);
                    console.log(response.data);
            
                    setIsloading(false);
                    if(response.data.statusCode === 200) {
                        setAlert(true);
                    }
                    
                    reset();
        } catch (error) {
            console.log(`Error while creating user account, ${error}`);
        }
    }


  return (
    <>
    <div className='md:h-screen flex flex-col justify-between bg-gradient-to-r from-gray-800 to-gray-900'>
        <Navbar />
        {/* alert  */}
        {alert && (
                <div className="bg-green-100 border mx-auto border-green-400 text-green-700 w-2/4 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> Your account has been created successfully.</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg onClick={() => setAlert(false)} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1 1 0 0 1-1.414 0L10 11.414l-2.93 2.435a1 1 0 1 1-1.237-1.562l3.232-2.693-3.232-2.692a1 1 0 1 1 1.237-1.562L10 8.586l2.93-2.435a1 1 0 0 1 1.414 1.494l-3.232 2.692 3.232 2.693a1 1 0 0 1 0 1.562z"/></svg>
                    </span>
                </div>
        )}


            <div className="'w-full flex justify-center items-center  overflow-hidden "> 
                
                <div className='flex md:w-[80%] flex-row sm:justify-center sm:place-items-center md:gap-x- gap-2'>
                <div className='sm:w-1/2'>
                    {/* an image or garphic  */}
                    <img src="/graphics/2.png" alt="register page img" />
                </div>
                {/* right div for form  */}
                <div className='flex flex-col px-4 py-1 sm:w-[40%] sm:h-3/4 ml-4 bg-white rounded-md'> 
                    <h2 className='text-black text-center mb-2 text-3xl font-semibold mt-2'>Create Account</h2>
                    <div>
                        <form onSubmit={handleSubmit(createAccount)} className='space-y-2 mb-2'>
                            {/* email field  */}
                            <div>
                                <label htmlFor='email' className='block font-medium'>Email</label>
                                <input className={`mt-1 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 ${errors.email && 'border-red-500'}`} 
                                type="email" id='email' placeholder='your email' {...register('email', {required: true})}
                                aria-invalid={errors.email ? "true" : "false"}
                                />
                                {errors.email?.type === "required" && <span>Email is required.</span>}
                            </div>
                            {/* name field  */}
                            <div>
                                <label htmlFor='name' className='block font-medium'>Name</label>
                                <input className={`mt-1 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 ${errors.email && 'border-red-500'}`}
                                id='name' type='text' placeholder='your name' {...register('name', {required: true})}
                                aria-invalid={errors.name ? "true" : "false"}
                                />
                                {errors.name?.type === "required" && <span>Name is required.</span>}
                            </div>
                            {/* username field  */}
                            <div>
                                <label htmlFor='username' className='block font-medium'>Username</label>
                                <input className={`mt-1 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 ${errors.email && 'border-red-500'}`}
                                 id='username' type='text' placeholder='your username' {...register('username', {required: true})}
                                aria-invalid={errors.username? "true" : "false"}
                                />
                                {errors.username?.type === "required" && <span>Username is required</span>}
                            </div>
                            {/* password filed  */}
                            <div>
                                <label htmlFor="password" className='block font-medium'>Password</label>
                                <input className={`mt-1 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 ${errors.email && 'border-red-500'}`}
                                 type="password"  id="password" placeholder='your password' {...register('password', {required: true})}
                                aria-invalid={errors.password? "true" : "false"}
                                />
                                {errors.password?.type === "required" && <span>Password is required.</span>}
                            </div>
                            {/* input files  */}
                            <div>
                                <Label htmlFor="avatar" className='block font-medium'>Avatar</Label>
                                <Input className={`mt-1 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 ${errors.email && 'border-red-500'}`}
                                id="avatar" type="file" {...register('avatar')}/>
                            </div>
                            {/* submit button  */}
                            <div>
                                <Button type="submit" disabled={loading}>Create Account</Button>
                                <p className='text-center'>Already have an account?<Link to={"/login"}><Button variant="link">Login</Button></Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>  
        </div>
        <div></div>
    </div>
    </>
  )
}

export default Register