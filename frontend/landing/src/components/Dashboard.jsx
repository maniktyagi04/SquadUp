import { useState } from 'react';

/* ─────────────────────────────────────────────
   MOCK DATA  (game-aware where relevant)
───────────────────────────────────────────── */

const GAME_META = {
  Valorant:          { icon: '🔫', color: '#ff4655', bg: 'linear-gradient(135deg,#ff4655 0%,#7c0a10 100%)' },
  'Apex Legends':    { icon: '🦊', color: '#e8572a', bg: 'linear-gradient(135deg,#e8572a 0%,#7c2800 100%)' },
  BGMI:              { icon: '🪖', color: '#f5a623', bg: 'linear-gradient(135deg,#f5a623 0%,#7c4a00 100%)' },
  'Call of Duty':    { icon: '💣', color: '#00b4d8', bg: 'linear-gradient(135deg,#00b4d8 0%,#003d50 100%)' },
  'Free Fire':       { icon: '🔥', color: '#ff6b35', bg: 'linear-gradient(135deg,#ff6b35 0%,#7c2500 100%)' },
  Minecraft:         { icon: '⛏️', color: '#62c654', bg: 'linear-gradient(135deg,#62c654 0%,#1a4d15 100%)' },
  'League of Legends': { icon: '⚔️', color: '#c89b3c', bg: 'linear-gradient(135deg,#c89b3c 0%,#5a3c00 100%)' },
  Fortnite:          { icon: '🏗️', color: '#8b5cf6', bg: 'linear-gradient(135deg,#8b5cf6 0%,#3b0087 100%)' },
  CS2:               { icon: '🎯', color: '#f5c518', bg: 'linear-gradient(135deg,#f5c518 0%,#5a4200 100%)' },
  'Overwatch 2':     { icon: '🦸', color: '#fa9c1e', bg: 'linear-gradient(135deg,#fa9c1e 0%,#6b3700 100%)' },
};

const STATS_BY_GAME = {
  Valorant:          { kd: '2.14', wr: '68%', matches: 342, hours: 890,  rank: 'Diamond 2',  hs: '31%' },
  'Apex Legends':    { kd: '3.40', wr: '54%', matches: 210, hours: 620,  rank: 'Platinum I',  hs: '22%' },
  BGMI:              { kd: '4.10', wr: '61%', matches: 510, hours: 1100, rank: 'Ace',          hs: '18%' },
  'Call of Duty':    { kd: '1.85', wr: '57%', matches: 405, hours: 760,  rank: 'Platinum',    hs: '27%' },
  'Free Fire':       { kd: '5.20', wr: '72%', matches: 830, hours: 1450, rank: 'Heroic',      hs: '16%' },
  Minecraft:         { kd: '—',    wr: '—',   matches: 90,  hours: 2300, rank: 'Expert',      hs: '—'   },
  'League of Legends': { kd: '4.8 KDA', wr: '55%', matches: 620, hours: 1800, rank: 'Gold II', hs: '—' },
  Fortnite:          { kd: '2.90', wr: '48%', matches: 280, hours: 540,  rank: 'Diamond',     hs: '24%' },
  CS2:               { kd: '1.62', wr: '53%', matches: 390, hours: 1120, rank: 'Master Guardian', hs: '38%' },
  'Overwatch 2':     { kd: '—',    wr: '62%', matches: 200, hours: 480,  rank: 'Platinum',    hs: '—'   },
};

