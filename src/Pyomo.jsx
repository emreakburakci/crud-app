import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import "./ListEmployees.css";
import Layout from "./Layout";

const Pyomo = () => {
  const navigate = useNavigate();
  const [pyomoData, setPyomoData] = useState([]);

  const token = localStorage.getItem("token");
  const fetchPyomoData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(
        "http://95.214.177.98:8080/security/pyomo/runScript",
        config
      );
      console.log("Pyomo data:", response.data);
      setPyomoData(response.data);
    } catch (error) {
      console.error("Error fetching pyomo data:", error);
    }
  };

  useEffect(() => {
    fetchPyomoData();
  }, []);

  return (
    <Layout>
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Pyomo Output</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {pyomoData ? (
            <pre>{JSON.stringify(pyomoData, null, 2)}</pre>
          ) : (
            "Loading..."
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default Pyomo;
