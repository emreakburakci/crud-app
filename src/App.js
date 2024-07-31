import logo from "./logo.svg";
import "./App.css";
// importing components from react-router-dom package
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// import Home component
import Home from "./Home";

import Login from "./Login";

import ListEmployees from "./ListEmployees";

import Logout from "./Logout";

import CreateEmployee from "./CreateEmployee";

import UpdateEmployee from "./UpdateEmployee";

import Pyomo from "./Pyomo";

function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />

          <Route path="/home" element={<Home />} />

          <Route path="/listEmployees" element={<ListEmployees />} />

          <Route path="/logout" element={<Logout />} />

          <Route path="/createEmployee" element={<CreateEmployee />} />

          <Route path="/updateEmployee" element={<UpdateEmployee />} />

          <Route path="/pyomo" element={<Pyomo />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
