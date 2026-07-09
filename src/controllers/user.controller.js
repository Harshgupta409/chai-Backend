import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/Api.Response.js"
const registerUser=asyncHandler(async(req,res)=>{
    // get user details from frontend
    // validation-not empty
    // check if user already exist: username/email
    // check for images 
    // check for avatar
    // upload them cloudinary, avatar
    // createv user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response  

    const {fullname,email,username ,password}=req.body||{}


    if (
        [fullname,email,username,password].some((field)=>field?.trim()==="")
    ) {
        throw new ApiError(400,"All feilds are required")
    }


    const existedUser=await User.findOne({
        $or:[{ username },{ email }]
    })
    if (existedUser) {
        throw new ApiError(409,"User with email or username exist")
        
    }
    


    const avatarLocalPath=req.files?.avatar?.[0]?.path;
    const coverImageLocalPath=req.files?.coverImage?.[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar field is reqired")    
    }


    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) :null;

    
    if (!avatar) {
        return res.status(400).json({
            success: false,
            message: "Avatar could not be uploaded to Cloudinary. Check your console."
        });
    } 

    const user = await User.create({
        fullname,
        avatar: avatar?avatar.url:"",
        coverImage:coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500,"Something went wrong while registering the user")
    }


    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Succesfully")
    )



})

export {registerUser}