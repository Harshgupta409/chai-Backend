import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"// jwt is a bearer(like a key) token
import bcrypt from "bcrypt"

const userSchema=new Schema({
    username:{
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true//if you want to enable searching field
    },
    email:{
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
    },    
    fullname:{
        type:String,
        required: true,
        trim:true,
        index:true   //if you want to enable searching field
    },
    avatar:{
        type:String,  // cloudinary url
        required: true,
        
    },
    coverImage:{
        type:String,
        
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,'password is required']
    },
    refreshTocken:{
        type:String
    },
},{timestamps:true}
)

userSchema.pre("save",async function () {
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)    
}
userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generatefreshToken= function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )

}


export const User=mongoose.model("User",userSchema)