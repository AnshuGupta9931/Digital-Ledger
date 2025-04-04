import React, { useState } from "react";
import StyledWrapper from "./FormStyles"; // Import the styled component

export const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
  };

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card2">
          <form className="form" onSubmit={handleSubmit}>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

