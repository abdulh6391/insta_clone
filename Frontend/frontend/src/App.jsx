import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { routes } from './Features/routes'
import { AuthContextProvider } from './Features/auth/context/AuthContext'
import { PostContextProvider } from './Features/posts/context/PostContext'
const App = () => {
  return (
    <PostContextProvider>
    <AuthContextProvider>
      <RouterProvider router={routes}/>
    </AuthContextProvider>
    </PostContextProvider>
  )
}

export default App