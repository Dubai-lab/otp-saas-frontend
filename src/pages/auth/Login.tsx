import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/UI/Loader";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.accessToken);
      toast.success("Login successful ✅");
      // Navigate to dashboard without full page reload
      navigate("/dashboard");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="auth-split-container">
        {/* Login Form */}
        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            <div className="auth-header">
              <Link to="/" className="back-link">← Back to Home</Link>
              <h1>Welcome Back</h1>
              <p>Sign in to your OTP SaaS account</p>
            </div>

            <form className="auth-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="auth-btn">Sign In</button>

              <div className="auth-footer">
                <p>
                  <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
                </p>
                <p>
                  Don’t have an account?{" "}
                  <Link to="/register">Create one</Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <div className="auth-features-section">
          <div className="features-content">
            <h2>Secure Authentication Made Simple</h2>
            <p>Join thousands of developers who trust our platform for reliable OTP delivery.</p>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">🔐</div>
                <div className="feature-text">
                  <h3>Enterprise Security</h3>
                  <p>Bank-grade encryption and secure OTP generation</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div className="feature-text">
                  <h3>Lightning Fast</h3>
                  <p>Deliver OTP emails in under 2 seconds globally</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🎨</div>
                <div className="feature-text">
                  <h3>Custom Templates</h3>
                  <p>Design beautiful emails that match your brand</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <div className="feature-text">
                  <h3>Real-time Analytics</h3>
                  <p>Track delivery rates and user engagement</p>
                </div>
              </div>
            </div>

            <div className="features-cta">
              <p>New to OTP SaaS?</p>
              <Link to="/register" className="cta-link">Create your account →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
