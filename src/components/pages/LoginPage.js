import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../api_config";
import "../../App.css";

const SignInPage = ({ login, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API_BASE_URL}/users/login`, {
      email,
      password,
    });
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    }
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Sign in</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <p>
          <label>Username or email address</label>
          <br />
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </p>
        <p>
          <label>Password</label>
          <Link to="/forget-password">
            <label className="right-label">Forget password?</label>
          </Link>
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Login
          </button>
        </p>
      </form>
      <footer>
        <p>
          First time? <Link to="/register">Create an account</Link>.
        </p>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
};

export default SignInPage;
