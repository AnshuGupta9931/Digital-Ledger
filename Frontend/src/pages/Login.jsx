import React from "react";
import LoginImage from "../assets/Images/Login.png"
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react"
//import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { login } from "../services/operations/authAPI.jsx"

export const Login =()=> {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#e3edf7] to-[#f3f7fb] p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel */}
        <div className="w-full md:w-1/2 p-10">
          <div className="flex items-center space-x-2 mb-10">
            <div className="w-6 h-6 bg-black rounded-full" />
            <h1 className="text-xl font-semibold">DIGITAL LEDGER</h1>
          </div>

          <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-gray-500 mb-6">Please enter log in details below</p>

          <form className="space-y-4" onSubmit={handleOnSubmit}>
            <input
              name="email"
              value={email}
              onChange={handleOnChange}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="relative">
              <input
                name="password"
                value={password}
                onChange={handleOnChange}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              />
              <FaEyeSlash className="absolute top-3 right-4 text-gray-400" />
            </div>
            <Link to="/reset-password">
              <div className="text-right text-sm text-gray-500 hover:underline cursor-pointer">
                Forgot password
              </div>
            </Link>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900"
            >
              Sign in
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-sm text-gray-500">or continue</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center gap-2 border py-3 rounded-xl hover:bg-gray-100">
            <FcGoogle className="text-xl" />
            Log in with Google
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account? <span className="text-black font-semibold cursor-pointer hover:underline">Sign Up</span>
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center text-white p-10 relative">
          <img
            src={LoginImage}
            alt="3D Boy with Laptop"
            className="w-[85%] h-auto object-contain"
          />
        </div>


      </div>
    </div>
  );
}
