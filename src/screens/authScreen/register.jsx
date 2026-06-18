import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Constants } from "../../apis/constant";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";
import { mainWrapper } from "../../apis/main";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    } else if (formData.fullname.trim().length < 3) {
      newErrors.fullname =
        "Full name must be at least 3 characters";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      let body = {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
      }
      const response = await mainWrapper.post(`${Constants.URL}/users/register`, body);
      if (response && response.success) {
        dispatch(setUser(response.userData));
        toast.success(response.message);
        navigate("/");
      } else {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <h1>Create Account</h1>

          <p>
            Join thousands of customers
            shopping premium products every day.
          </p>

          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
            alt="register"
          />
        </div>

        <div className="auth-right">
          <h2>Register</h2>

          <form
            className="auth-form"
            onSubmit={handleRegister}
          >
            <div className="input-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter full name"
              />

              {errors.fullname && (
                <span className="error-text">
                  {errors.fullname}
                </span>
              )}
            </div>

            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />

              {errors.email && (
                <span className="error-text">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
              />

              {errors.password && (
                <span className="error-text">
                  {errors.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            <p className="auth-footer">
              Already have an account?{" "}
              <Link to="/">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;