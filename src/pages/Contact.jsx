import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Send, CheckCircle2, MapPin, Phone, Mail, Clock, ShieldCheck,
  Compass, Sparkles, AlertCircle, ArrowRight, RotateCcw, Printer
} from 'lucide-react';
import { destinations } from '../data/destinations';
import { packages } from '../data/packages';
import { faqs } from '../data/faqs';
import FAQAccordion from '../components/FAQAccordion';
import './Contact.css';

const TRAVEL_STYLES = [
  'Beach Escapes',
  'Mountain Retreats',
  'Cultural Journeys',
  'Adventure Trails',
  'Romantic Getaways',
  'Nature & Wildlife',
];

const DURATION_OPTIONS = [
  { value: '3-5', label: '3–5 Days (Quick Escape)' },
  { value: '6-9', label: '6–9 Days (Balanced Trip)' },
  { value: '10-14', label: '10–14 Days (In-Depth)' },
  { value: '15+', label: '15+ Days (Grand Journey)' },
];

const BUDGET_OPTIONS = [
  { value: 'under-1000', label: 'Under $1,000 / person' },
  { value: '1000-2500', label: '$1,000 – $2,500 / person' },
  { value: '2500-4500', label: '$2,500 – $4,500 / person' },
  { value: '4500+', label: '$4,500+ / person (Ultra-Luxury)' },
];

