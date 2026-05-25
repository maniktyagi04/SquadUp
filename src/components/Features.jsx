import React from 'react';

const Features = () => {
  const featuresList = [
    {
      id: 1,
      title: "Squad Finder",
      description: "Search and filter for teammates based on game rank, playstyle (casual/competitive), language, and microphone preference.",
      iconColor: "#8a2be2",
      iconPath: (
        <svg viewBox="0 0 24 24" className="feature-icon-svg" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="7" r="4" />
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="19" cy="8" r="2" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Voice Chat",
      description: "No need for external voice apps. Join high-quality, low-latency in-app audio channels as soon as you enter a squad lobby.",
      iconColor: "#00f0ff",
      iconPath: (
        <svg viewBox="0 0 24 24" className="feature-icon-svg" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 1v11a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4z" />
          <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Gamer Profiles",
      description: "Build your ultimate gaming resume. Connect game stats, list your main characters/weapons, and showcase tournament badges.",
      iconColor: "#ff007f",
      iconPath: (
        <svg viewBox="0 0 24 24" className="feature-icon-svg" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Team Invitations",
      description: "Get real-time requests from players wishing to join your lobby, or send instant invites to active players matching your queue.",
      iconColor: "#39ff14",
      iconPath: (
        <svg viewBox="0 0 24 24" className="feature-icon-svg" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Tournaments",
      description: "Take your squad to the next level. Register for weekly platform-hosted skirmishes and win in-game credits or cash prizes.",
      iconColor: "#ffd700",
      iconPath: (
        <svg viewBox="0 0 24 24" className="feature-icon-svg" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
          <path d="M12 2a4 4 0 0 1 4 4v5c0 1.66-1.34 3-3 3h-2c-1.66 0-3-1.34-3-3V6c0-1.66 1.34-3 3-3h2z" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <h2>Packed with Features</h2>
          <p>Everything you need to discover, assemble, and lead your ultimate dream team.</p>
        </div>

        <div className="features-grid">
          {featuresList.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div
                className="feature-icon-container"
                style={{
                  '--accent-color': feature.iconColor,
                  color: feature.iconColor,
                  background: `rgba(${feature.iconColor === '#8a2be2' ? '138,43,226' : feature.iconColor === '#00f0ff' ? '0,240,255' : feature.iconColor === '#ff007f' ? '255,0,127' : feature.iconColor === '#39ff14' ? '57,255,20' : '255,215,0'}, 0.08)`
                }}
              >
                {feature.iconPath}
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