const TEAMMATES_BY_GAME = {
  Valorant: [
    { id: 1, username: 'NightOwl_V',   avatar: '🦉', rank: 'Diamond', role: 'Duelist',   wr: '71%', compat: 96, region: 'IN' },
    { id: 2, username: 'ShadowSage',   avatar: '🌑', rank: 'Immortal', role: 'Sentinel',  wr: '64%', compat: 91, region: 'PK' },
    { id: 3, username: 'FlashPoint_K', avatar: '⚡', rank: 'Diamond', role: 'IGL',       wr: '68%', compat: 88, region: 'IN' },
    { id: 4, username: 'VortexAim',    avatar: '🌀', rank: 'Plat',    role: 'Initiator', wr: '59%', compat: 82, region: 'BD' },
    { id: 5, username: 'CrystalSage',  avatar: '💎', rank: 'Diamond', role: 'Controller',wr: '65%', compat: 79, region: 'LK' },
    { id: 6, username: 'Phantom_X99',  avatar: '👻', rank: 'Ascendant',role: 'Duelist',  wr: '73%', compat: 95, region: 'IN' },
  ],
  'Apex Legends': [
    { id: 1, username: 'Skydive_Pro',  avatar: '🪂', rank: 'Diamond',  role: 'Fragger',  wr: '60%', compat: 94, region: 'IN' },
    { id: 2, username: 'HorizonMain',  avatar: '🌠', rank: 'Platinum', role: 'Support',  wr: '55%', compat: 89, region: 'SG' },
    { id: 3, username: 'RathaMain',    avatar: '🦅', rank: 'Master',   role: 'Recon',    wr: '67%', compat: 85, region: 'IN' },
    { id: 4, username: 'BangMaestro', avatar: '💥', rank: 'Diamond',  role: 'IGL',      wr: '58%', compat: 80, region: 'PH' },
    { id: 5, username: 'WraithFanatic',avatar: '🌀', rank: 'Plat',    role: 'Flanker',  wr: '52%', compat: 76, region: 'MY' },
    { id: 6, username: 'GibbyGod',     avatar: '🛡️', rank: 'Diamond', role: 'Support',  wr: '62%', compat: 90, region: 'IN' },
  ],
  BGMI: [
    { id: 1, username: 'AceKing_BGMI', avatar: '👑', rank: 'Conqueror', role: 'Entry Fragger', wr: '68%', compat: 97, region: 'IN' },
    { id: 2, username: 'SniperGod99',  avatar: '🎯', rank: 'Ace',      role: 'Sniper',         wr: '65%', compat: 92, region: 'IN' },
    { id: 3, username: 'RushMaster_R', avatar: '💨', rank: 'Ace',      role: 'Support',        wr: '61%', compat: 87, region: 'BD' },
    { id: 4, username: 'DriverPro_X',  avatar: '🚗', rank: 'Diamond',  role: 'Driver',         wr: '58%', compat: 84, region: 'PK' },
    { id: 5, username: 'CampMaster',   avatar: '🏕️', rank: 'Crown',   role: 'IGL',            wr: '64%', compat: 81, region: 'IN' },
    { id: 6, username: 'FlankKing_X',  avatar: '🗡️', rank: 'Ace',     role: 'Entry Fragger',  wr: '70%', compat: 93, region: 'IN' },
  ],
  'Call of Duty': [
    { id: 1, username: 'OperatorX',    avatar: '🪖', rank: 'Diamond',   role: 'Slayer',     wr: '62%', compat: 90, region: 'US' },
    { id: 2, username: 'SniperWolf99', avatar: '🐺', rank: 'Platinum',  role: 'Sniper',     wr: '57%', compat: 85, region: 'IN' },
    { id: 3, username: 'TacticsGod',   avatar: '🗺️', rank: 'Crimson',   role: 'Tactician',  wr: '64%', compat: 88, region: 'UK' },
    { id: 4, username: 'SearchKing',   avatar: '💣', rank: 'Diamond',   role: 'Support',    wr: '60%', compat: 82, region: 'IN' },
    { id: 5, username: 'GhostIGL',     avatar: '👻', rank: 'Iridescent',role: 'IGL',        wr: '68%', compat: 95, region: 'AU' },
    { id: 6, username: 'RushFrenzy',   avatar: '⚡', rank: 'Gold',      role: 'Slayer',     wr: '54%', compat: 78, region: 'IN' },
  ],
  'Free Fire': [
    { id: 1, username: 'FireStorm_FF', avatar: '🔥', rank: 'Heroic',      role: 'Rusher',  wr: '74%', compat: 96, region: 'IN' },
    { id: 2, username: 'SniperElite',  avatar: '🎯', rank: 'Grandmaster', role: 'Sniper',  wr: '70%', compat: 93, region: 'BD' },
    { id: 3, username: 'SupportKing',  avatar: '🛡️', rank: 'Heroic',     role: 'Support', wr: '65%', compat: 88, region: 'IN' },
    { id: 4, username: 'IGL_Flame',    avatar: '🌟', rank: 'Heroic',      role: 'IGL',     wr: '67%', compat: 85, region: 'PK' },
    { id: 5, username: 'FlankMaster',  avatar: '🐍', rank: 'Diamond',     role: 'Flanker', wr: '63%', compat: 80, region: 'IN' },
    { id: 6, username: 'RushBoss_FF',  avatar: '💥', rank: 'Heroic',      role: 'Rusher',  wr: '71%', compat: 91, region: 'MY' },
  ],
  Minecraft: [
    { id: 1, username: 'MasterBuilder', avatar: '🏗️', rank: 'Expert',  role: 'Builder',  wr: '—',   compat: 92, region: 'US' },
    { id: 2, username: 'RedstoneGod',   avatar: '⚙️', rank: 'Expert',  role: 'Redstone', wr: '—',   compat: 88, region: 'DE' },
    { id: 3, username: 'ExplorerX',     avatar: '🗺️', rank: 'Veteran', role: 'Explorer', wr: '—',   compat: 84, region: 'IN' },
    { id: 4, username: 'PvPKing_MC',    avatar: '⚔️', rank: 'Expert',  role: 'PvP',      wr: '—',   compat: 79, region: 'BR' },
    { id: 5, username: 'SupportMC',     avatar: '💚', rank: 'Regular', role: 'Support',  wr: '—',   compat: 75, region: 'IN' },
    { id: 6, username: 'ArchitectPro',  avatar: '🏰', rank: 'Master',  role: 'Builder',  wr: '—',   compat: 95, region: 'FR' },
  ],
  'League of Legends': [
    { id: 1, username: 'JunglePro_LoL', avatar: '🌲', rank: 'Diamond',    role: 'Jungle',  wr: '57%', compat: 93, region: 'KR' },
    { id: 2, username: 'MidLaneMaster', avatar: '⚔️', rank: 'Platinum',   role: 'Mid',     wr: '55%', compat: 90, region: 'IN' },
    { id: 3, username: 'SupportGod',    avatar: '💚', rank: 'Gold',        role: 'Support', wr: '60%', compat: 86, region: 'CN' },
    { id: 4, username: 'ADCMain_X',     avatar: '🏹', rank: 'Platinum',   role: 'ADC',     wr: '53%', compat: 82, region: 'IN' },
    { id: 5, username: 'TopLaner99',    avatar: '🛡️', rank: 'Gold',       role: 'Top',     wr: '52%', compat: 78, region: 'PH' },
    { id: 6, username: 'IronWill',      avatar: '🗡️', rank: 'Emerald',   role: 'Mid',     wr: '58%', compat: 87, region: 'VN' },
  ],
  Fortnite: [
    { id: 1, username: 'BuildGod_FN',   avatar: '🏗️', rank: 'Champion', role: 'Builder',  wr: '52%', compat: 91, region: 'US' },
    { id: 2, username: 'SniperShot_FN', avatar: '🎯', rank: 'Diamond',  role: 'Sniper',   wr: '49%', compat: 86, region: 'UK' },
    { id: 3, username: 'StormChaser',   avatar: '🌪️', rank: 'Elite',    role: 'Fragger',  wr: '54%', compat: 88, region: 'AU' },
    { id: 4, username: 'SupportFN',     avatar: '💚', rank: 'Gold',      role: 'Support',  wr: '48%', compat: 80, region: 'IN' },
    { id: 5, username: 'BoxFighter99',  avatar: '📦', rank: 'Champion', role: 'Builder',  wr: '56%', compat: 92, region: 'CA' },
    { id: 6, username: 'IGL_Tornado',   avatar: '🌀', rank: 'Diamond',  role: 'IGL',      wr: '51%', compat: 83, region: 'BR' },
  ],
  CS2: [
    { id: 1, username: 'AWPGod_CS',     avatar: '🎯', rank: 'Supreme',       role: 'AWPer',         wr: '56%', compat: 94, region: 'IN' },
    { id: 2, username: 'EntryKing_X',   avatar: '💥', rank: 'Legend Eagle',  role: 'Entry Fragger', wr: '54%', compat: 90, region: 'PK' },
    { id: 3, username: 'LurkerPro',     avatar: '🐍', rank: 'Master Guardian',role: 'Lurker',       wr: '52%', compat: 86, region: 'IN' },
    { id: 4, username: 'IGL_Sigma',     avatar: '📡', rank: 'Supreme',       role: 'IGL',           wr: '57%', compat: 88, region: 'RU' },
    { id: 5, username: 'SupportAce',    avatar: '🛡️', rank: 'Nova Master',  role: 'Support',       wr: '50%', compat: 81, region: 'TR' },
    { id: 6, username: 'GlobalElite_X', avatar: '🌍', rank: 'Global Elite',  role: 'AWPer',         wr: '61%', compat: 97, region: 'IN' },
  ],
  'Overwatch 2': [
    { id: 1, username: 'TankMain_OW',   avatar: '🛡️', rank: 'Master',    role: 'Tank',    wr: '65%', compat: 92, region: 'US' },
    { id: 2, username: 'DPSKing_X',     avatar: '💥', rank: 'Diamond',   role: 'DPS',     wr: '60%', compat: 88, region: 'KR' },
    { id: 3, username: 'HealBot_Pro',   avatar: '💚', rank: 'Platinum',  role: 'Support', wr: '63%', compat: 85, region: 'IN' },
    { id: 4, username: 'FlexMaster',    avatar: '🎭', rank: 'Diamond',   role: 'Flex',    wr: '58%', compat: 82, region: 'UK' },
    { id: 5, username: 'IGLOverwatch',  avatar: '📡', rank: 'Master',    role: 'IGL',     wr: '66%', compat: 90, region: 'JP' },
    { id: 6, username: 'AnaMain_Pro',   avatar: '🏹', rank: 'Grandmaster',role: 'Support',wr: '68%', compat: 95, region: 'AU' },
  ],
};

