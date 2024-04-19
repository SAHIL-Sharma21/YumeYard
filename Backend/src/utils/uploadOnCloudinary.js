//making service to upload on cloudionary
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//function that take local file path and upload o cloudinary
const cloudinaryLink = async (localFilePath) => {

    //check if the local file is present or not
    if (!localFilePath) return null;

    try {
        const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type: 'auto'
            });
        console.log(`File uploaded successfully on cloudinary, file url: ${response.url}`);
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export { cloudinaryLink };