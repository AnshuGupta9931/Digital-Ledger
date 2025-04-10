import { useState } from "react"
import React from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI.jsx"
import { setSignupData } from "../../../slices/authSlice.jsx"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import {Tab} from "../../common/Tab"

export const SignupForm =() =>{
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const { firstName, lastName, email, password, confirmPassword } = formData
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    const signupData = { ...formData, accountType }

    dispatch(setSignupData(signupData))
    dispatch(sendOtp(formData.email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  const tabData = [
    { id: 1, tabName: "Student", type: ACCOUNT_TYPE.STUDENT },
    { id: 2, tabName: "Instructor", type: ACCOUNT_TYPE.INSTRUCTOR },
  ]

  const handleGoogleSignup = () => {
    // Optional: Implement OAuth here
    toast("Google signup not implemented yet")
  }

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      {/* Google Signup */}
      <button
        onClick={handleGoogleSignup}
        className="mt-6 w-full rounded-[8px] border border-richblack-700 bg-richblack-800 py-[8px] px-[12px] text-richblack-100 flex items-center justify-center gap-2"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} />
        Sign up with Google
      </button>

      {/* Divider */}
      <div className="my-4 flex items-center gap-2 text-richblack-600">
        <div className="h-[1px] flex-1 bg-richblack-700"></div>
        OR
        <div className="h-[1px] flex-1 bg-richblack-700"></div>
      </div>

      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-sm text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5"
            />
          </label>
          <label>
            <p className="mb-1 text-sm text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-sm text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email"
            className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative w-full">
            <p className="mb-1 text-sm text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full rounded-md bg-richblack-800 p-3 pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 cursor-pointer"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>

          <label className="relative w-full">
            <p className="mb-1 text-sm text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="w-full rounded-md bg-richblack-800 p-3 pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 cursor-pointer"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-md bg-yellow-50 py-2 px-3 font-medium text-richblack-900"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignupForm
