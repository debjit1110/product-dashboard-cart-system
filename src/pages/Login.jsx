import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  // keeping form fields in one state object instead of 2 separate useState calls
  const [formData, setFormData] = useState({ email: "", password: "" });
  // errors object will hold field specific error messages, empty string = no error
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(""); // general error, like wrong credentials

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // this checks the email/password rules and returns true only if everything is fine
  function validate() {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      // quick regex check - not a perfect email validator but good enough for this test
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    // if newErrors object has no keys, that means form is valid
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (!validate()) return;

    const result = login(formData);
    if (!result.success) {
      setFormError(result.message);
      return;
    }

    navigate("/dashboard");
  }

  function handleGuestLogin() {
    loginAsGuest();
    navigate("/dashboard");
  }

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div className="logo-box auth-logo">C</div>
        <span className="auth-brand">CartNest</span>

        <h1 className="auth-hero-title">Welcome back to CartNest</h1>
        <p className="auth-hero-text">
          Manage your products, cart and orders from one clean, fast dashboard
          built for modern stores.
        </p>

        <div className="auth-stats">
          <div>
            <strong>128+</strong>
            <span>Products</span>
          </div>
          <div>
            <strong>2.4k</strong>
            <span>Orders</span>
          </div>
          <div>
            <strong>4.8★</strong>
            <span>Rating</span>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-box">
          <h2>Sign in</h2>
          <p className="auth-subtitle">Enter your credentials to access the dashboard</p>

          {formError && <div className="form-alert">{formError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label className="field-label">Email address</label>
              <input
                className={`field-input ${errors.email ? "error" : ""}`}
                type="text"
                name="email"
                placeholder="you@cartnest.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <input
                className={`field-input ${errors.password ? "error" : ""}`}
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="field-error">{errors.password}</p>}
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>

          <button className="btn btn-outline btn-block guest-btn" onClick={handleGuestLogin}>
            Continue as Guest (skip login)
          </button>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
