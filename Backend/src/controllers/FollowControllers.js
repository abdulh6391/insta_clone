const Follow = require("../models/FollowModel")
const User = require("../models/UserModel")


async function followTheUser(req,res) {
    const followerUsername=req.user.username
    const followeeUsername=req.params.username

    if(followeeUsername==followerUsername)
    {
        return res.status(401).json({
            msg:"You cannot followYourself"
        })
    }

    const isAlreadyFollowTheUser=await Follow.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })

    if(isAlreadyFollowTheUser)
    {
        return res.status(201).json({
            msg:`You already Follow The User ${followeeUsername}`
        })
    }

    const isfolloweeExist=await User.findOne({username:followeeUsername}) 

    if(!isfolloweeExist)
    {
        return res.status(401).json({
            msg:"Follow does not exist  "
        })
    }

    const followRecord=await Follow.create({
        follower:followerUsername,
        followee:followeeUsername
    })

    return res.status(201).json({
        msg:`You are now Follow the user ${followeeUsername} by the user ${followerUsername}`,
        followRecord
    })
}

async function unFollowTheUser(req,res)
{
    const followerUsername=req.user.username
    const followeeUsername=req.params.username

    const isUserFollowed=await Follow.findOne({
        follower:followerUsername,
        followee:followeeUsername  
    })

    if(!isUserFollowed)
    {
        return res.status(401).json({
            msg:`You already cannot Follow This User ${followeeUsername}`
        })
    }

    const unfollow=await Follow.findOneAndDelete({
        follower:followerUsername,
        followee:followeeUsername 
    })

    return res.status(201).json({
        msg:`You unfollow This user ${followeeUsername} by the user ${followerUsername}`
    })
}

module.exports={followTheUser,unFollowTheUser}