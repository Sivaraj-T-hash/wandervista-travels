import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal, MapPin } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import SectionHeading from '../components/SectionHeading';
import { destinations, regions, travelStyles } from '../data/destinations';
import './Destinations.css';

const SORT_OPTIONS = [
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeRegion, setActiveRegion] = useState('');
  const [activeStyle, setActiveStyle] = useState(searchParams.get('style') || '');
  const [sort, setSort] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    document.title = 'Destinations — WanderVista Travels';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filtered = useMemo(() => {
    let list = [...destinations];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.tagline.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q)
      );
    }

    if (activeRegion) {
      list = list.filter((d) => d.region === activeRegion);
    }

    if (activeStyle) {
      list = list.filter((d) => d.travelStyles.includes(activeStyle));
    }

    list.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sort === 'price-desc') return b.startingPrice - a.startingPrice;
      return 0;
    });

    return list;
  }, [query, activeRegion, activeStyle, sort]);

  const clearFilters = () => {
    setQuery('');
    setActiveRegion('');
    setActiveStyle('');
    setSort('name');
    setSearchParams({});
  };

  const hasFilters = query || activeRegion || activeStyle;

  return (
    <main className="destinations-page" id="main-content">
      {/* Page Banner */}
      <section className="dest-banner" aria-label="Destinations page header">
        <div className="dest-banner__bg">
          <img
            src="https://images.unsplash.com/photo-1469796466635-455ede028aca?w=1600&q=85&auto=format&fit=crop"
            alt="Santorini whitewashed buildings overlooking the Aegean Sea"
            className="dest-banner__img"
          />
          <div className="dest-banner__overlay" aria-hidden="true" />
        </div>
        <div className="container dest-banner__content">
          <span className="section-label" style={{ color: 'var(--color-gold-light)' }}>
            Explore the World
          </span>
          <h1 className="dest-banner__title">Where will you go next?</h1>
          <p className="dest-banner__sub">
            Discover destinations chosen for what they offer beyond the surface — culture, nature, beauty, and the kind of moments that stay.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <div className="dest-controls section--white">
        <div className="container">
          <div className="dest-controls__top">
            {/* Search */}
            <div className="dest-search-wrap">
              <Search size={16} className="dest-search__icon" aria-hidden="true" />
              <input
                type="search"
                className="dest-search__input"
                placeholder="Search destinations, countries..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search destinations"
                id="dest-search"
              />
              {query && (
                <button
                  className="dest-search__clear"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="dest-sort">
              <label htmlFor="dest-sort" className="sr-only">Sort by</label>
              <div className="form-select-wrapper">
                <select
                  id="dest-sort"
                  className="form-select dest-sort__select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile filter toggle */}
            <button
              className={`dest-filter-toggle${showFilters ? ' active' : ''}`}
              onClick={() => setShowFilters((v) => !v)}
              aria-expanded={showFilters}
              id="dest-filter-toggle"
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          {/* Filter chips */}
          <div className={`dest-filters${showFilters ? ' dest-filters--open' : ''}`}>
            {/* Regions */}
            <div className="dest-filter-group">
              <span className="dest-filter-group__label">Region</span>
              <div className="dest-filter-chips">
                {regions.map((r) => (
                  <button
                    key={r}
                    className={`dest-chip${activeRegion === r ? ' dest-chip--active' : ''}`}
                    onClick={() => setActiveRegion(activeRegion === r ? '' : r)}
                    aria-pressed={activeRegion === r}
                    id={`region-${r.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Styles */}
            <div className="dest-filter-group">
              <span className="dest-filter-group__label">Travel Style</span>
              <div className="dest-filter-chips">
                {travelStyles.map((s) => (
                  <button
                    key={s}
                    className={`dest-chip${activeStyle === s ? ' dest-chip--active' : ''}`}
                    onClick={() => setActiveStyle(activeStyle === s ? '' : s)}
                    aria-pressed={activeStyle === s}
                    id={`style-filter-${s.toLowerCase()}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button className="dest-clear-btn" onClick={clearFilters} id="dest-clear-filters">
                <X size={13} />
                Clear filters
              </button>
            )}
          </div>

          {/* Results count */}
          <p className="dest-results-count" aria-live="polite" aria-atomic="true">
            {filtered.length === 0
              ? 'No destinations match your search.'
              : `Showing ${filtered.length} destination${filtered.length === 1 ? '' : 's'}${hasFilters ? ' — filtered results' : ''}`}
          </p>
        </div>
      </div>

      {/* Destination Grid */}
      <section className="section section--ivory" aria-label="Destination listings">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon" aria-hidden="true">
                <MapPin size={28} />
              </div>
              <h3>No destinations found</h3>
              <p>Try different search terms or remove some filters to see more options.</p>
              <button className="btn btn-secondary" onClick={clearFilters} id="dest-empty-clear">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="dest-listing-grid">
              {filtered.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
