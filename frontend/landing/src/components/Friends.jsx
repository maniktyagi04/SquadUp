import { useState, useMemo } from 'react';

/* ─────────────────────────────────────────────
   INITIAL MOCK DATA
───────────────────────────────────────────── */
const INITIAL_FRIENDS = [
  { id: 1, username: 'ApexPredator', avatar: '🦁', game: 'Apex Legends', region: 'India', status: 'Online', lastActive: 'Active now', color: '#e8572a' },
  { id: 2, username: 'NinjaViper', avatar: '🐍', game: 'Valorant', region: 'Singapore', status: 'In Match', lastActive: 'Active now', color: '#ff4655' },
  { id: 3, username: 'ChickenDinner', avatar: '🍗', game: 'BGMI', region: 'India', status: 'Offline', lastActive: '2h ago', color: '#f5a623' },
  { id: 4, username: 'CallMeGhost', avatar: '👻', game: 'Call of Duty', region: 'Australia', status: 'Online', lastActive: 'Active now', color: '#00b4d8' },
  { id: 5, username: 'DiamondDigger', avatar: '⛏️', game: 'Minecraft', region: 'United States', status: 'Offline', lastActive: '1d ago', color: '#62c654' },
  { id: 6, username: 'YasuoFeeder', avatar: '⚔️', game: 'League of Legends', region: 'South Korea', status: 'In Match', lastActive: 'Active now', color: '#c89b3c' },
  { id: 7, username: 'SniperWolf', avatar: '🐺', game: 'CS2', region: 'India', status: 'Online', lastActive: 'Active now', color: '#f5c518' },
  { id: 8, username: 'VictoryRoyale', avatar: '👑', game: 'Fortnite', region: 'United States', status: 'Offline', lastActive: '3d ago', color: '#8b5cf6' },
];

const INITIAL_INCOMING = [
  { id: 101, username: 'PhoenixRider', avatar: '🦅', game: 'Valorant', mutuals: 3, timeAgo: '10m ago' },
  { id: 102, username: 'CreeperSlayer', avatar: '💣', game: 'Minecraft', mutuals: 1, timeAgo: '1h ago' },
  { id: 103, username: 'WukongPro', avatar: '🐵', game: 'Free Fire', mutuals: 5, timeAgo: '4h ago' },
];

const INITIAL_OUTGOING = [
  { id: 201, username: 'HyperAim', avatar: '🎯', game: 'CS2', timeAgo: '2h ago' },
  { id: 202, username: 'MercyMercy', avatar: '👼', game: 'Overwatch 2', timeAgo: '1d ago' },
];

const STATUS_COLOR = {
  Online: '#22c55e',
  'In Match': '#f59e0b',
  Offline: '#6b7280',
};

const GAME_ICON = {
  'Valorant': '🔫',
  'Apex Legends': '🦊',
  'BGMI': '🪖',
  'Call of Duty': '💣',
  'Free Fire': '🔥',
  'Minecraft': '⛏️',
  'League of Legends': '⚔️',
  'Fortnite': '🏗️',
  'CS2': '🎯',
  'Overwatch 2': '🦸',
};

/* ─────────────────────────────────────────────
   REUSABLE SUB-COMPONENTS
───────────────────────────────────────────── */

// 1. Friend Item Row / Card
const FriendCard = ({ friend, onRemove }) => {
  return (
    <div className="fm-card" style={{ '--game-color': friend.color }}>
      <div className="fm-card-left">
        <div className="fm-avatar-wrap">
          <div className="fm-avatar">{friend.avatar}</div>
          <span 
            className="fm-status-dot" 
            style={{ background: STATUS_COLOR[friend.status] }} 
            title={friend.status}
          />
        </div>
        <div>
          <h3 className="fm-username">{friend.username}</h3>
          <p className="fm-details">
            <span className="fm-game-icon">{GAME_ICON[friend.game]}</span>
            <span className="fm-game-name" style={{ color: friend.color }}>{friend.game}</span>
            <span className="fm-separator">·</span>
            <span className="fm-region">🌐 {friend.region}</span>
          </p>
        </div>
      </div>
      <div className="fm-card-right">
        <div className="fm-meta-status">
          <span className="fm-status-text" style={{ color: STATUS_COLOR[friend.status] }}>
            {friend.status}
          </span>
          <span className="fm-active-time">{friend.lastActive}</span>
        </div>
        <button 
          className="fm-btn fm-btn-danger" 
          onClick={() => onRemove(friend)}
          id={`remove-friend-${friend.id}`}
        >
          Remove Friend
        </button>
      </div>
    </div>
  );
};

