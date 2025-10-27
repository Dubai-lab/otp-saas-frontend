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
  smtpConfig?: {
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

      // ✅ Always ensure arrays
      const apiKeysData = Array.isArray(keysRes.data) ? keysRes.data : [];
      const smtpData = Array.isArray(smtpRes.data) ? smtpRes.data : [];

      setApiKeys(apiKeysData);
      setConfigs(smtpData);
    } catch (err) {
      console.error("API Keys fetch error:", err);
      toast.error("Failed to load API Keys ❌");
      setApiKeys([]);
      setConfigs([]);
    } finally {
      setLoading(false);
    }
  };

  const generateKey = async () => {
    if (!smtpId) return toast.error("Choose SMTP configuration ❌");
    setLoading(true);

    try {
      const res = await axios.post("/apikeys", { smtpId });

      const key = res.data?.apiKey || "";
      if (!key) {
        toast.error("Key generation failed ❌");
        return;
      }

      await navigator.clipboard.writeText(key);
      toast.success("API Key Generated ✅ Copied to clipboard!");

      void fetchData();
    } catch (err) {
      console.error("Generate key error:", err);
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
    } catch (err) {
      console.error("Delete key error:", err);
      toast.error("Failed to delete ❌");
    }
  };

  return (
    <div className="apikey-container">
      {loading && <Loader />}

      <h2>API Keys</h2>

      {/* Generate Key Section */}
      <div className="generate-box">
        <select
          value={smtpId}
          onChange={(e) => setSmtpId(e.target.value)}
          disabled={loading}
        >
          <option value="">Select SMTP Config</option>
          {configs.length === 0 ? (
            <option disabled>No SMTP configs available</option>
          ) : (
            configs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))
          )}
        </select>

        <button
          className="generate-btn"
          onClick={generateKey}
          disabled={loading || !smtpId}
        >
          {loading ? "Generating..." : "Generate API Key"}
        </button>
      </div>

      <h3>Available Keys</h3>

      {apikeys.length === 0 ? (
        <p>No API keys available yet.</p>
      ) : (
        <div className="key-list">
          {apikeys.map((key) => (
            <div key={key.id} className="key-item">
              <div>
                <strong>{key.label || "Unnamed API Key"}</strong>
                <small>{new Date(key.createdAt).toLocaleString()}</small>
                <small>SMTP: {key.smtpConfig?.name || "Unknown"}</small>
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
      )}
    </div>
  );
}
