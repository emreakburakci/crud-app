import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Layout from "./Layout";
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
      emailId: emailRef.current.value,
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
    <Layout>
      <h1>Update Employee</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={employee?.firstName}
            ref={firstNameRef}
            placeholder="Enter first name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={employee?.lastName}
            ref={lastNameRef}
            placeholder="Enter last name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            defaultValue={employee?.emailId}
            ref={emailRef}
            placeholder="Enter email"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Layout>
  );
};

export default UpdateEmployee;
