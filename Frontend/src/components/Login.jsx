//login component
import {useForm} from 'react-hook-form'
import {Button} from "@/components/ui/button"

const Login = () => {

    const {register, handleSubmit, formState: {errors}} = useForm();
  return (
    <>
        <div className='w-full h-full flex justify-center items-center'>
            {/* form div  */}
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit()}>
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
                </form>
            </div>
        </div>
    </>
  )
}

export default Login