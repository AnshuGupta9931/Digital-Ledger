import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledWrapper from "./FormStyles"; // Your existing styled component

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card2">
          <form className="form">
            <p id="heading">Reset your password</p>
            <p className="message">
              Have no fear. We'll email you instructions to reset your password. 
              If you don’t have access to your email, we can try account recovery.
            </p>

            {/* Email Address Input */}
            <label className="field">
              <input
                type="email"
                placeholder="Enter email address"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(""); // Clear error on input change
                }}
                className="input-field"
              />
            </label>

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Submit Button */}
            <div className="btn">
              <button type="submit" className="button1">Submit</button>
            </div>

            {/* Back to Login */}
            <p className="signin">
              ← <a href="/login">Back to Login</a>
            </p>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};
