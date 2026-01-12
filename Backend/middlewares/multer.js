import multer from "multer";
import cloudinary from "./cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary"

//  console.log(connectCloudinary);

const storage = new CloudinaryStorage({

    cloudinary: cloudinary,
    params: {
        folder: "myUploads",
        allowed_formats: ["jpg", "png", "jpeg", "webp","avif"],
    }
});

 
export const upload = multer({ storage }); 