import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, RouterProvider,Route} from "react-router-dom"
import Layout from "./Layout"
import { Home } from './pages/Home.jsx'
import {Login} from "./pages/Login.jsx"
import { Signup } from './pages/Signup.jsx'
import { ResetPassword } from './pages/ResetPassword.jsx'
import { VerifyEmail } from './pages/VerifyEmail.jsx'
import { DashboardHeader, DashboardLayout, Sidebar } from "./components/Dashboard";
import { DashboardHome } from './components/Dashboard/pages/DashboardHome.jsx'
import { Transactions } from './components/Dashboard/pages/Transactions.jsx'
import Categories from './components/Dashboard/pages/Categories.jsx'
import { RecurringBills } from './components/Dashboard/pages/RecuringBills.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Layout/>}>
        <Route path='' element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='reset-password' element={<ResetPassword/>}/>
        <Route path='verify-email' element={<VerifyEmail/>} />
      </Route>

      <Route path='/dashboard' element={<DashboardLayout/>} >
      <Route path='' element={<DashboardHome/>}/>
      <Route path='transaction' element={<Transactions/>}/>
      <Route path='categories' element={<Categories/>}/>
      <Route path='recuringbills' element={<RecurringBills/>} />
      </Route>
      </>
  )
)



createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>
)
