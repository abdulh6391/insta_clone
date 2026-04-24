import React, { useRef, useState } from 'react'
import Navbar from '../../shared/components/Navbar'
import { PostHook } from '../hook/PostHook';
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const {loading,handleCreatePost} = PostHook()
  const [caption, setCaption] = useState("");

  const navigate=useNavigate()

  const postImageInputFieldRef = useRef(null)
  
  async function handleSubmit(e)
  {
    e.preventDefault()
    const file=postImageInputFieldRef.current.files[0]

    await handleCreatePost(file,caption)

    navigate("/feed")

  }


  if(loading)
  {
    return(
      <main>
        <h1>Creating Post</h1>
      </main>
    )
  }

  return (
    <div>
      <Navbar/>
      <div>
         <main className='flex items-center justify-center min-h-screen'>
             <div className="form-container">
                 <h1 className='text-3xl'>Create Post</h1>
                 <form onSubmit={handleSubmit} className='flex flex-col gap-10 w-100 h-100 bg-gray-600 p-10 rounded-2xl'>
                     <input ref={postImageInputFieldRef} className='bg-green-500 border-none outline-none py-4 rounded-2xl' type="file" name='imgUrl' placeholder='Enter Image'/>
                     <input onChange={(e)=>
                      {
                        setCaption(e.target.value)
                      }
                     } value={caption} className='bg-green-500 border-none outline-none py-4 rounded-2xl' type="text" name='caption' placeholder='Enter Caption'/>
                     <button className='bg-red-900 py-2 rounded-2xl'>Create</button>
                 </form>
             </div>
         </main>
         </div>
    </div>
  )
}

export default Create