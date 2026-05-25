import React from 'react';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <footer className="footer">
      <div className="container footer-container">

        <div className="footer-brand-col">
          <a href="#home" className="logo footer-logo">
            Squad<span className="logo-accent">UP</span>
          </a>
          <p className="footer-brand-desc">
            The ultimate squad finder platform. Team up with like-minded players,
            communicate in real-time, and take your gaming to new heights.
          </p>
          <div className="social-links">
            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Discord">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
            </a>
            <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitch">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-title">Platform</h4>
          <ul className="footer-links-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#games">Games</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-title">Community</h4>
          <ul className="footer-links-list">
            <li><a href="#support" onClick={() => alert('Support portal coming soon!')}>FAQ</a></li>
            <li><a href="#guidelines" onClick={() => alert('Community guidelines coming soon!')}>Guidelines</a></li>
            <li><a href="#safety" onClick={() => alert('Safety portal coming soon!')}>Safeguards</a></li>
            <li><a href="#tournaments" onClick={() => alert('Tournament bracket lists coming soon!')}>Events</a></li>
          </ul>
        </div>

        <div className="footer-newsletter-col">
          <h4 className="footer-title">Stay Updated</h4>
          <p className="newsletter-text">Subscribe to our newsletter to receive tournament alerts and platform updates.</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              required
            />
            <button type="submit" className="btn btn-primary newsletter-btn" aria-label="Subscribe">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="newsletter-btn-svg">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright">© 2026 SquadUP. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#privacy" onClick={() => alert('Privacy policy details coming soon!')}>Privacy Policy</a>
            <span className="legal-dot">•</span>
            <a href="#terms" onClick={() => alert('Terms of service details coming soon!')}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
