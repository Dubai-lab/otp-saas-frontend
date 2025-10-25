import { Link } from "react-router-dom";
import "./Features.css";

export default function Features() {
  return (
    <div className="features-page">
      <div className="page-header">
        <div className="container">
          <h1>Features</h1>
          <p>Discover all the powerful features that make OTP SaaS the perfect choice for secure authentication.</p>
          <Link to="/register" className="btn-primary">Get Started Free</Link>
        </div>
      </div>

      <div className="container">
        <section className="features-detailed">
          <div className="feature-detail">
            <div className="feature-content">
              <h2>Custom Email Templates</h2>
              <p>Design beautiful OTP emails with our intuitive template editor. Customize colors, fonts, layouts, and branding to match your application's identity perfectly.</p>
              <ul>
                <li>Drag-and-drop template builder</li>
                <li>Pre-built professional templates</li>
                <li>Custom CSS support</li>
                <li>Real-time preview</li>
              </ul>
            </div>
            <div className="feature-image">
              <div className="mockup-template">
                <div className="template-header" style={{ backgroundColor: '#4F46E5', color: 'white', padding: '20px', textAlign: 'center' }}>
                  <h3>Your OTP Code</h3>
                </div>
                <div className="template-body" style={{ padding: '40px 20px', backgroundColor: 'white', textAlign: 'center' }}>
                  <p>Hello,</p>
                  <p>Your One-Time Password (OTP) for account verification is:</p>
                  <div className="otp-display" style={{ backgroundColor: '#F5F5F5', padding: '20px', borderRadius: '12px', fontSize: '30px', fontWeight: 'bold', color: '#4F46E5', margin: '20px 0' }}>
                    123456
                  </div>
                  <p>This OTP is valid for 2 minutes. Please do not share this code with anyone.</p>
                </div>
                <div className="template-footer" style={{ backgroundColor: '#F9FAFB', padding: '20px', textAlign: 'center' }}>
                  <p>If you didn't request this code, please ignore this email.</p>
                  <p>Thank you for using our service!</p>
                  <p>© 2024 Your Company Name. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-detail reverse">
            <div className="feature-content">
              <h2>Secure & Reliable</h2>
              <p>Enterprise-grade security with encrypted OTP generation, secure SMTP configurations, and comprehensive logging. Built for mission-critical applications.</p>
              <ul>
                <li>256-bit encryption for all data</li>
                <li>Secure OTP generation algorithms</li>
                <li>99.9% uptime SLA</li>
                <li>GDPR and SOC 2 compliant</li>
              </ul>
            </div>
            <div className="feature-image">
              <div className="security-icons">
                <div className="security-item">
                  <span className="icon">🔒</span>
                  <h4>Encrypted</h4>
                </div>
                <div className="security-item">
                  <span className="icon">🛡️</span>
                  <h4>Protected</h4>
                </div>
                <div className="security-item">
                  <span className="icon">✅</span>
                  <h4>Verified</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-detail">
            <div className="feature-content">
              <h2>Fast Integration</h2>
              <p>Get started in minutes with our simple REST API. SDKs available for all major programming languages and frameworks.</p>
              <ul>
                <li>RESTful API design</li>
                <li>SDKs for JavaScript, Python, PHP, Java</li>
                <li>Comprehensive API documentation</li>
                <li>Sandbox environment for testing</li>
              </ul>
            </div>
            <div className="feature-image">
              <div className="code-preview">
                <pre><code>{`// Send OTP - Just 3 lines of code!
const response = await fetch('/api/otp/send', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' },
  body: JSON.stringify({ recipient: 'user@email.com' })
});`}</code></pre>
              </div>
            </div>
          </div>

          <div className="feature-detail reverse">
            <div className="feature-content">
              <h2>Detailed Analytics</h2>
              <p>Track OTP delivery rates, verification success, and user engagement with comprehensive logging and real-time reporting.</p>
              <ul>
                <li>Real-time delivery tracking</li>
                <li>Success/failure analytics</li>
                <li>Geographic delivery insights</li>
                <li>Custom reporting dashboards</li>
              </ul>
            </div>
            <div className="feature-image">
              <div className="analytics-chart">
                <div className="chart-placeholder">
                  <span>📊</span>
                  <p>Interactive Analytics Dashboard</p>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-detail">
            <div className="feature-content">
              <h2>Multi-Provider Support</h2>
              <p>Configure multiple SMTP providers for redundancy, load balancing, and optimal email deliverability across the globe.</p>
              <ul>
                <li>Support for all major email providers</li>
                <li>Automatic failover and load balancing</li>
                <li>Global SMTP infrastructure</li>
                <li>Custom SMTP configuration</li>
              </ul>
            </div>
            <div className="feature-image">
              <div className="providers-list">
                <div className="provider">Gmail SMTP</div>
                <div className="provider">SendGrid</div>
                <div className="provider">Mailgun</div>
                <div className="provider">Amazon SES</div>
                <div className="provider">Custom SMTP</div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Experience These Features?</h2>
          <p>Join thousands of developers who trust OTP SaaS for secure authentication.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn-primary">Start Free Trial</Link>
            <Link to="/login" className="btn-secondary">View Dashboard</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
