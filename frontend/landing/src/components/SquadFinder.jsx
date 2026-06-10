import { useState, useMemo } from 'react';

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const ALL_PLAYERS = [
  { id:1,  username:'NightOwl_V',     avatar:'🦉', game:'Valorant',           rank:'Diamond',       role:'Duelist',       region:'India',        availability:['Mon','Tue','Fri','Sat'], status:'Online',   online:true  },
  { id:2,  username:'ShadowSage',     avatar:'🌑', game:'Valorant',           rank:'Immortal',      role:'Sentinel',      region:'Pakistan',     availability:['Wed','Thu','Sat','Sun'], status:'In Match', online:true  },
  { id:3,  username:'FlashPoint_K',   avatar:'⚡', game:'Valorant',           rank:'Diamond',       role:'IGL',           region:'India',        availability:['Mon','Fri','Sat'],       status:'Online',   online:true  },
  { id:4,  username:'VortexAim',      avatar:'🌀', game:'Valorant',           rank:'Platinum',      role:'Initiator',     region:'Bangladesh',   availability:['Tue','Wed','Sun'],       status:'Offline',  online:false },
  { id:5,  username:'AceKing_BGMI',   avatar:'👑', game:'BGMI',              rank:'Conqueror',     role:'Entry Fragger', region:'India',        availability:['Mon','Tue','Wed','Sat'], status:'In Match', online:true  },
  { id:6,  username:'SniperGod99',    avatar:'🎯', game:'BGMI',              rank:'Ace',           role:'Sniper',        region:'India',        availability:['Thu','Fri','Sat','Sun'], status:'Online',   online:true  },
  { id:7,  username:'RushMaster_R',   avatar:'💨', game:'BGMI',              rank:'Ace',           role:'Support',       region:'Bangladesh',   availability:['Mon','Wed','Fri'],       status:'Offline',  online:false },
  { id:8,  username:'FlankKing_X',    avatar:'🗡️', game:'BGMI',             rank:'Ace',           role:'Entry Fragger', region:'India',        availability:['Tue','Thu','Sat'],       status:'Online',   online:true  },
  { id:9,  username:'FireStorm_FF',   avatar:'🔥', game:'Free Fire',         rank:'Heroic',        role:'Rusher',        region:'India',        availability:['Mon','Tue','Sat','Sun'], status:'Online',   online:true  },
  { id:10, username:'SniperElite',    avatar:'🎯', game:'Free Fire',         rank:'Grandmaster',   role:'Sniper',        region:'Bangladesh',   availability:['Wed','Thu','Fri'],       status:'In Match', online:true  },
  { id:11, username:'Skydive_Pro',    avatar:'🪂', game:'Apex Legends',      rank:'Diamond',       role:'Fragger',       region:'India',        availability:['Mon','Fri','Sat'],       status:'Online',   online:true  },
  { id:12, username:'HorizonMain',    avatar:'🌠', game:'Apex Legends',      rank:'Platinum',      role:'Support',       region:'Singapore',    availability:['Tue','Wed','Sun'],       status:'Offline',  online:false },
  { id:13, username:'GibbyGod',       avatar:'🛡️', game:'Apex Legends',     rank:'Diamond',       role:'Support',       region:'India',        availability:['Mon','Thu','Sat'],       status:'Online',   online:true  },
  { id:14, username:'OperatorX',      avatar:'🪖', game:'Call of Duty',      rank:'Diamond',       role:'Slayer',        region:'United States',availability:['Fri','Sat','Sun'],       status:'Online',   online:true  },
  { id:15, username:'GhostIGL',       avatar:'👻', game:'Call of Duty',      rank:'Iridescent',    role:'IGL',           region:'Australia',    availability:['Mon','Tue','Fri'],       status:'In Match', online:true  },
  { id:16, username:'AWPGod_CS',      avatar:'🎯', game:'CS2',               rank:'Supreme',       role:'AWPer',         region:'India',        availability:['Mon','Wed','Sat','Sun'], status:'Online',   online:true  },
  { id:17, username:'LurkerPro',      avatar:'🐍', game:'CS2',               rank:'Master Guardian',role:'Lurker',       region:'India',        availability:['Tue','Thu','Fri'],       status:'Offline',  online:false },
  { id:18, username:'GlobalElite_X',  avatar:'🌍', game:'CS2',               rank:'Global Elite',  role:'AWPer',         region:'India',        availability:['Sat','Sun'],             status:'Online',   online:true  },
  { id:19, username:'JunglePro_LoL',  avatar:'🌲', game:'League of Legends', rank:'Diamond',       role:'Jungle',        region:'South Korea',  availability:['Mon','Tue','Wed'],       status:'In Match', online:true  },
  { id:20, username:'MidLaneMaster',  avatar:'⚔️', game:'League of Legends', rank:'Platinum',     role:'Mid',           region:'India',        availability:['Thu','Fri','Sat'],       status:'Online',   online:true  },
  { id:21, username:'MasterBuilder',  avatar:'🏗️', game:'Minecraft',         rank:'Expert',       role:'Builder',       region:'United States',availability:['Sat','Sun'],             status:'Online',   online:true  },
  { id:22, username:'BuildGod_FN',    avatar:'🏗️', game:'Fortnite',         rank:'Champion',     role:'Builder',       region:'United States',availability:['Fri','Sat','Sun'],       status:'In Match', online:true  },
  { id:23, username:'TankMain_OW',    avatar:'🛡️', game:'Overwatch 2',      rank:'Master',       role:'Tank',          region:'United States',availability:['Mon','Wed','Fri'],       status:'Online',   online:true  },
  { id:24, username:'AnaMain_Pro',    avatar:'🏹', game:'Overwatch 2',       rank:'Grandmaster',  role:'Support',       region:'Australia',    availability:['Tue','Thu','Sat'],       status:'Online',   online:true  },
];

