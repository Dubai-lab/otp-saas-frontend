import { useState } from "react";
import "./HelpCenter.css";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I get started with OTP SaaS?",
      answer: "Getting started is easy! First, create a free account on our website. Then, generate an API key from your dashboard, configure your SMTP settings, create an email template, and you're ready to send your first OTP. Check out our quick start guide for detailed instructions.",
      category: "getting-started"
    },
    {
      id: "2",
      question: "What SMTP providers do you support?",
      answer: "We support all major SMTP providers including Gmail, SendGrid, Mailgun, Amazon SES, and custom SMTP servers. You can configure any SMTP server that supports TLS/SSL encryption.",
      category: "smtp"
    },
    {
      id: "3",
      question: "How secure is OTP SaaS?",
      answer: "Security is our top priority. We use industry-standard encryption for all data transmission and storage. OTP codes are generated using cryptographically secure random number generators and are never stored in plain text. We also implement rate limiting and monitoring to prevent abuse.",
      category: "security"
    },
    {
      id: "4",
      question: "What are the rate limits for the API?",
      answer: "Free accounts can send up to 100 OTPs per month. Paid plans start at 1,000 OTPs per month and go up to unlimited for enterprise plans. API rate limits are 10 requests per second per API key.",
      category: "api"
    },
    {
      id: "5",
      question: "Can I customize the email templates?",
      answer: "Yes! Our visual template editor allows you to fully customize your OTP emails. You can modify colors, fonts, layouts, and add your branding. Use the {{OTP}} placeholder where you want the code to appear.",
      category: "templates"
    },
    {
      id: "6",
      question: "How do I integrate OTP SaaS with my application?",
      answer: "We provide SDKs for popular programming languages including JavaScript, Python, PHP, and Java. You can also use our REST API directly. Check our documentation for code examples and integration guides.",
      category: "integration"
    },
    {
      id: "7",
      question: "What happens if an OTP expires?",
      answer: "OTP codes expire after 10 minutes by default. You can configure the expiration time in your template settings. Expired codes cannot be used for verification and will return an error.",
      category: "api"
    },
    {
      id: "8",
      question: "Do you offer phone support?",
      answer: "Phone support is available for enterprise customers. All customers have access to email support, live chat during business hours, and our comprehensive documentation and community forums.",
      category: "support"
    }
  ];

  const articles: Article[] = [
    {
      id: "1",
      title: "Complete Integration Guide for React Applications",
      excerpt: "Step-by-step guide to integrating OTP SaaS into your React app with authentication flows.",
      category: "integration",
      readTime: "8 min read",
      featured: true
    },
    {
      id: "2",
      title: "SMTP Configuration Best Practices",
      excerpt: "Learn how to properly configure SMTP settings for reliable email delivery.",
      category: "smtp",
      readTime: "6 min read"
    },
    {
      id: "3",
      title: "Building Secure Authentication Systems",
      excerpt: "Security considerations and best practices for implementing OTP in your applications.",
      category: "security",
      readTime: "10 min read"
    },
    {
      id: "4",
      title: "API Error Handling and Troubleshooting",
      excerpt: "Common API errors and how to handle them in your application code.",
      category: "api",
      readTime: "5 min read"
    },
    {
      id: "5",
      title: "Customizing Email Templates",
      excerpt: "Advanced template customization options and design tips.",
      category: "templates",
      readTime: "7 min read"
    },
    {
      id: "6",
      title: "Rate Limiting and Usage Monitoring",
      excerpt: "Understanding rate limits and how to monitor your API usage effectively.",
      category: "api",
      readTime: "4 min read"
    }
  ];

  const categories = [
    { id: "all", name: "All Topics", icon: "📚" },
    { id: "getting-started", name: "Getting Started", icon: "🚀" },
    { id: "api", name: "API & Integration", icon: "🔧" },
    { id: "smtp", name: "SMTP Setup", icon: "📧" },
    { id: "templates", name: "Templates", icon: "🎨" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "support", name: "Support", icon: "💬" }
  ];

  const filteredFAQs = selectedCategory === "all"
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const searchedFAQs = searchTerm
    ? filteredFAQs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredFAQs;

  const filteredArticles = selectedCategory === "all"
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  const searchedArticles = searchTerm
    ? filteredArticles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredArticles;

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="help-center-page">
      <div className="page-header">
        <div className="container">
          <h1>Help Center</h1>
          <p>Find answers to common questions and get the help you need</p>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="help-content">
          <div className="category-sidebar">
            <h3>Browse by Topic</h3>
            <div className="category-list">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="help-main">
            {/* Featured Articles */}
            {searchedArticles.some(article => article.featured) && (
              <section className="featured-articles">
                <h2>Featured Articles</h2>
                <div className="featured-grid">
                  {searchedArticles.filter(article => article.featured).map(article => (
                    <div key={article.id} className="featured-article">
                      <div className="article-content">
                        <h3>{article.title}</h3>
                        <p>{article.excerpt}</p>
                        <div className="article-meta">
                          <span className="read-time">{article.readTime}</span>
                          <button className="read-more">Read Article →</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ Section */}
            <section className="faq-section">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {searchedFAQs.map(faq => (
                  <div key={faq.id} className="faq-item">
                    <button
                      className="faq-question"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <span>{faq.question}</span>
                      <span className={`faq-toggle ${expandedFAQ === faq.id ? 'expanded' : ''}`}>
                        ▼
                      </span>
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Articles Section */}
            <section className="articles-section">
              <h2>Help Articles</h2>
              <div className="articles-grid">
                {searchedArticles.filter(article => !article.featured).map(article => (
                  <article key={article.id} className="help-article">
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <div className="article-footer">
                      <span className="read-time">{article.readTime}</span>
                      <button className="read-more">Read More →</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Contact Support CTA */}
        <div className="support-cta">
          <h2>Still Need Help?</h2>
          <p>Can't find what you're looking for? Our support team is here to help.</p>
          <div className="support-options">
            <div className="support-option">
              <div className="option-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Get instant help from our support team</p>
              <button className="option-btn">Start Chat</button>
            </div>
            <div className="support-option">
              <div className="option-icon">📧</div>
              <h3>Email Support</h3>
              <p>Send us a detailed message</p>
              <a href="/company/contact" className="option-btn">Contact Us</a>
            </div>
            <div className="support-option">
              <div className="option-icon">📚</div>
              <h3>Documentation</h3>
              <p>Browse our comprehensive docs</p>
              <a href="/support/documentation" className="option-btn">View Docs</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
