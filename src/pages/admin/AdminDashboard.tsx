import { useState, useEffect } from "react";
import "./AdminDashboard.css";

interface SystemStats {
  users: number;
  smtpConfigs: number;
  apiKeys: number;
  templates: number;
  totalLogs: number;
  sentToday: number;
  failedCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await (await import("../../api/axios")).default.get<SystemStats>("/admin/stats");
      setStats(data || { users: 0, smtpConfigs: 0, apiKeys: 0, templates: 0, totalLogs: 0, sentToday: 0, failedCount: 0 });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanup = async () => {
    if (!confirm('Are you sure you want to cleanup old data? This will delete logs older than 90 days.')) {
      return;
    }

    try {
      const axios = (await import("../../api/axios")).default;
      await axios.post('/admin/cleanup');
      alert('Cleanup completed successfully');
      void fetchStats(); // Refresh stats
    } catch (error) {
      console.error('Cleanup failed:', error);
      alert('Cleanup failed');
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>System overview and management</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats?.users || 0}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📧</div>
          <div className="stat-content">
            <h3>{stats?.smtpConfigs || 0}</h3>
            <p>SMTP Configurations</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔑</div>
          <div className="stat-content">
            <h3>{stats?.apiKeys || 0}</h3>
            <p>API Keys</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div className="stat-content">
            <h3>{stats?.templates || 0}</h3>
            <p>Email Templates</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats?.totalLogs || 0}</h3>
            <p>Total Logs</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📤</div>
          <div className="stat-content">
            <h3>{stats?.sentToday || 0}</h3>
            <p>Sent Today</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <h3>{stats?.failedCount || 0}</h3>
            <p>Failed Sends</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <button onClick={handleCleanup} className="cleanup-btn">
          🧹 Cleanup Old Data
        </button>
        <p className="cleanup-note">
          This will delete logs older than 90 days to free up space.
        </p>
      </div>
    </div>
  );
}
