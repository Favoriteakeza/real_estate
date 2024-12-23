import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios";
const SignUp = ({ url }) => {
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const roles = "client";
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!names || !email || !password || !confirmPassword) {
      setError("please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("password do not match");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid Email");
      return;
    }

    const data = { names, email, password, roles };
    const config = {
      method: "post",
      url: url + "api/users/register",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log("Sending request:", config); // Log the request config

    try {
        const response = await axios(config);
        console.log("Response received:", response.data); // Log the response
        if (response.status === 200) {
          setMessage("Sign up successful. Check your email to verify your account.");
          localStorage.setItem("email", email); // Save email for verification
          navigate("/verify-email"); // Redirect to the verification page
        }
         else {
            setError("Sign up failed: " + response.status);
        }
    } catch (error) {
        console.error("Error during request:", error.response || error.message); // Log error details
        setError(
            error.response?.data?.error || "Something went wrong. Please try again."
        );
    }
};

  return (
    <div className="signup__home sign__bg">
      <div className="signup__card">
        <div className="signup__forms">
          <h2 className="signup__header">Sign Up</h2>
          {error && <span className="error">{error}</span>}
          {message && <span className="message">{message}</span>}
          <form onSubmit={handleSubmit} className="sign__form">
            <label className="login__label">Names</label>
            <input
              type="text"
              placeholder="Enter Names"
              className="login__input"
              value={names}
              onChange={(e) => setNames(e.target.value)}
            />
            <label className="login__label">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="login__label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="login__label">Confirm password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="login__input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="form__btn">
              Sign up
            </button>
            <Link to="/login" className="signup__links">
              Already Have an account? Login
            </Link>
          </form>
        </div>
      </div>

      <div className="signup__content">
        <h2 className="headers">Join Our Fast Growing Company</h2>
        <p className="headers__p">
          Find Better home to create Memories with your loved one
        </p>
      </div>
    </div>
  );
};

export default SignUp;
