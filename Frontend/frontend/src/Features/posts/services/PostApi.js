import axios from 'axios'
const api=axios.create({
    baseURL:"http://localhost:3004/api",
    withCredentials:true
})

export async function getFeed()
{
    const response=await api.get("/feed")
    return response.data
}

export async function createPost(imgUrl,caption)
{
    const formData=new FormData()

    formData.append("imgUrl",imgUrl)
    formData.append("caption",caption)

    const response=await api.post("/post",formData)
    return response.data
}

export async function likePost(postId)
{
    const response=await api.post(`/like/${postId}`)
    return response.data
}

export async function unLikePost(postId)
{
    const response=await api.delete(`/unLike/${postId}`)
    return response.data
}