// 2. Incoming Request Card
const IncomingCard = ({ request, onAccept, onReject }) => {
  return (
    <div className="fm-card fm-card-request">
      <div className="fm-card-left">
        <div className="fm-avatar">{request.avatar}</div>
        <div>
          <h3 className="fm-username">{request.username}</h3>
          <p className="fm-details">
            <span>Wants to play <strong>{request.game}</strong></span>
            <span className="fm-separator">·</span>
            <span>{request.mutuals} mutual friends</span>
          </p>
        </div>
      </div>
      <div className="fm-card-right">
        <span className="fm-time">{request.timeAgo}</span>
        <div className="fm-actions-row">
          <button 
            className="fm-btn fm-btn-success" 
            onClick={() => onAccept(request)}
            id={`accept-req-${request.id}`}
          >
            Accept
          </button>
          <button 
            className="fm-btn fm-btn-outline-danger" 
            onClick={() => onReject(request)}
            id={`reject-req-${request.id}`}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Outgoing Request Card
const OutgoingCard = ({ request, onCancel }) => {
  return (
    <div className="fm-card fm-card-request">
      <div className="fm-card-left">
        <div className="fm-avatar">{request.avatar}</div>
        <div>
          <h3 className="fm-username">{request.username}</h3>
          <p className="fm-details">
            <span>Sent request for <strong>{request.game}</strong></span>
          </p>
        </div>
      </div>
      <div className="fm-card-right">
        <span className="fm-time">Sent {request.timeAgo}</span>
        <button 
          className="fm-btn fm-btn-outline" 
          onClick={() => onCancel(request.id)}
          id={`cancel-req-${request.id}`}
        >
          Cancel Request
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN FRIENDS PAGE COMPONENT
───────────────────────────────────────────── */
const Friends = ({ onViewChange }) => {
  const [friends, setFriends] = useState(INITIAL_FRIENDS);
  const [incoming, setIncoming] = useState(INITIAL_INCOMING);
  const [outgoing, setOutgoing] = useState(INITIAL_OUTGOING);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'incoming' | 'outgoing'
  const [friendToRemove, setFriendToRemove] = useState(null);

  // Filter items based on active tab and search query
  const filteredList = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (activeTab === 'list') {
      return friends.filter(f => f.username.toLowerCase().includes(query));
    } else if (activeTab === 'incoming') {
      return incoming.filter(i => i.username.toLowerCase().includes(query));
    } else {
      return outgoing.filter(o => o.username.toLowerCase().includes(query));
    }
  }, [search, activeTab, friends, incoming, outgoing]);

  // Actions handlers
  const handleAccept = (req) => {
    // Add to friends
    const newFriend = {
      id: Date.now(),
      username: req.username,
      avatar: req.avatar,
      game: req.game,
      region: 'India', // default region
      status: 'Online',
      lastActive: 'Active now',
      color: '#8b5cf6', // default color accent
    };
    setFriends(prev => [newFriend, ...prev]);
    // Remove from incoming
    setIncoming(prev => prev.filter(item => item.id !== req.id));
  };

  const handleReject = (req) => {
    setIncoming(prev => prev.filter(item => item.id !== req.id));
  };

  const handleCancelOutgoing = (id) => {
    setOutgoing(prev => prev.filter(item => item.id !== id));
  };

  const handleRemoveFriend = () => {
    if (!friendToRemove) return;
    setFriends(prev => prev.filter(f => f.id !== friendToRemove.id));
    setFriendToRemove(null);
  };

  return (
    <div className="fm-root">
      {/* Ambient glowing background orbs */}
      <div className="fm-orb fm-orb-1" />
      <div className="fm-orb fm-orb-2" />

      <div className="fm-layout">
        {/* Header section */}
        <div className="fm-header">
          <button className="fm-back-btn" onClick={() => onViewChange('dashboard')} id="fm-back">
            ← Dashboard
          </button>
          <div className="fm-header-center">
            <div className="fm-header-badge">👥 Community</div>
            <h1 className="fm-header-title">Friends Management</h1>
            <p className="fm-header-sub">Manage your connections, approve squad requests, and check online status.</p>
          </div>
        </div>

        {/* Search & Tabs Controls */}
        <div className="fm-controls">
          {/* Search bar */}
          <div className="fm-search-wrap">
            <span className="fm-search-icon">🔍</span>
            <input
              id="fm-search"
              type="text"
              className="fm-search-input"
              placeholder={`Search in ${activeTab === 'list' ? 'friends list' : activeTab === 'incoming' ? 'incoming requests' : 'outgoing requests'}…`}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="fm-search-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="fm-tabs">
            <button 
              className={`fm-tab ${activeTab === 'list' ? 'fm-tab-active' : ''}`}
              onClick={() => { setActiveTab('list'); setSearch(''); }}
              id="tab-friends-list"
            >
              Friends List
              <span className="fm-tab-badge">{friends.length}</span>
            </button>

            <button 
              className={`fm-tab ${activeTab === 'incoming' ? 'fm-tab-active' : ''}`}
              onClick={() => { setActiveTab('incoming'); setSearch(''); }}
              id="tab-friends-incoming"
            >
              Incoming Requests
              {incoming.length > 0 && <span className="fm-tab-badge fm-tab-badge-alert">{incoming.length}</span>}
              {incoming.length === 0 && <span className="fm-tab-badge">{incoming.length}</span>}
            </button>

            <button 
              className={`fm-tab ${activeTab === 'outgoing' ? 'fm-tab-active' : ''}`}
              onClick={() => { setActiveTab('outgoing'); setSearch(''); }}
              id="tab-friends-outgoing"
            >
              Outgoing Requests
              <span className="fm-tab-badge">{outgoing.length}</span>
            </button>
          </div>
        </div>

        {/* List Grid / Panel */}
        <div className="fm-list-panel">
          {filteredList.length === 0 ? (
            <div className="fm-empty">
              <div className="fm-empty-icon">
                {activeTab === 'list' ? '👥' : activeTab === 'incoming' ? '📩' : '📤'}
              </div>
              <h3>No {activeTab === 'list' ? 'friends' : activeTab === 'incoming' ? 'incoming requests' : 'outgoing requests'} found</h3>
              <p>
                {search 
                  ? 'Try clearing or modifying your search keyword.' 
                  : activeTab === 'list' 
                    ? 'Start building your network! Go to Squad Finder to invite team players.' 
                    : activeTab === 'incoming' 
                      ? 'No pending requests. Check back later!' 
                      : 'You haven\'t sent any requests recently.'}
              </p>
              {search && (
                <button className="fm-btn fm-btn-outline" onClick={() => setSearch('')}>
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="fm-list-grid">
              {activeTab === 'list' && filteredList.map(f => (
                <FriendCard 
                  key={f.id} 
                  friend={f} 
                  onRemove={setFriendToRemove} 
                />
              ))}

              {activeTab === 'incoming' && filteredList.map(i => (
                <IncomingCard 
                  key={i.id} 
                  request={i} 
                  onAccept={handleAccept} 
                  onReject={handleReject} 
                />
              ))}

              {activeTab === 'outgoing' && filteredList.map(o => (
                <OutgoingCard 
                  key={o.id} 
                  request={o} 
                  onCancel={handleCancelOutgoing} 
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Removal */}
      {friendToRemove && (
        <div className="fm-modal-backdrop">
          <div className="fm-modal">
            <div className="fm-modal-header">
              <h3>Remove Friend</h3>
              <button className="fm-modal-close" onClick={() => setFriendToRemove(null)}>✕</button>
            </div>
            <div className="fm-modal-body">
              <p>
                Are you sure you want to remove <strong>{friendToRemove.username}</strong> from your friends list? 
                You will no longer see their online status or invite them to squads.
              </p>
            </div>
            <div className="fm-modal-footer">
              <button 
                className="fm-btn fm-btn-outline" 
                onClick={() => setFriendToRemove(null)}
                id="fm-cancel-remove"
              >
                Cancel
              </button>
              <button 
                className="fm-btn fm-btn-danger" 
                onClick={handleRemoveFriend}
                id="fm-confirm-remove"
              >
                Yes, Remove Friend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Friends;
