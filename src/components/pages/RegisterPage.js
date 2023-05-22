import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../api_config";
import "../../App.css";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API_BASE_URL}/users/register`, {
      email,
    });
    const form = e.target;
    alert(
      "An email has been sent to " +
        form.email.value +
        " with initial login password."
    );
    form.reset();
  };
  return (
    <div className="text-center m-5-auto">
      <h2>Join us</h2>
      <h5>Create your personal account</h5>
      <form onSubmit={onSubmit}>
        <p>
          <label>Username</label>
          <br />
          <input type="text" name="first_name" required />
        </p>
        <p>
          <label>Email address</label>
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
          <button id="sub_btn" type="submit">
            Register
          </button>
        </p>
      </form>
      <footer>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
