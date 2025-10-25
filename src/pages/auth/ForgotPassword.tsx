import "./ForgotPassword.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/UI/Loader";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/auth/forgot-password", { email });
      toast.success("OTP sent to your email ✅");
      setStep(2);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to send OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }
    setLoading(true);

    try {
      await axios.post("/auth/reset-password", {
        otp,
        newPassword,
      });
      toast.success("Password reset successfully ✅");
      setStep(3);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to reset password ❌");
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <form className="auth-form" onSubmit={handleSendOtp}>
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

      <button type="submit" className="auth-btn">Send OTP</button>

      <div className="auth-footer">
        <p>
          Remember your password?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </form>
  );

  const renderStep2 = () => (
    <form className="auth-form" onSubmit={handleVerifyOtp}>
      <div className="form-group">
        <label htmlFor="otp">OTP</label>
        <input
          id="otp"
          type="text"
          placeholder="Enter 6-digit OTP"
          required
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        />
      </div>

      <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <input
          id="newPassword"
          type="password"
          placeholder="Enter new password"
          required
          minLength={6}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          required
          minLength={6}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="auth-btn">Reset Password</button>

      <div className="auth-footer">
        <p>
          <button
            type="button"
            className="link-button"
            onClick={() => setStep(1)}
          >
            Back to email
          </button>
        </p>
      </div>
    </form>
  );

  const renderStep3 = () => (
    <div className="auth-form">
      <div className="success-message">
        <h3>Password Reset Successful!</h3>
        <p>Your password has been updated successfully.</p>
        <Link to="/login" className="auth-btn">Sign In</Link>
      </div>
    </div>
  );

  return (
    <>
      {loading && <Loader />}
      <div className="auth-split-container">
        {/* Forgot Password Form */}
        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            <div className="auth-header">
              <Link to="/" className="back-link">← Back to Home</Link>
              <h1>Reset Password</h1>
              <p>
                {step === 1 && "Enter your email to receive a reset OTP"}
                {step === 2 && "Enter the OTP and your new password"}
                {step === 3 && "Password reset complete"}
              </p>
            </div>

            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>
        </div>

        {/* Features Section */}
        <div className="auth-features-section">
          <div className="features-content">
            <h2>Secure Password Recovery</h2>
            <p>Reset your password securely using OTP verification.</p>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">🔐</div>
                <div className="feature-text">
                  <h3>Secure Process</h3>
                  <p>OTP-based verification ensures your account security</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div className="feature-text">
                  <h3>Fast Recovery</h3>
                  <p>Get back to your account in minutes</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <div className="feature-text">
                  <h3>Protected</h3>
                  <p>Your new password is encrypted and secure</p>
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
