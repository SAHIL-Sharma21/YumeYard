// jsx code for registering a user..

//we will be using reatc hook form for register and login
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import { Button } from './ui/button';

const Register = () => {

    const {register, handleSubmit, formState: {errors}} = useForm();


  return (
    <>
        <div className="w-full h-full"> 
            
            <div className='flex flex-row sm:justify-center sm:items-center md:gap-x-5'>
                {/* left div  */}
            <div>
                {/* an image or garphic  */}
                <h1>here image will come </h1>
            </div>
            {/* right div for form  */}
            <div className='flex flex-col px-4 py-2 w-1/2'> 
                <h2>Create Account</h2>
                <div>
                    <form onSubmit={handleSubmit()}>
                        {/* email field  */}
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input type="email" id='email' placeholder='your email' {...register('email', {required: true})}
                            aria-invalid={errors.email ? "true" : "false"}
                            />
                            {errors.email?.type === "required" && <span>Email is required.</span>}
                        </div>
                        {/* name field  */}
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input id='name' type='text' placeholder='your name' {...register('name', {required: true})}
                            aria-invalid={errors.name ? "true" : "false"}
                            />
                            {errors.name?.type === "required" && <span>Name is required.</span>}
                        </div>
                        {/* username field  */}
                        <div>
                            <label htmlFor='username'>Username</label>
                            <input id='username' type='text' placeholder='your username' {...register('username', {required: true})}
                            aria-invalid={errors.username? "true" : "false"}
                            />
                            {errors.username?.type === "required" && <span>Username is required</span>}
                        </div>
                        {/* password filed  */}
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password"  id="password" placeholder='your password' {...register('password', {required: true})}
                            aria-invalid={errors.password? "true" : "false"}
                            />
                            {errors.password?.type === "required" && <span>Password is required.</span>}
                        </div>
                        {/* input files  */}
                        <div>
                            <Label htmlFor="avatar">Avatar</Label>
                            <Input id="avatar" type="file"/>
                        </div>
                        {/* submit button  */}
                        <div>
                            <Button type="submit">Create Account</Button>
                            <p>Already have an account? <Button variant="link">Login</Button> </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            
            
        </div>
    </>
  )
}

export default Register