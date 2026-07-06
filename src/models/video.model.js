import mongoose,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"// transform data using a aggregate pipelines
const videoSchema=new Schema(
    {
        videoFile:{
            type:String,//cloudinary url
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        decription:{
            type:String,
            required:true,
        },
        duration:{
            type:String,//cloudinary url
            required:true,
        },
        views:{
            type:Number,
            default:0,
        },
        ispubliced:{
            type:Boolean,
            default:true,
        },
        owner:{
            type:Schema.Types.OrderId,
            ref:"User",
        },

    },
    {
        timestamps:true

    },
    
)

videoSchema.plugin(mongooseAggregatePaginate)


export const Video=mongoose.model("Video",videoSchema)