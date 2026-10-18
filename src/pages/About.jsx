import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Heart, Leaf, MapPin, Globe } from 'lucide-react';
import './About.css';

const values = [
  {
    icon: <Compass size={22} />,
    title: 'Intentional Design',
    desc: 'Every journey we help shape begins with a conversation — not a catalogue. We plan around who you are, not who we assume most travellers to be.',
  },
  {
    icon: <Heart size={22} />,
    title: 'Personal Pace',
    desc: 'Some people want to cover as much ground as possible. Others want one place, deeply. Both are valid. We design around your preferred rhythm.',
  },
  {
    icon: <Leaf size={22} />,
    title: 'Meaningful Moments',
    desc: 'The goal isn\'t a longer itinerary — it\'s a better one. We look for experiences that create genuine connection with a place, its people, and its culture.',
  },
  {
    icon: <Globe size={22} />,
    title: 'Curious Exploration',
    desc: 'The most interesting travel is often just beyond the obvious path. We encourage you to look past the famous landmark and find what makes a destination truly singular.',
  },
];

const tripTypes = [
  'Honeymoon & romantic escapes',
  'Family holidays with children',
  'Solo travel and self-discovery',
  'Adventure and active travel',
  'Cultural immersion journeys',
  'Nature, wildlife, and slow travel',
];

export default function About() {
  useEffect(() => {
    document.title = 'About Us — WanderVista Travels';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="about-page" id="main-content">
      {/* Hero */}
      <section className="about-hero" aria-label="About WanderVista">
        <div className="about-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85&auto=format&fit=crop"
            alt="Aerial view of green mountain valley with morning mist"
            className="about-hero__img"
          />
          <div className="about-hero__overlay" aria-hidden="true" />
        </div>
        <div className="container about-hero__content">
          <span className="section-label" style={{ color: 'var(--color-gold-light)' }}>Our Story</span>
          <h1 className="about-hero__title">
            We believe travel should<br />feel <em>personal.</em>
          </h1>
          <p className="about-hero__sub">
            WanderVista was built around the idea that every journey should feel like it was made for no one else.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section section--ivory" aria-labelledby="about-philosophy-heading">
        <div className="container">
          <div className="about-split">
            <div className="about-split__text reveal">
              <span className="section-label">Our Philosophy</span>
              <h2 id="about-philosophy-heading" className="about-split__title">
                More than a destination.<br />A whole experience.
              </h2>
              <p className="about-split__desc">
                The best journeys aren't built around famous landmarks or hotel star ratings. They're built around you — your pace, your curiosity, the kind of morning you want to wake up to. That's the belief WanderVista is built on.
              </p>
              <p className="about-split__desc">
                We design travel around what matters: genuine local experiences, thoughtfully sequenced days, and space to breathe. Not an over-scheduled itinerary, and not a generic resort experience.
              </p>
              <p className="about-split__desc">
                WanderVista Travels is a demonstration brand — all information on this site is fictional and created for the RYNX Digital Media website design challenge.
              </p>
            </div>
            <div className="about-split__image reveal reveal-delay-2">
              <img
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85&auto=format&fit=crop"
                alt="Misty mountain valley seen from above during sunrise"
                className="about-split__img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--white" aria-labelledby="about-values-heading">
        <div className="container">
          <div className="about-values-header">
            <span className="section-label">What We Stand For</span>
            <h2 id="about-values-heading" className="about-values-title">
              The principles behind every journey we plan
            </h2>
          </div>
          <div className="about-values-grid">
            {values.map((v, i) => (
              <div key={i} className={`about-value-card reveal reveal-delay-${i + 1}`}>
                <div className="about-value-card__icon" aria-hidden="true">{v.icon}</div>
                <h3 className="about-value-card__title">{v.title}</h3>
                <p className="about-value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section section--sage" aria-labelledby="about-approach-heading">
        <div className="container">
          <div className="about-approach">
            <div className="about-approach__text reveal">
              <span className="section-label">How We Work</span>
              <h2 id="about-approach-heading" className="about-approach__title">
                Planning starts with a conversation, not a catalogue.
              </h2>
              <p className="about-approach__desc">
                Before we suggest a single destination, we want to understand who you are as a traveller. Do you prefer mornings on a quiet beach or early hikes with long views? A cultural deep-dive or a coastal reset? Adventure or stillness?
              </p>
              <p className="about-approach__desc">
                We then build the journey from there — selecting accommodations, experiences, pacing, and routes that genuinely suit how you want to travel. The result feels less like a tour and more like a journey you designed yourself.
              </p>
            </div>
            <div className="about-approach__trips reveal reveal-delay-2">
              <h3 className="about-approach__trips-title">Types of journeys we love planning</h3>
              <ul className="about-approach__trips-list">
                {tripTypes.map((t, i) => (
                  <li key={i}>
                    <MapPin size={13} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Image feature */}
      <section className="about-feature" aria-label="Visual feature">
        <div className="about-feature__grid">
          <div className="about-feature__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=900&q=85&auto=format&fit=crop"
              alt="Traditional Balinese offerings at a temple"
              className="about-feature__img"
              loading="lazy"
            />
          </div>
          <div className="about-feature__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=85&auto=format&fit=crop"
              alt="Overwater bungalow at the Maldives at sunrise"
              className="about-feature__img"
              loading="lazy"
            />
          </div>
          <div className="about-feature__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=85&auto=format&fit=crop"
              alt="Torii gates at Fushimi Inari shrine in Kyoto"
              className="about-feature__img"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta section--emerald" aria-label="Plan your trip CTA">
        <div className="container about-cta__inner">
          <span className="section-label" style={{ color: 'var(--color-gold-light)' }}>Start Planning</span>
          <h2 className="about-cta__title">
            Tell us what excites you<br />about travel.
          </h2>
          <p className="about-cta__sub">
            Fill in our trip planning form — share your destination interests, travel style, and what matters most. We'll shape a journey around it.
          </p>
          <Link to="/contact" className="btn btn-gold btn--lg" id="about-cta-btn">
            Plan Your Trip <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
