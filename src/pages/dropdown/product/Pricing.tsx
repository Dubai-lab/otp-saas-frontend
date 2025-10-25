import { Link } from "react-router-dom";
import "./Pricing.css";

export default function Pricing() {
  return (
    <div className="pricing-page">
      <div className="page-header">
        <div className="container">
          <h1>Simple, Transparent Pricing</h1>
          <p>Choose the plan that fits your needs. No hidden fees, no long-term contracts.</p>
        </div>
      </div>

      <div className="container">
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="card-header">
              <h3>Starter</h3>
              <div className="price">
                <span className="amount">$0</span>
                <span className="period">/month</span>
              </div>
              <p>Perfect for getting started</p>
            </div>
            <div className="card-features">
              <ul>
                <li>100 OTP sends/month</li>
                <li>1 SMTP configuration</li>
                <li>Basic email templates</li>
                <li>Email support</li>
                <li>Basic analytics</li>
              </ul>
            </div>
            <Link to="/register" className="btn-primary">Get Started Free</Link>
          </div>

          <div className="pricing-card popular">
            <div className="popular-badge">Most Popular</div>
            <div className="card-header">
              <h3>Professional</h3>
              <div className="price">
                <span className="amount">$29</span>
                <span className="period">/month</span>
              </div>
              <p>Best for growing businesses</p>
            </div>
            <div className="card-features">
              <ul>
                <li>10,000 OTP sends/month</li>
                <li>5 SMTP configurations</li>
                <li>Custom email templates</li>
                <li>Priority support</li>
                <li>Advanced analytics</li>
                <li>API rate limiting: 100/min</li>
                <li>Webhook notifications</li>
              </ul>
            </div>
            <Link to="/register" className="btn-primary">Start Free Trial</Link>
          </div>

          <div className="pricing-card">
            <div className="card-header">
              <h3>Enterprise</h3>
              <div className="price">
                <span className="amount">Custom</span>
              </div>
              <p>For large-scale applications</p>
            </div>
            <div className="card-features">
              <ul>
                <li>Unlimited OTP sends</li>
                <li>Unlimited SMTP configs</li>
                <li>White-label solution</li>
                <li>Dedicated support</li>
                <li>Custom integrations</li>
                <li>SLA guarantee</li>
                <li>On-premise deployment</li>
              </ul>
            </div>
            <a href="mailto:sales@otpsaas.com" className="btn-secondary">Contact Sales</a>
          </div>
        </div>

        <section className="pricing-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I change plans anytime?</h4>
              <p>Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.</p>
            </div>
            <div className="faq-item">
              <h4>What happens if I exceed my monthly limit?</h4>
              <p>You'll receive notifications when approaching your limit. Additional sends are billed at $0.005 per OTP. We can also automatically upgrade your plan.</p>
            </div>
            <div className="faq-item">
              <h4>Is there a free trial?</h4>
              <p>Yes! All paid plans come with a 14-day free trial. No credit card required to get started.</p>
            </div>
            <div className="faq-item">
              <h4>Do you offer refunds?</h4>
              <p>We offer a 30-day money-back guarantee. If you're not satisfied, contact our support team for a full refund.</p>
            </div>
            <div className="faq-item">
              <h4>Can I cancel anytime?</h4>
              <p>Absolutely. You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</p>
            </div>
            <div className="faq-item">
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.</p>
            </div>
          </div>
        </section>

        <section className="pricing-cta">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of developers who trust OTP SaaS for secure authentication.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn-primary large">Start Your Free Trial</Link>
            <Link to="/contact" className="btn-secondary">Contact Sales</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
