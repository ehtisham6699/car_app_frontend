import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderStyle } from "../../styles/styles";
import axios from "axios";
import API_BASE_URL from "./../../api_config";
import "../../App.css";

const HomePage = () => {
  const Navigate = useNavigate();
  const [registeredCars, setRegisteredCars] = useState(0);
  const token = localStorage.getItem("token");
  const checkUserLogin = () => {
    if (!localStorage.getItem("token")) {
      Navigate("/");
    }
  };

  useEffect(() => {
    checkUserLogin();
    const fetchRegisteredCars = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cars?page=${1}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRegisteredCars(response.data.totalRows);
      } catch (error) {
        console.error("Error fetching registered cars:", error);
      }
    };

    fetchRegisteredCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header style={HeaderStyle}>
      <h1 className="main-title text-center">Total Cars Registered</h1>
      <p className="main-para text-center">{registeredCars}</p>
      <div className="buttons text-center">
        <Link to="/categories">
          <button className="primary-button" id="cat_btn">
            <span>Categories </span>
          </button>
        </Link>
        <Link to="/cars">
          <button className="primary-button" id="car_btn">
            <span>Cars </span>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default HomePage;
