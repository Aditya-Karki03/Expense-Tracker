import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Sign from './Pages/Sign.tsx'
import Dashboard from './Pages/Dashboard.tsx'

const routes=createBrowserRouter([
  {
  path:'/',
  element:<Sign/>
  },{
    path:'/dashboard',
    element:<Dashboard/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={routes}/>
    </ChakraProvider>
  </React.StrictMode>,
)
