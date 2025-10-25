import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="mobile-menu-btn"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Sidebar overlay for mobile */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      ></div>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2 className="sidebar-title">OTP SaaS</h2>

        <div className="sidebar-user">
          <strong>{user?.fullName}</strong>
          <small>{user?.email}</small>
          <hr className="user-separator" />
          <button
            className="logout-btn-top"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/dashboard/smtp" onClick={() => setIsOpen(false)}>SMTP Config</Link>
          <Link to="/dashboard/templates" onClick={() => setIsOpen(false)}>Templates</Link>
          <Link to="/dashboard/apikeys" onClick={() => setIsOpen(false)}>API Keys</Link>
          <Link to="/dashboard/test-otp" onClick={() => setIsOpen(false)}>Test OTP</Link>
          <Link to="/dashboard/logs" onClick={() => setIsOpen(false)}>Logs</Link>

          {user?.role === "admin" && (
            <>
              <hr />
              <Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>📊 Admin Dashboard</Link>
              <Link to="/admin/users" onClick={() => setIsOpen(false)}>👥 Manage Users</Link>
              <Link to="/admin/smtp" onClick={() => setIsOpen(false)}>📧 SMTP Configs</Link>
              <Link to="/admin/apikeys" onClick={() => setIsOpen(false)}>🔑 API Keys</Link>
              <Link to="/admin/templates" onClick={() => setIsOpen(false)}>📄 Templates</Link>
              <Link to="/admin/logs" onClick={() => setIsOpen(false)}>📋 System Logs</Link>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
