import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col, Table, Button, Pagination } from "react-bootstrap";
import "./ListEmployees.css";
import Layout from "./Layout";

const ListEmployees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0); // Add state for page
  const [size, setSize] = useState(5); // Add state for size
  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log("ListEmployees:: Token is", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      console.log("If entered Token is null");
      navigate("/");
    }
  }, []);

  const fetchEmployees = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      params: { page, size },
    };
    try {
      const response = await axios.get(
        "http://95.214.177.98:8080/security/employee/getAllEmployees",
        config
      );
      setEmployees(response.data.content);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure to delete this employee?")) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        await axios.delete(
          `http://95.214.177.98:8080/security/employee/deleteEmployee/${id}`,
          config
        );
        await fetchEmployees();
      } catch (error) {
        console.error("Failed to delete employee", error);
      }
    }
  };

  const updateEmployee = (employee) => {
    navigate("/updateEmployee", { state: { employee } });
  };

  useEffect(() => {
    fetchEmployees();
  }, [page, size]);

  return (
    <Layout>
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Employee List</h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.emailId}</td>
                  <td>{employee.department.name}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => updateEmployee(employee)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteEmployee(employee.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination>
            <Pagination.Prev
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
            />
            <Pagination.Item>{page + 1}</Pagination.Item>
            <Pagination.Next onClick={() => setPage((old) => old + 1)} />
          </Pagination>
        </Col>
      </Row>
    </Layout>
  );
};

export default ListEmployees;
