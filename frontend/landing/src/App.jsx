import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Games from './components/Games';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Games />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

export default App;
