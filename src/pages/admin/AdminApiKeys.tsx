import { useState, useEffect } from "react";
import "./AdminApiKeys.css";

interface ApiKey {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  smtpConfig: {
    id: string;
    name: string;
  };
}

export default function AdminApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    void fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const axios = (await import("../../api/axios")).default;
      const { data } = await axios.get<ApiKey[]>("/admin/apikeys");
      setApiKeys(data || []);
    } catch (error) {
      console.error('Failed to fetch API keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, userEmail: string) => {
    if (!confirm(`Are you sure you want to delete API key for user ${userEmail}?`)) {
      return;
    }

    try {
      const axios = (await import("../../api/axios")).default;
      await axios.delete(`/admin/apikeys/${id}`);
      setApiKeys(apiKeys.filter(key => key.id !== id));
      alert('API key deleted successfully');
    } catch (error) {
      console.error('Failed to delete API key:', error);
      alert('Failed to delete API key');
    }
  };

  const filteredKeys = apiKeys.filter(key =>
    key.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    key.smtpConfig.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-api-keys">
        <div className="loading">Loading API keys...</div>
      </div>
    );
  }

  return (
    <div className="admin-api-keys">
      <div className="page-header">
        <h1>API Keys</h1>
        <p>Manage all API keys across the system</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by user email, key name, or SMTP config..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="results-count">
          {filteredKeys.length} of {apiKeys.length} API keys
        </div>
      </div>

      <div className="keys-table">
        <div className="table-header">
          <div className="col-user">User</div>
          <div className="col-name">Key Name</div>
          <div className="col-smtp">SMTP Config</div>
          <div className="col-created">Created</div>
          <div className="col-updated">Last Updated</div>
          <div className="col-actions">Actions</div>
        </div>

        {filteredKeys.length === 0 ? (
          <div className="no-results">
            {searchTerm ? 'No API keys match your search.' : 'No API keys found.'}
          </div>
        ) : (
          filteredKeys.map(key => (
            <div key={key.id} className="table-row">
              <div className="col-user">
                <div className="user-info">
                  <div className="user-email">{key.user.email}</div>
                  <div className="user-name">{key.user.fullName}</div>
                </div>
              </div>
              <div className="col-name">{key.name}</div>
              <div className="col-smtp">
                <span className="smtp-badge">{key.smtpConfig.name}</span>
              </div>
              <div className="col-created">
                {new Date(key.createdAt).toLocaleDateString()}
              </div>
              <div className="col-updated">
                {new Date(key.updatedAt).toLocaleDateString()}
              </div>
              <div className="col-actions">
                <button
                  onClick={() => handleDelete(key.id, key.user.email)}
                  className="delete-btn"
                  title="Delete API key"
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
