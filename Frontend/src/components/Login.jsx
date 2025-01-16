import {useForm} from 'react-hook-form'
import {Button} from "@/components/ui/button"
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../utlis/useAuth.js'
import { useEffect, useState } from 'react'

const Login = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm()
    const {login, getCurrentUser, accessToken} = useAuth()
    const navigate = useNavigate()
    const [loginError, setLoginError] = useState('')

    const handleLogin = async(data) => {
        try {
            const response = await fetch("http://localhost:4000/api/v1/users/login", {
                method: "POST",
                credentials: 'include', // Important for cookies
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const responseData = await response.json()
            
            if (responseData.data?.user) {
                const { accessToken, refreshToken } = responseData.data.user
                const currentUser = responseData.data.user.user

                getCurrentUser(currentUser)
                login(accessToken, refreshToken)
                reset()
                navigate("/home")
            } else {
                setLoginError('Invalid response format from server')
            }
        } catch (error) {
            console.error('Login error:', error)
            setLoginError('Failed to login. Please check your credentials.')
        }
    }

    useEffect(() => {
        if(accessToken) {
            navigate("/home")
        }
    }, [accessToken, navigate])

    return (
        <div className='h-screen flex flex-col justify-between bg-gradient-to-r from-gray-800 to-gray-900'> 
            <Navbar />
            <div className='w-full flex justify-center items-center overflow-hidden'>
                <div className='bg-rose-700 rounded-md w-[35%] flex flex-col items-center'>
                    <h2 className='text-white text-center mb-2 text-2xl font-semibold mt-2'>Login</h2>
                    {loginError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                            {loginError}
                        </div>
                    )}
                    <form onSubmit={handleSubmit(handleLogin)} className='space-y-4 mb-2'>
                        <div>
                            <label htmlFor="email" className='text-white block'>Email</label>
                            <input 
                                className={`mt-1 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 ${errors.email && 'border-red-500'}`}
                                id='email'
                                type='email'
                                placeholder='your email'
                                {...register('email', {required: true})}
                                aria-invalid={errors.email ? "true" : "false"}
                            />
                            {errors.email?.type === "required" && (
                                <span className='text-white text-sm'>Email is required</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor='password' className='text-white'>Password</label>
                            <input 
                                className={`mt-1 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 ${errors.password && 'border-red-500'}`}
                                type="password"
                                id='password'
                                placeholder='password'
                                {...register('password', {required: true})}
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            {errors.password?.type === "required" && (
                                <span className='text-white text-sm'>Password is required</span>
                            )}
                        </div>
                        <div>
                            <Button type="submit" className='w-full'>Login</Button>
                        </div>
                        <div>
                            <p className='text-white text-center'>
                                Don't have an account?{' '}
                                <Link to="/register" className='text-blue-400 hover:underline'>
                                    Register
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default Login