import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Authhook } from '../hook/AuthHook';
import Navbar from '../../shared/components/Navbar';

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   const navigate= useNavigate()

    const {loading, setLoading,user, setUser,handleRegister}=Authhook()

    if(loading)
    {
        return(
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }

    async function handleSubmit(e)
    {
        e.preventDefault()
        await handleRegister(username,email,password)
        navigate("/login")
    }
  return (
    <div>
        <Navbar/>
         <main className='flex items-center justify-center min-h-screen'>
             <div className="form-container">
                 <h1 className='text-3xl'>Register</h1>
                 <form onSubmit={handleSubmit} className='flex flex-col gap-10 w-100 h-100 bg-gray-600 p-10 rounded-2xl'>
                     <input onChange={(e)=>
                        {
                            setUsername(e.target.value)
                        }
                     } onSubmit={handleSubmit} className='bg-green-500 border-none outline-none py-4 rounded-2xl' type="text" name='username' placeholder='Enter Username'/>
                     <input onChange={(e)=>
                        {
                            setEmail(e.target.value)
                        }
                     } className='bg-green-500 border-none outline-none py-4 rounded-2xl' type="text" name='email' placeholder='Enter Email'/>
                     <input onChange={(e)=>
                        {
                            setPassword(e.target.value)
                        }
                     } className='bg-green-500 border-none outline-none py-4 rounded-2xl' type="text" name='password' placeholder='Enter Password'/>
                     <button className='bg-red-900 py-2 rounded-2xl'>Register</button>
                 </form>
                 <p> Have an account <Link to="/login"  className='text-red-900 underline'>Login</Link></p>

             </div>
         </main>
         </div>
  )
}

export default Register