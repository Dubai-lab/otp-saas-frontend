import "./Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/UI/Loader";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/auth/register", {
        fullName,
        email,
        password,
      });

      toast.success("Account created ✅ Login now!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="auth-split-container">
        {/* Register Form */}
        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            <div className="auth-header">
              <Link to="/" className="back-link">← Back to Home</Link>
              <h1>Join OTP SaaS</h1>
              <p>Create your account and start sending secure OTP emails</p>
            </div>

            <form className="auth-form" onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

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
                  placeholder="Create a password (min 6 characters)"
                  minLength={6}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="auth-btn">Create Account</button>

              <div className="auth-footer">
                <p>
                  Already have an account?{" "}
                  <Link to="/login">Sign in</Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <div className="auth-features-section">
          <div className="features-content">
            <h2>Start Building Secure Apps</h2>
            <p>Get started with our OTP service and add enterprise-grade authentication to your applications.</p>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <div className="feature-text">
                  <h3>Quick Setup</h3>
                  <p>Get your API keys and start sending OTPs in under 5 minutes</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <div className="feature-text">
                  <h3>Secure by Default</h3>
                  <p>Built-in security features protect your users and your data</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">📈</div>
                <div className="feature-text">
                  <h3>Scale with You</h3>
                  <p>From startup to enterprise, our platform grows with your needs</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">💡</div>
                <div className="feature-text">
                  <h3>Developer Friendly</h3>
                  <p>Comprehensive documentation and SDKs for all major languages</p>
                </div>
              </div>
            </div>

            <div className="features-cta">
              <p>Already have an account?</p>
              <Link to="/login" className="cta-link">Sign in to your dashboard →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
