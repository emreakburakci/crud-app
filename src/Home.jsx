import React from "react";
// Importing Link from react-router-dom to
// navigate to different end points.
import { Link } from "react-router-dom";
// Importing useNavigate from react-router-dom
// to navigate to different end points.
import { useNavigate } from "react-router-dom";
// import use effect
import { useEffect } from "react";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("ListEmployees:: Token is", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      console.log("If entered Token is null");
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <br />
      <ul>
        <li>
          {/* Endpoint to route to Home component */}
          <Link to="/home">Home</Link>
        </li>
        <li>
          {/* Endpoint to route to Home component */}
          <Link to="/">Login</Link>
        </li>
        <li>
          {/* Endpoint to route to ListEmployees component */}
          <Link to="/listEmployees">List Employees</Link>
        </li>
        <li>
          {/* Endpoint to route to About component */}
          <Link to="/about">About</Link>
        </li>
        <li>
          {/* Endpoint to route to Contact Us component */}
          <Link to="/contactus">Contact Us</Link>
        </li>
        <li>
          {/* Endpoint to route to Contact Us component */}
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
