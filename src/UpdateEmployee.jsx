import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const UpdateEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(location.state.employee);
  const token = localStorage.getItem("token");

  const firstNameRef = React.createRef();
  const lastNameRef = React.createRef();
  const emailRef = React.createRef();
  useEffect(() => {
    console.log("ListEmployees:: Token is", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      console.log("If entered Token is null");
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (!employee) {
      console.log("Employee is null");
      navigate("/"); // Redirect if no employee data is passed
    }
    console.log("Employee data:", employee);
  }, [employee, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployee = {
      ...employee,
      id: employee.id,
      firstName: firstNameRef.current.value,
      email: emailRef.current.value,
      lastName: lastNameRef.current.value,
    };
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Add this line with your token
        },
      };
      await axios.put(
        `http://95.214.177.98:8080/security/employee/updateEmployee`,
        updatedEmployee,
        config // Pass the config object here
      );
      navigate("/listEmployees"); // Redirect after update
    } catch (error) {
      console.error("Failed to update employee", error);
    }
  };

  return (
    <div>
      <h1>Update Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={employee.firstName}
            ref={firstNameRef}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={employee.lastName}
            ref={lastNameRef}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={employee.emailId}
            ref={emailRef}
          />
        </div>
        <button type="submit">Update Employee</button>
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

export default UpdateEmployee;
