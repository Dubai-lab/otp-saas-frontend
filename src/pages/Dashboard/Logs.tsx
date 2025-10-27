import "./Logs.css";
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
}

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("/logs");

      const data = Array.isArray(res.data) ? res.data : [];
      setLogs(data);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to retrieve logs ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="logs-container">
      {loading && <Loader />}

      <h2>Email Logs</h2>

      <div className="logs-table-wrap">
        {logs.length === 0 ? (
          <p className="no-data">No logs found 📭</p>
        ) : (
          <table className="logs-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>OTP</th>
                <th>Status</th>
                <th>Error</th>
                <th>Sent At</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
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
        )}
      </div>
    </div>
  );
}
