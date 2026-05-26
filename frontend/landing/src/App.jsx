import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Games from './components/Games';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <div className="app-container">
      <Navbar onViewChange={setCurrentView} />
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
