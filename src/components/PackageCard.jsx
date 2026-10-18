import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, Check } from 'lucide-react';
import './PackageCard.css';

export default function PackageCard({ pkg }) {
  const {
    slug, name, destination, duration, pricePerPerson,
    image, tagline, inclusions, travelStyle, category,
  } = pkg;

  return (
    <article className="pkg-card">
      <div className="pkg-card__img-wrap">
        <img
          src={image}
          alt={`${name} — ${destination}`}
          className="pkg-card__img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80&auto=format&fit=crop';
          }}
        />
        <div className="pkg-card__img-overlay" aria-hidden="true" />
        <span className="pkg-card__category">{category}</span>
      </div>

      <div className="pkg-card__body">
        <div className="pkg-card__meta">
          <span className="pkg-card__destination">{destination}</span>
          <span className="pkg-card__style-dot" aria-hidden="true" />
          <span className="pkg-card__style">{travelStyle}</span>
        </div>

        <h3 className="pkg-card__name">{name}</h3>
        <p className="pkg-card__tagline">{tagline}</p>

        <div className="pkg-card__details">
          <span className="pkg-card__detail">
            <Clock size={13} aria-hidden="true" />
            {duration}
          </span>
          <span className="pkg-card__detail">
            <Users size={13} aria-hidden="true" />
            From ${pricePerPerson.toLocaleString()} / person
          </span>
        </div>

        {inclusions && inclusions.length > 0 && (
          <ul className="pkg-card__inclusions" aria-label="Key inclusions">
            {inclusions.slice(0, 3).map((item, i) => (
              <li key={i}>
                <Check size={12} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="pkg-card__price-note">
          Sample price — illustrative only
        </p>

        <div className="pkg-card__actions">
          <Link to={`/packages/${slug}`} className="btn btn-primary btn--sm" id={`pkg-details-${slug}`}>
            View Details
          </Link>
          <Link to={`/contact?package=${slug}`} className="btn btn-secondary btn--sm" id={`pkg-plan-${slug}`}>
            Plan This Trip
          </Link>
        </div>
      </div>
    </article>
  );
}
