import React, { useState } from "react";
import StyledWrapper from "./FormStyles"; // Import the styled component
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { resetPassword } from "../services/operations/authAPI.jsx"


export const UpdatePassword = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const { loading } =  useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData( (prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, token, navigate))
    }

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card2">
          <form className="form" onSubmit={handleOnSubmit}>
            <p id="heading">Choose new password</p>
            <p className="message">
              Almost done. Enter your new password and you are all set.
            </p>

            {/* New Password */}
            <label className="field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                required
                name="password"
                value={password}
                onChange={handleOnChange}
                className="input-field"
              />
              <span
                className="input-icon"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </label>

            {/* Confirm Password */}
            <label className="field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                className="input-field"
              />
              <span
                className="input-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: "pointer" }}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </label>

            {/* Submit Button */}
            <div className="btn">
              <button type="submit" className="button1">Reset Password</button>
            </div>

          </form>

          {/* Back to Login */}
          <p className="signin">
              ← <Link to="/login">Back to Login</Link>
            </p>
        </div>
      </div>
    </StyledWrapper>
  );
};

