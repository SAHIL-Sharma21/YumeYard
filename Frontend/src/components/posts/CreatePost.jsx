import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import {Button} from '@/components/ui/button'
import {ChevronLeft} from 'lucide-react'
import { useForm } from "react-hook-form";
import { Switch } from "../ui/switch";
import axios from "axios";
import useAuth from "@/utlis/useAuth";
import { useState } from "react";


const CreatePost = () => {

    const navigate = useNavigate();
    const {handleSubmit, reset, register, formState:{errors}} = useForm();
    const {accessToken} = useAuth();
    const [alert, setAlert] = useState(false);

    //handle create post
    const createPost = async(data) => {
            console.log(data);
        try {

           const response = await axios.post('http://localhost:8080/api/v1/posts/create-post', data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
             if(response.data.statusCode === 200){
                setAlert(true);
             }
            reset();
        } catch (error) {
            console.log(`Error while creating posts. ${error}`);
            // reset();
        }
    }


    return(
        <>
            <div className="bg-gradient-to-r from-gray-800 to-gray-900">
                <Navbar />
                {alert && (
                <div className="bg-green-100 border mx-auto border-green-400 text-green-700 w-2/4 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> Your post has been created and published successfully.</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg onClick={() => setAlert(false)} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1 1 0 0 1-1.414 0L10 11.414l-2.93 2.435a1 1 0 1 1-1.237-1.562l3.232-2.693-3.232-2.692a1 1 0 1 1 1.237-1.562L10 8.586l2.93-2.435a1 1 0 0 1 1.414 1.494l-3.232 2.692 3.232 2.693a1 1 0 0 1 0 1.562z"/></svg>
                    </span>
                </div>
                 )}
                <div className="flex flex-col">
                    <div className="md:w-[80%] mx-auto my-10">
                        <Button onClick={() => navigate("/home")} className="flex justify-center hover:bg-gray-400" variant="outline" size="icon">
                            <ChevronLeft className="h-5 w-5"/>
                        </Button>
                    </div>
                    <div className="md:w-[80%] mx-auto">
                        <div className="bg-white w-auto flex flex-col rounded-md mb-5">
                            <h1 className=" text-center font-bold text-3xl mt-2">Create Post</h1>
                            <div>
                                <form onSubmit={handleSubmit(createPost)} className="mx-4 my-2 space-y-2">
                                    <div>
                                        <label htmlFor="title" className='block font-medium'>Title</label>
                                        <input className={`mt-1 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 ${errors.email && 'border-red-500'}`} 
                                        id="title" placeholder="Enter Post Title" type="text" {...register("title", {required: true})}
                                        aria-invalid={errors.title ? "true" : "false"}
                                        />
                                        {errors.name?.type === "required" && <span className="text-black">Title is required</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="postImage" className='block font-medium'>Post Image</label>
                                        <input className={`mt-1 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 `}
                                        id="postImage" type="file" {...register("postImage")}/>
                                    </div>
                                    <div>
                                        <label htmlFor="description" className='block font-medium'>Post Description</label>
                                        <textarea className={`mt-1 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 ${errors.description && 'border-red-500'}`}
                                        id="description" placeholder="Add Description" cols="30" rows="10" {...register("description", {required: true})} 
                                        aria-invalid={errors.description ? "true" : "false"}
                                        />
                                        {errors.name?.type === "required" && <span className="text-black">Post description is required.</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="publish" className='block font-medium'>Publish post</label>
                                        <Switch id="publish" {...register("publish")} defaultChecked={true} />
                                    </div>
                                    <div>
                                        <Button type="submit">Create Post</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default CreatePost;