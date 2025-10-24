import "./AdminLogs.css";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/UI/Loader";

interface Log {
  id: string;
  recipient: string;
  otp: string;
  status: string;
  error?: string;
  createdAt: string;
  user: {
    email: string;
  };
}

export default function AdminLogs() {
  const token = localStorage.getItem("token");
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("/admin/logs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(res.data);
    } catch {
      toast.error("Failed to retrieve system logs ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-logs">
      {loading && <Loader />}

      <h2>System Email Logs</h2>

      <div className="logs-table-wrap">
        <table className="logs-table">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Recipient</th>
              <th>OTP</th>
              <th>Status</th>
              <th>Error</th>
              <th>Sent At</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.user?.email || "Unknown"}</td>
                <td>{log.recipient}</td>
                <td>{log.otp}</td>
                <td>
                  <span className={`status ${log.status}`}>
                    {log.status.toUpperCase()}
                  </span>
                </td>
                <td>{log.error || "-"}</td>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
