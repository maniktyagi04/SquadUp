const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-tag">🎮 Find Your Squad</div>
        <h1 className="hero-title">
          Connect and Play with Teammates
        </h1>
        <p className="hero-description">
          Create squads, connect with other players, and play your favorite games together. No more playing solo.
        </p>

        <div>
          <a href="#how-it-works" className="btn btn-primary">Get Started</a>
          <a href="#features" className="btn btn-secondary">Learn More</a>
        </div>

        <div className="hero-stats">
          <div>
            <span className="stat-number">10K+</span>
            <span className="stat-label">Active Players</span>
          </div>
          <div>
            <span className="stat-number">2.5K+</span>
            <span className="stat-label">Squads Formed</span>
          </div>
          <div>
            <span className="stat-number">15+</span>
            <span className="stat-label">Supported Games</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
