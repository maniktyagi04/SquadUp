import { useState } from 'react';

const Dashboard = ({ selectedGame, onViewChange }) => {
  const mockSquads = {
    Valorant: [
      { name: 'Ace Defusers', slots: '3/5', desc: 'Looking for a reliable Sage/support main. Competitive rank push.', rank: 'Diamond' },
      { name: 'Vandal Only', slots: '2/5', desc: 'Chill unrated games, no toxic vibes. Just practice aim.', rank: 'Gold' },
      { name: 'Radiant Dreamers', slots: '4/5', desc: 'Tournament practice squad. Must have mic and discord.', rank: 'Immortal' }
    ],
    BGMI: [
      { name: 'Conqueror Rush', slots: '3/4', desc: 'Squad rush gameplay. Need aggressive Assaulter.', rank: 'Ace' },
      { name: 'Chicken Dinners', slots: '2/4', desc: 'Safe play for tier rank push. Play for survival.', rank: 'Crown' }
    ],
    Minecraft: [
      { name: 'Survival Realm', slots: '5/10', desc: 'SMP server looking for long-term builders. Active community.', rank: 'Pro Builder' },
      { name: 'Speedrunners', slots: '1/4', desc: 'Co-op speedrun attempts. Knowledge of nether paths required.', rank: 'Expert' }
    ],
    'Call of Duty': [
      { name: 'Search & Destroy', slots: '4/6', desc: 'Tactical matches. Snipers preferred.', rank: 'Legendary' },
      { name: 'Warzone Crew', slots: '2/4', desc: 'Bounty hunting and contracts. Aggressive drop.', rank: 'Level 150+' }
    ],
    'Free Fire': [
      { name: 'Ranked Pushers', slots: '3/4', desc: 'Clash Squad push. Snipers only.', rank: 'Heroic' },
      { name: 'Rush Gamers', slots: '2/4', desc: 'Aggressive drops in Bermuda. Play for kills.', rank: 'Diamond' }
    ]
  };

  const squads = mockSquads[selectedGame] || [];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">{selectedGame} Dashboard</h2>
          <p className="dashboard-welcome">Find active lobbies and join your perfect squad.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="btn btn-secondary" onClick={() => onViewChange('select-game')}>
            Change Game
          </button>
          <button className="btn btn-primary" onClick={() => onViewChange('landing')}>
            Sign Out
          </button>
        </div>
      </div>

      <h3 className="squads-section-title">Active Squad Lobbies</h3>

      {squads.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No active lobbies found for this game. Create one now!</p>
      ) : (
        <div className="squads-grid">
          {squads.map((squad, index) => (
            <div key={index} className="squad-card">
              <div className="squad-header">
                <span className="squad-name">{squad.name}</span>
                <span className="squad-slots">{squad.slots}</span>
              </div>
              <p className="squad-desc">{squad.desc}</p>
              <div className="squad-footer">
                <span className="squad-rank">
                  Required: <span className="squad-rank-val">{squad.rank}</span>
                </span>
                <button
                  className="btn btn-primary"
                  style={{ padding: '6px 14px', fontSize: '12px' }}
                  onClick={() => alert(`Joined ${squad.name} successfully!`)}
                >
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
