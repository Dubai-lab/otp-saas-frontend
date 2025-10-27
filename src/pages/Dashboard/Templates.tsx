import "./Templates.css";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../components/UI/Loader";

interface Template {
  id: string;
  name: string;
  subject: string;
  headerText: string;
  bodyText: string;
  footerText: string;
  styles?: {
    header?: {
      backgroundColor?: string;
      textColor?: string;
      fontSize?: string;
      fontFamily?: string;
      borderRadius?: string;
      borderColor?: string;
      borderWidth?: string;
    };
    body?: {
      backgroundColor?: string;
      textColor?: string;
      fontSize?: string;
      fontFamily?: string;
    };
    otp?: {
      backgroundColor?: string;
      textColor?: string;
      fontSize?: string;
      padding?: string;
      borderRadius?: string;
      borderColor?: string;
      borderWidth?: string;
    };
    footer?: {
      backgroundColor?: string;
      textColor?: string;
      fontSize?: string;
      fontFamily?: string;
    };
  };
}

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);

  const resetForm = () =>
    setForm({
      id: "",
      name: "",
      subject: "",
      headerText: "",
      bodyText: "",
      footerText: "",
      styles: {
        header: {
          backgroundColor: "#4F46E5",
          textColor: "#ffffff",
          fontSize: "24px",
          fontFamily: "Arial, sans-serif",
          borderRadius: "8px",
          borderColor: "#000000",
          borderWidth: "0px",
        },
        body: {
          backgroundColor: "#ffffff",
          textColor: "#333333",
          fontSize: "14px",
          fontFamily: "Arial, sans-serif",
        },
        otp: {
          backgroundColor: "#F5F5F5",
          textColor: "#4F46E5",
          fontSize: "28px",
          padding: "16px 20px",
          borderRadius: "8px",
          borderColor: "#ddd",
          borderWidth: "1px",
        },
        footer: {
          backgroundColor: "#F9FAFB",
          textColor: "#666666",
          fontSize: "12px",
          fontFamily: "Arial, sans-serif",
        },
      },
    });

  const [form, setForm] = useState<{
    id: string;
    name: string;
    subject: string;
    headerText: string;
    bodyText: string;
    footerText: string;
    styles: unknown;
  }>(() => ({
    id: "",
    name: "",
    subject: "",
    headerText: "",
    bodyText: "",
    footerText: "",
    styles: {
      header: {
        backgroundColor: "#4F46E5",
        textColor: "#ffffff",
        fontSize: "24px",
        fontFamily: "Arial, sans-serif",
        borderRadius: "8px",
        borderColor: "#000000",
        borderWidth: "0px",
      },
      body: {
        backgroundColor: "#ffffff",
        textColor: "#333333",
        fontSize: "14px",
        fontFamily: "Arial, sans-serif",
      },
      otp: {
        backgroundColor: "#F5F5F5",
        textColor: "#4F46E5",
        fontSize: "28px",
        padding: "16px 20px",
        borderRadius: "8px",
        borderColor: "#ddd",
        borderWidth: "1px",
      },
      footer: {
        backgroundColor: "#F9FAFB",
        textColor: "#666666",
        fontSize: "12px",
        fontFamily: "Arial, sans-serif",
      },
    },
  }));

  const editMode = Boolean(form.id);

  useEffect(() => {
    void fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/templates");

      const data = res.data;
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.templates)
        ? data.templates
        : [];

      setTemplates(list);
    } catch {
      toast.error("Failed to load templates ❌");
      setTemplates([]); // prevent crash
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editMode) {
        await axios.put(`/templates/${form.id}`, form);
        toast.success("Template updated ✅");
      } else {
        await axios.post("/templates", form);
        toast.success("Template created ✅");
      }

      resetForm();
      void fetchTemplates();
    } catch {
      toast.error("Save failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (t: Template) => {
    setForm({
      id: t.id,
      name: t.name,
      subject: t.subject,
      headerText: t.headerText,
      bodyText: t.bodyText,
      footerText: t.footerText,
      styles: t.styles || form.styles,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this template?")) return;

    try {
      await axios.delete(`/templates/${id}`);
      toast.success("Template deleted ✅");
      void fetchTemplates();
    } catch {
      toast.error("Failed to delete ❌");
    }
  };

  return (
    <div className="templates-container">
      {loading && <Loader />}

      <h2>Email Templates</h2>

      <form className="template-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Template Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Email Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />

        <textarea
          placeholder="Header Text"
          value={form.headerText}
          onChange={(e) => setForm({ ...form, headerText: e.target.value })}
          required
        />

        <textarea
          placeholder="Body Text - include {{OTP}}"
          value={form.bodyText}
          onChange={(e) => setForm({ ...form, bodyText: e.target.value })}
          required
        />

        <textarea
          placeholder="Footer Text"
          value={form.footerText}
          onChange={(e) => setForm({ ...form, footerText: e.target.value })}
          required
        />

        <button type="submit">{editMode ? "Update" : "Create"}</button>
      </form>

      <h3>Saved Templates</h3>

      <div className="template-list">
        {(templates || []).map((t) => (
          <div className="template-item" key={t.id}>
            <strong>{t.name}</strong>
            <small>{t.subject}</small>

            <div className="actions">
              <button className="edit" onClick={() => handleEdit(t)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(t.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
