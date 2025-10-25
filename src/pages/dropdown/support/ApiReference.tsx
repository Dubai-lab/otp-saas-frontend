import { useState } from "react";
import "./ApiReference.css";

interface Endpoint {
  method: string;
  path: string;
  description: string;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  requestBody?: any;
  response?: any;
}

export default function ApiReference() {
  const [activeTab, setActiveTab] = useState("send-otp");

  const endpoints: Record<string, Endpoint> = {
    "send-otp": {
      method: "POST",
      path: "/v1/otp/send",
      description: "Send an OTP to a recipient's email address using a specified template.",
      parameters: [
        {
          name: "Authorization",
          type: "string",
          required: true,
          description: "Bearer token for API authentication"
        },
        {
          name: "Content-Type",
          type: "string",
          required: true,
          description: "Must be 'application/json'"
        }
      ],
      requestBody: {
        recipient: "user@example.com",
        templateName: "Default OTP"
      },
      response: {
        success: true,
        message: "OTP sent successfully",
        otp: "123456"
      }
    },
    "verify-otp": {
      method: "POST",
      path: "/v1/otp/verify",
      description: "Verify an OTP code entered by the user.",
      parameters: [
        {
          name: "Authorization",
          type: "string",
          required: true,
          description: "Bearer token for API authentication"
        },
        {
          name: "Content-Type",
          type: "string",
          required: true,
          description: "Must be 'application/json'"
        }
      ],
      requestBody: {
        otp: "123456"
      },
      response: {
        success: true,
        message: "OTP verified successfully"
      }
    },
    "get-templates": {
      method: "GET",
      path: "/v1/templates",
      description: "Retrieve all email templates for the authenticated user.",
      parameters: [
        {
          name: "Authorization",
          type: "string",
          required: true,
          description: "Bearer token for API authentication"
        }
      ],
      response: [
        {
          id: "template-uuid",
          name: "Welcome OTP",
          subject: "Your verification code",
          body: "Your OTP is: {{OTP}}",
          styles: {
            header: { backgroundColor: "#4f46e5" },
            body: { fontSize: "16px" }
          },
          createdAt: "2024-01-01T00:00:00Z"
        }
      ]
    },
    "create-template": {
      method: "POST",
      path: "/v1/templates",
      description: "Create a new email template.",
      parameters: [
        {
          name: "Authorization",
          type: "string",
          required: true,
          description: "Bearer token for API authentication"
        },
        {
          name: "Content-Type",
          type: "string",
          required: true,
          description: "Must be 'application/json'"
        }
      ],
      requestBody: {
        name: "Welcome OTP",
        subject: "Your verification code",
        body: "Your OTP is: {{OTP}}",
        styles: {
          header: { backgroundColor: "#4f46e5" },
          body: { fontSize: "16px" }
        }
      },
      response: {
        id: "template-uuid",
        name: "Welcome OTP",
        subject: "Your verification code",
        body: "Your OTP is: {{OTP}}",
        styles: {
          header: { backgroundColor: "#4f46e5" },
          body: { fontSize: "16px" }
        },
        createdAt: "2024-01-01T00:00:00Z"
      }
    },
    "get-logs": {
      method: "GET",
      path: "/v1/logs",
      description: "Retrieve OTP sending logs for the authenticated user.",
      parameters: [
        {
          name: "Authorization",
          type: "string",
          required: true,
          description: "Bearer token for API authentication"
        },
        {
          name: "page",
          type: "number",
          required: false,
          description: "Page number for pagination (default: 1)"
        },
        {
          name: "limit",
          type: "number",
          required: false,
          description: "Number of logs per page (default: 10)"
        }
      ],
      response: {
        data: [
          {
            id: "log-uuid",
            recipient: "user@example.com",
            templateName: "Welcome OTP",
            status: "sent",
            createdAt: "2024-01-01T00:00:00Z"
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 100,
          totalPages: 10
        }
      }
    }
  };

  const activeEndpoint = endpoints[activeTab];

  return (
    <div className="api-reference-page">
      <div className="page-header">
        <div className="container">
          <h1>API Reference</h1>
          <p>Complete documentation for integrating with OTP SaaS API</p>
        </div>
      </div>

      <div className="container">
        <div className="api-content">
          <div className="api-sidebar">
            <h3>Endpoints</h3>
            <div className="endpoint-tabs">
              {Object.entries(endpoints).map(([key, endpoint]) => (
                <button
                  key={key}
                  className={`endpoint-tab ${activeTab === key ? 'active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  <span className={`method ${endpoint.method.toLowerCase()}`}>
                    {endpoint.method}
                  </span>
                  <span className="path">{endpoint.path}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="api-main">
            <div className="endpoint-header">
              <div className="endpoint-title">
                <span className={`method-badge ${activeEndpoint.method.toLowerCase()}`}>
                  {activeEndpoint.method}
                </span>
                <h2>{activeEndpoint.path}</h2>
              </div>
              <p className="endpoint-description">{activeEndpoint.description}</p>
            </div>

            {activeEndpoint.parameters && (
              <section className="api-section">
                <h3>Parameters</h3>
                <div className="parameters-table">
                  <div className="table-header">
                    <div>Name</div>
                    <div>Type</div>
                    <div>Required</div>
                    <div>Description</div>
                  </div>
                  {activeEndpoint.parameters.map((param, index) => (
                    <div key={index} className="table-row">
                      <div className="param-name">{param.name}</div>
                      <div className="param-type">{param.type}</div>
                      <div className="param-required">
                        {param.required ? (
                          <span className="required-badge">Yes</span>
                        ) : (
                          <span className="optional-badge">No</span>
                        )}
                      </div>
                      <div className="param-description">{param.description}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeEndpoint.requestBody && (
              <section className="api-section">
                <h3>Request Body</h3>
                <div className="code-block">
                  <pre><code>{JSON.stringify(activeEndpoint.requestBody, null, 2)}</code></pre>
                </div>
              </section>
            )}

            {activeEndpoint.response && (
              <section className="api-section">
                <h3>Response</h3>
                <div className="code-block">
                  <pre><code>{JSON.stringify(activeEndpoint.response, null, 2)}</code></pre>
                </div>
              </section>
            )}

            <section className="api-section">
              <h3>Authentication</h3>
              <p>
                All API requests require authentication using your API key. Include the key in the
                Authorization header as a Bearer token.
              </p>
              <div className="code-block">
                <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>
              </div>
            </section>

            <section className="api-section">
              <h3>Error Responses</h3>
              <div className="error-examples">
                <div className="error-example">
                  <h4>400 Bad Request</h4>
                  <div className="code-block">
                    <pre><code>{JSON.stringify({
                      success: false,
                      message: "Invalid request parameters",
                      errors: ["recipient is required"]
                    }, null, 2)}</code></pre>
                  </div>
                </div>
                <div className="error-example">
                  <h4>401 Unauthorized</h4>
                  <div className="code-block">
                    <pre><code>{JSON.stringify({
                      success: false,
                      message: "Invalid API key"
                    }, null, 2)}</code></pre>
                  </div>
                </div>
                <div className="error-example">
                  <h4>429 Too Many Requests</h4>
                  <div className="code-block">
                    <pre><code>{JSON.stringify({
                      success: false,
                      message: "Rate limit exceeded. Try again later."
                    }, null, 2)}</code></pre>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="api-cta">
          <h2>Need Help?</h2>
          <p>Check out our comprehensive documentation or contact our support team.</p>
          <div className="cta-buttons">
            <a href="/support/documentation" className="btn-primary">View Documentation</a>
            <a href="/company/contact" className="btn-secondary">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
