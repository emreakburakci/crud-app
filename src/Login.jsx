import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//can be replaced by react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  if (localStorage.getItem("token") !== null) {
    navigate("/home");
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://95.214.177.98:8080/security/api/login",
        {
          username: username,
          password: password,
        }
      );
      //get http code from response
      console.log("HTTP CODE: ", response.status);
      if (response.status === 200) {
        console.log("RESPONSE FROM API: ", response);
        console.log("TOKEN FROM API: ", response.data);
        localStorage.setItem("token", response.data);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        console.log(
          "TOKEN FROM LOCAL STORAGE: ",
          localStorage.getItem("token")
        );
        navigate("/");
      } else {
        setErrorMessage("Failed to login. Please check your credentials.");
      }
    } catch (error) {
      // Handle login error (e.g., invalid credentials)
      setErrorMessage("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleLogin}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <h6 className="Auth-form-title" style={{ color: "red" }}>
            {errorMessage && <p>{errorMessage}</p>}
          </h6>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
