import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      stepNum: "01",
      title: "Create Profile",
      description: "Set up your gaming card in seconds. Link your accounts, rank, playstyle tags, and set up your microphone preference.",
      iconColor: "#8a2be2",
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="17" y1="11" x2="23" y2="11" />
        </svg>
      )
    },
    {
      stepNum: "02",
      title: "Find Your Squad",
      description: "Browse active squad lobbies searching for players, filter by game titles, or create your own custom squad recruiting others.",
      iconColor: "#00f0ff",
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      )
    },
    {
      stepNum: "03",
      title: "Play & Dominate",
      description: "Instantly unlock voice channels in your custom squad lobby, launch the game, communicate tactics, and secure the win!",
      iconColor: "#ff007f",
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 12L18 12" />
          <path d="M12 6L18 12L12 18" />
          <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Get in the game with your perfect squad in three simple steps.</p>
        </div>

        <div className="steps-container">
          <div className="steps-connector-line"></div>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number" style={{ color: step.iconColor }}>
                  {step.stepNum}
                </div>
                <div
                  className="step-icon-circle"
                  style={{
                    border: `2px solid ${step.iconColor}`,
                    boxShadow: `0 0 15px rgba(${step.iconColor === '#8a2be2' ? '138,43,226' : step.iconColor === '#00f0ff' ? '0,240,255' : '255,0,127'}, 0.2)`
                  }}
                >
                  <div className="step-icon" style={{ color: step.iconColor }}>
                    {step.iconSvg}
                  </div>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="how-it-works-cta">
          <button className="btn btn-primary" onClick={() => alert('Registering your profile coming soon!')}>
            Create Your Profile Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
