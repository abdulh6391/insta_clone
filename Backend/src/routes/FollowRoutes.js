const express=require("express");
const {followTheUser,unFollowTheUser}=require("../controllers/FollowControllers");
const identifyUser = require("../middlewares/AuthMiddlewares");
const router=express.Router();

router.post("/follow/:username",identifyUser,followTheUser)
router.post("/unFollow/:username",identifyUser,unFollowTheUser)

module.exports=router