const TIMELINE_OPTIONS = [
  'Within 1 month',
  '1 to 3 months',
  '3 to 6 months',
  '6+ months (Advance Planning)',
  'Flexible dates',
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const prefillDest = searchParams.get('destination') || '';
  const prefillPkg = searchParams.get('package') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destination: '',
    packageSlug: '',
    travelStyle: 'Beach Escapes',
    timeline: '1 to 3 months',
    duration: '6-9',
    adults: 2,
    children: 0,
    budget: '1000-2500',
    notes: '',
    agreed: false,
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState('');

  // Pre-fill from query params if available
  useEffect(() => {
    document.title = 'Plan Your Trip & Contact — WanderVista Travels';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (prefillPkg) {
      const match = packages.find((p) => p.slug === prefillPkg);
      if (match) {
        const matchedDest = destinations.find(
          (d) => d.slug === match.destinationSlug || match.destination.toLowerCase().includes(d.name.toLowerCase())
        );
        const destName = matchedDest ? matchedDest.name : match.destination;
        setFormData((prev) => ({
          ...prev,
          packageSlug: match.slug,
          destination: destName,
          travelStyle: match.travelStyle ? `${match.travelStyle} Escapes` : prev.travelStyle,
        }));
      }
    } else if (prefillDest) {
      const match = destinations.find((d) => d.slug === prefillDest || d.name.toLowerCase() === prefillDest.toLowerCase());
      if (match) {
        setFormData((prev) => ({
          ...prev,
          destination: match.name,
          travelStyle: match.travelStyles?.[0] ? `${match.travelStyles[0]} Escapes` : prev.travelStyle,
        }));
      }
    }
  }, [prefillDest, prefillPkg]);

  // Validation function
  const validate = (data) => {
    const errs = {};
    if (!data.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    } else if (data.fullName.trim().length < 2) {
      errs.fullName = 'Full name must be at least 2 characters.';
    }

    if (!data.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@example.com).';
    }

    if (!data.destination) {
      errs.destination = 'Please select a preferred destination or choose "Undecided".';
    }

    if (data.adults < 1) {
      errs.adults = 'At least 1 adult traveller is required.';
    }

    if (!data.agreed) {
      errs.agreed = 'Please check the box to acknowledge this demo enquiry.';
    }

    return errs;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(formData);
    setErrors(errs);
  };

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.keys(formData).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Scroll to first error
      const firstErrorEl = document.querySelector('.form-input--error, .form-check--error');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const code = `WV-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmationCode(code);
      setSubmittedData({ ...formData });
      setIsSubmitting(false);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }, 700);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setConfirmationCode('');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      destination: '',
      packageSlug: '',
      travelStyle: 'Beach Escapes',
      timeline: '1 to 3 months',
      duration: '6-9',
      adults: 2,
      children: 0,
      budget: '1000-2500',
      notes: '',
      agreed: false,
    });
    setTouched({});
    setErrors({});
  };

  const selectedPkgName = packages.find((p) => p.slug === formData.packageSlug)?.name;

  return (
    <main className="contact-page" id="main-content">
      {/* Banner */}
      <section className="contact-banner" aria-label="Trip planning banner">
        <div className="contact-banner__bg">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=85&auto=format&fit=crop"
            alt="Pristine white sand beach with turquoise water"
            className="contact-banner__img"
          />
          <div className="contact-banner__overlay" aria-hidden="true" />
        </div>
        <div className="container contact-banner__content">
          <span className="section-label" style={{ color: 'var(--color-gold-light)' }}>
            Start Your Journey
          </span>
          <h1 className="contact-banner__title">
            Let us shape your next<br /><em>unforgettable escape.</em>
          </h1>
          <p className="contact-banner__sub">
            Share what excites you most about travel. We'll curate a thoughtful, tailored itinerary aligned with your personal pace, style, and curiosity.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <div className="container contact-body">
        <div className="contact-grid">
          {/* Left Column: Form or Confirmation */}
          <div className="contact-form-card">
            {submittedData ? (
              <div className="contact-confirm" role="region" aria-label="Demo enquiry confirmation">
                <div className="contact-confirm__header">
                  <div className="contact-confirm__badge" aria-hidden="true">
                    <CheckCircle2 size={36} />
                  </div>
                  <span className="section-label" style={{ color: 'var(--color-success)', fontWeight: 700 }}>
                    Enquiry Confirmed
                  </span>
                  <h2 className="contact-confirm__title" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)' }}>
                    Thank You For Choosing Us!
                  </h2>
                  <div style={{
                    backgroundColor: 'var(--color-light-sage)',
                    border: '1.5px solid var(--color-emerald-20)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-4) var(--space-6)',
                    margin: 'var(--space-4) auto var(--space-5)',
                    maxWidth: '560px'
                  }}>
                    <p style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: 'var(--color-forest-emerald)',
                      lineHeight: 1.4,
                      marginBottom: '6px'
                    }}>
                      Our travel experts will contact you within 24 hours.
                    </p>
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-deep-charcoal)', margin: 0, lineHeight: 1.5 }}>
                      We are curating your complete worry-free itinerary — arranging your accommodations, travel (bus, flight, cab), and delicious dining so you can enjoy without thinking about travel logistics.
                    </p>
                  </div>
                  <p className="contact-confirm__sub">
                    Dear <strong>{submittedData.fullName}</strong>, we're thrilled to shape your journey!
                  </p>
                  <div className="contact-confirm__ref">
                    <span>Reference ID:</span>
                    <strong>{confirmationCode}</strong>
                  </div>
                </div>

                <div className="contact-confirm__summary">
                  <h3 className="contact-confirm__summary-title">Summary of Your Travel Vision</h3>
                  <div className="contact-confirm__details-grid">
                    <div className="contact-confirm__item">
                      <span className="contact-confirm__item-label">Destination</span>
                      <strong className="contact-confirm__item-val">{submittedData.destination}</strong>
                    </div>
                    {selectedPkgName && (
                      <div className="contact-confirm__item">
                        <span className="contact-confirm__item-label">Package Concept</span>
                        <strong className="contact-confirm__item-val">{selectedPkgName}</strong>
                      </div>
                    )}
                    <div className="contact-confirm__item">
                      <span className="contact-confirm__item-label">Travel Style</span>
                      <strong className="contact-confirm__item-val">{submittedData.travelStyle}</strong>
                    </div>
                    <div className="contact-confirm__item">
                      <span className="contact-confirm__item-label">Target Window</span>
                      <strong className="contact-confirm__item-val">{submittedData.timeline}</strong>
                    </div>
                    <div className="contact-confirm__item">
                      <span className="contact-confirm__item-label">Duration</span>
                      <strong className="contact-confirm__item-val">
                        {DURATION_OPTIONS.find((d) => d.value === submittedData.duration)?.label || submittedData.duration}
                      </strong>
                    </div>
                    <div className="contact-confirm__item">
                      <span className="contact-confirm__item-label">Party</span>
                      <strong className="contact-confirm__item-val">
                        {submittedData.adults} Adult{submittedData.adults > 1 ? 's' : ''}
                        {submittedData.children > 0 && `, ${submittedData.children} Child${submittedData.children > 1 ? 'ren' : ''}`}
                      </strong>
                    </div>
                    <div className="contact-confirm__item">
                      <span className="contact-confirm__item-label">Budget</span>
                      <strong className="contact-confirm__item-val">
                        {BUDGET_OPTIONS.find((b) => b.value === submittedData.budget)?.label}
                      </strong>
                    </div>
                    <div className="contact-confirm__item">
                      <span className="contact-confirm__item-label">Primary Contact</span>
                      <strong className="contact-confirm__item-val">{submittedData.email}</strong>
                    </div>
                  </div>

                  {submittedData.notes && (
                    <div className="contact-confirm__notes">
                      <span className="contact-confirm__item-label">Special Notes</span>
                      <p>"{submittedData.notes}"</p>
                    </div>
                  )}
                </div>

                {/* Next Steps Timeline */}
                <div className="contact-confirm__steps">
                  <h3 className="contact-confirm__steps-title">What Happens Next (In Our Flow)</h3>
                  <div className="contact-steps-list">
                    <div className="contact-step">
                      <div className="contact-step__num">1</div>
                      <div className="contact-step__info">
                        <strong>Personal Consultation</strong>
                        <p>Our travel designer reviews your pacing preferences and notes within 24 hours.</p>
                      </div>
                    </div>
                    <div className="contact-step">
                      <div className="contact-step__num">2</div>
                      <div className="contact-step__info">
                        <strong>Bespoke Itinerary & Moodboard</strong>
                        <p>You receive an interactive day-by-day plan with vetted accommodations and local moments.</p>
                      </div>
                    </div>
                    <div className="contact-step">
                      <div className="contact-step__num">3</div>
                      <div className="contact-step__info">
                        <strong>Frictionless Confirmation</strong>
                        <p>Fine-tune every day until it's perfect, then lock in with zero hidden charges.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="contact-confirm__actions">
                  <button
                    className="btn btn-secondary btn--sm"
                    onClick={() => window.print()}
                    id="confirm-print-btn"
                  >
                    <Printer size={15} /> Print Summary
                  </button>
                  <button
                    className="btn btn-secondary btn--sm"
                    onClick={handleReset}
                    id="confirm-reset-btn"
                  >
                    <RotateCcw size={15} /> Plan Another Trip
                  </button>
                  <Link to="/destinations" className="btn btn-primary btn--sm" id="confirm-dest-btn">
                    Explore Destinations <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Trip planning enquiry form"
              >
                <div className="contact-form__intro">
                  <h2 className="contact-form__title">Tailor Your Trip Inquiry</h2>
                  <p className="contact-form__sub">
                    Fill in the details below to receive a custom itinerary proposal. All fields with an asterisk (*) are required.
                  </p>
                </div>

                {/* Section 1: Contact Details */}
                <div className="form-section">
                  <h3 className="form-section__title">1. Your Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="fullName">
                        Full Name <span className="req">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        className={`form-input${touched.fullName && errors.fullName ? ' form-input--error' : ''}`}
                        placeholder="e.g. Eleanor Vance"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        onBlur={() => handleBlur('fullName')}
                        aria-invalid={!!(touched.fullName && errors.fullName)}
                        aria-describedby={touched.fullName && errors.fullName ? 'fullName-error' : undefined}
                      />
                      {touched.fullName && errors.fullName && (
                        <span className="form-error" id="fullName-error">
                          <AlertCircle size={13} /> {errors.fullName}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        Email Address <span className="req">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`form-input${touched.email && errors.email ? ' form-input--error' : ''}`}
                        placeholder="e.g. eleanor@wanderlust.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        aria-invalid={!!(touched.email && errors.email)}
                        aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                      />
                      {touched.email && errors.email && (
                        <span className="form-error" id="email-error">
                          <AlertCircle size={13} /> {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="form-input"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="timeline">
                        Target Travel Window
                      </label>
                      <select
                        id="timeline"
                        className="form-select"
                        value={formData.timeline}
                        onChange={(e) => handleChange('timeline', e.target.value)}
                      >
                        {TIMELINE_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Destination & Itinerary Preferences */}
                <div className="form-section">
                  <h3 className="form-section__title">2. Destination & Package Interest</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="destination">
                        Preferred Destination <span className="req">*</span>
                      </label>
                      <select
                        id="destination"
                        className={`form-select${touched.destination && errors.destination ? ' form-input--error' : ''}`}
                        value={formData.destination}
                        onChange={(e) => handleChange('destination', e.target.value)}
                        onBlur={() => handleBlur('destination')}
                        aria-invalid={!!(touched.destination && errors.destination)}
                        aria-describedby={touched.destination && errors.destination ? 'destination-error' : undefined}
                      >
                        <option value="">-- Choose a destination --</option>
                        {destinations.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name}, {d.country} ({d.region})
                          </option>
                        ))}
                        <option value="Undecided / Open Recommendation">
                          Undecided (Recommend based on travel style)
                        </option>
                      </select>
                      {touched.destination && errors.destination && (
                        <span className="form-error" id="destination-error">
                          <AlertCircle size={13} /> {errors.destination}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="packageSlug">
                        Associated Package (Optional)
                      </label>
                      <select
                        id="packageSlug"
                        className="form-select"
                        value={formData.packageSlug}
                        onChange={(e) => {
                          const chosenSlug = e.target.value;
                          const match = packages.find((p) => p.slug === chosenSlug);
                          if (match) {
                            const matchedDest = destinations.find(
                              (d) => d.slug === match.destinationSlug || match.destination.toLowerCase().includes(d.name.toLowerCase())
                            );
                            const destName = matchedDest ? matchedDest.name : match.destination;
                            setFormData((prev) => ({
                              ...prev,
                              packageSlug: chosenSlug,
                              destination: destName,
                              travelStyle: match.travelStyle ? `${match.travelStyle} Escapes` : prev.travelStyle,
                            }));
                            setErrors((prev) => ({ ...prev, destination: undefined }));
                          } else {
                            setFormData((prev) => ({ ...prev, packageSlug: chosenSlug }));
                          }
                        }}
                      >
                        <option value="">-- Select or Bespoke Itinerary --</option>
                        {packages.map((p) => (
                          <option key={p.id} value={p.slug}>
                            {p.name} ({p.destination} • {p.duration})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Travel Style Chips */}
                  <div className="form-group">
                    <label className="form-label">Desired Travel Atmosphere</label>
                    <div className="style-chips-selector">
                      {TRAVEL_STYLES.map((style) => (
                        <button
                          key={style}
                          type="button"
                          className={`style-chip-btn${formData.travelStyle === style ? ' style-chip-btn--active' : ''}`}
                          onClick={() => handleChange('travelStyle', style)}
                          aria-pressed={formData.travelStyle === style}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 3: Duration, Party & Budget */}
                <div className="form-section">
                  <h3 className="form-section__title">3. Duration & Group Size</h3>
                  <div className="form-row form-row--3">
                    <div className="form-group">
                      <label className="form-label" htmlFor="duration">
                        Trip Duration
                      </label>
                      <select
                        id="duration"
                        className="form-select"
                        value={formData.duration}
                        onChange={(e) => handleChange('duration', e.target.value)}
                      >
                        {DURATION_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="adults">
                        Adults (18+)
                      </label>
                      <input
                        id="adults"
                        type="number"
                        min="1"
                        max="20"
                        className="form-input"
                        value={formData.adults}
                        onChange={(e) => handleChange('adults', parseInt(e.target.value) || 1)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="children">
                        Children (0–17)
                      </label>
                      <input
                        id="children"
                        type="number"
                        min="0"
                        max="10"
                        className="form-input"
                        value={formData.children}
                        onChange={(e) => handleChange('children', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="budget">
                      Estimated Budget (Excluding international flights)
                    </label>
                    <select
                      id="budget"
                      className="form-select"
                      value={formData.budget}
                      onChange={(e) => handleChange('budget', e.target.value)}
                    >
                      {BUDGET_OPTIONS.map((b) => (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="notes">
                      Special Requests, Pacing, or Must-Do Experiences
                    </label>
                    <textarea
                      id="notes"
                      className="form-textarea"
                      rows="4"
                      placeholder="Tell us about special occasions (anniversary, honeymoon, milestone), accommodation preferences (boutique eco-lodge, overwater villa, mountain chalet), dietary needs, or physical activity levels..."
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                    />
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="form-group">
                  <label className={`form-checkbox-label${touched.agreed && errors.agreed ? ' form-check--error' : ''}`}>
                    <input
                      type="checkbox"
                      id="agreed"
                      checked={formData.agreed}
                      onChange={(e) => handleChange('agreed', e.target.checked)}
                      onBlur={() => handleBlur('agreed')}
                    />
                    <span>
                      I understand that WanderVista Travels is a fictional demonstration brand and this enquiry creates an illustrative sample summary. <span className="req">*</span>
                    </span>
                  </label>
                  {touched.agreed && errors.agreed && (
                    <span className="form-error">
                      <AlertCircle size={13} /> {errors.agreed}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <div className="contact-form__submit-wrap">
                  <button
                    type="submit"
                    className="btn btn-primary btn--lg contact-submit-btn"
                    disabled={isSubmitting}
                    id="submit-enquiry-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-sm" aria-hidden="true" />
                        Generating Your Travel Concept...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Submit Trip Enquiry
                      </>
                    )}
                  </button>
                  <p className="contact-form__disclaimer">
                    <ShieldCheck size={14} /> Zero pressure. Complimentary initial itinerary design.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Concierge Info & Reassurance */}
          <aside className="contact-sidebar">
            {/* Concierge Box */}
            <div className="contact-info-card">
              <span className="section-label" style={{ color: 'var(--color-muted-gold)' }}>
                Direct Concierge Desk
              </span>
              <h3 className="contact-info-card__title">Speak with a Travel Specialist</h3>
              <p className="contact-info-card__desc">
                Prefer an immediate conversation? Reach out to our private travel planners directly.
              </p>

              <div className="contact-channels">
                <div className="contact-channel">
                  <div className="contact-channel__icon">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="contact-channel__label">Private Concierge Email</span>
                    <a href="mailto:concierge@wandervista.travel" className="contact-channel__val">
                      concierge@wandervista.travel
                    </a>
                  </div>
                </div>

                <div className="contact-channel">
                  <div className="contact-channel__icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="contact-channel__label">Direct Travel Line</span>
                    <a href="tel:+18005559876" className="contact-channel__val">
                      +1 (800) 555-WVISTA (9876)
                    </a>
                  </div>
                </div>

                <div className="contact-channel">
                  <div className="contact-channel__icon">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="contact-channel__label">Studio Operating Hours</span>
                    <span className="contact-channel__val">
                      Mon – Sat: 8:00 AM – 8:00 PM EST
                    </span>
                  </div>
                </div>

                <div className="contact-channel">
                  <div className="contact-channel__icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="contact-channel__label">Design Studios</span>
                    <span className="contact-channel__val">
                      Presidio Heights, San Francisco & Marina Bay, Singapore
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Guarantees */}
            <div className="contact-guarantees-card">
              <h4 className="contact-guarantees-title">The WanderVista Promise</h4>
              <ul className="contact-guarantees-list">
                <li>
                  <Sparkles size={16} className="contact-g-icon" />
                  <div>
                    <strong>100% Bespoke Itineraries</strong>
                    <p>No mass bus tours or cookie-cutter packages. Every minute is yours.</p>
                  </div>
                </li>
                <li>
                  <ShieldCheck size={16} className="contact-g-icon" />
                  <div>
                    <strong>Transparent Sample Pricing</strong>
                    <p>No surprise fees or ambiguous add-ons. Clear inclusions from day one.</p>
                  </div>
                </li>
                <li>
                  <Compass size={16} className="contact-g-icon" />
                  <div>
                    <strong>Hand-Vetted Stays & Guides</strong>
                    <p>Every eco-lodge, boutique hotel, and naturalist guide is vetted for quality.</p>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* FAQs on Contact Page */}
        <section className="contact-faqs-section section--white" aria-labelledby="contact-faq-heading">
          <div className="contact-faqs-header">
            <span className="section-label">Questions & Clarifications</span>
            <h2 id="contact-faq-heading" className="contact-faqs-title">
              Frequently asked planning questions
            </h2>
            <p className="contact-faqs-sub">
              Everything you need to know about our planning process, customizations, and trip design.
            </p>
          </div>
          <FAQAccordion faqs={faqs.slice(0, 5)} />
        </section>
      </div>
    </main>
  );
}
