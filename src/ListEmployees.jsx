import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ListEmployees = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("ListEmployees:: Token is", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      console.log("If entered Token is null");
      navigate("/");
    }
  }, []);
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem("token");
  const fetchEmployees = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(
        "http://95.214.177.98:8080/security/employee/getAllEmployees",
        config
      );
      setEmployees(response.data);
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
  }, []);

  return (
    <div>
      <table>
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
                <button onClick={() => deleteEmployee(employee.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => updateEmployee(employee)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default ListEmployees;