const GAMES = ['All Games','Valorant','BGMI','Apex Legends','Free Fire','Call of Duty','CS2','League of Legends','Fortnite','Minecraft','Overwatch 2'];
const REGIONS = ['All Regions','India','Bangladesh','Pakistan','Singapore','South Korea','Australia','United States'];
const RANKS = ['All Ranks','Iron','Bronze','Silver','Gold','Platinum','Diamond','Ascendant','Immortal','Radiant','Ace','Conqueror','Heroic','Grandmaster','Master Guardian','Supreme','Global Elite','Master','Champion','Expert'];
const ROLES = ['All Roles','Duelist','Initiator','Controller','Sentinel','IGL','Entry Fragger','Sniper','Support','Rusher','Fragger','Lurker','AWPer','Builder','Tank','DPS','Mid','Jungle'];

const GAME_COLOR = {
  Valorant:'#ff4655', 'Apex Legends':'#e8572a', BGMI:'#f5a623', 'Call of Duty':'#00b4d8',
  'Free Fire':'#ff6b35', Minecraft:'#62c654', 'League of Legends':'#c89b3c',
  Fortnite:'#8b5cf6', CS2:'#f5c518', 'Overwatch 2':'#fa9c1e',
};
const GAME_ICON = {
  Valorant:'🔫','Apex Legends':'🦊',BGMI:'🪖','Call of Duty':'💣',
  'Free Fire':'🔥',Minecraft:'⛏️','League of Legends':'⚔️',
  Fortnite:'🏗️',CS2:'🎯','Overwatch 2':'🦸',
};
const STATUS_COLOR = { Online:'#22c55e', 'In Match':'#ef4444', Offline:'#6b7280' };

