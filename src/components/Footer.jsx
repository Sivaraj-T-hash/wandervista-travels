import { Link } from 'react-router-dom';
import { Compass, MapPin, Mail, Phone } from 'lucide-react';
import './Footer.css';

const InstagramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const destinationLinks = [
  { to: '/destinations/bali-indonesia', label: 'Bali, Indonesia' },
  { to: '/destinations/kyoto-japan', label: 'Kyoto, Japan' },
  { to: '/destinations/swiss-alps', label: 'Swiss Alps' },
  { to: '/destinations/maldives', label: 'Maldives' },
  { to: '/destinations/cappadocia-turkiye', label: 'Cappadocia' },
  { to: '/destinations/santorini-greece', label: 'Santorini, Greece' },
];

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/packages', label: 'Tour Packages' },
  { to: '/about', label: 'About Us' },
  { to: '/support', label: 'Support & FAQs' },
  { to: '/contact', label: 'Plan Your Trip' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">
        {/* Brand column */}
        <div className="footer__col footer__col--brand">
          <Link to="/" className="footer__brand" aria-label="WanderVista Travels home">
            <span className="footer__brand-icon" aria-hidden="true">
              <Compass size={20} strokeWidth={1.75} />
            </span>
            <span className="footer__brand-name">
              <span className="footer__brand-wander">Wander</span>
              <span className="footer__brand-vista">Vista</span>
            </span>
          </Link>
          <p className="footer__tagline">
            Thoughtfully designed journeys for people who want to experience more than just a destination.
          </p>
          <div className="footer__social" aria-label="Social media">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Twitter / X">
              <TwitterIcon />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer__col">
          <h3 className="footer__heading">Navigate</h3>
          <ul className="footer__links" role="list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer__link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div className="footer__col">
          <h3 className="footer__heading">Destinations</h3>
          <ul className="footer__links" role="list">
            {destinationLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="footer__link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h3 className="footer__heading">Get In Touch</h3>
          <ul className="footer__contact-list" role="list">
            <li>
              <Mail size={14} aria-hidden="true" />
              <span>hello@wandervista.demo</span>
            </li>
            <li>
              <Phone size={14} aria-hidden="true" />
              <span>+91 98765 43210 (Demo)</span>
            </li>
            <li>
              <MapPin size={14} aria-hidden="true" />
              <span>Fictional Street, Demo City</span>
            </li>
          </ul>
          <p className="footer__hours">Mon–Sat, 9:00am – 6:00pm (illustrative)</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            &copy; {year} WanderVista Travels. All rights reserved.
          </p>
          <p className="footer__disclaimer">
            WanderVista Travels is a fictional brand created for the RYNX Digital Media Website Design Challenge. All content, packages, prices, and contact details are demonstrative only. No real travel services are offered.
          </p>
        </div>
      </div>
    </footer>
  );
}