const FRIEND_REQUESTS = [
  { id: 1, username: 'PrecisionAim_X', avatar: '🎯', game: 'Valorant',    mutuals: 4 },
  { id: 2, username: 'NightStorm99',   avatar: '🌙', game: 'BGMI',        mutuals: 2 },
  { id: 3, username: 'DragonSlayer_Z', avatar: '🐉', game: 'Free Fire',   mutuals: 7 },
];

const ONLINE_FRIENDS = [
  { id: 1, username: 'GhostBullet',   avatar: '👻', status: 'In Match',    game: 'Valorant',       ping: 42  },
  { id: 2, username: 'StormRider_K',  avatar: '⚡', status: 'In Lobby',   game: 'BGMI',           ping: 38  },
  { id: 3, username: 'ShadowFox_99',  avatar: '🦊', status: 'Online',      game: 'Apex Legends',   ping: 55  },
  { id: 4, username: 'CrypticByte',   avatar: '💻', status: 'In Match',    game: 'CS2',            ping: 29  },
  { id: 5, username: 'ArcaneWizard',  avatar: '🧙', status: 'In Lobby',   game: 'League of Legends', ping: 60 },
  { id: 6, username: 'IronFist_X',    avatar: '🥊', status: 'Online',      game: 'Fortnite',       ping: 44  },
];

