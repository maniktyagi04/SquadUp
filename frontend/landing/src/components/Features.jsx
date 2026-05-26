const Features = () => {
  const featuresList = [
    {
      emoji: "👥",
      title: "Squad Finder",
      desc: "Search for players based on your skill level, play style, and language."
    },
    {
      emoji: "💬",
      title: "Real-time Chat",
      desc: "Coordinate with your newly formed squad using chat rooms before jumping in-game."
    },
    {
      emoji: "🏆",
      title: "Tournament Hub",
      desc: "Join community tournaments and display your squad's stats on leaderboards."
    }
  ];

  return (
    <section id="features">
      <div className="container">
        <h2 className="section-title">Key Features</h2>
        <p className="section-subtitle">
          Everything you need to find the right teammates and build an active gaming community.
        </p>

        <div className="grid-3">
          {featuresList.map((item, index) => (
            <div key={index} className="card">
              <span className="emoji">{item.emoji}</span>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
