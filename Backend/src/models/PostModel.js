const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        required:[true,"caption is required"]
    },
    imgUrl:{
        type:String,
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"user id is required"]
    }
})

const Post=mongoose.model("post",postSchema);

module.exports=Post;