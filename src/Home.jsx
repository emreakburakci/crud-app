import React from "react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Layout from "./Layout";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Home:: Token is", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      console.log("If entered Token is null");
      navigate("/");
    }
  }, []);

  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  );
};

export default Home;
