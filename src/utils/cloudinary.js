import {v2 as cloudinary} from "cloudinary"
import fs from "fs"




const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath) return null
        cloudinary.config({
            cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
            api_key:process.env.CLOUDINARY_API_KEY,
            api_secret:process.env.CLOUDINARY_API_SECRET
        });
        // upload the file on cloudinary
        const cleanPath = localFilePath.replace(/\\/g, "/");
        const response=await cloudinary.uploader.upload(cleanPath,{
            resource_type:"auto"
        })
        //file has been uploaded succesfully
        // console.log("file uploaded on cloudinary",
        // response.url);
        fs.unlinkSync(localFilePath)
        return response;
        
        
    } catch (error) {
        console.error("!!! CLOUDINARY UPLOAD ERROR !!!", error);
        fs.unlinkSync(localFilePath)// remove the localy saved temprory file as the upload operation failed
        return null
        
    }
}
export {uploadOnCloudinary}