const TOURNAMENTS_BY_GAME = {
  Valorant: [
    { id: 1, name: 'VCT Campus Series',   date: 'Jun 15', prize: '₹50,000', slots: '12/32', mode: '5v5', level: 'Open'    },
    { id: 2, name: 'Diamond Clash Cup',   date: 'Jun 20', prize: '₹25,000', slots: '28/64', mode: '5v5', level: 'Diamond+' },
    { id: 3, name: 'Night Owl Invitational',date: 'Jul 1', prize: '₹1,00,000',slots: '4/16', mode: '5v5', level: 'Immortal+'},
  ],
  'Apex Legends': [
    { id: 1, name: 'ALGS Community Cup', date: 'Jun 18', prize: '₹40,000', slots: '18/20', mode: 'Trios', level: 'Plat+'  },
    { id: 2, name: 'Predator\'s Path',    date: 'Jun 25', prize: '₹75,000', slots: '6/10',  mode: 'Trios', level: 'Diamond+'},
    { id: 3, name: 'Drop Zone Open',      date: 'Jul 5',  prize: '₹20,000', slots: '35/60', mode: 'Trios', level: 'Open'   },
  ],
  BGMI: [
    { id: 1, name: 'BGMI Pro Series',       date: 'Jun 14', prize: '₹1,00,000', slots: '8/25',  mode: 'Squad', level: 'Ace+' },
    { id: 2, name: 'Conqueror\'s Crown Cup', date: 'Jun 22', prize: '₹2,00,000', slots: '2/16',  mode: 'Squad', level: 'Conqueror' },
    { id: 3, name: 'Weekend Warriors',       date: 'Jun 29', prize: '₹30,000',   slots: '40/100',mode: 'Squad', level: 'Open' },
  ],
  'Call of Duty': [
    { id: 1, name: 'CDL Community Clash',   date: 'Jun 17', prize: '₹60,000', slots: '10/16', mode: '4v4', level: 'Plat+'  },
    { id: 2, name: 'Warzone Kings Cup',      date: 'Jun 24', prize: '₹35,000', slots: '20/50', mode: 'Quads',level: 'Open'  },
    { id: 3, name: 'Search & Destroy Pro',   date: 'Jul 3',  prize: '₹80,000', slots: '6/8',   mode: '5v5', level: 'Diamond+'},
  ],
  'Free Fire': [
    { id: 1, name: 'FF Grandmaster Series', date: 'Jun 13', prize: '₹75,000',   slots: '15/25',  mode: 'Squad', level: 'Heroic+'      },
    { id: 2, name: 'Rush Gaming Cup',        date: 'Jun 21', prize: '₹50,000',   slots: '30/60',  mode: 'Squad', level: 'Diamond+'     },
    { id: 3, name: 'Free Fire Open 2025',    date: 'Jul 8',  prize: '₹1,50,000', slots: '50/150', mode: 'Squad', level: 'Open'         },
  ],
  Minecraft: [
    { id: 1, name: 'MCC Build Battle',       date: 'Jun 16', prize: 'Trophy',  slots: '20/40', mode: 'Team',  level: 'All Skill' },
    { id: 2, name: 'Hardcore Survival Race',  date: 'Jun 23', prize: 'Trophy',  slots: '8/16',  mode: 'Solo',  level: 'Expert'    },
    { id: 3, name: 'PvP Arena Championship',  date: 'Jul 4',  prize: '₹20,000', slots: '12/32', mode: 'Team',  level: 'Open'      },
  ],
  'League of Legends': [
    { id: 1, name: 'Clash Weekend Series',   date: 'Jun 15', prize: 'Clash Trophy', slots: '18/32', mode: '5v5', level: 'Gold+'   },
    { id: 2, name: 'Diamond Rift Cup',        date: 'Jun 22', prize: '₹80,000',      slots: '8/16',  mode: '5v5', level: 'Diamond+'},
    { id: 3, name: 'Iron to Challenger',      date: 'Jul 2',  prize: 'Coaching Pack', slots: '60/100',mode: '5v5', level: 'Open'   },
  ],
  Fortnite: [
    { id: 1, name: 'FNCS Community Cup',     date: 'Jun 14', prize: '$500',    slots: '40/100', mode: 'Duos',   level: 'Open'   },
    { id: 2, name: 'Champions League Open',  date: 'Jun 21', prize: '$1,000',  slots: '18/32',  mode: 'Trios',  level: 'Elite+' },
    { id: 3, name: 'Build Off Battle',        date: 'Jul 6',  prize: '$250',   slots: '80/200', mode: 'Solos',  level: 'Open'   },
  ],
  CS2: [
    { id: 1, name: 'ESEA Community League',  date: 'Jun 15', prize: '₹70,000',  slots: '6/8',   mode: '5v5', level: 'Supreme+' },
    { id: 2, name: 'DM Showdown Cup',         date: 'Jun 22', prize: '₹30,000',  slots: '14/32', mode: '5v5', level: 'MG+'     },
    { id: 3, name: 'Inferno Classic Open',    date: 'Jul 1',  prize: '₹1,20,000',slots: '2/16',  mode: '5v5', level: 'Legend+' },
  ],
  'Overwatch 2': [
    { id: 1, name: 'OWL Community Cup',      date: 'Jun 18', prize: '₹45,000', slots: '10/16', mode: '5v5', level: 'Plat+'   },
    { id: 2, name: 'Tank Buster Invitational',date: 'Jun 25', prize: '₹60,000', slots: '6/8',   mode: '5v5', level: 'Diamond+'},
    { id: 3, name: 'Overwatch Open Series',   date: 'Jul 7',  prize: '₹25,000', slots: '26/64', mode: '5v5', level: 'Open'   },
  ],
};

