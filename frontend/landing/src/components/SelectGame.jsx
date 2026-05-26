import { useState } from 'react';

const SelectGame = ({ onSelectGame, onViewChange }) => {
  const games = [
    { name: 'Valorant', genre: 'First-Person Shooter' },
    { name: 'BGMI', genre: 'Battle Royale' },
    { name: 'Minecraft', genre: 'Sandbox / Survival' },
    { name: 'Call of Duty', genre: 'Action Shooter' },
    { name: 'Free Fire', genre: 'Mobile Battle Royale' }
  ];

  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');

  const handleProceed = () => {
    if (!selected) {
      setError('Please select a game to proceed.');
      return;
    }
    onSelectGame(selected);
    onViewChange('dashboard');
  };

  return (
    <div className="game-select-container">
      <h2 className="select-title">Choose Your Game</h2>
      <p className="select-subtitle">Select your preferred game to find active squads and teammates.</p>

      <div className="select-game-grid">
        {games.map((game, index) => (
          <div
            key={index}
            className={`select-card ${selected === game.name ? 'active' : ''}`}
            onClick={() => {
              setSelected(game.name);
              setError('');
            }}
          >
            <h3 className="select-card-title">{game.name}</h3>
            <p className="select-card-meta">{game.genre}</p>
          </div>
        ))}
      </div>

      {error && <p style={{ color: '#ff6b6b', fontSize: '14px', marginBottom: '20px' }}>{error}</p>}
      <button className="btn btn-primary" onClick={handleProceed}>
        Proceed to Dashboard
      </button>
    </div>
  );
};

export default SelectGame;
