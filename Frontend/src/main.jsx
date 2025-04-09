import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'

//Am
import {Provider} from "react-redux"
import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "./reducers/index.jsx"
import {Toaster} from "react-hot-toast"
import "./index.css"

import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, RouterProvider,Route} from "react-router-dom"
import Layout from "./Layout"
import { Home } from './pages/Home.jsx'
import {Login} from "./pages/Login.jsx"
import { Signup } from './pages/Signup.jsx'
import { ResetPassword } from './pages/ResetPassword.jsx'
import { VerifyEmail } from './pages/VerifyEmail.jsx'
import { UpdatePassword } from './pages/UpdatePassword.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
        <Route path='' element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='reset-password' element={<ResetPassword/>}/>
        <Route path='verify-email' element={<VerifyEmail/>} />
        <Route path='update-password/:id' element={<UpdatePassword/>}/>
      </Route>
  )
)


//Am
const store = configureStore({
  reducer: rootReducer,
})

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <Toaster/>
        <RouterProvider router={router}/>
      </Provider>
    </StrictMode>
)
