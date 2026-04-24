const jwt=require("jsonwebtoken")

async function identifyUser(req,res,next)
{
    const token=req.cookies.token;

    if(!token)
    {
        return res.status(409).json({
            msg:"Token not found"
        })
    }

    let decoded=null;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            msg:"Unauthorized"
        })
    }

    req.user=decoded;
    next();

}

module.exports=identifyUser