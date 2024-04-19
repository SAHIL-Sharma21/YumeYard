// making middle ware for file upload using multer
import multer from 'multer'

//making disk storage where client file come here then we will upload on cloudinary and remove the files from our server.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/temp')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.toLowerCase());
    }
});

export const upload = multer({ storage: storage });