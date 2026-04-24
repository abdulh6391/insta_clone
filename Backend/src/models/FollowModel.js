const mongoose=require("mongoose")

const followSchema=new mongoose.Schema({
    follower:String,
    followee:String,
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

const Follow=mongoose.model("follow",followSchema)
module.exports=Follow;