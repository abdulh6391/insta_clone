
const ImageKit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const Post = require("../models/PostModel")
const Like = require("../models/LikeModel")

//instance
const imagekit=ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function creatingPost(req,res)
{
    const userId=req.user.userId
    const file=await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName:"Shaheera",
    })

    const post=await Post.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:userId
    })

    return res.status(201).json({
        msg:"Post Created Successfully",
        post:
        {
            postId:post._id,
            caption:post.caption,
            userId:post.user
        }
    })

}

async function getThePost(req,res)
{
    const userId=req.user.userId

    const post=await Post.find({user:userId})

    return res.status(201).json({
        msg:"Post Fetched SuccessFully",
        post
    })
}

async function getThePostById(req,res)
{
    const postId=req.params.postId
    const userId=req.user.userId

    const post=await Post.findById(postId)

    if(!post)
    {
        return res.status(401).json({
            msg:"Post Not found"
        })
    }

    const isValidUser= post.user.toString()==userId

    if (!isValidUser) {
        return res.status(403).json({
            msg: "Forbidden Content"
        });
    }

    return res.status(200).json({
        msg: "Post fetched",
        post
    });

    
}

async function likeThePost(req,res)
{
    const username=req.user.username
    const postId=req.params.postId

    const post=await Post.findById(postId)

    if(!post)
    {
        return res.json({msg:"Post not found"})
    }

    const like=await Like.create({
        user:username,
        post:postId
    })

    res.status(201).json({
        msg:`You Follow this post by the username ${username}`,
        like:{
            likeId:like._id,
            post:postId,
            user:username
        }
    })
}

async function unLikeThePost(req,res)
{
    const username=req.user.username
    const postId=req.params.postId

    const like=await Like.findOneAndDelete({
        user:username,
        post:postId
    })

    return res.status(201).json({
        msg:"You unlike this post",
        like
    })
}
async function getFeed(req,res)
{
    const user=req.user
    const posts=await Post.find().populate("user").sort({_id:-1}).lean();

    for(let post of posts)
    {
        const isLiked=await Like.findOne({
            user:user.username,
            post:post._id
        })
        post.isLiked=!!isLiked
    }
    return res.status(200).json({
        message:"Posts Fetched SuccessFully",
        posts
    })
}

module.exports={creatingPost,getThePost,getThePostById,likeThePost,unLikeThePost,getFeed}