const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <ul className="footer-links">
          <li><a href="#home" className="footer-link">Home</a></li>
          <li><a href="#features" className="footer-link">Features</a></li>
          <li><a href="#games" className="footer-link">Games</a></li>
          <li><a href="#how-it-works" className="footer-link">How It Works</a></li>
        </ul>
        <p className="footer-text">
          &copy; {new Date().getFullYear()} SquadUP. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
