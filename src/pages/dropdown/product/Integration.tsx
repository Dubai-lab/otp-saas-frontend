import { Link } from "react-router-dom";
import "./Integration.css";

export default function Integration() {
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

  return (
    <div className="integration-page">
      <div className="page-header">
        <div className="container">
          <h1>Integration Guide</h1>
          <p>Get started with OTP SaaS in minutes. Choose your preferred programming language and follow our simple integration steps.</p>
          <Link to="/register" className="btn-primary">Create Account</Link>
        </div>
      </div>

      <div className="container">
        <section className="quick-start">
          <h2>Quick Start</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Sign Up & Get API Key</h3>
                <p>Create your account and generate an API key from your dashboard.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Configure SMTP</h3>
                <p>Set up your SMTP configuration for email delivery.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Send Your First OTP</h3>
                <p>Use our API to send your first OTP email.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="api-examples">
          <h2>API Examples</h2>
          <p>Integrate OTP verification into your application with just a few lines of code.</p>

          <div className="code-tabs">
            <div className="tab-buttons">
              <button className="tab-btn active" data-tab="javascript" onClick={() => switchTab('javascript')}>JavaScript</button>
              <button className="tab-btn" data-tab="python" onClick={() => switchTab('python')}>Python</button>
              <button className="tab-btn" data-tab="curl" onClick={() => switchTab('curl')}>cURL</button>
              <button className="tab-btn" data-tab="php" onClick={() => switchTab('php')}>PHP</button>
            </div>

            <div className="code-content">
              <div className="code-block active" id="javascript">
                <div className="code-header">
                  <h4>Send OTP</h4>
                </div>
                <pre><code>{`// Send OTP
const response = await fetch('https://api.otpsaas.com/v1/otp/send', {
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

// Response:
// {
//   "success": true,
//   "message": "OTP sent successfully",
//   "otp": "123456"
// }`}</code></pre>

                <div className="code-header">
                  <h4>Verify OTP</h4>
                </div>
                <pre><code>{`// Verify OTP
const verifyResponse = await fetch('https://api.otpsaas.com/v1/otp/verify', {
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
console.log('OTP verified:', verifyResult.success);

// Response:
// {
//   "success": true,
//   "message": "OTP verified successfully"
// }`}</code></pre>
              </div>

              <div className="code-block" id="python">
                <div className="code-header">
                  <h4>Send OTP</h4>
                </div>
                <pre><code>{`import requests

# Send OTP
response = requests.post('https://api.otpsaas.com/v1/otp/send',
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

# Response:
# {
#   "success": true,
#   "message": "OTP sent successfully",
#   "otp": "123456"
# }`}</code></pre>

                <div className="code-header">
                  <h4>Verify OTP</h4>
                </div>
                <pre><code>{`# Verify OTP
verify_response = requests.post('https://api.otpsaas.com/v1/otp/verify',
  headers={
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  json={
    'otp': '123456'
  }
)

verify_result = verify_response.json()
print('OTP verified:', verify_result['success'])

# Response:
# {
#   "success": true,
#   "message": "OTP verified successfully"
# }`}</code></pre>
              </div>

              <div className="code-block" id="curl">
                <div className="code-header">
                  <h4>Send OTP</h4>
                </div>
                <pre><code>{`# Send OTP
curl -X POST https://api.otpsaas.com/v1/otp/send \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "recipient": "user@example.com",
    "templateName": "Default OTP"
  }'

# Response:
# {
#   "success": true,
#   "message": "OTP sent successfully",
#   "otp": "123456"
# }`}</code></pre>

                <div className="code-header">
                  <h4>Verify OTP</h4>
                </div>
                <pre><code>{`# Verify OTP
curl -X POST https://api.otpsaas.com/v1/otp/verify \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "otp": "123456"
  }'

# Response:
# {
#   "success": true,
#   "message": "OTP verified successfully"
# }`}</code></pre>
              </div>

              <div className="code-block" id="php">
                <div className="code-header">
                  <h4>Send OTP</h4>
                </div>
                <pre><code>{`<?php
// Send OTP
$ch = curl_init('https://api.otpsaas.com/v1/otp/send');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
  'recipient' => 'user@example.com',
  'templateName' => 'Default OTP'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Content-Type: application/json',
  'Authorization: Bearer YOUR_API_KEY'
]);

$result = json_decode(curl_exec($ch), true);
curl_close($ch);

echo 'OTP sent: ' . $result['otp'];

// Response:
// {
//   "success": true,
//   "message": "OTP sent successfully",
//   "otp": "123456"
// }
?>`}</code></pre>

                <div className="code-header">
                  <h4>Verify OTP</h4>
                </div>
                <pre><code>{`<?php
// Verify OTP
$ch = curl_init('https://api.otpsaas.com/v1/otp/verify');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
  'otp' => '123456'
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Content-Type: application/json',
  'Authorization: Bearer YOUR_API_KEY'
]);

$verifyResult = json_decode(curl_exec($ch), true);
curl_close($ch);

echo 'OTP verified: ' . ($verifyResult['success'] ? 'true' : 'false');

// Response:
// {
//   "success": true,
//   "message": "OTP verified successfully"
// }
?>`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section className="sdks">
          <h2>SDKs & Libraries</h2>
          <p>Official SDKs to accelerate your integration process.</p>

          <div className="sdk-grid">
            <div className="sdk-card">
              <div className="sdk-icon">📦</div>
              <h3>Node.js SDK</h3>
              <p>Official SDK for Node.js applications</p>
              <code>npm install otp-saas</code>
              <a href="#" className="sdk-link">View on GitHub</a>
            </div>

            <div className="sdk-card">
              <div className="sdk-icon">🐍</div>
              <h3>Python SDK</h3>
              <p>Official SDK for Python applications</p>
              <code>pip install otp-saas</code>
              <a href="#" className="sdk-link">View on GitHub</a>
            </div>

            <div className="sdk-card">
              <div className="sdk-icon">🐘</div>
              <h3>PHP SDK</h3>
              <p>Official SDK for PHP applications</p>
              <code>composer require otp-saas/php</code>
              <a href="#" className="sdk-link">View on GitHub</a>
            </div>

            <div className="sdk-card">
              <div className="sdk-icon">☕</div>
              <h3>Java SDK</h3>
              <p>Official SDK for Java applications</p>
              <code>// Maven dependency</code>
              <a href="#" className="sdk-link">View on GitHub</a>
            </div>
          </div>
        </section>

        <section className="testing">
          <h2>Testing Your Integration</h2>
          <p>Use our sandbox environment to test your integration without sending real emails.</p>

          <div className="testing-info">
            <div className="testing-card">
              <h3>Sandbox Environment</h3>
              <p>Test your integration with our sandbox API that doesn't send real emails.</p>
              <ul>
                <li>Use <code>https://sandbox.api.otpsaas.com</code> for testing</li>
                <li>All OTPs return "123456" for easy testing</li>
                <li>No email delivery charges</li>
                <li>Full API compatibility</li>
              </ul>
            </div>

            <div className="testing-card">
              <h3>Test Email Addresses</h3>
              <p>Use these special email addresses for testing different scenarios:</p>
              <ul>
                <li><code>success@test.com</code> - Always succeeds</li>
                <li><code>fail@test.com</code> - Always fails</li>
                <li><code>delay@test.com</code> - Simulates delay</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="support">
          <h2>Need Help?</h2>
          <p>Our support team is here to help you with your integration.</p>
          <div className="support-options">
            <Link to="/support/help-center" className="support-link">
              <span className="icon">❓</span>
              <div>
                <h4>Help Center</h4>
                <p>Browse our comprehensive documentation and guides</p>
              </div>
            </Link>
            <Link to="/support/api-reference" className="support-link">
              <span className="icon">📚</span>
              <div>
                <h4>API Reference</h4>
                <p>Detailed API documentation with examples</p>
              </div>
            </Link>
            <a href="mailto:support@otpsaas.com" className="support-link">
              <span className="icon">💬</span>
              <div>
                <h4>Contact Support</h4>
                <p>Get help from our technical support team</p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
