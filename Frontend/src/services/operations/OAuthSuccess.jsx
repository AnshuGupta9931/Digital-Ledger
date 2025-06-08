import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/profileSlice";

export const OAuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const userString = query.get("user");

    if (token) {
      localStorage.setItem("token", token);

      if (userString) {
        try {
          const userData = JSON.parse(decodeURIComponent(userString));
          localStorage.setItem("user", JSON.stringify(userData));
          dispatch(setUser(userData)); // ✅ Update Redux state
        } catch (err) {
          console.error("Failed to parse user data:", err);
          navigate("/login");
          return;
        }
      }

      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, location]);

  return <p>Signing you in via Google...</p>;
};
