import { Link } from "react-router-dom";
import { useState } from "react";
import "./Welcome.css";

export default function Welcome() {
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const switchTab = (tabName: string) => {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Hide all code blocks
    const blocks = document.querySelectorAll('.code-block');
    blocks.forEach(block => block.classList.remove('active'));

    // Add active class to clicked button
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    activeBtn?.classList.add('active');

    // Show corresponding code block
    const activeBlock = document.getElementById(tabName);
    activeBlock?.classList.add('active');
  };

  const toggleDropdown = (dropdown: string) => {
    setDropdownOpen(dropdownOpen === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setDropdownOpen(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(null);
  };

  return (
    <div className="welcome-container">
      {/* Header */}
      <header className="welcome-header">
        <div className="header-content">
          <div className="logo">
            <Link to="/" className="logo-link">
              <h1>OTP SaaS</h1>
            </Link>
          </div>
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            ☰
          </button>
          <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <div className="dropdown" onMouseLeave={closeDropdown}>
              <button
                className="dropdown-toggle"
                onClick={() => toggleDropdown('products')}
                onMouseEnter={() => toggleDropdown('products')}
              >
                Products ▼
              </button>
              <div className={`dropdown-menu ${dropdownOpen === 'products' ? 'show' : ''}`}>
                <Link to="/features" className="dropdown-item" onClick={closeMobileMenu}>Features</Link>
                <Link to="/integration" className="dropdown-item" onClick={closeMobileMenu}>Integration</Link>
                <Link to="/pricing" className="dropdown-item" onClick={closeMobileMenu}>Pricing</Link>
              </div>
            </div>
            <div className="dropdown" onMouseLeave={closeDropdown}>
              <button
                className="dropdown-toggle"
                onClick={() => toggleDropdown('support')}
                onMouseEnter={() => toggleDropdown('support')}
              >
                Support ▼
              </button>
              <div className={`dropdown-menu ${dropdownOpen === 'support' ? 'show' : ''}`}>
                <Link to="/documentation" className="dropdown-item" onClick={closeMobileMenu}>Documentation</Link>
                <Link to="/api-reference" className="dropdown-item" onClick={closeMobileMenu}>API Reference</Link>
                <Link to="/help-center" className="dropdown-item" onClick={closeMobileMenu}>Help Center</Link>
              </div>
            </div>
            <div className="dropdown" onMouseLeave={closeDropdown}>
              <button
                className="dropdown-toggle"
                onClick={() => toggleDropdown('company')}
                onMouseEnter={() => toggleDropdown('company')}
              >
                Company ▼
              </button>
              <div className={`dropdown-menu ${dropdownOpen === 'company' ? 'show' : ''}`}>
                <Link to="/about" className="dropdown-item" onClick={closeMobileMenu}>About</Link>
                <Link to="/blog" className="dropdown-item" onClick={closeMobileMenu}>Blog</Link>
                <Link to="/contact" className="dropdown-item" onClick={closeMobileMenu}>Contact</Link>
              </div>
            </div>
            <div className="nav-links">
              <Link to="/login" className="nav-link" onClick={closeMobileMenu}>Login</Link>
              <Link to="/register" className="nav-link primary" onClick={closeMobileMenu}>Sign Up</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Secure OTP Authentication Made Simple</h1>
          <p>Integrate professional OTP email verification into your applications with our easy-to-use API. Send beautiful, customizable OTP emails in minutes.</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary">Get Started Free</Link>
            <Link to="/login" className="btn-secondary">Login to Dashboard</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="mockup-email">
            <div className="email-header">
              <h3>Verify Your Account</h3>
            </div>
            <div className="email-body">
              <p>Your verification code is:</p>
              <div className="otp-code">123456</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose Our OTP Service?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📧</div>
              <h3>Custom Email Templates</h3>
              <p>Design beautiful OTP emails with our drag-and-drop template editor. Customize colors, fonts, and layouts to match your brand.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Secure & Reliable</h3>
              <p>Enterprise-grade security with encrypted OTP generation and secure SMTP configurations. 99.9% uptime guarantee.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Integration</h3>
              <p>Get started in minutes with our simple REST API. SDKs available for popular programming languages.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Detailed Analytics</h3>
              <p>Track OTP delivery rates, verification success, and user engagement with comprehensive logging and reporting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Multi-Provider Support</h3>
              <p>Configure multiple SMTP providers for redundancy and load balancing. Support for all major email services.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Cost Effective</h3>
              <p>Pay only for what you use with flexible pricing. No hidden fees or long-term contracts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="integration-section">
        <div className="container">
          <h2>Easy Integration</h2>
          <p>Integrate OTP verification into your application with just a few lines of code.</p>

          <div className="code-tabs">
            <div className="tab-buttons">
              <button className="tab-btn active" data-tab="javascript" onClick={() => switchTab('javascript')}>JavaScript</button>
              <button className="tab-btn" data-tab="python" onClick={() => switchTab('python')}>Python</button>
              <button className="tab-btn" data-tab="curl" onClick={() => switchTab('curl')}>cURL</button>
            </div>

            <div className="code-content">
              <div className="code-block active" id="javascript">
                <pre><code>{`// Send OTP
const response = await fetch('/api/otp/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    recipient: 'user@example.com',
    templateName: 'Default OTP'
  })
});

const result = await response.json();
console.log('OTP sent:', result.otp);

// Verify OTP
const verifyResponse = await fetch('/api/otp/verify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    otp: '123456'
  })
});

const verifyResult = await verifyResponse.json();
console.log('OTP verified:', verifyResult.success);`}</code></pre>
              </div>

              <div className="code-block" id="python">
                <pre><code>{`import requests

# Send OTP
response = requests.post('/api/otp/send',
  headers={
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  json={
    'recipient': 'user@example.com',
    'templateName': 'Default OTP'
  }
)

result = response.json()
print('OTP sent:', result['otp'])

# Verify OTP
verify_response = requests.post('/api/otp/verify',
  headers={
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  json={
    'otp': '123456'
  }
)

verify_result = verify_response.json()
print('OTP verified:', verify_result['success'])`}</code></pre>
              </div>

              <div className="code-block" id="curl">
                <pre><code>{`# Send OTP
curl -X POST /api/otp/send \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "recipient": "user@example.com",
    k"templateName": "Default OTP"
  }'

# Verify OTP
curl -X POST /api/otp/verify \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "otp": "123456"
  }'`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of developers who trust our OTP service for secure authentication.</p>
          <Link to="/register" className="btn-primary large">Create Your Account</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="welcome-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3>OTP SaaS</h3>
              <p>Secure authentication made simple.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <Link to="/features">Features</Link>
                <Link to="/integration">Integration</Link>
                <Link to="/pricing">Pricing</Link>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <Link to="/documentation">Documentation</Link>
                <Link to="/api-reference">API Reference</Link>
                <Link to="/help-center">Help Center</Link>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <Link to="/about">About</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 OTP SaaS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
