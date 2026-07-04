import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // confirm password just needs to match the password field exactly
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    setSuccessMsg("");

    if (!validate()) return;

    const result = register(formData);
    if (!result.success) {
      setFormError(result.message);
      return;
    }

    setSuccessMsg("Account created! Redirecting to login...");
    // small delay just so the user actually sees the success message before we redirect
    setTimeout(() => navigate("/login"), 1200);
  }

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div className="logo-box auth-logo">C</div>
        <span className="auth-brand">CartNest</span>

        <h1 className="auth-hero-title">Create your CartNest account</h1>
        <p className="auth-hero-text">
          Set up your store in minutes. Add products, track carts and manage
          orders with a simple, responsive dashboard.
        </p>

        <div className="auth-stats">
          <div>
            <strong>Free</strong>
            <span>To start</span>
          </div>
          <div>
            <strong>5 min</strong>
            <span>Setup</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Support</span>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-box">
          <h2>Create account</h2>
          <p className="auth-subtitle">Fill in your details to get started</p>

          {formError && <div className="form-alert">{formError}</div>}
          {successMsg && <div className="form-alert success">{successMsg}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label className="field-label">Full name</label>
              <input
                className={`field-input ${errors.name ? "error" : ""}`}
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

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
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="field-error">{errors.password}</p>}
            </div>

            <div className="field-group">
              <label className="field-label">Confirm password</label>
              <input
                className={`field-input ${errors.confirmPassword ? "error" : ""}`}
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="field-error">{errors.confirmPassword}</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Create Account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
