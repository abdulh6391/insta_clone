import { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import { createPost, getFeed, likePost, unLikePost } from "../services/PostApi";

export const PostHook=()=>
{
    const context=useContext(PostContext)
    const {loading, setLoading,post, setPost,feed, setFeed}=context

    async function handleGetFeed()
    {
        setLoading(true)
        const data=await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    async function handleCreatePost(imgUrl,caption)
    {
        setLoading(true)
        const data=await createPost(imgUrl,caption)
        setFeed([data.post,...feed])
        setLoading(false)
    }
    
    async function handleLike(postId) {
    await likePost(postId)

    const updatedFeed = [...feed]

    const post = updatedFeed.find(p => p._id === postId)
    if (post) {
        post.isLiked = true
    }

    setFeed(updatedFeed)
}

async function handleUnLike(postId) {
    await unLikePost(postId)

    const updatedFeed = [...feed]

    const post = updatedFeed.find(p => p._id === postId)
    if (post) {
        post.isLiked = false
    }

    setFeed(updatedFeed)
}


    return{loading, setLoading,post, setPost,feed, setFeed,handleGetFeed,handleCreatePost,handleLike,handleUnLike}
}