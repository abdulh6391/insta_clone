const express=require("express")
const {creatingPost,getThePost,getThePostById,likeThePost,unLikeThePost,getFeed}=require("../controllers/PostControllers");
const identifyUser = require("../middlewares/AuthMiddlewares");
const multer=require("multer")
const upload = multer({ storage: multer.memoryStorage()})
const router=express.Router();

router.post("/post",upload.single("imgUrl"),identifyUser,creatingPost)
router.get("/post",identifyUser,getThePost)
router.get("/post/:postId",identifyUser,getThePostById)

router.post("/like/:postId",identifyUser,likeThePost)
router.delete("/unLike/:postId",identifyUser,unLikeThePost)
router.get("/feed",identifyUser,getFeed)

module.exports=router