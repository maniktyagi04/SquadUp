import { useState } from 'react';

const Navbar = () => {
  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <a href="#home" className="logo">
          Squad<span className="logo-accent">UP</span>
        </a>

        <nav className="nav-menu">
          <ul className="nav-list">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#features" className="nav-link">Features</a></li>
            <li><a href="#games" className="nav-link">Games</a></li>
            <li><a href="#how-it-works" className="nav-link">How It Works</a></li>
          </ul>
          <div>
            <button className="btn btn-primary" onClick={() => alert('Sign In coming soon!')}>Sign In</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
