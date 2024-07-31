import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Call the logout endpoint with the Bearer token
          var result = await axios.post(
            "http://95.214.177.98:8080/security/api/logout",
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }

        // Remove the token and other user data from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        console.log("Logout completed: ", result);
        // Redirect to login
        navigate("/login");
      } catch (error) {
        console.error("Error during logout:", error);
        // Handle error (optional)
      }
    };

    if (localStorage.getItem("token") == null) {
      console.log("No token found, redirecting to login");
      navigate("/");
    } else {
      console.log("Logging out...");
      logout();
    }
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
