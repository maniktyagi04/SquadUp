import { useState, useEffect } from 'react';

const GAMES = [
  { id: 'valorant',    name: 'Valorant',       icon: '🔫', genre: 'Tactical Shooter',       players: '142K Online' },
  { id: 'apex',        name: 'Apex Legends',   icon: '🦊', genre: 'Battle Royale',           players: '98K Online'  },
  { id: 'bgmi',        name: 'BGMI',           icon: '🪖', genre: 'Mobile Battle Royale',    players: '210K Online' },
  { id: 'cod',         name: 'Call of Duty',   icon: '💣', genre: 'Action Shooter',          players: '87K Online'  },
  { id: 'freefire',    name: 'Free Fire',      icon: '🔥', genre: 'Mobile Battle Royale',    players: '320K Online' },
  { id: 'minecraft',   name: 'Minecraft',      icon: '⛏️', genre: 'Sandbox / Survival',      players: '54K Online'  },
  { id: 'lol',         name: 'League of Legends', icon: '⚔️', genre: 'MOBA',               players: '175K Online' },
  { id: 'fortnite',    name: 'Fortnite',       icon: '🏗️', genre: 'Battle Royale',           players: '115K Online' },
  { id: 'csgo',        name: 'CS2',            icon: '🎯', genre: 'Tactical Shooter',        players: '93K Online'  },
  { id: 'overwatch',   name: 'Overwatch 2',    icon: '🦸', genre: 'Team Shooter',            players: '61K Online'  },
];

const LS_KEY = 'squadup_last_game';

const SelectGame = ({ onSelectGame, onViewChange, isNewUser = false }) => {
  const lastGame = localStorage.getItem(LS_KEY) || '';
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const [hovered, setHovered] = useState('');

  // Pre-highlight last choice for returning users
  useEffect(() => {
    if (!isNewUser && lastGame) {
      setSelected(lastGame);
    }
  }, [isNewUser, lastGame]);

  const handleSelect = (id) => {
    setSelected(id);
    setError('');
  };

  const handleProceed = () => {
    if (!selected) {
      setError('Please select a game to continue.');
      return;
    }
    const game = GAMES.find((g) => g.id === selected);
    localStorage.setItem(LS_KEY, selected);
    onSelectGame(game.name);
    onViewChange('dashboard');
  };

  return (
    <div className="sg-wrapper">
      {/* Ambient orbs */}
      <div className="sg-orb sg-orb-1" />
      <div className="sg-orb sg-orb-2" />

      <div className="sg-inner">
        {/* Header */}
        <div className="sg-header">
          <div className="sg-badge">🎮 Game Select</div>
          <h1 className="sg-title">
            {isNewUser ? 'Choose Your Battlefield' : 'Welcome Back, Commander'}
          </h1>
          <p className="sg-subtitle">
            {isNewUser
              ? 'Pick your main game to discover squads and teammates waiting for you.'
              : 'Select a game to jump back in. Your last session is highlighted below.'}
          </p>
        </div>

        {/* Previously visited banner (returning users only) */}
        {!isNewUser && lastGame && (
          <div className="sg-returning-banner">
            <span className="sg-returning-icon">⚡</span>
            <span>
              Last played:{' '}
              <strong>{GAMES.find((g) => g.id === lastGame)?.name ?? lastGame}</strong>
              {' '}— click it to jump back in instantly.
            </span>
          </div>
        )}

        {/* Game Grid */}
        <div className="sg-grid">
          {GAMES.map((game) => {
            const isSelected  = selected === game.id;
            const isLastGame  = !isNewUser && lastGame === game.id;
            const isHovered   = hovered === game.id;

            return (
              <div
                key={game.id}
                className={`sg-card ${isSelected ? 'sg-card-active' : ''} ${isHovered && !isSelected ? 'sg-card-hover' : ''}`}
                onClick={() => handleSelect(game.id)}
                onMouseEnter={() => setHovered(game.id)}
                onMouseLeave={() => setHovered('')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSelect(game.id)}
                aria-pressed={isSelected}
                id={`game-card-${game.id}`}
              >
                {/* Previously visited tag */}
                {isLastGame && (
                  <div className="sg-prev-tag">
                    <span className="sg-prev-dot" />
                    Previously Visited
                  </div>
                )}

                {/* Selected check */}
                {isSelected && (
                  <div className="sg-check-badge">✓</div>
                )}

                <div className="sg-card-icon">{game.icon}</div>
                <h3 className="sg-card-name">{game.name}</h3>
                <p className="sg-card-genre">{game.genre}</p>
                <div className="sg-card-players">
                  <span className="sg-live-dot" />
                  {game.players}
                </div>
              </div>
            );
          })}
        </div>

        {/* Error */}
        {error && (
          <p className="sg-error">
            <span>⚠️</span> {error}
          </p>
        )}

        {/* CTA */}
        <div className="sg-cta">
          <button
            id="sg-proceed-btn"
            className={`sg-proceed-btn ${!selected ? 'sg-proceed-disabled' : ''}`}
            onClick={handleProceed}
            disabled={!selected}
          >
            {selected
              ? `Enter ${GAMES.find((g) => g.id === selected)?.name} →`
              : 'Select a Game to Continue'}
          </button>
          <button
            className="sg-back-btn"
            onClick={() => onViewChange('landing')}
            id="sg-back-btn"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectGame;
