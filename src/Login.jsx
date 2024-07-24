import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div>
      <h1>Login Page</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contactus">Contact Us</Link>
        </li>
      </ul>
    </div>
  );
};

export default Login;
