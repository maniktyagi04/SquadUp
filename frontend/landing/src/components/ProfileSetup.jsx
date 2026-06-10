import { useState, useRef } from 'react';

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Argentina','Australia','Austria','Bangladesh',
  'Belgium','Brazil','Canada','Chile','China','Colombia','Croatia','Czech Republic',
  'Denmark','Egypt','Finland','France','Germany','Ghana','Greece','Hungary','India',
  'Indonesia','Iran','Iraq','Ireland','Israel','Italy','Japan','Jordan','Kenya',
  'Malaysia','Mexico','Morocco','Netherlands','New Zealand','Nigeria','Norway',
  'Pakistan','Peru','Philippines','Poland','Portugal','Romania','Russia','Saudi Arabia',
  'South Africa','South Korea','Spain','Sri Lanka','Sweden','Switzerland','Thailand',
  'Turkey','Ukraine','United Arab Emirates','United Kingdom','United States','Vietnam',
];

const GAMES = [
  { id: 'valorant',  name: 'Valorant',          icon: '🔫' },
  { id: 'apex',      name: 'Apex Legends',       icon: '🦊' },
  { id: 'bgmi',      name: 'BGMI',               icon: '🪖' },
  { id: 'cod',       name: 'Call of Duty',        icon: '💣' },
  { id: 'freefire',  name: 'Free Fire',           icon: '🔥' },
  { id: 'minecraft', name: 'Minecraft',           icon: '⛏️' },
  { id: 'lol',       name: 'League of Legends',   icon: '⚔️' },
  { id: 'fortnite',  name: 'Fortnite',            icon: '🏗️' },
  { id: 'csgo',      name: 'CS2',                 icon: '🎯' },
  { id: 'overwatch', name: 'Overwatch 2',         icon: '🦸' },
];

const RANKS_BY_GAME = {
  valorant:  ['Iron','Bronze','Silver','Gold','Platinum','Diamond','Ascendant','Immortal','Radiant'],
  apex:      ['Rookie','Bronze','Silver','Gold','Platinum','Diamond','Master','Predator'],
  bgmi:      ['Bronze','Silver','Gold','Platinum','Diamond','Crown','Ace','Conqueror'],
  cod:       ['Unranked','Bronze','Silver','Gold','Platinum','Diamond','Crimson','Iridescent'],
  freefire:  ['Bronze','Silver','Gold','Platinum','Diamond','Heroic','Grandmaster'],
  minecraft: ['Newcomer','Regular','Veteran','Expert','Master'],
  lol:       ['Iron','Bronze','Silver','Gold','Platinum','Emerald','Diamond','Master','Grandmaster','Challenger'],
  fortnite:  ['Bronze','Silver','Gold','Platinum','Diamond','Elite','Champion','Unreal'],
  csgo:      ['Silver I','Silver II','Silver Elite','Nova','Master Guardian','Legendary Eagle','Supreme','Global Elite'],
  overwatch: ['Bronze','Silver','Gold','Platinum','Diamond','Master','Grandmaster','Champion'],
};

const ROLES_BY_GAME = {
  valorant:  ['Duelist','Initiator','Controller','Sentinel','IGL'],
  apex:      ['Fragger','Support','Recon','IGL','Flanker'],
  bgmi:      ['Entry Fragger','Support','Sniper','IGL','Driver'],
  cod:       ['Slayer','Support','Sniper','Tactician','IGL'],
  freefire:  ['Rusher','Support','Sniper','IGL','Flanker'],
  minecraft: ['Builder','Redstone Engineer','Explorer','PvP Fighter','Support'],
  lol:       ['Top','Jungle','Mid','ADC','Support'],
  fortnite:  ['Fragger','Builder','Support','Sniper','IGL'],
  csgo:      ['Entry Fragger','AWPer','Lurker','Support','IGL'],
  overwatch: ['Tank','DPS','Support','Flex','IGL'],
};

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

