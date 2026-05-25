import React from 'react';

const Games = () => {
  const gamesList = [
    {
      id: "bgmi",
      title: "BGMI / PUBG",
      category: "Battle Royale",
      activeSquads: "1,420",
      activePlayers: "5.6K",
      colorGradient: "linear-gradient(135deg, #f37a1f 0%, #a24b0c 100%)",
      glowColor: "rgba(243, 122, 31, 0.4)",
      iconSvg: (
        <svg viewBox="0 0 64 64" className="game-card-svg" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M32 6 L54 18 L54 46 L32 58 L10 46 L10 18 Z" />
          <path d="M32 6 L32 58" />
          <path d="M10 18 L32 30 L54 18" />
          <path d="M10 46 L32 34 L54 46" />
          <line x1="21" y1="24.5" x2="21" y2="39" />
          <line x1="43" y1="24.5" x2="43" y2="39" />
        </svg>
      )
    },
    {
      id: "valorant",
      title: "Valorant",
      category: "Tactical Shooter",
      activeSquads: "980",
      activePlayers: "4.2K",
      colorGradient: "linear-gradient(135deg, #ff4655 0%, #b71c1c 100%)",
      glowColor: "rgba(255, 70, 85, 0.4)",
      iconSvg: (
        <svg viewBox="0 0 64 64" className="game-card-svg" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 12 L28 12 L44 44 L28 44 Z" fill="currentColor" opacity="0.15" />
          <path d="M12 12 L28 12 L44 44 L28 44 Z" />
          <path d="M36 12 H52 L40 28 H24 Z" />
        </svg>
      )
    },
    {
      id: "minecraft",
      title: "Minecraft",
      category: "Sandbox / Survival",
      activeSquads: "540",
      activePlayers: "2.1K",
      colorGradient: "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)",
      glowColor: "rgba(76, 175, 80, 0.4)",
      iconSvg: (
        <svg viewBox="0 0 64 64" className="game-card-svg" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M32 8 L56 20 L56 44 L32 56 L8 44 L8 20 Z" />
          <path d="M8 20 L32 32 L56 20" />
          <path d="M32 32 L32 56" />
          <path d="M20 14 L32 20 M32 20 L44 14" strokeDasharray="3 3" />
          <path d="M20 38 L32 44 M32 44 L44 38" strokeDasharray="3 3" />
        </svg>
      )
    },
    {
      id: "cod",
      title: "Call of Duty",
      category: "First-Person Shooter",
      activeSquads: "1,150",
      activePlayers: "4.8K",
      colorGradient: "linear-gradient(135deg, #d4af37 0%, #8b6508 100%)",
      glowColor: "rgba(212, 175, 55, 0.4)",
      iconSvg: (
        <svg viewBox="0 0 64 64" className="game-card-svg" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="32" cy="32" r="22" />
          <circle cx="32" cy="32" r="8" />
          <line x1="32" y1="2" x2="32" y2="18" />
          <line x1="32" y1="46" x2="32" y2="62" />
          <line x1="2" y1="32" x2="18" y2="32" />
          <line x1="46" y1="32" x2="62" y2="32" />
          <path d="M 16,10 A 24,24 0 0,0 10,16" />
          <path d="M 48,10 A 24,24 0 0,1 54,16" />
          <path d="M 10,48 A 24,24 0 0,0 16,54" />
          <path d="M 54,48 A 24,24 0 0,1 48,54" />
        </svg>
      )
    },
    {
      id: "freefire",
      title: "Free Fire",
      category: "Battle Royale",
      activeSquads: "890",
      activePlayers: "3.5K",
      colorGradient: "linear-gradient(135deg, #e53935 0%, #ab000d 100%)",
      glowColor: "rgba(229, 57, 53, 0.4)",
      iconSvg: (
        <svg viewBox="0 0 64 64" className="game-card-svg" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M32 6 C32 6, 44 18, 44 32 C44 42, 36 54, 32 58 C28 54, 20 42, 20 32 C20 18, 32 6, 32 6 Z" />
          <path d="M32 20 C32 20, 38 28, 38 36 C38 42, 34 48, 32 50 C30 48, 26 42, 26 36 C26 28, 32 20, 32 20 Z" opacity="0.6" />
          <path d="M32 34 C32 34, 35 38, 35 42 C35 45, 33 48, 32 49 C31 48, 29 45, 29 42 C29 38, 32 34, 32 34 Z" />
        </svg>
      )
    }
  ];

  return (
    <section id="games" className="games-section">
      <div className="container">
        <div className="section-header">
          <h2>Supported Games</h2>
          <p>Instantly find active squads and teammates across the world's most popular games.</p>
        </div>

        <div className="games-grid">
          {gamesList.map((game) => (
            <div
              key={game.id}
              className="game-card"
              style={{
                '--game-gradient': game.colorGradient,
                '--game-glow': game.glowColor
              }}
            >
              <div className="game-badge">{game.category}</div>
              <div className="game-icon-wrapper">
                {game.iconSvg}
              </div>
              <div className="game-card-content">
                <h3 className="game-card-title">{game.title}</h3>
                <div className="game-stats-row">
                  <div className="game-stat">
                    <span className="game-stat-val">{game.activeSquads}</span>
                    <span className="game-stat-lbl">Active Squads</span>
                  </div>
                  <div className="game-stat-divider"></div>
                  <div className="game-stat">
                    <span className="game-stat-val">{game.activePlayers}</span>
                    <span className="game-stat-lbl">Active Players</span>
                  </div>
                </div>
                <button
                  className="btn btn-outline btn-game-action"
                  onClick={() => alert(`Finding active lobbies for ${game.title}...`)}
                >
                  Find Squad
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Games;
