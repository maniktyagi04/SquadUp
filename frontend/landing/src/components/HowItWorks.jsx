const HowItWorks = () => {
  const stepsList = [
    {
      step: "01",
      title: "Create Profile",
      desc: "Connect your gaming accounts and state your playstyle preferences."
    },
    {
      step: "02",
      title: "Find Players",
      desc: "Browse other lobbies or match instantly based on active lobbies."
    },
    {
      step: "03",
      title: "Squad Up",
      desc: "Jump into voice channels and start playing with your squad."
    }
  ];

  return (
    <section id="how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Getting started is easy. Follow these simple steps to find your next squad.
        </p>

        <div className="grid-3">
          {stepsList.map((item, index) => (
            <div key={index} className="card">
              <span className="emoji" style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>
                {item.step}
              </span>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
