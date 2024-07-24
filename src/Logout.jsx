import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("token") == null) {
    navigate("/");
  }
  useEffect(() => {
    localStorage.removeItem("token"); // Remove the token from local storage
    localStorage.removeItem("username"); // Remove the user from local storage
    localStorage.removeItem("password"); // Remove the role from local storage
    navigate("/login"); // Redirect to login
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
