import React, { useEffect } from 'react'
import Navbar from '../../shared/components/Navbar'
import Post from '../components/Post'
import { PostHook } from '../hook/PostHook'

const Feed = () => {

 const {loading, setLoading,post, setPost,feed, setFeed,handleGetFeed,handleLike,handleUnLike} = PostHook()

 useEffect(()=>{
  handleGetFeed()
 },[])

 if(loading || !feed)
 {
  return(
    <main>
      <h1>Loading...</h1>
    </main>
  )
 }
  return (
    <div>
        <Navbar/>
     <main className="flex justify-center bg-gray-100 min-h-screen p-5">
         <div className="feed w-full max-w-md flex flex-col gap-5"> 
          {feed.map((post,idx)=>
          {
            return <Post key={idx} user={post.user} post={post} handleLike={handleLike} handleUnLike={handleUnLike} loading={loading}/>
          })}
         </div>
     </main>
    </div>
  )
}

export default Feed