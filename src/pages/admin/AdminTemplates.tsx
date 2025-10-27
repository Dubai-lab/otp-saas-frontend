import { useState, useEffect } from "react";
import "./AdminTemplates.css";

interface Template {
  id: string;
  name: string;
  subject: string;
  headerText: string;
  bodyText: string;
  footerText: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function AdminTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  useEffect(() => {
    void fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const axios = (await import("../../api/axios")).default;
      const { data } = await axios.get<Template[]>("/admin/templates");
      setTemplates(data || []);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, templateName: string) => {
    if (!confirm(`Are you sure you want to delete template "${templateName}"?`)) {
      return;
    }

    try {
      const axios = (await import("../../api/axios")).default;
      await axios.delete(`/admin/templates/${id}`);
      setTemplates(templates.filter(template => template.id !== id));
      alert('Template deleted successfully');
    } catch (error) {
      console.error('Failed to delete template:', error);
      alert('Failed to delete template');
    }
  };

  const filteredTemplates = templates.filter(template =>
    template.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-templates">
        <div className="loading">Loading templates...</div>
      </div>
    );
  }

  return (
    <div className="admin-templates">
      <div className="page-header">
        <h1>Email Templates</h1>
        <p>Manage all email templates across the system</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by user email, template name, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="results-count">
          {filteredTemplates.length} of {templates.length} templates
        </div>
      </div>

      <div className="templates-grid">
        {filteredTemplates.length === 0 ? (
          <div className="no-results">
            {searchTerm ? 'No templates match your search.' : 'No templates found.'}
          </div>
        ) : (
          filteredTemplates.map(template => (
            <div key={template.id} className="template-card">
              <div className="template-header">
                <div className="template-info">
                  <h3>{template.name}</h3>
                  <div className="template-user">
                    <span className="user-email">{template.user.email}</span>
                    <span className="user-name">{template.user.fullName}</span>
                  </div>
                </div>
                <div className="template-actions">
                  <button
                    onClick={() => setSelectedTemplate(template)}
                    className="preview-btn"
                    title="Preview template"
                  >
                    👁️
                  </button>
                  <button
                    onClick={() => handleDelete(template.id, template.name)}
                    className="delete-btn"
                    title="Delete template"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="template-content">
                <div className="subject-line">
                  <strong>Subject:</strong> {template.subject}
                </div>
                <div className="template-preview">
                  <div className="preview-header">
                    {template.headerText}
                  </div>
                  <div className="preview-body">
                    {template.bodyText.substring(0, 100)}...
                  </div>
                  <div className="preview-footer">
                    {template.footerText}
                  </div>
                </div>
              </div>

              <div className="template-meta">
                <span className="created-date">
                  Created: {new Date(template.createdAt).toLocaleDateString()}
                </span>
                <span className="updated-date">
                  Updated: {new Date(template.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedTemplate && (
        <div className="template-modal" onClick={() => setSelectedTemplate(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedTemplate.name}</h2>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="close-btn"
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="template-details">
                <div className="detail-row">
                  <strong>Subject:</strong> {selectedTemplate.subject}
                </div>
                <div className="detail-row">
                  <strong>User:</strong> {selectedTemplate.user.email} ({selectedTemplate.user.fullName})
                </div>
                <div className="detail-row">
                  <strong>Created:</strong> {new Date(selectedTemplate.createdAt).toLocaleString()}
                </div>
                <div className="detail-row">
                  <strong>Updated:</strong> {new Date(selectedTemplate.updatedAt).toLocaleString()}
                </div>
              </div>

              <div className="template-full-preview">
                <div className="preview-header">
                  {selectedTemplate.headerText}
                </div>
                <div className="preview-body">
                  {selectedTemplate.bodyText}
                </div>
                <div className="preview-footer">
                  {selectedTemplate.footerText}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
