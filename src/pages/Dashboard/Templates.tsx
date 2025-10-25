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

  const [form, setForm] = useState<{
    id: string;
    name: string;
    subject: string;
    headerText: string;
    bodyText: string;
    footerText: string;
    styles: {
      header: {
        backgroundColor: string;
        textColor: string;
        fontSize: string;
        fontFamily: string;
        borderRadius: string;
        borderColor: string;
        borderWidth: string;
      };
      body: {
        backgroundColor: string;
        textColor: string;
        fontSize: string;
        fontFamily: string;
      };
      otp: {
        backgroundColor: string;
        textColor: string;
        fontSize: string;
        padding: string;
        borderRadius: string;
        borderColor: string;
        borderWidth: string;
      };
      footer: {
        backgroundColor: string;
        textColor: string;
        fontSize: string;
        fontFamily: string;
      };
    };
  }>({
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

  const editMode = Boolean(form.id);

  useEffect(() => {
    void fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/templates");
      setTemplates(res.data);
    } catch {
      toast.error("Failed to load templates ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editMode) {
        await axios.put(`/templates/${form.id}`, {
          name: form.name,
          subject: form.subject,
          headerText: form.headerText,
          bodyText: form.bodyText,
          footerText: form.footerText,
          styles: form.styles,
        });
        toast.success("Template updated ✅");
      } else {
        await axios.post("/templates", {
          name: form.name,
          subject: form.subject,
          headerText: form.headerText,
          bodyText: form.bodyText,
          footerText: form.footerText,
          styles: form.styles,
        });
        toast.success("Template created ✅");
      }

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
      styles: {
        header: {
          backgroundColor: t.styles?.header?.backgroundColor || "#f8f9fa",
          textColor: t.styles?.header?.textColor || "#333",
          fontSize: t.styles?.header?.fontSize || "18px",
          fontFamily: t.styles?.header?.fontFamily || "Arial, sans-serif",
          borderRadius: t.styles?.header?.borderRadius || "8px",
          borderColor: t.styles?.header?.borderColor || "#ddd",
          borderWidth: t.styles?.header?.borderWidth || "1px",
        },
        body: {
          backgroundColor: t.styles?.body?.backgroundColor || "#ffffff",
          textColor: t.styles?.body?.textColor || "#555",
          fontSize: t.styles?.body?.fontSize || "14px",
          fontFamily: t.styles?.body?.fontFamily || "Arial, sans-serif",
        },
        otp: {
          backgroundColor: t.styles?.otp?.backgroundColor || "#F5F5F5",
          textColor: t.styles?.otp?.textColor || "#4F46E5",
          fontSize: t.styles?.otp?.fontSize || "28px",
          padding: t.styles?.otp?.padding || "16px 20px",
          borderRadius: t.styles?.otp?.borderRadius || "8px",
          borderColor: t.styles?.otp?.borderColor || "#ddd",
          borderWidth: t.styles?.otp?.borderWidth || "1px",
        },
        footer: {
          backgroundColor: t.styles?.footer?.backgroundColor || "#f8f9fa",
          textColor: t.styles?.footer?.textColor || "#777",
          fontSize: t.styles?.footer?.fontSize || "12px",
          fontFamily: t.styles?.footer?.fontFamily || "Arial, sans-serif",
        },
      },
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
          placeholder="Template Name (e.g. OTP Email)"
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
          placeholder="Body Text - include {{OTP}} variable"
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

        <h3>Header Styles</h3>
        <div className="style-section">
          <input
            type="color"
            value={form.styles.header.backgroundColor}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                header: { ...form.styles.header, backgroundColor: e.target.value }
              }
            })}
            title="Header Background Color"
          />
          <input
            type="color"
            value={form.styles.header.textColor}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                header: { ...form.styles.header, textColor: e.target.value }
              }
            })}
            title="Header Text Color"
          />
          <select
            value={form.styles.header.fontSize}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                header: { ...form.styles.header, fontSize: e.target.value }
              }
            })}
          >
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
          </select>
          <select
            value={form.styles.header.fontFamily}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                header: { ...form.styles.header, fontFamily: e.target.value }
              }
            })}
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="Helvetica, sans-serif">Helvetica</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="Verdana, sans-serif">Verdana</option>
          </select>
          <input
            type="color"
            value={form.styles.header.borderColor}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                header: { ...form.styles.header, borderColor: e.target.value }
              }
            })}
            title="Header Border Color"
          />
          <select
            value={form.styles.header.borderWidth}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                header: { ...form.styles.header, borderWidth: e.target.value }
              }
            })}
          >
            <option value="0px">No Border</option>
            <option value="1px">1px</option>
            <option value="2px">2px</option>
            <option value="3px">3px</option>
          </select>
        </div>

        <h3>Body Styles</h3>
        <div className="style-section">
          <input
            type="color"
            value={form.styles.body.backgroundColor}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                body: { ...form.styles.body, backgroundColor: e.target.value }
              }
            })}
            title="Body Background Color"
          />
          <input
            type="color"
            value={form.styles.body.textColor}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                body: { ...form.styles.body, textColor: e.target.value }
              }
            })}
            title="Body Text Color"
          />
          <select
            value={form.styles.body.fontSize}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                body: { ...form.styles.body, fontSize: e.target.value }
              }
            })}
          >
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
          </select>
          <select
            value={form.styles.body.fontFamily}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                body: { ...form.styles.body, fontFamily: e.target.value }
              }
            })}
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="Helvetica, sans-serif">Helvetica</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="Verdana, sans-serif">Verdana</option>
          </select>
        </div>

        <h3>OTP Styles</h3>
        <div className="style-section">
          <input
            type="color"
            value={form.styles.otp.backgroundColor}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                otp: { ...form.styles.otp, backgroundColor: e.target.value }
              }
            })}
            title="OTP Background Color"
          />
          <input
            type="color"
            value={form.styles.otp.textColor}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                otp: { ...form.styles.otp, textColor: e.target.value }
              }
            })}
            title="OTP Text Color"
          />
          <select
            value={form.styles.otp.fontSize}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                otp: { ...form.styles.otp, fontSize: e.target.value }
              }
            })}
          >
            <option value="20px">20px</option>
            <option value="24px">24px</option>
            <option value="28px">28px</option>
            <option value="32px">32px</option>
            <option value="36px">36px</option>
          </select>
          <select
            value={form.styles.otp.padding}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                otp: { ...form.styles.otp, padding: e.target.value }
              }
            })}
          >
            <option value="8px 12px">8px 12px</option>
            <option value="12px 16px">12px 16px</option>
            <option value="16px 20px">16px 20px</option>
            <option value="20px 24px">20px 24px</option>
          </select>
          <input
            type="color"
            value={form.styles.otp.borderColor}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                otp: { ...form.styles.otp, borderColor: e.target.value }
              }
            })}
            title="OTP Border Color"
          />
          <select
            value={form.styles.otp.borderWidth}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                otp: { ...form.styles.otp, borderWidth: e.target.value }
              }
            })}
          >
            <option value="0px">No Border</option>
            <option value="1px">1px</option>
            <option value="2px">2px</option>
            <option value="3px">3px</option>
          </select>
        </div>

        <h3>Footer Styles</h3>
        <div className="style-section">
          <input
            type="color"
            value={form.styles.footer.backgroundColor}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                footer: { ...form.styles.footer, backgroundColor: e.target.value }
              }
            })}
            title="Footer Background Color"
          />
          <input
            type="color"
            value={form.styles.footer.textColor}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                footer: { ...form.styles.footer, textColor: e.target.value }
              }
            })}
            title="Footer Text Color"
          />
          <select
            value={form.styles.footer.fontSize}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                footer: { ...form.styles.footer, fontSize: e.target.value }
              }
            })}
          >
            <option value="10px">10px</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
          </select>
          <select
            value={form.styles.footer.fontFamily}
            onChange={(e) => setForm({
              ...form,
              styles: {
                ...form.styles,
                footer: { ...form.styles.footer, fontFamily: e.target.value }
              }
            })}
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="Helvetica, sans-serif">Helvetica</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="Verdana, sans-serif">Verdana</option>
          </select>
        </div>

        <button type="submit">{editMode ? "Update" : "Create"}</button>
      </form>

      <h3>Preview</h3>
      <div className="email-preview">
        <div
          className="preview-header"
          style={{
            backgroundColor: form.styles.header.backgroundColor,
            color: form.styles.header.textColor,
            fontSize: form.styles.header.fontSize,
            fontFamily: form.styles.header.fontFamily,
            borderRadius: form.styles.header.borderRadius,
            border: `${form.styles.header.borderWidth} solid ${form.styles.header.borderColor}`,
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <p>{form.headerText || 'Header text will appear here.'}</p>
        </div>
        <div
          className="preview-body"
          style={{
            backgroundColor: form.styles.body.backgroundColor,
            color: form.styles.body.textColor,
            fontSize: form.styles.body.fontSize,
            fontFamily: form.styles.body.fontFamily,
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <p>{form.bodyText || 'Body text will appear here. Use {{OTP}} for OTP placeholder.'}</p>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <div
              className="preview-otp"
              style={{
                backgroundColor: form.styles.otp.backgroundColor,
                color: form.styles.otp.textColor,
                fontSize: form.styles.otp.fontSize,
                padding: form.styles.otp.padding,
                borderRadius: form.styles.otp.borderRadius,
                border: `${form.styles.otp.borderWidth} solid ${form.styles.otp.borderColor}`,
              }}
            >
              123456
            </div>
          </div>
        </div>
        <div
          className="preview-footer"
          style={{
            backgroundColor: form.styles.footer.backgroundColor,
            color: form.styles.footer.textColor,
            fontSize: form.styles.footer.fontSize,
            fontFamily: form.styles.footer.fontFamily,
            padding: '16px',
          }}
        >
          <p>{form.footerText || 'Footer text will appear here.'}</p>
        </div>
      </div>

      <h3>Saved Templates</h3>

      <div className="template-list">
        {templates.map((t) => (
          <div className="template-item" key={t.id}>
            <strong>{t.name}</strong>
            <small>{t.subject}</small>
            <div className="actions">
              <button className="edit" onClick={() => handleEdit(t)}>
                Edit
              </button>
              <button className="delete" onClick={() => void handleDelete(t.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
