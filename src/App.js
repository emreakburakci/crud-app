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
// import About component
import About from "./About";
// import ContactUs component
import ContactUs from "./ContactUs";

import Login from "./Login";

import ListEmployees from "./ListEmployees";

import Logout from "./Logout";

function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/" element={<Login />} />

          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component
           */}
          <Route path="/about" element={<About />} />

          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component
           */}
          <Route path="/home" element={<Home />} />

          <Route path="/listEmployees" element={<ListEmployees />} />

          <Route path="/logout" element={<Logout />} />

          {/* This route is for contactus component
          with exact path "/contactus", in 
          component props we passes the imported component*/}
          <Route path="/contactus" element={<ContactUs />} />

          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          {/* <Redirect to="/" /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
