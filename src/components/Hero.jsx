import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero-section fade-in">
      <div className="container hero-container">

        <div className="hero-content">
          <div className="hero-tag">🎮 Join the Ultimate Gaming Hub</div>
          <h1 className="hero-title">
            Find Your Perfect <br />
            <span className="text-gradient">Gaming Squad</span>
          </h1>
          <p className="hero-description">
            Stop playing solo. Connect with thousands of passionate players, build custom team squads,
            communicate effortlessly, and dominate the leaderboard in your favorite multiplayer games.
          </p>

          <div className="hero-actions">
            <a href="#how-it-works" className="btn btn-primary">
              Get Started
            </a>
            <a href="#features" className="btn btn-secondary">
              Learn More
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Active Players</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Squads Created</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">4.9★</span>
              <span className="stat-label">User Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="illustration-wrapper">
            <svg
              viewBox="0 0 500 500"
              className="gaming-illustration"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="neonGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8a2be2" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0b0c10" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="purpleCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8a2be2" />
                  <stop offset="100%" stopColor="#00f0ff" />
                </linearGradient>
              </defs>

              <circle cx="250" cy="250" r="220" fill="url(#neonGlow)" />
              <circle cx="250" cy="250" r="180" stroke="#8a2be2" strokeWidth="1" strokeDasharray="10 5" opacity="0.3" />
              <circle cx="250" cy="250" r="150" stroke="#00f0ff" strokeWidth="2" opacity="0.2" />
              <path d="M 100,250 L 400,250" stroke="#232536" strokeWidth="2" opacity="0.5" />
              <path d="M 250,100 L 250,400" stroke="#232536" strokeWidth="2" opacity="0.5" />

              <g className="lobby-slot center-slot">
                <circle cx="250" cy="200" r="45" fill="#12131c" stroke="#8a2be2" strokeWidth="3" className="glow-on-hover" />
                <path d="M 225,230 C 225,210 275,210 275,230" stroke="#00f0ff" strokeWidth="3" strokeLinecap="round" />
                <path d="M 240,195 H 260 M 250,185 V 205" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <rect x="220" y="255" width="60" height="24" rx="12" fill="#8a2be2" />
                <text x="250" y="271" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">YOU</text>
              </g>

              <g className="lobby-slot side-slot">
                <circle cx="130" cy="280" r="35" fill="#12131c" stroke="#232536" strokeWidth="2" />
                <path d="M 115,302 C 115,290 145,290 145,302" stroke="#a5a6b5" strokeWidth="2" strokeLinecap="round" />
                <circle cx="130" cy="275" r="10" fill="#a5a6b5" opacity="0.7" />
                <rect x="105" y="325" width="50" height="18" rx="9" fill="#1f2833" stroke="#232536" />
                <text x="130" y="337" fill="#a5a6b5" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Loba_99</text>
              </g>

              <g className="lobby-slot side-slot">
                <circle cx="370" cy="280" r="35" fill="#12131c" stroke="#232536" strokeWidth="2" />
                <path d="M 355,302 C 355,290 385,290 385,302" stroke="#a5a6b5" strokeWidth="2" strokeLinecap="round" />
                <path d="M 363,275 L 366,280 L 370,274 L 374,280 L 377,275 L 375,283 H 365 Z" fill="#8a2be2" />
                <rect x="345" y="325" width="50" height="18" rx="9" fill="#1f2833" stroke="#232536" />
                <text x="370" y="337" fill="#a5a6b5" fontSize="9" textAnchor="middle" fontFamily="sans-serif">JettPro</text>
              </g>

              <circle cx="250" cy="250" r="210" stroke="url(#purpleCyan)" strokeWidth="1.5" strokeDasharray="30 20" opacity="0.6" />
            </svg>
            <div className="illustration-glow-ring"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