const ProfileSetup = ({ onViewChange }) => {
  const fileRef = useRef(null);

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [form, setForm] = useState({
    username: '',
    bio: '',
    country: '',
    mainGame: '',
    rank: '',
    role: '',
  });
  const [availability, setAvailability] = useState([]);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ─── Handlers ──────────────────────────────────────── */
  const handleAvatarClick = () => fileRef.current?.click();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    // Reset dependent fields on game change
    if (field === 'mainGame') {
      updated.rank = '';
      updated.role = '';
    }
    setForm(updated);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const toggleDay = (day) => {
    setAvailability((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required.';
    else if (form.username.trim().length < 3) e.username = 'At least 3 characters.';
    if (!form.country) e.country = 'Please select your country.';
    if (!form.mainGame) e.mainGame = 'Please select your main game.';
    if (!form.rank) e.rank = 'Please select your rank.';
    if (!form.role) e.role = 'Please select your role.';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => onViewChange('select-game'), 1800);
    }, 1600);
  };

  const ranks = RANKS_BY_GAME[form.mainGame] || [];
  const roles = ROLES_BY_GAME[form.mainGame] || [];

  /* ─── Render ─────────────────────────────────────────── */
  return (
    <div className="ps-wrapper">
      {/* Ambient orbs */}
      <div className="ps-orb ps-orb-1" />
      <div className="ps-orb ps-orb-2" />

      <div className="ps-container">
        {/* ── Page header */}
        <div className="ps-page-header">
          <div className="ps-page-badge">🎮 Profile Setup</div>
          <h1 className="ps-page-title">Build Your Gamer Identity</h1>
          <p className="ps-page-sub">Let your squad know who you are and what you bring to the table.</p>
        </div>

        <div className="ps-layout">
          {/* ═══ LEFT: Avatar + Bio ═══════════════════════════ */}
          <div className="ps-left">
            {/* Avatar Upload */}
            <div className="ps-card">
              <h2 className="ps-card-title">
                <span className="ps-card-icon">📸</span> Profile Photo
              </h2>

              <div
                className={`ps-avatar-drop ${avatarPreview ? 'ps-avatar-drop-filled' : ''}`}
                onClick={handleAvatarClick}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                aria-label="Upload profile photo"
                id="avatar-upload-area"
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile preview" className="ps-avatar-img" />
                ) : (
                  <div className="ps-avatar-placeholder">
                    <div className="ps-avatar-icon">👤</div>
                    <p className="ps-avatar-hint">Click or drag & drop</p>
                    <p className="ps-avatar-hint-sub">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
                <div className="ps-avatar-overlay">
                  <span>📷 Change Photo</span>
                </div>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
                id="avatar-file-input"
              />
              {avatarPreview && (
                <button
                  className="ps-remove-avatar"
                  onClick={(e) => { e.stopPropagation(); setAvatarPreview(''); setAvatar(null); }}
                >
                  Remove Photo
                </button>
              )}
            </div>

            {/* Username */}
            <div className="ps-card">
              <h2 className="ps-card-title">
                <span className="ps-card-icon">🏷️</span> Username
              </h2>
              <div className={`ps-input-wrap ${errors.username ? 'ps-input-error' : ''}`}>
                <span className="ps-input-prefix">@</span>
                <input
                  id="ps-username"
                  type="text"
                  className="ps-input ps-input-prefixed"
                  placeholder="your_gamertag"
                  value={form.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  maxLength={24}
                />
                <span className="ps-input-count">{form.username.length}/24</span>
              </div>
              {errors.username && <p className="ps-error-msg">⚠ {errors.username}</p>}
            </div>

            {/* Bio */}
            <div className="ps-card">
              <h2 className="ps-card-title">
                <span className="ps-card-icon">📝</span> Bio
              </h2>
              <textarea
                id="ps-bio"
                className="ps-textarea"
                placeholder="Tell your future squad about your playstyle, goals, and what you bring to the team…"
                value={form.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                maxLength={200}
                rows={4}
              />
              <p className="ps-char-count">{form.bio.length} / 200</p>
            </div>

            {/* Country */}
            <div className="ps-card">
              <h2 className="ps-card-title">
                <span className="ps-card-icon">🌍</span> Country
              </h2>
              <div className={`ps-select-wrap ${errors.country ? 'ps-input-error' : ''}`}>
                <select
                  id="ps-country"
                  className="ps-select"
                  value={form.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                >
                  <option value="">Select your country…</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <span className="ps-select-arrow">▾</span>
              </div>
              {errors.country && <p className="ps-error-msg">⚠ {errors.country}</p>}
            </div>
          </div>

          {/* ═══ RIGHT: Game + Rank + Role + Schedule ════════ */}
          <div className="ps-right">
            {/* Main Game */}
            <div className="ps-card">
              <h2 className="ps-card-title">
                <span className="ps-card-icon">🎮</span> Main Game
              </h2>
              <div className="ps-games-grid">
                {GAMES.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    id={`ps-game-${g.id}`}
                    className={`ps-game-btn ${form.mainGame === g.id ? 'ps-game-btn-active' : ''}`}
                    onClick={() => handleChange('mainGame', g.id)}
                  >
                    <span className="ps-game-emoji">{g.icon}</span>
                    <span className="ps-game-label">{g.name}</span>
                    {form.mainGame === g.id && <span className="ps-game-check">✓</span>}
                  </button>
                ))}
              </div>
              {errors.mainGame && <p className="ps-error-msg">⚠ {errors.mainGame}</p>}
            </div>

            {/* Rank — only shows after game selected */}
            {form.mainGame && (
              <div className="ps-card ps-card-animated">
                <h2 className="ps-card-title">
                  <span className="ps-card-icon">🏆</span> Rank
                </h2>
                <div className="ps-rank-grid">
                  {ranks.map((r) => (
                    <button
                      key={r}
                      type="button"
                      id={`ps-rank-${r.replace(/\s+/g, '-').toLowerCase()}`}
                      className={`ps-rank-btn ${form.rank === r ? 'ps-rank-btn-active' : ''}`}
                      onClick={() => handleChange('rank', r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {errors.rank && <p className="ps-error-msg">⚠ {errors.rank}</p>}
              </div>
            )}

            {/* Role — only shows after game selected */}
            {form.mainGame && (
              <div className="ps-card ps-card-animated">
                <h2 className="ps-card-title">
                  <span className="ps-card-icon">🎭</span> Preferred Role
                </h2>
                <div className="ps-role-grid">
                  {roles.map((r) => (
                    <button
                      key={r}
                      type="button"
                      id={`ps-role-${r.replace(/\s+/g, '-').toLowerCase()}`}
                      className={`ps-role-btn ${form.role === r ? 'ps-role-btn-active' : ''}`}
                      onClick={() => handleChange('role', r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {errors.role && <p className="ps-error-msg">⚠ {errors.role}</p>}
              </div>
            )}

            {/* Weekly Availability */}
            <div className="ps-card">
              <h2 className="ps-card-title">
                <span className="ps-card-icon">📅</span> Weekly Availability
              </h2>
              <p className="ps-card-sub">Select the days you're usually online to play.</p>
              <div className="ps-days-grid">
                {DAYS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    id={`ps-day-${d.toLowerCase()}`}
                    className={`ps-day-btn ${availability.includes(d) ? 'ps-day-btn-active' : ''}`}
                    onClick={() => toggleDay(d)}
                    aria-pressed={availability.includes(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
              {availability.length > 0 && (
                <p className="ps-avail-summary">
                  🟢 Available: <strong>{availability.join(', ')}</strong>
                </p>
              )}
            </div>

            {/* Save */}
            <button
              id="ps-save-btn"
              className={`ps-save-btn ${saving ? 'ps-save-loading' : ''} ${saved ? 'ps-save-done' : ''}`}
              onClick={handleSave}
              disabled={saving || saved}
            >
              {saved ? (
                <><span>✅</span> Profile Saved! Redirecting…</>
              ) : saving ? (
                <><span className="ps-spin" />Saving Profile…</>
              ) : (
                <><span>🚀</span> Save Profile &amp; Find Squads</>
              )}
            </button>

            <button
              className="ps-skip-btn"
              onClick={() => onViewChange('select-game')}
              id="ps-skip-btn"
            >
              Skip for now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
