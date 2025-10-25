import { useState } from "react";
import "./Blog.css";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Best Practices for OTP Implementation in 2024",
      excerpt: "Learn the latest security standards and implementation strategies for one-time passwords in modern web applications.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "security",
      featured: true,
    },
    {
      id: "2",
      title: "Migrating from SMS to Email OTP: A Complete Guide",
      excerpt: "Why email OTP is becoming the preferred choice and how to make the transition smoothly.",
      author: "Alex Chen",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "migration",
    },
    {
      id: "3",
      title: "Building Secure Authentication Flows with OTP SaaS",
      excerpt: "Step-by-step guide to implementing robust authentication using our API.",
      author: "Michael Rodriguez",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "tutorial",
    },
    {
      id: "4",
      title: "The Future of Authentication: Beyond Passwords",
      excerpt: "Exploring emerging authentication methods and why OTP remains a cornerstone of security.",
      author: "Sarah Johnson",
      date: "2023-12-28",
      readTime: "8 min read",
      category: "insights",
    },
    {
      id: "5",
      title: "API Rate Limiting: Protecting Your OTP Endpoints",
      excerpt: "How to implement and configure rate limiting to prevent abuse of your authentication system.",
      author: "Alex Chen",
      date: "2023-12-20",
      readTime: "4 min read",
      category: "security",
    },
    {
      id: "6",
      title: "Integrating OTP with Popular Frameworks",
      excerpt: "Code examples and best practices for React, Vue, Angular, and other popular frameworks.",
      author: "Michael Rodriguez",
      date: "2023-12-15",
      readTime: "10 min read",
      category: "tutorial",
    },
  ];

  const categories = [
    { id: "all", name: "All Posts" },
    { id: "security", name: "Security" },
    { id: "tutorial", name: "Tutorials" },
    { id: "migration", name: "Migration" },
    { id: "insights", name: "Insights" },
  ];

  const filteredPosts = selectedCategory === "all"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="blog-page">
      <div className="page-header">
        <div className="container">
          <h1>OTP SaaS Blog</h1>
          <p>Insights, tutorials, and best practices for secure authentication</p>
        </div>
      </div>

      <div className="container">
        {/* Featured Post */}
        {featuredPost && (
          <section className="featured-section">
            <div className="featured-post">
              <div className="featured-content">
                <div className="post-category">Featured</div>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.excerpt}</p>
                <div className="post-meta">
                  <span className="author">{featuredPost.author}</span>
                  <span className="date">{new Date(featuredPost.date).toLocaleDateString()}</span>
                  <span className="read-time">{featuredPost.readTime}</span>
                </div>
                <button className="read-more-btn">Read Full Article</button>
              </div>
              <div className="featured-image">
                <div className="placeholder-image">📝</div>
              </div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="filter-section">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="posts-section">
          <div className="posts-grid">
            {regularPosts.map(post => (
              <article key={post.id} className="post-card">
                <div className="post-image">
                  <div className="placeholder-image">📄</div>
                </div>
                <div className="post-content">
                  <div className="post-category">{categories.find(c => c.id === post.category)?.name}</div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="post-meta">
                    <span className="author">{post.author}</span>
                    <span className="date">{new Date(post.date).toLocaleDateString()}</span>
                    <span className="read-time">{post.readTime}</span>
                  </div>
                  <button className="read-more-link">Read More →</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Get the latest security insights and product updates delivered to your inbox.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button type="submit" className="subscribe-btn">Subscribe</button>
            </div>
            <p className="newsletter-note">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
