import "./ApiKeys.css";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/UI/Loader";

interface SMTPConfig {
  id: string;
  name: string;
}

interface ApiKey {
  id: string;
  label: string;
  createdAt: string;
  smtpConfig: {
    name: string;
  };
}

export default function ApiKeys() {
  const [apikeys, setApiKeys] = useState<ApiKey[]>([]);
  const [configs, setConfigs] = useState<SMTPConfig[]>([]);
  const [loading, setLoading] = useState(false);

  const [smtpId, setSmtpId] = useState("");

  useEffect(() => {
    void fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [keysRes, smtpRes] = await Promise.all([
        axios.get("/apikeys"),
        axios.get("/smtp"),
      ]);

      setApiKeys(keysRes.data);
      setConfigs(smtpRes.data);
    } catch {
      toast.error("Failed to load API Keys ❌");
    } finally {
      setLoading(false);
    }
  };

  const generateKey = async () => {
    if (!smtpId) return toast.error("Choose SMTP configuration ❌");
    setLoading(true);

    try {
      const res = await axios.post("/apikeys", { smtpId });

      toast.success("API Key Generated ✅\nCopy it now!");
      navigator.clipboard.writeText(res.data.apiKey);

      void fetchData();
    } catch {
      toast.error("Failed to generate ❌");
    } finally {
      setLoading(false);
    }
  };

  const deleteKey = async (id: string) => {
    if (!confirm("Delete this API Key permanently?")) return;

    try {
      await axios.delete(`/apikeys/${id}`);

      toast.success("Deleted ✅");
      void fetchData();
    } catch {
      toast.error("Failed to delete ❌");
    }
  };

  return (
    <div className="apikey-container">
      {loading && <Loader />}

      <h2>API Keys</h2>

      {/* Select SMTP */}
      <div className="generate-box">
        <select value={smtpId} onChange={(e) => setSmtpId(e.target.value)}>
          <option value="">Select SMTP Config</option>
          {configs.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button className="generate-btn" onClick={generateKey}>
          Generate API Key
        </button>
      </div>

      <h3>Available Keys</h3>

      <div className="key-list">
        {apikeys.map((key) => (
          <div key={key.id} className="key-item">
            <div>
              <strong>{key.label || "API Key"}</strong>
              <small>{new Date(key.createdAt).toLocaleString()}</small>
              <small>SMTP: {key.smtpConfig?.name}</small>
            </div>

            <div className="actions">
              <button
                onClick={() =>
                  toast.promise(
                    navigator.clipboard.writeText(key.id),
                    {
                      loading: "Copying…",
                      success: "Copied ✅",
                      error: "Copy failed ❌",
                    }
                  )
                }
              >
                Copy
              </button>

              <button className="delete" onClick={() => deleteKey(key.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
