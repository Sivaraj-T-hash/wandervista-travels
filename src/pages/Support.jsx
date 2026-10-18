import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  HelpCircle, Phone, Mail, Clock, MapPin, Search,
  CheckCircle2, AlertCircle, ShieldCheck, Hotel, Plane, Utensils,
  Car, Bus, Send, Headphones, Sparkles, ArrowRight
} from 'lucide-react';
import { faqs } from '../data/faqs';
import FAQAccordion from '../components/FAQAccordion';
import { saveInquiry, findInquiryById } from '../utils/inquiryStorage';
import './Support.css';

const SUPPORT_TOPICS = [
  'Accommodations & Room Selection',
  'Flights, Private Cabs & Bus Transfers',
  'Food, Meals & Dietary Preferences',
  'Itinerary Customization & Pacing',
  'Booking Reference & 24h Contact Status',
  'Other / General Inquiries',
];

export default function Support() {
  const [searchParams] = useSearchParams();
  const queryRef = searchParams.get('ref') || '';

  const [refInput, setRefInput] = useState(queryRef);
  const [refStatus, setRefStatus] = useState(null);

  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    topic: 'Accommodations & Room Selection',
    refId: '',
    message: '',
  });
  const [ticketErrors, setTicketErrors] = useState({});
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [createdRef, setCreatedRef] = useState('');
  const [lastSubmittedTicket, setLastSubmittedTicket] = useState(null);

  useEffect(() => {
    document.title = 'Client Support & Help Center — WanderVista Travels';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (queryRef) {
      setRefInput(queryRef);
      handleTrackRef(null, queryRef);
    }
  }, [queryRef]);

  const handleTrackRef = (e, overrideId) => {
    if (e && e.preventDefault) e.preventDefault();
    const idToLookup = (overrideId || refInput).trim();
    if (!idToLookup) return;

    const trimmed = idToLookup.toUpperCase();
    const found = findInquiryById(trimmed);

    if (found) {
      setRefStatus({
        found: true,
        code: found.id,
        type: found.type === 'support_ticket' ? 'Concierge Support Request' : 'Trip Booking Enquiry',
        name: found.fullName,
        email: found.email,
        phone: found.phone,
        destination: found.destination,
        package: found.packageName,
        topic: found.topic,
        travelers: found.totalTravelers ? `${found.totalTravelers} Traveler${found.totalTravelers !== 1 ? 's' : ''} (${found.adults} Adults${found.children > 0 ? `, ${found.children} Children` : ''})` : null,
        totalAmount: found.grandTotal ? `$${found.grandTotal.toLocaleString()} USD` : null,
        notes: found.notes || found.message,
        date: found.dateFormatted || found.createdAt,
        status: found.status || 'In Review by Destination Specialist',
        expert: found.reviewer || 'Sarah Jenkins (Senior Itinerary Designer)',
        eta: found.eta || 'Our experts will contact you within 24 hours',
        details: found.details || 'All accommodations, flights/cabs/bus transit, and dining preferences are currently being curated into your bespoke proposal.',
      });
    } else {
      setRefStatus({
        found: false,
        code: trimmed,
        error: `No record found for Reference ID "${trimmed}". Please double-check your code from your confirmation or submit a new inquiry below.`,
      });
    }
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!ticketForm.name.trim()) errs.name = 'Please provide your name.';
    if (!ticketForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ticketForm.email.trim())) {
      errs.email = 'Please provide a valid email.';
    }
    if (!ticketForm.message.trim() || ticketForm.message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters detailing your request.';
    }

    setTicketErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmittingTicket(true);
    setTimeout(() => {
      const generatedRef = `WV-SUP-${Math.floor(10000 + Math.random() * 90000)}`;
      const newTicket = {
        id: generatedRef,
        type: 'support_ticket',
        createdAt: new Date().toISOString(),
        dateFormatted: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        fullName: ticketForm.name.trim(),
        email: ticketForm.email.trim(),
        topic: ticketForm.topic,
        bookingRef: ticketForm.refId.trim(),
        message: ticketForm.message.trim(),
        status: 'In Review by Concierge Specialist',
        reviewer: 'Marcus Vance (Senior Guest Relations Manager)',
        eta: 'Guaranteed response within 24 hours',
        details: `Your inquiry regarding "${ticketForm.topic}" has been logged into our concierge queue. Accommodations, transit arrangements (flights, private cabs, buses), and dietary meal requests are being verified.`
      };

      saveInquiry(newTicket);
      setCreatedRef(generatedRef);
      setLastSubmittedTicket(newTicket);
      setIsSubmittingTicket(false);
      setTicketSubmitted(true);
    }, 600);
  };

  return (
    <main className="support-page" id="main-content">
      {/* Banner */}
      <section className="support-banner" aria-label="Support banner">
        <div className="support-banner__bg">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85&auto=format&fit=crop"
            alt="Misty mountain valley with tranquil sunrise"
            className="support-banner__img"
          />
          <div className="support-banner__overlay" aria-hidden="true" />
        </div>
        <div className="container support-banner__content">
          <span className="section-label" style={{ color: 'var(--color-gold-light)' }}>
            Client Support & Concierge Care
          </span>
          <h1 className="support-banner__title">
            We are here for you,<br /><em>every step of the way.</em>
          </h1>
          <p className="support-banner__sub">
            From coordinating flights, private cabs, and scenic buses to arranging handpicked stays and gourmet meals — our team handles everything so you can travel with pure peace of mind.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="container support-body">
        {/* Tracking & Quick Channels Grid */}
        <div className="support-top-grid">
          {/* Reference Tracker */}
          <div className="support-card support-tracker-card">
            <div className="support-card__badge" aria-hidden="true">
              <Search size={20} />
            </div>
            <h2 className="support-card__title">Track Trip Enquiry Status</h2>
            <p className="support-card__desc">
              Have you submitted an enquiry reference ID (e.g. <code>WV-21595</code>)? Enter it below to check your live consultation status.
            </p>

            <form onSubmit={handleTrackRef} className="support-tracker-form">
              <div className="support-tracker-input-wrap">
                <input
                  type="text"
                  className="form-input support-tracker-input"
                  placeholder="Enter reference ID (e.g. WV-84291)"
                  value={refInput}
                  onChange={(e) => setRefInput(e.target.value)}
                  id="support-ref-input"
                />
                <button type="submit" className="btn btn-primary btn--sm" id="support-track-btn">
                  Check Status
                </button>
              </div>
            </form>

            {refStatus && (
              <div className={`support-status-result ${!refStatus.found ? 'support-status-result--error' : ''}`}>
                {refStatus.found ? (
                  <>
                    <div className="support-status-badge">
                      <CheckCircle2 size={16} /> Status: {refStatus.status}
                    </div>
                    <div className="support-status-details">
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px',
                        borderBottom: '1px solid var(--color-warm-border)',
                        paddingBottom: '6px'
                      }}>
                        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-sage-green)', fontWeight: 700 }}>
                          {refStatus.type}
                        </span>
                        <strong style={{ color: 'var(--color-forest-emerald)', letterSpacing: '0.05em' }}>{refStatus.code}</strong>
                      </div>
                      <p><strong>Client:</strong> {refStatus.name} ({refStatus.email})</p>
                      {refStatus.destination && (
                        <p><strong>Destination:</strong> {refStatus.destination} {refStatus.package ? `— ${refStatus.package}` : ''}</p>
                      )}
                      {refStatus.travelers && (
                        <p><strong>Party Size & Total:</strong> {refStatus.travelers} {refStatus.totalAmount ? `• ${refStatus.totalAmount}` : ''}</p>
                      )}
                      {refStatus.topic && (
                        <p><strong>Inquiry Topic:</strong> {refStatus.topic}</p>
                      )}
                      {refStatus.notes && (
                        <p><strong>Submitted Request:</strong> <em>"{refStatus.notes}"</em></p>
                      )}
                      <p><strong>Assigned Reviewer:</strong> {refStatus.expert}</p>
                      <p><strong>Guaranteed Response:</strong> <span style={{ color: 'var(--color-forest-emerald)', fontWeight: 700 }}>{refStatus.eta}</span></p>
                      <p className="support-status-note">{refStatus.details}</p>
                    </div>
                  </>
                ) : (
                  <div className="support-status-details">
                    <div className="support-status-badge" style={{ backgroundColor: '#fef2f2', color: '#b91c1c', border: '1px solid #f87171' }}>
                      <AlertCircle size={16} /> Reference ID Not Found
                    </div>
                    <p style={{ margin: '6px 0 0', color: 'var(--color-deep-charcoal)', fontSize: '0.88rem' }}>
                      {refStatus.error}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Direct Concierge Channels */}
          <div className="support-card support-channels-card">
            <div className="support-card__badge" aria-hidden="true">
              <Headphones size={20} />
            </div>
            <h2 className="support-card__title">Direct Support Channels</h2>
            <p className="support-card__desc">
              Connect with our live concierge desk for immediate assistance or questions.
            </p>

            <div className="support-contact-list">
              <div className="support-contact-item">
                <Phone size={18} className="support-c-icon" />
                <div>
                  <strong>24/7 Dedicated Client Hotline</strong>
                  <a href="tel:+18005559876">+1 (800) 555-WVISTA (9876)</a>
                </div>
              </div>

              <div className="support-contact-item">
                <Mail size={18} className="support-c-icon" />
                <div>
                  <strong>Private Concierge Desk</strong>
                  <a href="mailto:concierge@wandervista.travel">concierge@wandervista.travel</a>
                </div>
              </div>

              <div className="support-contact-item">
                <Clock size={18} className="support-c-icon" />
                <div>
                  <strong>Response Guarantee</strong>
                  <span>Our experts will contact you within 24 hours</span>
                </div>
              </div>

              <div className="support-contact-item">
                <MapPin size={18} className="support-c-icon" />
                <div>
                  <strong>Studios & Operations</strong>
                  <span>San Francisco, CA & Marina Bay, Singapore</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Complete Inclusions / What We Arrange Section */}
        <section className="support-care-section section--white">
          <div className="support-care-header text-center">
            <span className="section-label">End-to-End Care</span>
            <h2 className="support-care-title">What We Arrange For Every Journey</h2>
            <p className="support-care-sub">
              Our aim is for our clients to enjoy the trip without thinking about the travel. Here is how we ensure seamless peace of mind:
            </p>
          </div>

          <div className="support-care-grid">
            <div className="support-care-item">
              <div className="support-care-icon"><Hotel size={22} /></div>
              <h3>Accommodations</h3>
              <p>Handpicked, vetted luxury resorts, alpine chalets, and boutique retreats booked in advance with room preferences guaranteed.</p>
            </div>
            <div className="support-care-item">
              <div className="support-care-icon"><Plane size={22} /></div>
              <h3>Flights & Air Transit</h3>
              <p>Coordination of international flights and inter-island air transfers with baggage allowance and airport concierge.</p>
            </div>
            <div className="support-care-item">
              <div className="support-care-icon"><Car size={22} /></div>
              <h3>Private Cabs & Drivers</h3>
              <p>Dedicated air-conditioned private vehicles and vetted local drivers for day trips, transfers, and point-to-point journeys.</p>
            </div>
            <div className="support-care-item">
              <div className="support-care-icon"><Bus size={22} /></div>
              <h3>Scenic Trains & Express Buses</h3>
              <p>Reserved first-class seats on panoramic scenic trains and luxury highway express coaches across all intercity routes.</p>
            </div>
            <div className="support-care-item">
              <div className="support-care-icon"><Utensils size={22} /></div>
              <h3>Food & Culinary Experiences</h3>
              <p>Daily breakfasts included, curated authentic regional tastings, and pre-booked tables at local chef-driven restaurants.</p>
            </div>
            <div className="support-care-item">
              <div className="support-care-icon"><ShieldCheck size={22} /></div>
              <h3>24/7 Travel Assistance</h3>
              <p>A dedicated concierge specialist on call throughout your journey so you never have to navigate unexpected changes alone.</p>
            </div>
          </div>
        </section>

        {/* Ticket Submission Form */}
        <section className="support-ticket-section">
          <div className="support-ticket-card">
            {ticketSubmitted ? (
              <div className="support-ticket-success">
                <div className="support-ticket-success__badge">
                  <CheckCircle2 size={40} />
                </div>
                <h2>Support Request Received</h2>
                
                <div style={{
                  backgroundColor: '#edf4f0',
                  border: '1.5px solid var(--color-emerald-20)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4) var(--space-6)',
                  margin: 'var(--space-4) auto',
                  maxWidth: '520px'
                }}>
                  <span style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--color-sage-green)',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    Your Generated Support Reference ID
                  </span>
                  <strong style={{
                    fontSize: '1.6rem',
                    color: 'var(--color-forest-emerald)',
                    letterSpacing: '0.05em',
                    fontFamily: 'monospace'
                  }}>
                    {createdRef}
                  </strong>
                  <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-deep-charcoal)', margin: '6px 0 0', lineHeight: 1.4 }}>
                    Use this unique reference number anytime to track live updates from our concierge team in the tracker above.
                  </p>
                </div>

                <p style={{ maxWidth: '560px', margin: '0 auto var(--space-4)' }}>
                  Thank you, <strong>{ticketForm.name}</strong>. Our travel experts will contact you within 24 hours at <strong>{ticketForm.email}</strong> regarding <em>{ticketForm.topic}</em>.
                </p>

                <div style={{
                  display: 'flex',
                  gap: 'var(--space-3)',
                  justifyContent: 'center',
                  marginTop: 'var(--space-5)',
                  flexWrap: 'wrap'
                }}>
                  <button
                    type="button"
                    className="btn btn-primary btn--sm"
                    onClick={() => {
                      setRefInput(createdRef);
                      handleTrackRef(null, createdRef);
                      const trackerEl = document.getElementById('support-ref-input');
                      if (trackerEl) {
                        trackerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    id="track-this-ticket-now-btn"
                  >
                    <Search size={15} /> Track This Inquiry Now
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn--sm"
                    onClick={() => {
                      setTicketSubmitted(false);
                      setTicketForm({
                        name: '',
                        email: '',
                        topic: 'Accommodations & Room Selection',
                        refId: '',
                        message: '',
                      });
                    }}
                    id="new-support-ticket-btn"
                  >
                    Submit Another Query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} noValidate className="support-ticket-form">
                <div className="support-ticket-form__header">
                  <span className="section-label">Direct Message</span>
                  <h2>Send a Question to Our Concierge</h2>
                  <p>Have specific questions regarding transit, dietary meals, or booking changes? Let us know below.</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="ticket-name">
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      id="ticket-name"
                      type="text"
                      className={`form-input${ticketErrors.name ? ' form-input--error' : ''}`}
                      placeholder="e.g. Michael Ross"
                      value={ticketForm.name}
                      onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                    />
                    {ticketErrors.name && (
                      <span className="form-error"><AlertCircle size={13} /> {ticketErrors.name}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="ticket-email">
                      Email Address <span className="req">*</span>
                    </label>
                    <input
                      id="ticket-email"
                      type="email"
                      className={`form-input${ticketErrors.email ? ' form-input--error' : ''}`}
                      placeholder="e.g. michael@example.com"
                      value={ticketForm.email}
                      onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                    />
                    {ticketErrors.email && (
                      <span className="form-error"><AlertCircle size={13} /> {ticketErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="ticket-topic">
                      Topic of Inquiry
                    </label>
                    <select
                      id="ticket-topic"
                      className="form-select"
                      value={ticketForm.topic}
                      onChange={(e) => setTicketForm({ ...ticketForm, topic: e.target.value })}
                    >
                      {SUPPORT_TOPICS.map((top) => (
                        <option key={top} value={top}>{top}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="ticket-ref">
                      Booking Reference (Optional)
                    </label>
                    <input
                      id="ticket-ref"
                      type="text"
                      className="form-input"
                      placeholder="e.g. WV-21595"
                      value={ticketForm.refId}
                      onChange={(e) => setTicketForm({ ...ticketForm, refId: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="ticket-msg">
                    How Can We Assist You? <span className="req">*</span>
                  </label>
                  <textarea
                    id="ticket-msg"
                    rows="4"
                    className={`form-textarea${ticketErrors.message ? ' form-input--error' : ''}`}
                    placeholder="Describe your inquiry regarding your itinerary, flights, cab transfers, accommodation, or dietary needs..."
                    value={ticketForm.message}
                    onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                  />
                  {ticketErrors.message && (
                    <span className="form-error"><AlertCircle size={13} /> {ticketErrors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn--lg"
                  disabled={isSubmittingTicket}
                  id="submit-support-ticket-btn"
                >
                  {isSubmittingTicket ? (
                    <>Sending Support Request...</>
                  ) : (
                    <><Send size={16} /> Send Message to Concierge</>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* FAQs */}
        <section className="support-faqs-section">
          <div className="support-faqs-header text-center">
            <span className="section-label">Helpful Answers</span>
            <h2>Frequently Asked Support Questions</h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </section>
      </div>
    </main>
  );
}
