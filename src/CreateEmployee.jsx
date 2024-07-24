import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateEmployee = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("ListEmployees:: Token is", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      console.log("If entered Token is null");
      navigate("/");
    }
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      department: {
        id: 1,
      },
    };

    // Retrieve the token from local storage or another source
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://95.214.177.98:8080/security/employee/createEmployee",
        employeeData,
        {
          headers: {
            // Include the Authorization header with the Bearer token
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Employee created:", response.data);
      // redirect to the ListEmployees component
      navigate("/listEmployees");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div>
      <h1>Create Employee</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          placeholder="Email"
        />

        <button type="submit">Create Employee</button>
      </form>
      <ul>
        <li>
          {/* Endpoint to route to Home component */}
          <Link to="/home">Home</Link>
        </li>

        <li>
          {/* Endpoint to route to ListEmployees component */}
          <Link to="/listEmployees">List Employees</Link>
        </li>

        <li>
          {/* Endpoint to route to CreateEmployee component */}
          <Link to="/createEmployee">Create Employee</Link>
        </li>

        <li>
          {/* Endpoint to route to Contact Us component */}
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default CreateEmployee;
