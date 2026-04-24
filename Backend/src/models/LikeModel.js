const mongoose=require("mongoose");

const likeSchema=new mongoose.Schema({
    post:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true
    },
    user:{
        type:String,
    },
},{timestamps:true})

likeSchema.index({post:1,user:1},{unique:true})

const Like=mongoose.model("like",likeSchema);
module.exports=Like