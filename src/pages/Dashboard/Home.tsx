import "./Home.css";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [stats, setStats] = useState({
    smtpCount: 0,
    templateCount: 0,
    apiKeyCount: 0,
    sentToday: 0,
    failedCount: 0,
  });

  useEffect(() => {
    void fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("/logs/stats");

      setStats(res.data);
    } catch (err) {
      console.error("Stats fetch failed", err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome Back 👋</h2>
      <p>Your OTP service activity summary</p>

      <div className="cards">
        <Link to="/dashboard/smtp" className="card">
          <h3>SMTP Configs</h3>
          <p>{stats.smtpCount}</p>
        </Link>

        <Link to="/dashboard/templates" className="card">
          <h3>Templates</h3>
          <p>{stats.templateCount}</p>
        </Link>

        <Link to="/dashboard/apikeys" className="card">
          <h3>API Keys</h3>
          <p>{stats.apiKeyCount}</p>
        </Link>

        <div className="card">
          <h3>Sent Today</h3>
          <p>{stats.sentToday}</p>
        </div>

        <div className="card card-danger">
          <h3>Failed Emails</h3>
          <p>{stats.failedCount}</p>
        </div>
      </div>

      <div className="actions">
        <Link to="/dashboard/test-otp" className="test-btn">
          Send Test OTP 🚀
        </Link>
      </div>
    </div>
  );
}
