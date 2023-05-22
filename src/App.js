import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import HomePage from "./components/pages/HomePage";
import Cars from "./components/pages/Cars";
import Categories from "./components/pages/Categories";
import "./App.css";

const Root = ({ isLogin }) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={isLogin ? <Navigate to="/home" /> : <LandingPage />}
        />
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
  );
};

export default function App() {
  const [loginUser, setLoginUser] = useState(false);
  useEffect(() => {
    const logged = localStorage.getItem("token") !== null;
    logged ? setLoginUser(true) : setLoginUser(false);
  }, []);
  return (
    <div className="App">
      <Root isLogin={loginUser} />
    </div>
  );
}
