import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Button, Form } from "react-bootstrap";
import Layout from "./Layout";
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
    <Layout>
      <h1>Add Employee</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Layout>
  );
};

export default CreateEmployee;
