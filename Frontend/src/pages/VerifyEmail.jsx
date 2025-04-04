import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import StyledWrapper from "./FormStyles";

export const VerifyEmail = () => {
  const location = useLocation();
  const email = location.state?.email || "your email"; // Get email from ResetPassword

  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    alert(`Verifying OTP: ${otp} for ${email}`);
  };

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card2">
          <form className="form">
            <p id="heading">Verify Email</p>
            <p className="message">A verification code has been sent to {email}. Enter the code below.</p>

            {/* OTP Input Fields */}
            <div className="otp-container">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                isInputNum={true}
                shouldAutoFocus={true}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "50px",
                  height: "50px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                  backgroundColor: "#1a1a1a",
                  color: "#fff",
                  border: "1px solid #ffc107",
                  borderRadius: "5px",
                  margin: "0 5px",
                }}
                focusStyle={{ border: "2px solid #ffc107" }}
              />
            </div>

            {/* Verify Button */}
            <div className="btn">
              <button type="button" className="button1" onClick={handleVerify}>
                Verify Email
              </button>
            </div>

            {/* Back to Signup */}
            <p className="signin">
              ← <a href="/signup">Back to Signup</a>
            </p>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};
