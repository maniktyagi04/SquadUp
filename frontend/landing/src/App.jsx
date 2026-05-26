import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Games from './components/Games';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import SelectGame from './components/SelectGame';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedGame, setSelectedGame] = useState('');

  return (
    <div className="app-container">
      {currentView !== 'dashboard' && <Navbar onViewChange={setCurrentView} />}
      <main>
        {currentView === 'landing' && (
          <>
            <Hero onViewChange={setCurrentView} />
            <Features />
            <Games />
            <HowItWorks />
          </>
        )}
        {currentView === 'login' && (
          <Login onViewChange={setCurrentView} />
        )}
        {currentView === 'signup' && (
          <Signup onViewChange={setCurrentView} />
        )}
        {currentView === 'select-game' && (
          <SelectGame onSelectGame={setSelectedGame} onViewChange={setCurrentView} />
        )}
        {currentView === 'dashboard' && (
          <Dashboard selectedGame={selectedGame} onViewChange={setCurrentView} />
        )}
      </main>
      {currentView !== 'dashboard' && <Footer />}
    </div>
  );
}

export default App;
