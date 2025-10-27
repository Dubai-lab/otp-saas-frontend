import { useState, useEffect } from "react";
import "./AdminLogs.css";

interface LogEntry {
  id: string;
  recipient: string;
  otp?: string;
  subject: string;
  provider: string;
  type: 'otp' | 'email';
  status: 'pending' | 'sent' | 'failed' | 'verified';
  error?: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  createdAt: string;
}

export default function AdminLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  useEffect(() => {
    void fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setError(null);
      const axios = (await import("../../api/axios")).default;
      const { data } = await axios.get<LogEntry[]>("/admin/otp-logs");
      setLogs(data);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
      setError('Failed to fetch logs');
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return '#10b981';
      case 'verified': return '#3b82f6';
      case 'failed': return '#ef4444';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return '📤';
      case 'verified': return '✅';
      case 'failed': return '❌';
      case 'pending': return '⏳';
      default: return '📝';
    }
  };

  const filteredLogs = logs.filter(log => {
    const recipient = (log.recipient || '').toLowerCase();
    const userEmail = (log.user?.email || '').toLowerCase();
    const subject = (log.subject || '').toLowerCase();
    const provider = (log.provider || '').toLowerCase();

    const q = searchTerm.toLowerCase();
    const matchesSearch = recipient.includes(q) || userEmail.includes(q) || subject.includes(q) || provider.includes(q);

    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesType = typeFilter === 'all' || log.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  if (loading) {
    return (
      <div className="admin-logs">
        <div className="loading">Loading system logs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-logs">
        <div className="loading">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-logs">
      <div className="page-header">
        <h1>System Logs</h1>
        <p>View all OTP and email activity across the system</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by recipient, user email, subject, or provider..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="sent">Sent</option>
            <option value="verified">Verified</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="otp">OTP</option>
            <option value="email">Email</option>
          </select>
        </div>

        <div className="results-count">
          {filteredLogs.length} of {logs.length} logs
        </div>
      </div>

      <div className="logs-table">
        <div className="table-header">
          <div className="col-timestamp">Timestamp</div>
          <div className="col-user">User</div>
          <div className="col-recipient">Recipient</div>
          <div className="col-type">Type</div>
          <div className="col-status">Status</div>
          <div className="col-subject">Subject</div>
          <div className="col-provider">Provider</div>
          <div className="col-details">Details</div>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="no-results">
            {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
              ? 'No logs match your filters.'
              : 'No logs found.'}
          </div>
        ) : (
          filteredLogs.map(log => (
            <div key={log.id} className="table-row">
              <div className="col-timestamp">
                <div className="timestamp-date">
                  {new Date(log.createdAt).toLocaleDateString()}
                </div>
                <div className="timestamp-time">
                  {new Date(log.createdAt).toLocaleTimeString()}
                </div>
              </div>

              <div className="col-user">
                <div className="user-info">
                  <div className="user-email">{log.user?.email || '-'}</div>
                  <div className="user-name">{log.user?.fullName || '-'}</div>
                </div>
              </div>

              <div className="col-recipient">
                {log.recipient}
              </div>

              <div className="col-type">
                <span className={`type-badge ${log.type}`}>
                  {log.type.toUpperCase()}
                </span>
              </div>

              <div className="col-status">
                <span
                  className={"status-badge"}
                  style={{ backgroundColor: getStatusColor(log.status) }}
                >
                  {getStatusIcon(log.status)} {log.status}
                </span>
              </div>

              <div className="col-subject">
                {log.subject}
              </div>

              <div className="col-provider">
                {log.provider}
              </div>

              <div className="col-details">
                {log.otp && (
                  <div className="otp-display">
                    OTP: <code>{log.otp}</code>
                  </div>
                )}
                {log.error && (
                  <div className="error-display" title={log.error}>
                    Error: {log.error.substring(0, 50)}...
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
