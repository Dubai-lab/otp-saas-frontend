import { useState, useEffect } from "react";
import "./AdminSMTP.css";

interface SMTPConfig {
  id: string;
  name: string;
  host: string;
  port: number;
  email: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function AdminSMTP() {
  const [configs, setConfigs] = useState<SMTPConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      const response = await fetch('/api/admin/smtp', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setConfigs(data);
      }
    } catch (error) {
      console.error('Failed to fetch SMTP configs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, userEmail: string) => {
    if (!confirm(`Are you sure you want to delete SMTP config for user ${userEmail}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/smtp/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        setConfigs(configs.filter(config => config.id !== id));
        alert('SMTP config deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete SMTP config:', error);
      alert('Failed to delete SMTP config');
    }
  };

  const filteredConfigs = configs.filter(config =>
    config.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.host.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-smtp">
        <div className="loading">Loading SMTP configurations...</div>
      </div>
    );
  }

  return (
    <div className="admin-smtp">
      <div className="page-header">
        <h1>SMTP Configurations</h1>
        <p>Manage all SMTP configurations across the system</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by user email, config name, or host..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="results-count">
          {filteredConfigs.length} of {configs.length} configurations
        </div>
      </div>

      <div className="configs-table">
        <div className="table-header">
          <div className="col-user">User</div>
          <div className="col-name">Config Name</div>
          <div className="col-host">SMTP Host</div>
          <div className="col-port">Port</div>
          <div className="col-email">Email</div>
          <div className="col-updated">Last Updated</div>
          <div className="col-actions">Actions</div>
        </div>

        {filteredConfigs.length === 0 ? (
          <div className="no-results">
            {searchTerm ? 'No configurations match your search.' : 'No SMTP configurations found.'}
          </div>
        ) : (
          filteredConfigs.map(config => (
            <div key={config.id} className="table-row">
              <div className="col-user">
                <div className="user-info">
                  <div className="user-email">{config.user.email}</div>
                  <div className="user-name">{config.user.fullName}</div>
                </div>
              </div>
              <div className="col-name">{config.name}</div>
              <div className="col-host">{config.host}</div>
              <div className="col-port">{config.port}</div>
              <div className="col-email">{config.email}</div>
              <div className="col-updated">
                {new Date(config.updatedAt).toLocaleDateString()}
              </div>
              <div className="col-actions">
                <button
                  onClick={() => handleDelete(config.id, config.user.email)}
                  className="delete-btn"
                  title="Delete configuration"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
