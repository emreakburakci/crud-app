// App.jsx

import React from "react";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <div>
        <br />
        <ul>
          <li>
            {/* Endpoint to route to Home component */}
            <Link to="/">Home</Link>
          </li>
          <li>
            {/* Endpoint to route to About component */}
            <Link to="/about">About</Link>
          </li>
          <li>
            {/* Endpoint to route to Contact Us component */}
            <Link to="/contactus">Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
