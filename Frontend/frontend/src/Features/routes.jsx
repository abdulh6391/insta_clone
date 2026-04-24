import {createBrowserRouter } from 'react-router-dom'
import Login from './auth/pages/Login'
import Register from './auth/pages/Register'
import Feed from './posts/pages/Feed.jsx'
import Create from './posts/pages/Create.jsx'
export const routes=createBrowserRouter ([
    {
        path:"/create",
        element:<Create/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:'/feed',
        element:<Feed/>
    },
    {
        path:'/',
        element:<h1>Home</h1>
    }
])