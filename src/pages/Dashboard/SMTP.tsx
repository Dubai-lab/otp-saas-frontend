import "./SMTP.css";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/UI/Loader";

interface SMTPConfig {
  id: string;
  name: string;
  host: string;
  port: number;
  email: string;
}

export default function SMTP() {
  const [configs, setConfigs] = useState<SMTPConfig[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    host: "",
    port: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    void fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/smtp");
      setConfigs(res.data);
    } catch {
      toast.error("Failed to load configs ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/smtp", {
        ...form,
        port: Number(form.port),
      });
      toast.success("SMTP Config Saved ✅");
      setForm({ name: "", host: "", port: "", email: "", password: "" });
      void fetchConfigs();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Save failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete SMTP config?")) return;

    try {
      await axios.delete(`/smtp/${id}`);
      toast.success("Deleted ✅");
      void fetchConfigs();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="smtp-container">
      {loading && <Loader />}

      <h2>SMTP Configurations</h2>

      <form className="smtp-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Configuration Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="SMTP Host (smtp.gmail.com)"
          value={form.host}
          onChange={(e) => setForm({ ...form, host: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Port"
          value={form.port}
          onChange={(e) => setForm({ ...form, port: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="App Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit">Save Config</button>
      </form>

      <h3>Saved Configurations</h3>

      <div className="smtp-list">
        {configs.map((c) => (
          <div key={c.id} className="smtp-item">
            <p><strong>{c.name}</strong></p>
            <small>{c.email} | {c.host}:{c.port}</small>
            <button className="delete" onClick={() => void handleDelete(c.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
