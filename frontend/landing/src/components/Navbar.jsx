const Navbar = ({ onViewChange }) => {
  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <span className="logo" style={{ cursor: 'pointer' }} onClick={() => onViewChange('landing')}>
          Squad<span className="logo-accent">UP</span>
        </span>

        <nav className="nav-menu">
          <ul className="nav-list">
            <li><span className="nav-link" style={{ cursor: 'pointer' }} onClick={() => onViewChange('landing')}>Home</span></li>
            <li><a href="#features" className="nav-link">Features</a></li>
            <li><a href="#games" className="nav-link">Games</a></li>
            <li><a href="#how-it-works" className="nav-link">How It Works</a></li>
          </ul>
          <div>
            <button className="btn btn-primary" onClick={() => onViewChange('login')}>Sign In</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
