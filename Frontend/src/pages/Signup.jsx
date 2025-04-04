import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledWrapper from "./FormStyles";

export const Signup = () => {
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Simulated API Call to send verification email
      // const response = await fetch("https://your-backend.com/api/send-verification", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: formData.email }),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to send verification email.");
      // }

      // Navigate to Verify Email page
      navigate("/verify-email", { state: { email: formData.email } });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card2">
          <form className="form" onSubmit={handleSubmit}>
            <p id="heading">Signup</p>

            <div className="user-type-toggle">
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  checked={userType === "user"}
                  onChange={() => setUserType("user")}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="admin"
                  checked={userType === "admin"}
                  onChange={() => setUserType("admin")}
                />
                Admin
              </label>
            </div>

            <div className="flex">
              <label className="field">
                <span className="input-icon">👤</span>
                <input
                  required
                  name="firstname"
                  placeholder="Firstname"
                  type="text"
                  className="input-field"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </label>
              <label className="field">
                <span className="input-icon">👤</span>
                <input
                  required
                  name="lastname"
                  placeholder="Lastname"
                  type="text"
                  className="input-field"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label className="field">
              <span className="input-icon">📧</span>
              <input
                required
                name="email"
                placeholder="Email"
                type="email"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label className="field">
              <span className="input-icon">🔒</span>
              <input
                required
                name="password"
                placeholder="Password"
                type="password"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
              />
            </label>

            <label className="field">
              <span className="input-icon">🔒</span>
              <input
                required
                name="confirmPassword"
                placeholder="Confirm password"
                type="password"
                className="input-field"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </label>

            {error && <p className="error">{error}</p>}

            <div className="btn">
              <button type="submit" className="button1">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};