/* ─────────────────────────────────────────────
   PLAYER CARD
───────────────────────────────────────────── */
const PlayerCard = ({ player }) => {
  const [friended,  setFriended]  = useState(false);
  const [invited,   setInvited]   = useState(false);
  const [frLoading, setFrLoading] = useState(false);
  const [invLoading,setInvLoading]= useState(false);

  const color = GAME_COLOR[player.game] || '#8b5cf6';

  const sendFriendReq = () => {
    if (friended) return;
    setFrLoading(true);
    setTimeout(() => { setFrLoading(false); setFriended(true); }, 900);
  };
  const sendInvite = () => {
    if (invited) return;
    setInvLoading(true);
    setTimeout(() => { setInvLoading(false); setInvited(true); }, 900);
  };

  return (
    <div className="sf-card" style={{ '--game-color': color }}>
      {/* Status badge */}
      <div className="sf-card-status" style={{ background: STATUS_COLOR[player.status] }}>
        {player.status}
      </div>

      {/* Avatar */}
      <div className="sf-card-avatar-wrap">
        <div className="sf-card-avatar" style={{ boxShadow: `0 0 0 3px ${color}40` }}>
          {player.avatar}
        </div>
      </div>

      {/* Info */}
      <div className="sf-card-body">
        <h3 className="sf-card-username">{player.username}</h3>

        <div className="sf-card-game">
          <span className="sf-card-game-icon">{GAME_ICON[player.game]}</span>
          <span className="sf-card-game-name" style={{ color }}>{player.game}</span>
        </div>

        <div className="sf-card-badges">
          <span className="sf-badge sf-badge-rank">{player.rank}</span>
          <span className="sf-badge sf-badge-role">{player.role}</span>
          <span className="sf-badge sf-badge-region">🌐 {player.region}</span>
        </div>

        <div className="sf-card-avail">
          <span className="sf-avail-label">Available:</span>
          <div className="sf-avail-days">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
              <span
                key={d}
                className={`sf-day ${player.availability.includes(d) ? 'sf-day-active' : ''}`}
                style={player.availability.includes(d) ? { background: `${color}25`, color, borderColor: `${color}60` } : {}}
              >{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="sf-card-actions">
        <button
          className={`sf-btn-friend ${friended ? 'sf-btn-done' : ''}`}
          onClick={sendFriendReq}
          disabled={friended || frLoading}
          id={`friend-${player.id}`}
        >
          {frLoading ? <span className="sf-btn-spinner" /> : friended ? '✓ Requested' : '+ Friend Request'}
        </button>
        <button
          className={`sf-btn-invite ${invited ? 'sf-btn-done' : ''}`}
          onClick={sendInvite}
          disabled={invited || invLoading}
          id={`invite-${player.id}`}
          style={{ '--game-color': color }}
        >
          {invLoading ? <span className="sf-btn-spinner" /> : invited ? '✓ Invited' : '⚔️ Invite to Squad'}
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SQUAD FINDER PAGE
───────────────────────────────────────────── */
const SquadFinder = ({ onViewChange }) => {
  const [search,  setSearch]  = useState('');
  const [game,    setGame]    = useState('All Games');
  const [rank,    setRank]    = useState('All Ranks');
  const [role,    setRole]    = useState('All Roles');
  const [region,  setRegion]  = useState('All Regions');
  const [onlyOnline, setOnlyOnline] = useState(false);

  const filtered = useMemo(() => {
    return ALL_PLAYERS.filter(p => {
      if (search   && !p.username.toLowerCase().includes(search.toLowerCase())) return false;
      if (game   !== 'All Games'   && p.game   !== game)   return false;
      if (rank   !== 'All Ranks'   && p.rank   !== rank)   return false;
      if (role   !== 'All Roles'   && p.role   !== role)   return false;
      if (region !== 'All Regions' && p.region !== region) return false;
      if (onlyOnline && !p.online)                         return false;
      return true;
    });
  }, [search, game, rank, role, region, onlyOnline]);

  const clearFilters = () => {
    setSearch(''); setGame('All Games'); setRank('All Ranks');
    setRole('All Roles'); setRegion('All Regions'); setOnlyOnline(false);
  };

  const hasFilters = game !== 'All Games' || rank !== 'All Ranks' || role !== 'All Roles'
    || region !== 'All Regions' || search || onlyOnline;

  return (
    <div className="sf-root">
      {/* Ambient orbs */}
      <div className="sf-orb sf-orb-1" />
      <div className="sf-orb sf-orb-2" />

      <div className="sf-layout">
        {/* ── Page Header ── */}
        <div className="sf-page-header">
          <button className="sf-back-btn" onClick={() => onViewChange('dashboard')} id="sf-back">
            ← Dashboard
          </button>
          <div className="sf-header-center">
            <div className="sf-header-badge">🔍 Squad Finder</div>
            <h1 className="sf-header-title">Find Your Perfect Teammate</h1>
            <p className="sf-header-sub">Browse {ALL_PLAYERS.length} players across all games — filter, search, and squad up.</p>
          </div>
        </div>

        {/* ── Search + Filters ── */}
        <div className="sf-controls">
          {/* Search */}
          <div className="sf-search-wrap">
            <span className="sf-search-icon">🔍</span>
            <input
              id="sf-search"
              type="text"
              className="sf-search-input"
              placeholder="Search by username…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="sf-search-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          {/* Filters row */}
          <div className="sf-filters">
            <div className="sf-filter-group">
              <label className="sf-filter-label">Game</label>
              <select id="sf-filter-game" className="sf-select" value={game} onChange={e => setGame(e.target.value)}>
                {GAMES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="sf-filter-group">
              <label className="sf-filter-label">Rank</label>
              <select id="sf-filter-rank" className="sf-select" value={rank} onChange={e => setRank(e.target.value)}>
                {RANKS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="sf-filter-group">
              <label className="sf-filter-label">Role</label>
              <select id="sf-filter-role" className="sf-select" value={role} onChange={e => setRole(e.target.value)}>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="sf-filter-group">
              <label className="sf-filter-label">Region</label>
              <select id="sf-filter-region" className="sf-select" value={region} onChange={e => setRegion(e.target.value)}>
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <label className="sf-online-toggle" htmlFor="sf-online-check">
              <input
                id="sf-online-check"
                type="checkbox"
                checked={onlyOnline}
                onChange={e => setOnlyOnline(e.target.checked)}
                className="sf-check-input"
              />
              <span className="sf-check-box" />
              <span className="sf-check-text">🟢 Online Only</span>
            </label>
            {hasFilters && (
              <button className="sf-clear-btn" onClick={clearFilters} id="sf-clear-filters">
                ✕ Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Results count ── */}
        <div className="sf-results-bar">
          <span className="sf-results-count">
            {filtered.length === 0
              ? 'No players found'
              : `${filtered.length} player${filtered.length !== 1 ? 's' : ''} found`}
          </span>
          {filtered.filter(p => p.online).length > 0 && (
            <span className="sf-results-online">
              🟢 {filtered.filter(p => p.online).length} online now
            </span>
          )}
        </div>

        {/* ── Player Grid ── */}
        {filtered.length === 0 ? (
          <div className="sf-empty">
            <div className="sf-empty-icon">🎮</div>
            <h3>No players match your filters</h3>
            <p>Try adjusting your search or clearing some filters.</p>
            <button className="sf-clear-btn sf-clear-btn-lg" onClick={clearFilters}>Clear All Filters</button>
          </div>
        ) : (
          <div className="sf-grid">
            {filtered.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SquadFinder;
