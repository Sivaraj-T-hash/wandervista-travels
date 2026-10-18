import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Star } from 'lucide-react';
import './DestinationCard.css';

export default function DestinationCard({ destination, variant = 'default' }) {
  const { slug, name, country, tagline, image, startingPrice, travelStyles } = destination;

  return (
    <Link
      to={`/destinations/${slug}`}
      className={`dest-card dest-card--${variant}`}
      aria-label={`Explore ${name}, ${country}`}
    >
      <div className="dest-card__img-wrap">
        <img
          src={image}
          alt={`${name}, ${country}`}
          className="dest-card__img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80&auto=format&fit=crop';
          }}
        />
        <div className="dest-card__overlay" aria-hidden="true" />
        {travelStyles && travelStyles[0] && (
          <span className="dest-card__style-tag">{travelStyles[0]}</span>
        )}
      </div>

      <div className="dest-card__body">
        <div className="dest-card__location">
          <MapPin size={13} aria-hidden="true" />
          <span>{country}</span>
        </div>
        <h3 className="dest-card__name">{name}</h3>
        <p className="dest-card__tagline">{tagline}</p>
        <div className="dest-card__footer">
          {startingPrice && (
            <span className="dest-card__price">
              <span className="dest-card__price-from">from</span>{' '}
              <strong>${startingPrice.toLocaleString()}</strong>
              <span className="dest-card__price-note"> (sample)</span>
            </span>
          )}
          <span className="dest-card__cta">
            Explore <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
