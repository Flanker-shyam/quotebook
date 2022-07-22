
import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./Login";
import SignUp from "./Signup";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Quotes from "./Quotes";
import SignUpConfirm from "./SignUpConfirm";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>

          <Route path="/" element={<Quotes />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<SignUp />} />

          <Route path="/confirmation" element={<SignUpConfirm />} />

        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App;