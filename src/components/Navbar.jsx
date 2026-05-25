import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <a href="#home" className="logo" onClick={closeMobileMenu}>
          Squad<span className="logo-accent">UP</span>
        </a>

        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home" className="nav-link" onClick={closeMobileMenu}>Home</a>
            </li>
            <li className="nav-item">
              <a href="#features" className="nav-link" onClick={closeMobileMenu}>Features</a>
            </li>
            <li className="nav-item">
              <a href="#games" className="nav-link" onClick={closeMobileMenu}>Games</a>
            </li>
            <li className="nav-item">
              <a href="#how-it-works" className="nav-link" onClick={closeMobileMenu}>How It Works</a>
            </li>
          </ul>

          <div className="auth-buttons">
            <button className="btn-nav-login" onClick={() => alert('Login system coming soon!')}>Login</button>
            <button className="btn btn-primary btn-nav-signup" onClick={() => alert('Registration coming soon!')}>Sign Up</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
