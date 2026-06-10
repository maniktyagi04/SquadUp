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
import ProfileSetup from './components/ProfileSetup';
import SquadFinder from './components/SquadFinder';
import Dashboard from './components/Dashboard';
import Friends from './components/Friends';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedGame, setSelectedGame] = useState('');
  // Track whether the current session started from signup (new user) or login (returning)
  const [isNewUser, setIsNewUser] = useState(false);

  // Wrapper so child components can set isNewUser before changing view
  const handleViewChange = (view, newUser = null) => {
    if (newUser !== null) setIsNewUser(newUser);
    setCurrentView(view);
  };

  const hideNav     = currentView === 'dashboard' || currentView === 'profile-setup' || currentView === 'squad-finder' || currentView === 'friends';
  const hideFooter  = currentView === 'dashboard' || currentView === 'profile-setup' || currentView === 'select-game' || currentView === 'squad-finder' || currentView === 'friends';

  return (
    <div className="app-container">
      {!hideNav && <Navbar onViewChange={handleViewChange} />}
      <main>
        {currentView === 'landing' && (
          <>
            <Hero onViewChange={handleViewChange} />
            <Features />
            <Games />
            <HowItWorks />
          </>
        )}

        {currentView === 'login' && (
          <Login onViewChange={handleViewChange} />
        )}

        {currentView === 'signup' && (
          <Signup onViewChange={handleViewChange} />
        )}

        {currentView === 'profile-setup' && (
          <ProfileSetup onViewChange={handleViewChange} />
        )}

        {currentView === 'select-game' && (
          <SelectGame
            onSelectGame={setSelectedGame}
            onViewChange={handleViewChange}
            isNewUser={isNewUser}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard selectedGame={selectedGame} onViewChange={handleViewChange} />
        )}

        {currentView === 'squad-finder' && (
          <SquadFinder onViewChange={handleViewChange} />
        )}

        {currentView === 'friends' && (
          <Friends onViewChange={handleViewChange} />
        )}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
