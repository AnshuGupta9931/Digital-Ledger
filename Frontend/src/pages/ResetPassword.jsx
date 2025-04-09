import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledWrapper from "./FormStyles"; // Your existing styled component

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux" 

import { getPasswordResetToken } from "../services/operations/authAPI.jsx"

export const ResetPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
}

  
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card2">
          <div className="form">
            <p id="heading">
              {!emailSent ? "Reset your password" : "Check email"}
            </p>
            <p className="message">
              {!emailSent
                  ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                  : `We have sent the reset email to ${email}`}
            </p>

            {/* Email Address Input */}
            <form onSubmit={handleOnSubmit}>

              {
                !emailSent && (
                  <label className="field">
                    <input
                      type="email"
                      placeholder="Enter email address"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="input-field"
                    />
                  </label>
                )
              }

              {/* Submit Button */}
              <div className="btn">
                <button type="submit" className="button1">
                  {!emailSent ? "Sumbit" : "Resend Email"}
                </button>
              </div>

            </form>

            {/* Error Message */}
            {/* {error && <p className="error-message">{error}</p>} */}


            {/* Back to Login */}
            <p className="signin">
              ← <Link to="/login">Back To Login</Link>
            </p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};
