import React from "react";
import { Link } from "react-router-dom";

import "../../App.css";
import { HeaderStyle } from "../../styles/styles";

export default function LandingPage() {
  return (
    <header style={HeaderStyle}>
      <h1 className="main-title text-center">login / register</h1>
      <p className="main-para text-center">
        To view registered cars and categories
      </p>
      <div className="buttons text-center">
        <Link to="/login">
          <button className="primary-button">log in</button>
        </Link>
        <Link to="/register">
          <button className="primary-button" id="reg_btn">
            <span>register </span>
          </button>
        </Link>
      </div>
    </header>
  );
}
