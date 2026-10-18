import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Compass, ChevronRight } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/destinations', label: 'Destinations' },
  { to: '/packages', label: 'Tour Packages' },
  { to: '/about', label: 'About Us' },
  { to: '/support', label: 'Support' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handlePlanTrip = () => {
    setMenuOpen(false);
    navigate('/contact');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
        <div className="navbar__inner container">
          {/* Wordmark */}
          <Link to="/" className="navbar__brand" onClick={closeMenu} aria-label="WanderVista Travels — Home">
            <span className="navbar__brand-icon" aria-hidden="true">
              <Compass size={22} strokeWidth={1.75} />
            </span>
            <span className="navbar__brand-text">
              <span className="navbar__brand-wander">Wander</span>
              <span className="navbar__brand-vista">Vista</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar__nav" aria-label="Main navigation">
            <ul className="navbar__links" role="list">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `navbar__link${isActive ? ' navbar__link--active' : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div className="navbar__actions">
            <button className="btn btn-primary btn--sm navbar__cta" onClick={handlePlanTrip} id="nav-plan-trip">
              Plan Your Trip
            </button>
            <button
              className="navbar__burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Drawer Portaled to document.body */}
      {typeof document !== 'undefined' && createPortal(
        <>
          <div
            id="mobile-menu"
            ref={menuRef}
            className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
            aria-hidden={!menuOpen}
          >
            <div className="navbar__mobile-header">
              <Link to="/" className="navbar__brand" onClick={closeMenu} aria-label="WanderVista Travels Home">
                <span className="navbar__brand-icon" aria-hidden="true">
                  <Compass size={22} strokeWidth={1.75} />
                </span>
                <span className="navbar__brand-text">
                  <span className="navbar__brand-wander">Wander</span>
                  <span className="navbar__brand-vista">Vista</span>
                </span>
              </Link>
              <button
                className="navbar__mobile-close"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="navbar__mobile-nav">
              <ul className="navbar__mobile-links" role="list">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.end}
                      className={({ isActive }) =>
                        `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
                      }
                      onClick={closeMenu}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={16} className="navbar__mobile-chevron" aria-hidden="true" />
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="navbar__mobile-footer">
                <button
                  className="btn btn-primary navbar__mobile-cta"
                  onClick={handlePlanTrip}
                  id="mobile-plan-trip"
                >
                  Plan Your Trip
                </button>
                <p className="navbar__mobile-helpline">
                  Need travel advice? Call <a href="tel:+18005559876">+1 (800) 555-WVISTA</a>
                </p>
              </div>
            </nav>
          </div>

          {menuOpen && (
            <div className="navbar__overlay" onClick={closeMenu} aria-hidden="true" />
          )}
        </>,
        document.body
      )}
    </>
  );
}
