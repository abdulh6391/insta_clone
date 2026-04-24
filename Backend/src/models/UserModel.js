const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username must be new one"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email must be new one"]
    },
    password:
    {
        type:String,
        required:[true,"password is required"],
        select:false
    },
    profileImage:
    {
        type:String,
        default:"https://images.unsplash.com/photo-1761839259112-aaea03db3633?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"
    },
    bio:String
})

const User=mongoose.model("user",userSchema)

module.exports=User;