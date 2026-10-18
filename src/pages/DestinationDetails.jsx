import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, ArrowLeft, Calendar, ChevronRight, X } from 'lucide-react';
import { getDestinationBySlug, destinations } from '../data/destinations';
import { packages } from '../data/packages';
import PackageCard from '../components/PackageCard';
import './DestinationDetails.css';

export default function DestinationDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dest = getDestinationBySlug(slug);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (dest) {
      document.title = `${dest.name}, ${dest.country} — WanderVista Travels`;
    } else {
      document.title = 'Destination Not Found — WanderVista Travels';
    }
  }, [dest, slug]);

  if (!dest) {
    return (
      <main className="not-found-page" id="main-content">
        <div className="container">
          <div className="empty-state" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)' }}>
            <div className="empty-state__icon" aria-hidden="true">
              <MapPin size={28} />
            </div>
            <h1>Destination not found</h1>
            <p>We couldn't find a destination with that name. Browse our full list of destinations to find your next escape.</p>
            <Link to="/destinations" className="btn btn-primary" id="dest-not-found-btn">
              Browse Destinations
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const relatedPkgs = packages.filter((p) =>
    dest.relatedPackages.includes(p.slug)
  );

  const allImages = [dest.image, ...(dest.gallery || [])];

  return (
    <main className="dest-detail" id="main-content">
      {/* Hero */}
      <section className="dest-detail__hero" aria-label={`${dest.name} hero`}>
        <div className="dest-detail__hero-bg">
          <img src={dest.image} alt={`${dest.name}, ${dest.country}`} className="dest-detail__hero-img" />
          <div className="dest-detail__hero-overlay" aria-hidden="true" />
        </div>
        <div className="container dest-detail__hero-content">
          <span className="dest-detail__region">{dest.region}</span>
          <h1 className="dest-detail__name">{dest.name}</h1>
          <div className="dest-detail__location">
            <MapPin size={15} aria-hidden="true" />
            <span>{dest.country}</span>
          </div>
          <p className="dest-detail__tagline">{dest.tagline}</p>
          <div className="dest-detail__hero-ctas">
            <Link to={`/contact?destination=${dest.slug}`} className="btn btn-primary" id="dest-plan-btn">
              Plan This Trip <ArrowRight size={15} />
            </Link>
            <Link to="/destinations" className="btn btn-ghost" id="dest-back-btn">
              <ArrowLeft size={15} /> All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container dest-detail__body">
        <div className="dest-detail__layout">
          {/* Main */}
          <div className="dest-detail__main">
            {/* Description */}
            <section className="dest-detail__section" aria-labelledby="dest-desc-heading">
              <h2 id="dest-desc-heading" className="dest-detail__section-title">About {dest.name}</h2>
              <p className="dest-detail__desc">{dest.description}</p>
            </section>

            {/* Gallery */}
            {dest.gallery && dest.gallery.length > 0 && (
              <section className="dest-detail__section" aria-labelledby="dest-gallery-heading">
                <h2 id="dest-gallery-heading" className="dest-detail__section-title">Photography</h2>
                <div className="dest-gallery">
                  {dest.gallery.map((img, i) => (
                    <button
                      key={i}
                      className="dest-gallery__item"
                      onClick={() => { setActiveImg(i + 1); setGalleryOpen(true); }}
                      aria-label={`View photo ${i + 1} of ${dest.name}`}
                    >
                      <img
                        src={img}
                        alt={`${dest.name} gallery photo ${i + 1}`}
                        className="dest-gallery__img"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Experiences */}
            <section className="dest-detail__section" aria-labelledby="dest-exp-heading">
              <h2 id="dest-exp-heading" className="dest-detail__section-title">Popular Experiences</h2>
              <ul className="dest-exp-list">
                {dest.experiences.map((exp, i) => (
                  <li key={i} className="dest-exp-list__item">
                    <span className="dest-exp-list__dot" aria-hidden="true" />
                    {exp}
                  </li>
                ))}
              </ul>
            </section>

            {/* Tips */}
            <section className="dest-detail__section" aria-labelledby="dest-tips-heading">
              <h2 id="dest-tips-heading" className="dest-detail__section-title">Local Travel Tips</h2>
              <ul className="dest-tips-list">
                {dest.tips.map((tip, i) => (
                  <li key={i} className="dest-tips-list__item">
                    <ChevronRight size={14} className="dest-tips-list__icon" aria-hidden="true" />
                    {tip}
                  </li>
                ))}
              </ul>
            </section>

            {/* Related Packages */}
            {relatedPkgs.length > 0 && (
              <section className="dest-detail__section" aria-labelledby="dest-pkgs-heading">
                <h2 id="dest-pkgs-heading" className="dest-detail__section-title">Related Tour Packages</h2>
                <div className="dest-related-pkgs">
                  {relatedPkgs.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="dest-detail__sidebar" aria-label="Destination quick info">
            <div className="dest-sidebar-card">
              <div className="dest-sidebar-card__header">
                <span className="dest-sidebar-card__from">Sample starting price</span>
                <strong className="dest-sidebar-card__price">
                  ${dest.startingPrice.toLocaleString()}
                  <span className="dest-sidebar-card__per"> / person</span>
                </strong>
                <p className="dest-sidebar-card__note">Illustrative price — not a real quote</p>
              </div>

              <dl className="dest-sidebar-info">
                <dt>
                  <Clock size={14} aria-hidden="true" />
                  Suggested Duration
                </dt>
                <dd>{dest.suggestedDuration}</dd>

                <dt>
                  <Calendar size={14} aria-hidden="true" />
                  Best Time to Visit
                </dt>
                <dd>{dest.bestTime}</dd>

                <dt>
                  <MapPin size={14} aria-hidden="true" />
                  Region
                </dt>
                <dd>{dest.region}</dd>
              </dl>

              <div className="dest-sidebar-styles">
                <span className="dest-filter-group__label">Travel Styles</span>
                <div className="dest-sidebar-styles__chips">
                  {dest.travelStyles.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>

              <Link
                to={`/contact?destination=${dest.slug}`}
                className="btn btn-primary dest-sidebar-cta"
                id="dest-sidebar-plan-btn"
              >
                Plan This Trip <ArrowRight size={14} />
              </Link>
            </div>

            {/* Other destinations */}
            <div className="dest-sidebar-more">
              <h3 className="dest-sidebar-more__title">Other Destinations</h3>
              <ul className="dest-sidebar-more__list">
                {destinations
                  .filter((d) => d.slug !== slug)
                  .slice(0, 5)
                  .map((d) => (
                    <li key={d.id}>
                      <Link to={`/destinations/${d.slug}`} className="dest-sidebar-more__link">
                        <img src={d.image} alt={d.name} className="dest-sidebar-more__img" loading="lazy" />
                        <div>
                          <strong>{d.name}</strong>
                          <span>{d.country}</span>
                        </div>
                        <ChevronRight size={14} />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Gallery Modal */}
      {galleryOpen && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label="Photo gallery">
          <button className="gallery-modal__close" onClick={() => setGalleryOpen(false)} aria-label="Close gallery">
            <X size={20} />
          </button>
          <div className="gallery-modal__inner">
            <img
              src={allImages[activeImg]}
              alt={`${dest.name} photo ${activeImg + 1}`}
              className="gallery-modal__img"
            />
            <div className="gallery-modal__nav">
              <button
                onClick={() => setActiveImg((i) => (i === 0 ? allImages.length - 1 : i - 1))}
                aria-label="Previous photo"
                className="gallery-modal__btn"
              >
                <ArrowLeft size={20} />
              </button>
              <span className="gallery-modal__count">
                {activeImg + 1} / {allImages.length}
              </span>
              <button
                onClick={() => setActiveImg((i) => (i === allImages.length - 1 ? 0 : i + 1))}
                aria-label="Next photo"
                className="gallery-modal__btn"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="gallery-modal__backdrop" onClick={() => setGalleryOpen(false)} aria-hidden="true" />
        </div>
      )}
    </main>
  );
}
