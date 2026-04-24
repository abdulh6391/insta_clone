import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login, register } from "../services/AuthApi";

export  function Authhook()
{
    const context=useContext(AuthContext)

    const {loading, setLoading,user, setUser}=context

    async function handleRegister(username,email,password)
    {
        setLoading(true)
        const data=await register(username,email,password)
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogin(username,password)
    {
        setLoading(true)
        const data=await login(username,password)
        setUser(data.user)
        setLoading(false)
    }

    return {loading, setLoading,user, setUser,handleRegister,handleLogin}
}