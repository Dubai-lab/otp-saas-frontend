import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      <div className="page-header">
        <div className="container">
          <h1>About OTP SaaS</h1>
          <p>Secure authentication made simple for developers and businesses worldwide.</p>
        </div>
      </div>

      <div className="container">
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            At OTP SaaS, we believe that security should be simple. Our mission is to provide developers
            and businesses with a reliable, easy-to-use OTP (One-Time Password) service that protects
            user accounts without the complexity of building and maintaining authentication systems.
          </p>
        </section>

        <section className="story-section">
          <h2>Our Story</h2>
          <div className="story-content">
            <div className="story-text">
              <p>
                Founded in 2024, OTP SaaS was born from the frustration of developers spending countless
                hours implementing secure authentication systems. We saw the need for a simple, reliable
                OTP service that just works.
              </p>
              <p>
                Our team of security experts and developers came together to create a platform that
                handles the complexity of OTP generation, email delivery, and verification, so you
                can focus on building great applications.
              </p>
            </div>
            <div className="story-stats">
              <div className="stat">
                <div className="stat-number">10M+</div>
                <div className="stat-label">OTPs Sent</div>
              </div>
              <div className="stat">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Developers</div>
              </div>
              <div className="stat">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3>Security First</h3>
              <p>
                Security is at the core of everything we do. We use industry-standard encryption
                and follow best practices to protect your data and your users.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Reliability</h3>
              <p>
                Your authentication system needs to work when it matters most. We guarantee
                99.9% uptime with redundant systems and monitoring.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Developer Experience</h3>
              <p>
                We build tools that developers love to use. Simple APIs, comprehensive documentation,
                and excellent support make integration a breeze.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Global Reach</h3>
              <p>
                Our infrastructure spans multiple regions, ensuring fast delivery worldwide.
                Support for multiple languages and time zones.
              </p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>Alex Chen</h3>
              <p className="member-role">CEO & Co-Founder</p>
              <p className="member-bio">
                Former security engineer at major tech companies. Passionate about making
                security accessible to all developers.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💻</div>
              <h3>Sarah Johnson</h3>
              <p className="member-role">CTO & Co-Founder</p>
              <p className="member-bio">
                Full-stack developer with 10+ years experience. Expert in scalable
                systems and API design.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">🛡️</div>
              <h3>Michael Rodriguez</h3>
              <p className="member-role">Head of Security</p>
              <p className="member-bio">
                Cybersecurity specialist focused on authentication and data protection.
                Former NSA consultant.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-cta">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of developers who trust OTP SaaS for their authentication needs.</p>
          <div className="cta-buttons">
            <a href="/register" className="btn-primary">Start Free Trial</a>
            <a href="/support/documentation" className="btn-secondary">View Documentation</a>
          </div>
        </section>
      </div>
    </div>
  );
}
