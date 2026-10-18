import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, X as XIcon, Clock, Users, MapPin, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { getPackageBySlug, packages } from '../data/packages';
import './PackageDetails.css';

export default function PackageDetails() {
  const { slug } = useParams();
  const pkg = getPackageBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (pkg) {
      document.title = `${pkg.name} — WanderVista Travels`;
    } else {
      document.title = 'Package Not Found — WanderVista Travels';
    }
  }, [pkg, slug]);

  if (!pkg) {
    return (
      <main className="not-found-page" id="main-content" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)' }}>
        <div className="container">
          <div className="empty-state">
            <div className="empty-state__icon" aria-hidden="true">
              <MapPin size={28} />
            </div>
            <h1>Package not found</h1>
            <p>We couldn't find that package. Browse all our sample itineraries to find your journey.</p>
            <Link to="/packages" className="btn btn-primary" id="pkg-not-found-btn">
              View All Packages
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const otherPackages = packages.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="pkg-detail" id="main-content">
      {/* Hero */}
      <section className="pkg-detail__hero" aria-label={pkg.name}>
        <div className="pkg-detail__hero-bg">
          <img src={pkg.image} alt={pkg.name} className="pkg-detail__hero-img" />
          <div className="pkg-detail__hero-overlay" aria-hidden="true" />
        </div>
        <div className="container pkg-detail__hero-content">
          <span className="pkg-detail__category-badge">{pkg.category}</span>
          <h1 className="pkg-detail__name">{pkg.name}</h1>
          <div className="pkg-detail__meta">
            <span><MapPin size={13} aria-hidden="true" />{pkg.destination}</span>
            <span><Clock size={13} aria-hidden="true" />{pkg.duration}</span>
            <span><Users size={13} aria-hidden="true" />From ${pkg.pricePerPerson.toLocaleString()} / person</span>
          </div>
          <p className="pkg-detail__tagline">{pkg.tagline}</p>
          <div className="pkg-detail__hero-ctas">
            <Link to={`/contact?package=${slug}&destination=${encodeURIComponent(pkg.destinationSlug || pkg.destination)}`} className="btn btn-primary" id="pkg-detail-plan-btn">
              Plan This Trip <ArrowRight size={15} />
            </Link>
            <Link to="/packages" className="btn btn-ghost" id="pkg-detail-back-btn">
              <ArrowLeft size={15} /> All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container pkg-detail__body">
        <div className="pkg-detail__layout">
          {/* Main */}
          <div className="pkg-detail__main">
            {/* Overview */}
            <section className="pkg-detail__section" aria-labelledby="pkg-overview-heading">
              <h2 id="pkg-overview-heading" className="pkg-detail__section-title">Package Overview</h2>
              <p className="pkg-detail__desc">{pkg.description}</p>
            </section>

            {/* Itinerary */}
            <section className="pkg-detail__section" aria-labelledby="pkg-itinerary-heading">
              <h2 id="pkg-itinerary-heading" className="pkg-detail__section-title">Sample Day-by-Day Itinerary</h2>
              <p className="pkg-detail__note">
                This is a sample itinerary for demonstration purposes. Actual itineraries are shaped around your preferences and travel dates.
              </p>
              <div className="pkg-itinerary">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="pkg-itinerary__day">
                    <div className="pkg-itinerary__day-number" aria-label={`Day ${day.day}`}>
                      <span>Day</span>
                      <strong>{day.day}</strong>
                    </div>
                    <div className="pkg-itinerary__day-content">
                      <h3 className="pkg-itinerary__day-title">{day.title}</h3>
                      <p className="pkg-itinerary__day-desc">{day.description}</p>
                      {day.highlights && (
                        <ul className="pkg-itinerary__highlights">
                          {day.highlights.map((h, i) => (
                            <li key={i}>
                              <span className="pkg-itinerary__highlight-dot" aria-hidden="true" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions / Exclusions */}
            <section className="pkg-detail__section" aria-labelledby="pkg-inc-heading">
              <h2 id="pkg-inc-heading" className="pkg-detail__section-title">What's Included</h2>
              <div className="pkg-inc-grid">
                <div>
                  <h3 className="pkg-inc-subtitle">Included</h3>
                  <ul className="pkg-inc-list pkg-inc-list--included">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i}>
                        <Check size={14} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="pkg-inc-subtitle">Not Included</h3>
                  <ul className="pkg-inc-list pkg-inc-list--excluded">
                    {pkg.exclusions.map((item, i) => (
                      <li key={i}>
                        <XIcon size={14} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Notes */}
            {pkg.notes && (
              <section className="pkg-detail__section pkg-notes-section" aria-labelledby="pkg-notes-heading">
                <h2 id="pkg-notes-heading" className="pkg-detail__section-title">Travel Notes</h2>
                <ul className="pkg-notes-list">
                  {pkg.notes.map((note, i) => (
                    <li key={i}>
                      <ChevronRight size={14} aria-hidden="true" />
                      {note}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Other packages */}
            {otherPackages.length > 0 && (
              <section className="pkg-detail__section" aria-labelledby="pkg-more-heading">
                <h2 id="pkg-more-heading" className="pkg-detail__section-title">Other Packages You Might Like</h2>
                <div className="pkg-other-grid">
                  {otherPackages.map((p) => (
                    <Link key={p.id} to={`/packages/${p.slug}`} className="pkg-other-card">
                      <img src={p.image} alt={p.name} className="pkg-other-card__img" loading="lazy" />
                      <div className="pkg-other-card__body">
                        <strong>{p.name}</strong>
                        <span>{p.destination}</span>
                        <span>{p.duration}</span>
                      </div>
                      <ChevronRight size={14} />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="pkg-detail__sidebar" aria-label="Package quick info">
            <div className="pkg-sidebar-card">
              <div className="pkg-sidebar-card__header">
                <span className="pkg-sidebar-card__from">Sample price per person</span>
                <strong className="pkg-sidebar-card__price">
                  ${pkg.pricePerPerson.toLocaleString()}
                </strong>
                <p className="pkg-sidebar-card__note">Illustrative price — not a confirmed quote</p>
              </div>

              <dl className="pkg-sidebar-info">
                <dt><Clock size={14} aria-hidden="true" />Duration</dt>
                <dd>{pkg.duration}</dd>
                <dt><MapPin size={14} aria-hidden="true" />Destination</dt>
                <dd>{pkg.destination}</dd>
                <dt>Travel Style</dt>
                <dd>{pkg.travelStyle}</dd>
                <dt>Category</dt>
                <dd>{pkg.category}</dd>
              </dl>

              <Link
                to={`/contact?package=${slug}`}
                className="btn btn-primary pkg-sidebar-cta"
                id="pkg-sidebar-plan-btn"
              >
                Plan This Trip <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
