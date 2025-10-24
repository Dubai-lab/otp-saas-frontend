import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">OTP SaaS</h2>

      <div className="sidebar-user">
        <strong>{user?.fullName}</strong>
        <small>{user?.email}</small>
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/smtp">SMTP Config</Link>
        <Link to="/dashboard/templates">Templates</Link>
        <Link to="/dashboard/apikeys">API Keys</Link>
        <Link to="/dashboard/test-otp">Test OTP</Link>
        <Link to="/dashboard/logs">Logs</Link>

        {user?.role === "admin" && (
          <>
            <hr />
            <Link to="/dashboard/admin/users">Manage Users</Link>
            <Link to="/dashboard/admin/logs">Admin Logs</Link>
          </>
        )}
      </nav>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </aside>
  );
}