const SQUAD_ACTIVITY = [
  { id: 1, type: 'win',    user: 'GhostBullet',  action: 'won a ranked match',   game: 'Valorant',       time: '2m ago',   icon: '🏆' },
  { id: 2, type: 'join',   user: 'SniperGod99',  action: 'joined your squad',    game: 'BGMI',           time: '15m ago',  icon: '🤝' },
  { id: 3, type: 'invite', user: 'NightOwl_V',   action: 'invited you to squad', game: 'Valorant',       time: '32m ago',  icon: '📩' },
  { id: 4, type: 'win',    user: 'FireStorm_FF', action: 'hit Grandmaster rank', game: 'Free Fire',      time: '1h ago',   icon: '⭐' },
  { id: 5, type: 'loss',   user: 'Your Squad',   action: 'lost a match (-18 RR)',game: 'Valorant',       time: '2h ago',   icon: '😤' },
  { id: 6, type: 'join',   user: 'AceKing_BGMI', action: 'created a new squad',  game: 'BGMI',           time: '3h ago',   icon: '🛡️' },
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

const StatCard = ({ label, value, icon, accent }) => (
  <div className="db-stat-card" style={{ '--accent': accent }}>
    <div className="db-stat-icon">{icon}</div>
    <div className="db-stat-value">{value}</div>
    <div className="db-stat-label">{label}</div>
  </div>
);

const TeammateCard = ({ tm, gameMeta }) => (
  <div className="db-tm-card">
    <div className="db-tm-avatar" style={{ background: gameMeta?.bg }}>{tm.avatar}</div>
    <div className="db-tm-info">
      <div className="db-tm-name">{tm.username}</div>
      <div className="db-tm-meta">
        <span className="db-tm-rank">{tm.rank}</span>
        <span className="db-tm-role">{tm.role}</span>
        <span className="db-tm-region">🌐 {tm.region}</span>
      </div>
      {tm.wr !== '—' && <div className="db-tm-wr">Win Rate: <strong>{tm.wr}</strong></div>}
    </div>
    <div className="db-tm-compat">
      <div className="db-tm-compat-score" style={{ color: tm.compat >= 90 ? '#22c55e' : tm.compat >= 80 ? '#f59e0b' : '#ef4444' }}>
        {tm.compat}%
      </div>
      <div className="db-tm-compat-label">Match</div>
    </div>
    <button className="db-tm-btn" id={`invite-${tm.id}`}>Invite</button>
  </div>
);

const FriendRequestCard = ({ req }) => (
  <div className="db-fr-card">
    <div className="db-fr-avatar">{req.avatar}</div>
    <div className="db-fr-info">
      <div className="db-fr-name">{req.username}</div>
      <div className="db-fr-meta">{req.game} · {req.mutuals} mutual friends</div>
    </div>
    <div className="db-fr-actions">
      <button className="db-fr-accept" id={`accept-${req.id}`}>✓</button>
      <button className="db-fr-decline" id={`decline-${req.id}`}>✕</button>
    </div>
  </div>
);

const OnlineFriendRow = ({ friend }) => {
  const statusColor = friend.status === 'In Match' ? '#ef4444' : friend.status === 'In Lobby' ? '#f59e0b' : '#22c55e';
  return (
    <div className="db-of-row">
      <div className="db-of-avatar">
        {friend.avatar}
        <span className="db-of-dot" style={{ background: statusColor }} />
      </div>
      <div className="db-of-info">
        <div className="db-of-name">{friend.username}</div>
        <div className="db-of-game">{friend.game}</div>
      </div>
      <div className="db-of-right">
        <span className="db-of-status" style={{ color: statusColor }}>{friend.status}</span>
        <span className="db-of-ping">{friend.ping}ms</span>
      </div>
    </div>
  );
};

const TournamentCard = ({ t, accent }) => {
  const slotsArr = t.slots.split('/');
  const filled = parseInt(slotsArr[0]);
  const total  = parseInt(slotsArr[1]);
  const pct    = Math.round((filled / total) * 100);
  const almostFull = pct >= 75;

  return (
    <div className="db-tour-card">
      <div className="db-tour-header">
        <div>
          <div className="db-tour-name">{t.name}</div>
          <div className="db-tour-meta">
            <span className="db-tour-mode">{t.mode}</span>
            <span className="db-tour-level" style={{ borderColor: accent, color: accent }}>{t.level}</span>
          </div>
        </div>
        <div className="db-tour-prize" style={{ color: accent }}>{t.prize}</div>
      </div>
      <div className="db-tour-footer">
        <div className="db-tour-slots">
          <div className="db-tour-slot-bar">
            <div className="db-tour-slot-fill" style={{ width: `${pct}%`, background: almostFull ? '#ef4444' : accent }} />
          </div>
          <span className={almostFull ? 'db-tour-slots-label db-tour-slots-hot' : 'db-tour-slots-label'}>
            {t.slots} Slots {almostFull && '🔥'}
          </span>
        </div>
        <div className="db-tour-date-row">
          <span className="db-tour-date">📅 {t.date}</span>
          <button className="db-tour-btn" style={{ '--accent': accent }} id={`reg-${t.id}`}>Register</button>
        </div>
      </div>
    </div>
  );
};

const ActivityRow = ({ item }) => {
  const typeColor = { win: '#22c55e', loss: '#ef4444', join: '#8b5cf6', invite: '#3b82f6' };
  return (
    <div className="db-act-row">
      <div className="db-act-icon">{item.icon}</div>
      <div className="db-act-info">
        <span className="db-act-user" style={{ color: typeColor[item.type] || '#fff' }}>{item.user}</span>
        <span className="db-act-action"> {item.action}</span>
        <span className="db-act-game"> · {item.game}</span>
      </div>
      <div className="db-act-time">{item.time}</div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────── */

const Dashboard = ({ selectedGame, onViewChange }) => {
  const [friendRequests, setFriendRequests] = useState(FRIEND_REQUESTS);
  const [activeTab, setActiveTab] = useState('teammates');

  const meta    = GAME_META[selectedGame]  || GAME_META['Valorant'];
  const stats   = STATS_BY_GAME[selectedGame] || STATS_BY_GAME['Valorant'];
  const mates   = TEAMMATES_BY_GAME[selectedGame] || TEAMMATES_BY_GAME['Valorant'];
  const tours   = TOURNAMENTS_BY_GAME[selectedGame] || TOURNAMENTS_BY_GAME['Valorant'];

  const handleAccept  = (id) => setFriendRequests(prev => prev.filter(r => r.id !== id));
  const handleDecline = (id) => setFriendRequests(prev => prev.filter(r => r.id !== id));

  return (
    <div className="db-root">
      {/* Ambient orbs */}
      <div className="db-orb db-orb-1" style={{ background: meta.color }} />
      <div className="db-orb db-orb-2" />

      <div className="db-layout">

        {/* ══════════ WELCOME BANNER ══════════ */}
        <div className="db-banner" style={{ '--game-bg': meta.bg }}>
          <div className="db-banner-left">
            <div className="db-banner-game-icon">{meta.icon}</div>
            <div>
              <p className="db-banner-tag">CURRENTLY PLAYING</p>
              <h1 className="db-banner-title">{selectedGame} <span className="db-banner-dash">Dashboard</span></h1>
              <p className="db-banner-sub">Welcome back, Commander 👋 Your squad is waiting.</p>
            </div>
          </div>
          <div className="db-banner-actions">
            <button className="db-banner-btn-outline" onClick={() => onViewChange('select-game')} id="db-change-game">
              🔄 Switch Game
            </button>
            <button className="db-banner-btn-primary" id="db-create-squad" onClick={() => alert('Create Squad coming soon!')}>
              ⚔️ Create Squad
            </button>
            <button className="db-banner-btn-danger" onClick={() => onViewChange('landing')} id="db-signout">
              Sign Out
            </button>
          </div>
        </div>

        {/* ══════════ GAMER STATS ══════════ */}
        <section className="db-section">
          <h2 className="db-section-title">
            <span className="db-section-icon">📊</span> Your Stats
            <span className="db-section-badge" style={{ background: meta.color }}>{stats.rank}</span>
          </h2>
          <div className="db-stats-grid">
            <StatCard label="K/D Ratio"     value={stats.kd}      icon="🎯" accent={meta.color} />
            <StatCard label="Win Rate"       value={stats.wr}      icon="🏆" accent="#22c55e"    />
            <StatCard label="Matches"        value={stats.matches} icon="🎮" accent="#8b5cf6"    />
            <StatCard label="Hours Played"   value={`${stats.hours}h`} icon="⏱️" accent="#f59e0b" />
            {stats.hs !== '—' && <StatCard label="Headshot %" value={stats.hs} icon="💥" accent="#ef4444" />}
          </div>
        </section>

        {/* ══════════ MAIN CONTENT 2-COL ══════════ */}
        <div className="db-two-col">

          {/* LEFT COLUMN */}
          <div className="db-col-main">

            {/* Tabs: Teammates / Tournaments */}
            <div className="db-tabs">
              <button
                className={`db-tab ${activeTab === 'teammates' ? 'db-tab-active' : ''}`}
                style={{ '--accent': meta.color }}
                onClick={() => setActiveTab('teammates')}
                id="tab-teammates"
              >
                👥 Recommended Teammates
              </button>
              <button
                className={`db-tab ${activeTab === 'tournaments' ? 'db-tab-active' : ''}`}
                style={{ '--accent': meta.color }}
                onClick={() => setActiveTab('tournaments')}
                id="tab-tournaments"
              >
                🏆 Upcoming Tournaments
              </button>
            </div>

            {activeTab === 'teammates' && (
              <div className="db-tm-list">
                {mates.map(tm => (
                  <TeammateCard key={tm.id} tm={tm} gameMeta={meta} />
                ))}
              </div>
            )}

            {activeTab === 'tournaments' && (
              <div className="db-tour-list">
                {tours.map(t => (
                  <TournamentCard key={t.id} t={t} accent={meta.color} />
                ))}
              </div>
            )}

            {/* Squad Activity */}
            <section className="db-section" style={{ marginTop: '28px' }}>
              <h2 className="db-section-title">
                <span className="db-section-icon">⚡</span> Recent Squad Activity
              </h2>
              <div className="db-act-card">
                {SQUAD_ACTIVITY.map(item => (
                  <ActivityRow key={item.id} item={item} />
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="db-col-side">

            {/* Friend Requests */}
            <section className="db-section">
              <h2 className="db-section-title">
                <span className="db-section-icon">📩</span> Friend Requests
                {friendRequests.length > 0 && (
                  <span className="db-notif-dot">{friendRequests.length}</span>
                )}
              </h2>
              <div className="db-fr-list">
                {friendRequests.length === 0 ? (
                  <p className="db-empty-msg">No pending requests 🎉</p>
                ) : (
                  friendRequests.map(req => (
                    <div key={req.id} className="db-fr-card">
                      <div className="db-fr-avatar">{req.avatar}</div>
                      <div className="db-fr-info">
                        <div className="db-fr-name">{req.username}</div>
                        <div className="db-fr-meta">{req.game} · {req.mutuals} mutual</div>
                      </div>
                      <div className="db-fr-actions">
                        <button className="db-fr-accept" onClick={() => handleAccept(req.id)} id={`accept-${req.id}`}>✓</button>
                        <button className="db-fr-decline" onClick={() => handleDecline(req.id)} id={`decline-${req.id}`}>✕</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Online Friends */}
            <section className="db-section">
              <h2 className="db-section-title">
                <span className="db-section-icon">🟢</span> Online Friends
                <span className="db-online-count">{ONLINE_FRIENDS.length} online</span>
              </h2>
              <div className="db-of-list">
                {ONLINE_FRIENDS.map(f => (
                  <OnlineFriendRow key={f.id} friend={f} />
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
