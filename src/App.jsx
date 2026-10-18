import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowUp, MapPin } from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Support from './pages/Support';
import AITravelAssistant from './components/AITravelAssistant';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      className="back-to-top"
      onClick={scrollToTop}
      aria-label="Back to top of page"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-forest-emerald)',
        color: 'var(--color-white)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-md)',
        cursor: 'pointer',
        zIndex: 900,
        transition: 'transform var(--transition-fast), background-color var(--transition-fast)',
      }}
    >
      <ArrowUp size={20} />
    </button>
  );
}

function NotFound() {
  return (
    <main className="not-found-page section" id="main-content" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-light-sage)',
            color: 'var(--color-forest-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}
        >
          <MapPin size={32} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-h1)', marginBottom: '1rem', color: 'var(--color-forest-emerald)' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--color-muted-text)', marginBottom: '2rem', lineHeight: 'var(--lh-body)' }}>
          The path you took seems to lead off our curated map. Let's guide you back to our destinations and itineraries.
        </p>
        <a href="/" className="btn btn-primary" id="not-found-home-btn">
          Return to Home
        </a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:slug" element={<DestinationDetails />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:slug" element={<PackageDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        <BackToTopButton />
        <AITravelAssistant />
      </div>
    </Router>
  );
}
