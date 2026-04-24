const User = require("../models/UserModel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

async function registerUser(req,res)
{
    const {username,email,password,bio}=req.body

    const isUserAlreadyExist=await User.findOne({
        $or:[{username},{email}]
    })

    if(isUserAlreadyExist)
    {
        return res.status(409).json({
            msg:"User Already Exists"+(isUserAlreadyExist.email==email?"Email already Exist":"Username already exists")
        })
    }

    const hash=await bcrypt.hash(password,10)

    const user=await User.create({
        username,
        email,
        password:hash,
        bio,
    })

    const payload={
        userId:user._id,
        username:user.username
    }

    const token=jwt.sign(payload,process.env.JWT_SECRET)

    res.cookie("token",token)

    return res.status(201).json({
        msg:"User created SuccessFully",
        user:
        {
            userId:user._id,
            username:user.username,
            email:user.email,
            password:user.password,
            bio:user.bio,
            profileImage:user.profileImage,
            token:token,
        }
    })

    
}

async function loginUser(req,res)
{
    const {username,email,password}=req.body

    const user=await User.findOne({
        $or:[{username},{email}]
    }).select("+password")

    if(!user)
    {
        return res.status(409).json({
            msg:"User not Found"
        })
    }

    const isPasswordvalid=await bcrypt.compare(password,user.password)

    if(!isPasswordvalid)
    {
        return res.status(401).json({
            msg:"Password is invalid"
        })
    }

    const payload={
        userId:user._id,
        username:user.username
    }

    const token=jwt.sign(payload,process.env.JWT_SECRET)

    res.cookie("token",token)

    return res.status(201).json({
        msg:"User Login SuccessFully",
        user:{
            userId:user._id,
            username:user.username,
            email:user.email,
            password:user.password,
            token:token
        }
    })

}


module.exports={registerUser,loginUser}