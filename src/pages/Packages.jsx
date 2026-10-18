import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal, Package } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import SectionHeading from '../components/SectionHeading';
import { packages, packageTravelStyles } from '../data/packages';
import './Packages.css';
import './Destinations.css';

const DURATION_OPTIONS = [
  { value: '', label: 'Any Duration' },
  { value: '1-4', label: 'Up to 4 days' },
  { value: '5-7', label: '5–7 days' },
  { value: '8+', label: '8+ days' },
];

const BUDGET_OPTIONS = [
  { value: '', label: 'Any Budget' },
  { value: 'budget', label: 'Under $1,000' },
  { value: 'mid', label: '$1,000–$2,000' },
  { value: 'premium', label: '$2,000+' },
];

const SORT_OPTIONS = [
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'duration-asc', label: 'Duration: Shortest' },
];

export default function Packages() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [activeStyle, setActiveStyle] = useState('');
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');
  const [sort, setSort] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    document.title = 'Tour Packages — WanderVista Travels';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filtered = useMemo(() => {
    let list = [...packages];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.destination.toLowerCase().includes(q) ||
          p.travelStyle.toLowerCase().includes(q)
      );
    }

    if (activeStyle) {
      list = list.filter((p) => p.travelStyle === activeStyle);
    }

    if (duration) {
      list = list.filter((p) => {
        if (duration === '1-4') return p.days <= 4;
        if (duration === '5-7') return p.days >= 5 && p.days <= 7;
        if (duration === '8+') return p.days >= 8;
        return true;
      });
    }

    if (budget) {
      list = list.filter((p) => {
        if (budget === 'budget') return p.pricePerPerson < 1000;
        if (budget === 'mid') return p.pricePerPerson >= 1000 && p.pricePerPerson <= 2000;
        if (budget === 'premium') return p.pricePerPerson > 2000;
        return true;
      });
    }

    list.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'price-asc') return a.pricePerPerson - b.pricePerPerson;
      if (sort === 'price-desc') return b.pricePerPerson - a.pricePerPerson;
      if (sort === 'duration-asc') return a.days - b.days;
      return 0;
    });

    return list;
  }, [query, activeStyle, duration, budget, sort]);

  const clearFilters = () => {
    setQuery('');
    setActiveStyle('');
    setDuration('');
    setBudget('');
    setSort('name');
  };

  const hasFilters = query || activeStyle || duration || budget;

  return (
    <main className="packages-page" id="main-content">
      {/* Banner */}
      <section className="pkgs-banner" aria-label="Tour packages header">
        <div className="pkgs-banner__bg">
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=85&auto=format&fit=crop"
            alt="Bali resort overlooking tropical jungle"
            className="pkgs-banner__img"
          />
          <div className="pkgs-banner__overlay" aria-hidden="true" />
        </div>
        <div className="container pkgs-banner__content">
          <span className="section-label" style={{ color: 'var(--color-gold-light)' }}>
            Curated Itineraries
          </span>
          <h1 className="pkgs-banner__title">Journeys worth taking</h1>
          <p className="pkgs-banner__sub">
            Sample itineraries crafted around meaningful experiences — each one a starting point, ready to be shaped around your travel style.
          </p>
          <p className="pkgs-banner__disclaimer">
            All prices shown are illustrative sample prices — not real quotes or confirmed rates.
          </p>
        </div>
      </section>

      {/* Controls */}
      <div className="pkgs-controls section--white">
        <div className="container">
          <div className="pkgs-controls__top">
            <div className="dest-search-wrap">
              <Search size={16} className="dest-search__icon" aria-hidden="true" />
              <input
                type="search"
                className="dest-search__input"
                placeholder="Search packages, destinations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search packages"
                id="pkgs-search"
              />
              {query && (
                <button className="dest-search__clear" onClick={() => setQuery('')} aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="form-select-wrapper">
              <select
                className="form-select dest-sort__select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort packages"
                id="pkgs-sort"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <button
              className={`dest-filter-toggle${showFilters ? ' active' : ''}`}
              onClick={() => setShowFilters((v) => !v)}
              aria-expanded={showFilters}
              id="pkgs-filter-toggle"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          <div className={`dest-filters${showFilters ? ' dest-filters--open' : ''}`}>
            {/* Travel Style */}
            <div className="dest-filter-group">
              <span className="dest-filter-group__label">Travel Style</span>
              <div className="dest-filter-chips">
                {packageTravelStyles.map((s) => (
                  <button
                    key={s}
                    className={`dest-chip${activeStyle === s ? ' dest-chip--active' : ''}`}
                    onClick={() => setActiveStyle(activeStyle === s ? '' : s)}
                    aria-pressed={activeStyle === s}
                    id={`pkg-style-${s.toLowerCase()}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="dest-filter-group">
              <span className="dest-filter-group__label">Duration</span>
              <div className="dest-filter-chips">
                {DURATION_OPTIONS.filter((o) => o.value).map((o) => (
                  <button
                    key={o.value}
                    className={`dest-chip${duration === o.value ? ' dest-chip--active' : ''}`}
                    onClick={() => setDuration(duration === o.value ? '' : o.value)}
                    aria-pressed={duration === o.value}
                    id={`pkg-duration-${o.value}`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="dest-filter-group">
              <span className="dest-filter-group__label">Budget</span>
              <div className="dest-filter-chips">
                {BUDGET_OPTIONS.filter((o) => o.value).map((o) => (
                  <button
                    key={o.value}
                    className={`dest-chip${budget === o.value ? ' dest-chip--active' : ''}`}
                    onClick={() => setBudget(budget === o.value ? '' : o.value)}
                    aria-pressed={budget === o.value}
                    id={`pkg-budget-${o.value}`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button className="dest-clear-btn" onClick={clearFilters} id="pkgs-clear-filters">
                <X size={13} />
                Clear filters
              </button>
            )}
          </div>

          <p className="dest-results-count" aria-live="polite">
            {filtered.length === 0
              ? 'No packages match your search.'
              : `Showing ${filtered.length} package${filtered.length === 1 ? '' : 's'}${hasFilters ? ' — filtered results' : ''}`}
          </p>
        </div>
      </div>

      {/* Package Grid */}
      <section className="section section--ivory" aria-label="Package listings">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon" aria-hidden="true">
                <Package size={28} />
              </div>
              <h3>No packages found</h3>
              <p>Try different search terms or remove some filters to see more options.</p>
              <button className="btn btn-secondary" onClick={clearFilters} id="pkgs-empty-clear">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="pkgs-listing-grid">
              {filtered.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
