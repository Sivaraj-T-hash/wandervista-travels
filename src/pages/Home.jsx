import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Calendar, Users, ChevronRight,
  ArrowRight, Compass, Star, Shield, HeartHandshake, Leaf,
  Hotel, Plane, Car, Bus, Utensils, Sparkles
} from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import PackageCard from '../components/PackageCard';
import SectionHeading from '../components/SectionHeading';
import FAQAccordion from '../components/FAQAccordion';
import { getFeaturedDestinations } from '../data/destinations';
import { getFeaturedPackages } from '../data/packages';
import { faqs } from '../data/faqs';
import './Home.css';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=1800&q=90&auto=format&fit=crop';

const trustItems = [
  { icon: <Compass size={20} />, title: 'Thoughtfully Curated', desc: 'Every itinerary is built around how you travel, not a template.' },
  { icon: <HeartHandshake size={20} />, title: 'Personalised Planning', desc: 'Your trip shaped around your pace, interests, and preferences.' },
  { icon: <Leaf size={20} />, title: 'Meaningful Experiences', desc: 'Carefully selected moments that stay with you long after you return.' },
  { icon: <Shield size={20} />, title: 'Flexible & Transparent', desc: 'Honest, clear information. No hidden charges or vague promises.' },
];

const travelStyles = [
  { label: 'Beach Escapes', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop', style: 'Beach' },
  { label: 'Mountain Retreats', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop', style: 'Adventure' },
  { label: 'Cultural Journeys', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80&auto=format&fit=crop', style: 'Culture' },
  { label: 'Adventure Trails', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80&auto=format&fit=crop', style: 'Adventure' },
  { label: 'Romantic Getaways', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80&auto=format&fit=crop', style: 'Romance' },
  { label: 'Nature & Wildlife', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80&auto=format&fit=crop', style: 'Nature' },
];

const inspirations = [
  {
    title: 'A Slow Weekend in Kerala',
    excerpt: 'Between the canals and the cardamom-scented hills, Kerala teaches you a different pace entirely.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&q=80&auto=format&fit=crop',
    link: '/destinations/kerala-backwaters',
    tag: 'Nature',
  },
  {
    title: 'Finding Quiet on a Tropical Island',
    excerpt: 'What Bali\'s quieter corners feel like — when you leave the well-worn path behind.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80&auto=format&fit=crop',
    link: '/destinations/bali-indonesia',
    tag: 'Beach',
  },
  {
    title: 'Exploring Kyoto Beyond the Crowds',
    excerpt: 'The Kyoto most visitors miss — bamboo groves at 6am, hidden machiya lanes, and temple silences.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80&auto=format&fit=crop',
    link: '/destinations/kyoto-japan',
    tag: 'Culture',
  },
];

const testimonials = [
  {
    quote: 'We asked for something different — no resort, no crowd, just genuine local experiences. The Kyoto itinerary they sketched out was everything we hoped for.',
    name: 'Maya & Rohan',
    trip: 'Kyoto Culture Journey',
    avatar: 'M',
  },
  {
    quote: 'Travelling solo can be daunting. The attention to detail and thoughtful pacing of the Bali trip made me feel completely at ease. Exactly what I needed.',
    name: 'Aditi Nair',
    trip: 'Bali Island Escape',
    avatar: 'A',
  },
  {
    quote: 'The Kerala backwater houseboat was an experience I still think about. The early morning canoe through the village canals was worth the entire trip.',
    name: 'The Krishnamurthy Family',
    trip: 'Kerala Green Trails',
    avatar: 'K',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({ destination: '', style: '', date: '', travellers: '' });
  const featuredDestinations = getFeaturedDestinations();
  const featuredPackages = getFeaturedPackages();

  useEffect(() => {
    document.title = 'WanderVista Travels — Extraordinary Escapes, Thoughtfully Planned';
    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchForm.destination) params.set('q', searchForm.destination);
    if (searchForm.style) params.set('style', searchForm.style);
    navigate(`/destinations?${params.toString()}`);
  };

  return (
    <main className="home" id="main-content">
      {/* ===== HERO ===== */}
      <section className="hero" aria-label="Hero — WanderVista Travels">
        <div className="hero__bg">
          <img src={HERO_IMAGE} alt="Aerial view of a tropical coastline at golden hour" className="hero__bg-img" />
          <div className="hero__bg-overlay" aria-hidden="true" />
        </div>

        <div className="hero__content container">
          <div className="hero__text">
            <h1 className="hero__headline">
              Some places stay<br />
              <em>with you forever.</em>
            </h1>
            <p className="hero__sub">
              Discover extraordinary escapes, hidden gems, and unforgettable journeys —<br className="hero__br" />
              thoughtfully planned around you.
            </p>
            <div className="hero__ctas">
              <Link to="/destinations" className="btn btn-primary btn--lg" id="hero-explore-btn">
                Explore Destinations
              </Link>
              <Link to="/contact" className="btn btn-ghost btn--lg" id="hero-plan-btn">
                Plan Your Journey
              </Link>
            </div>
          </div>

          {/* Search Panel */}
          <form className="hero__search" onSubmit={handleSearch} aria-label="Trip search">
            <div className="hero__search-title">Find Your Escape</div>
            <div className="hero__search-grid">
              <div className="hero__search-field">
                <label htmlFor="hero-destination" className="hero__search-label">
                  <MapPin size={14} aria-hidden="true" /> Destination
                </label>
                <input
                  id="hero-destination"
                  type="text"
                  className="form-input"
                  placeholder="Where to? e.g. Bali, Kyoto"
                  value={searchForm.destination}
                  onChange={(e) => setSearchForm((p) => ({ ...p, destination: e.target.value }))}
                />
              </div>
              <div className="hero__search-field">
                <label htmlFor="hero-style" className="hero__search-label">
                  Travel Style
                </label>
                <div className="form-select-wrapper">
                  <select
                    id="hero-style"
                    className="form-select"
                    value={searchForm.style}
                    onChange={(e) => setSearchForm((p) => ({ ...p, style: e.target.value }))}
                  >
                    <option value="">Any style</option>
                    <option value="Beach">Beach Escapes</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Culture">Culture</option>
                    <option value="Nature">Nature</option>
                    <option value="Romance">Romance</option>
                  </select>
                </div>
              </div>
              <div className="hero__search-field">
                <label htmlFor="hero-date" className="hero__search-label">
                  <Calendar size={14} aria-hidden="true" /> Travel Date
                </label>
                <input
                  id="hero-date"
                  type="date"
                  className="form-input"
                  value={searchForm.date}
                  onChange={(e) => setSearchForm((p) => ({ ...p, date: e.target.value }))}
                />
              </div>
              <div className="hero__search-field">
                <label htmlFor="hero-travellers" className="hero__search-label">
                  <Users size={14} aria-hidden="true" /> Travellers
                </label>
                <div className="form-select-wrapper">
                  <select
                    id="hero-travellers"
                    className="form-select"
                    value={searchForm.travellers}
                    onChange={(e) => setSearchForm((p) => ({ ...p, travellers: e.target.value }))}
                  >
                    <option value="">Select</option>
                    <option value="1">Solo traveller</option>
                    <option value="2">2 travellers</option>
                    <option value="3-4">3–4 travellers</option>
                    <option value="5+">5 or more</option>
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary hero__search-btn" id="hero-search-btn">
              <Search size={16} aria-hidden="true" />
              Search Trips
            </button>
          </form>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll-hint" aria-hidden="true">
          <span className="hero__scroll-dot" />
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="trust-bar section--sm section--white" aria-label="Our approach">
        <div className="container">
          <div className="trust-bar__grid">
            {trustItems.map((item, i) => (
              <div className="trust-bar__item reveal" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="trust-bar__icon" aria-hidden="true">{item.icon}</span>
                <div>
                  <strong className="trust-bar__title">{item.title}</strong>
                  <p className="trust-bar__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT WE DO / CAREFREE TRAVEL SECTION ===== */}
      <section className="what-we-do section--emerald" aria-labelledby="what-we-do-heading">
        <div className="container">
          <div className="what-we-do__header">
            <span className="section-label" style={{ color: 'var(--color-gold-light)' }}>
              Complete Worry-Free Travel Care
            </span>
            <h2 id="what-we-do-heading" className="what-we-do__title">
              What We Do For You
            </h2>
            <p className="what-we-do__tagline">
              <strong>Our core aim:</strong> You should enjoy and immerse in every moment of your trip without ever having to think about travel logistics or planning headaches.
            </p>
          </div>

          <div className="what-we-do__grid">
            <div className="what-we-do__card">
              <div className="what-we-do__icon-wrap">
                <Hotel size={24} />
              </div>
              <h3 className="what-we-do__card-title">All Accommodations Arranged</h3>
              <p className="what-we-do__card-text">
                From luxury beachside villas to alpine chalets and boutique heritage riads, every stay is handpicked, reserved, and vetted for comfort before you arrive.
              </p>
              <span className="what-we-do__pill">Handpicked Luxury Stays</span>
            </div>

            <div className="what-we-do__card">
              <div className="what-we-do__icon-wrap">
                <Plane size={24} />
              </div>
              <h3 className="what-we-do__card-title">Flights, Cabs & Complete Transit</h3>
              <p className="what-we-do__card-text">
                Every leg of your journey is coordinated — flights, dedicated private cabs, intercity express buses, and panoramic scenic trains. Zero stress, seamless transfers.
              </p>
              <div className="what-we-do__transit-badges">
                <span><Plane size={12} /> Flights</span>
                <span><Car size={12} /> Private Cabs</span>
                <span><Bus size={12} /> Luxury Buses</span>
              </div>
            </div>

            <div className="what-we-do__card">
              <div className="what-we-do__icon-wrap">
                <Utensils size={24} />
              </div>
              <h3 className="what-we-do__card-title">Curated Food & Dining Provided</h3>
              <p className="what-we-do__card-text">
                Savor every destination with daily gourmet breakfasts, curated authentic regional dining experiences, and special chef's table dinners tailored to your dietary taste.
              </p>
              <span className="what-we-do__pill">Daily Dining Included</span>
            </div>

            <div className="what-we-do__card what-we-do__card--highlight">
              <div className="what-we-do__icon-wrap">
                <Sparkles size={24} />
              </div>
              <h3 className="what-we-do__card-title">Pure Enjoyment, Zero Hassle</h3>
              <p className="what-we-do__card-text">
                Never worry about routes, schedules, or unexpected delays. We handle every detail behind the scenes so you can disconnect and truly live the adventure.
              </p>
              <span className="what-we-do__pill what-we-do__pill--gold">100% Carefree Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED DESTINATIONS ===== */}
      <section className="section section--ivory" aria-labelledby="destinations-heading">
        <div className="container">
          <div className="home-section-header">
            <SectionHeading
              label="Where Will You Go"
              title="Destinations worth exploring"
              subtitle="A curated selection of places that offer something beyond the obvious — chosen for their depth, beauty, and the quality of experience they offer."
            />
            <Link to="/destinations" className="btn btn-secondary home-section-header__more" id="home-all-dest-btn">
              All Destinations <ArrowRight size={15} />
            </Link>
          </div>

          <div className="dest-grid" id="destinations-heading">
            {featuredDestinations.slice(0, 6).map((dest, i) => (
              <div
                key={dest.id}
                className={`dest-grid__item reveal reveal-delay-${Math.min((i % 3) + 1, 4)}`}
              >
                <DestinationCard
                  destination={dest}
                  variant="default"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRAVEL STYLES ===== */}
      <section className="section section--sage" aria-labelledby="styles-heading">
        <div className="container">
          <SectionHeading
            label="Travel Your Way"
            title="Find your kind of journey"
            subtitle="Not all travel feels the same. Find the style that resonates — then let's find the places that bring it to life."
            id="styles-heading"
          />

          <div className="styles-grid">
            {travelStyles.map((s, i) => (
              <Link
                key={s.label}
                to={`/destinations?style=${s.style}`}
                className="style-card reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
                aria-label={`Browse ${s.label}`}
                id={`style-${s.style.toLowerCase()}`}
              >
                <div className="style-card__img-wrap">
                  <img src={s.image} alt={s.label} className="style-card__img" loading="lazy" />
                  <div className="style-card__overlay" aria-hidden="true" />
                </div>
                <div className="style-card__label">
                  <span>{s.label}</span>
                  <ChevronRight size={14} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PACKAGES ===== */}
      <section className="section section--white" aria-labelledby="packages-heading">
        <div className="container">
          <div className="home-section-header">
            <SectionHeading
              label="Tour Packages"
              title="Sample journeys, ready to personalise"
              subtitle="These itineraries are starting points. Every detail can be shaped around your dates, pace, and interests."
              id="packages-heading"
            />
            <Link to="/packages" className="btn btn-secondary home-section-header__more" id="home-all-pkgs-btn">
              All Packages <ArrowRight size={15} />
            </Link>
          </div>

          <div className="packages-grid">
            {featuredPackages.map((pkg, i) => (
              <div key={pkg.id} className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BRAND STORY ===== */}
      <section className="section brand-story section--ivory" aria-label="About WanderVista">
        <div className="container">
          <div className="brand-story__grid">
            <div className="brand-story__image reveal">
              <img
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85&auto=format&fit=crop"
                alt="Traveller looking across a misty mountain valley"
                className="brand-story__img"
                loading="lazy"
              />
              <div className="brand-story__img-accent" aria-hidden="true" />
            </div>
            <div className="brand-story__content reveal reveal-delay-2">
              <span className="section-label">Our Philosophy</span>
              <h2 className="brand-story__title">
                Travel should feel<br /><em>personal.</em>
              </h2>
              <span className="gold-sep" aria-hidden="true" />
              <p className="brand-story__text">
                WanderVista was built around a simple idea: that the best journeys aren't built around famous landmarks or hotel star ratings — they're built around you. Your pace. Your curiosity. The kind of morning you want to wake up to.
              </p>
              <p className="brand-story__text">
                Whether you're drawn to the quiet canals of Kerala, the ancient temples of Kyoto, or the silence of an alpine morning above the clouds, we design each itinerary to feel like it was made for no one else.
              </p>
              <Link to="/about" className="btn btn-primary" id="home-story-btn">
                Discover Our Story <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INSPIRATION ===== */}
      <section className="section section--white" aria-labelledby="inspiration-heading">
        <div className="container">
          <SectionHeading
            label="Travel Inspiration"
            title="Stories from the road"
            subtitle="Short reads on places worth knowing — written to help you discover your next destination."
            id="inspiration-heading"
          />

          <div className="inspiration-grid">
            {inspirations.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className={`insp-card reveal reveal-delay-${i + 1}`}
                aria-label={item.title}
              >
                <div className="insp-card__img-wrap">
                  <img src={item.image} alt={item.title} className="insp-card__img" loading="lazy" />
                  <div className="insp-card__img-overlay" aria-hidden="true" />
                  <span className="insp-card__tag">{item.tag}</span>
                </div>
                <div className="insp-card__body">
                  <h3 className="insp-card__title">{item.title}</h3>
                  <p className="insp-card__excerpt">{item.excerpt}</p>
                  <span className="insp-card__read">
                    Read more <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section testimonials section--sage" aria-labelledby="testimonials-heading">
        <div className="container">
          <SectionHeading
            label="Traveller Stories"
            title="What stays with people"
            subtitle={
              <span>
                Sample traveller perspectives — demonstration content only.{' '}
                <em>Not verified reviews.</em>
              </span>
            }
            align="center"
            id="testimonials-heading"
          />

          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div key={i} className={`testi-card reveal reveal-delay-${i + 1}`}>
                <blockquote className="testi-card__quote">"{t.quote}"</blockquote>
                <div className="testi-card__author">
                  <div className="testi-card__avatar" aria-hidden="true">{t.avatar}</div>
                  <div>
                    <strong className="testi-card__name">{t.name}</strong>
                    <span className="testi-card__trip">{t.trip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQs ===== */}
      <section className="section section--ivory" aria-labelledby="faq-heading">
        <div className="container">
          <div className="faq-layout">
            <div className="faq-layout__heading">
              <SectionHeading
                label="Common Questions"
                title="Things worth knowing before you plan"
              />
              <p className="faq-layout__sub">
                Have a question not covered here? Use the trip planning form and we'll address it in the enquiry.
              </p>
              <Link to="/contact" className="btn btn-secondary" id="home-faq-contact-btn">
                Ask a question <ArrowRight size={15} />
              </Link>
            </div>
            <div className="faq-layout__accordion">
              <FAQAccordion faqs={faqs.slice(0, 5)} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="cta-section" aria-label="Plan your trip">
        <div className="cta-section__bg">
          <img
            src="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=1600&q=85&auto=format&fit=crop"
            alt="Tropical ocean panorama at twilight"
            className="cta-section__img"
            loading="lazy"
          />
          <div className="cta-section__overlay" aria-hidden="true" />
        </div>
        <div className="cta-section__content container">
          <span className="section-label" style={{ color: 'var(--color-gold-light)' }}>
            Start Here
          </span>
          <h2 className="cta-section__title">
            Your next unforgettable<br />journey begins here.
          </h2>
          <p className="cta-section__sub">
            Tell us what inspires you, and let's shape a trip around it.
          </p>
          <Link to="/contact" className="btn btn-primary btn--lg" id="home-final-cta-btn">
            Plan Your Trip <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
