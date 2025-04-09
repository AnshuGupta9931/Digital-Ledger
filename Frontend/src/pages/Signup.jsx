import React, { useState } from "react";
import signupImg from "../assets/Images/signup.png";
import {Tab} from "../components/common/Tab.jsx"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../services/operations/authAPI.jsx"
import { setSignupData } from "../slices/authSlice"
import { ACCOUNT_TYPE } from "../utils/constants"
import { toast } from "react-hot-toast"


export const Signup = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()


    // student or instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const { firstName, lastName, email, password, confirmPassword } = formData;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    // Handle input fields, when some value changes
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
        }))
    }

    // Handle Form Submission
    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }
        const signupData = {
            ...formData,
            accountType,
        } 

        // Setting signup data to state to be used after otp verification
        dispatch(setSignupData(signupData))
        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate))

        // Reset
        setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }

    // data to pass to Tab component
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Admin",
            type: ACCOUNT_TYPE.ADMIN,
        },
    ]

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "oklch(87% 0.065 274.039)" }}
    >
      <div className="w-full max-w-6xl flex flex-col md:flex-row backdrop-blur-md bg-black/20 rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        
        {/* Left Form Section */}
        <div
          className="w-full md:w-1/2 p-10 text-white"
          style={{ color: "oklch(54.6% 0.245 262.881)" }}
        >
          {/* Stylish Heading */}
          <h1
            className="text-5xl font-extrabold tracking-wide uppercase mb-4 drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
            style={{ color: "oklch(42.4% 0.199 265.638)" }}
          >
            Digital Ledger
          </h1>

          {/* Subheading */}
          <h2 className="text-xl font-bold tracking-wide mb-2 text-white">
            Create your account
          </h2>
          <p className="mb-6 text-base font-semibold leading-relaxed text-white/90">
            Track, manage, and visualize your spending beautifully.
          </p>

          {/* Sign up with Google */}
          <button className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-white text-black rounded-lg font-semibold shadow hover:scale-[1.02] transition mb-5">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Icon"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          {/* Role Tabs */}
          {/* <div className="flex gap-4 mb-5">
            {["student", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-5 py-2 rounded-full font-semibold text-sm capitalize transition-all ${
                  role === r
                    ? "bg-white text-black shadow-md"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {r}
              </button>
            ))}
          </div> */}
          <Tab tabData={tabData} field={accountType} setField={setAccountType} />

          {/* Form */}
          <form className="space-y-4" onSubmit={handleOnSubmit}>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 p-3 rounded-lg bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 p-3 rounded-lg bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
              />
            </div>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300"
              name="email"
              value={email}
              onChange={handleOnChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300"
              name="password"
              value={password}
              onChange={handleOnChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
            />

            <div className="flex items-center text-sm gap-2 text-white/80">
              <input type="checkbox" className="accent-pink-400" />
              <span>
                I agree with{" "}
                <a href="#" className="font-medium underline underline-offset-2 text-white">
                  Terms and Privacy
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full font-semibold py-3 rounded-lg text-white transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: "oklch(42.4% 0.199 265.638)",
              }}
            >
              Sign up 
            </button>

            <p className="text-center text-sm mt-4 text-white/80">
              Already a member?{" "}
              <a href="#" className="font-medium underline underline-offset-2 text-white">
                Login
              </a>
            </p>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-1/2 bg-white/5 flex items-center justify-center p-6">
          <img
            src={signupImg}
            alt="Signup Illustration"
            className="w-[95%] max-w-xl object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
