const Games = () => {
  const gamesList = [
    { title: "Valorant", players: "4.2K Active" },
    { title: "BGMI", players: "5.1K Active" },
    { title: "Minecraft", players: "1.8K Active" },
    { title: "Call of Duty", players: "3.5K Active" },
    { title: "Free Fire", players: "2.9K Active" }
  ];

  return (
    <section id="games">
      <div className="container">
        <h2 className="section-title">Supported Games</h2>
        <p className="section-subtitle">
          Find teammates for any of these popular titles and start playing together.
        </p>

        <div className="games-grid">
          {gamesList.map((game, index) => (
            <div key={index} className="game-card">
              <h3 className="game-title">{game.title}</h3>
              <p className="game-players">{game.players}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Games;
