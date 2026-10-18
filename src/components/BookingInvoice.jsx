import React from 'react';
import { Printer, X, Check, ShieldAlert, Sparkles, Compass } from 'lucide-react';
import './BookingInvoice.css';

export default function BookingInvoice({ data, isModal = false, onClose }) {
  if (!data) return null;

  const adults = parseInt(data.adults, 10) || 1;
  const children = parseInt(data.children, 10) || 0;
  const totalTravelers = adults + children;

  // Rate calculation
  const unitRate = data.ratePerPerson || 690;
  const adultTotal = adults * unitRate;
  const childUnitRate = Math.round(unitRate * 0.7);
  const childTotal = children * childUnitRate;
  const subtotal = data.subtotal || (adultTotal + childTotal);
  const taxAmount = data.taxAmount || Math.round(subtotal * 0.05);
  const grandTotal = data.grandTotal || (subtotal + taxAmount);

  // Inclusions default list
  const inclusions = data.inclusions && data.inclusions.length > 0 ? data.inclusions : [
    'Handpicked boutique & luxury hillside resort accommodations',
    'Complete end-to-end transit coordination (Airport private transfers, private cab with driver & scenic bus)',
    'Daily artisan breakfasts and selected regional gourmet tasting meals',
    'Guided local sightseeing tours with certified heritage naturalists',
    'All national park entry permits, estate fees & road tolls',
    '24/7 Dedicated WanderVista concierge & local on-call coordinator',
  ];

  // Exclusions default list
  const exclusions = data.exclusions && data.exclusions.length > 0 ? data.exclusions : [
    'International long-haul intercontinental airfare (can be booked upon request)',
    'Personal expenses, laundry, telephone & alcoholic beverages',
    'Discretionary gratuities and tips for local drivers and guides',
    'Optional unscheduled adventure activities or private spa treatments',
    'Comprehensive personal travel & medical insurance',
  ];

  const invoiceContent = (
    <div className="wv-invoice-wrapper" id="wv-printable-invoice">
      {/* Header */}
      <div className="wv-inv-header">
        <div className="wv-inv-brand">
          <div className="wv-inv-logo">
            <Compass size={28} color="#214a3b" />
            <span>WanderVista</span>
          </div>
          <span className="wv-inv-logo-sub">Travels & Bespoke Journeys</span>
          <p className="wv-inv-company-meta">
            1200 Coastal Vista Way, Suite 400 • concierge@wandervistatravels.com<br />
            Toll-Free: +1 (800) 847-8278 • Direct 24/7 Concierge Desk
          </p>
        </div>

        <div className="wv-inv-badge-wrap">
          <div className="wv-inv-type-title">Trip Estimate & Bill</div>
          <div className="wv-inv-ref-badge">{data.id || data.confirmationCode || 'WV-PENDING'}</div>
          <div className="wv-inv-date-row">
            <strong>Issued:</strong> {data.dateFormatted || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
          <div className="wv-inv-date-row">
            <strong>Status:</strong> Provisional Reservation
          </div>
        </div>
      </div>

      {/* Client & Itinerary Meta Grid */}
      <div className="wv-inv-grid">
        <div>
          <div className="wv-inv-block-title">Client Information</div>
          <div className="wv-inv-data-list">
            <div className="wv-inv-data-row">
              <span>Primary Guest:</span>
              <strong>{data.fullName || 'Valued Traveler'}</strong>
            </div>
            <div className="wv-inv-data-row">
              <span>Email:</span>
              <strong>{data.email || '—'}</strong>
            </div>
            <div className="wv-inv-data-row">
              <span>Phone:</span>
              <strong>{data.phone || 'On File'}</strong>
            </div>
            <div className="wv-inv-data-row">
              <span>Total Party:</span>
              <strong>
                {totalTravelers} Traveler{totalTravelers !== 1 ? 's' : ''} ({adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''})
              </strong>
            </div>
          </div>
        </div>

        <div>
          <div className="wv-inv-block-title">Trip & Destination Details</div>
          <div className="wv-inv-data-list">
            <div className="wv-inv-data-row">
              <span>Destination:</span>
              <strong>{data.destination || 'Selected Destination'}</strong>
            </div>
            <div className="wv-inv-data-row">
              <span>Package Concept:</span>
              <strong>{data.packageName || data.packageSlug || `${data.destination} Custom Expedition`}</strong>
            </div>
            <div className="wv-inv-data-row">
              <span>Target Window:</span>
              <strong>{data.timeline || 'Flexible Dates'}</strong>
            </div>
            <div className="wv-inv-data-row">
              <span>Estimated Duration:</span>
              <strong>{data.duration ? `${data.duration} Days` : 'Custom Duration'}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Itemized Calculation Table */}
      <div className="wv-inv-table-wrap">
        <table className="wv-inv-table">
          <thead>
            <tr>
              <th>Itinerary Item & Description</th>
              <th className="text-right">Quantity / Guests</th>
              <th className="text-right">Rate / Person</th>
              <th className="text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="wv-inv-item-desc">
                  {data.destination} — Boutique Accommodations & Curated Itinerary
                </div>
                <div className="wv-inv-item-sub">
                  Includes full lodging in verified hillside chalets / luxury boutique rooms.
                </div>
              </td>
              <td className="text-right">{adults} Adult{adults > 1 ? 's' : ''}</td>
              <td className="text-right">${unitRate.toLocaleString()}</td>
              <td className="text-right">${adultTotal.toLocaleString()}</td>
            </tr>

            {children > 0 && (
              <tr>
                <td>
                  <div className="wv-inv-item-desc">
                    Junior Guest Package (Under 12)
                  </div>
                  <div className="wv-inv-item-sub">
                    Includes supplementary bedding, meal plan & family excursion passes (30% youth concession).
                  </div>
                </td>
                <td className="text-right">{children} Child{children > 1 ? 'ren' : ''}</td>
                <td className="text-right">${childUnitRate.toLocaleString()}</td>
                <td className="text-right">${childTotal.toLocaleString()}</td>
              </tr>
            )}

            <tr>
              <td>
                <div className="wv-inv-item-desc">
                  End-to-End Transport Logistics Arrangement
                </div>
                <div className="wv-inv-item-sub">
                  Airport transfers, private air-conditioned cabs, and scenic express bus arrangements.
                </div>
              </td>
              <td className="text-right">{totalTravelers} Pax</td>
              <td className="text-right"><span className="wv-inv-badge-inc">INCLUDED</span></td>
              <td className="text-right"><span className="wv-inv-badge-inc">INCLUDED</span></td>
            </tr>

            <tr>
              <td>
                <div className="wv-inv-item-desc">
                  Culinary & Meals Plan
                </div>
                <div className="wv-inv-item-sub">
                  Daily curated breakfasts, welcome banquet, and authentic regional specialty meals.
                </div>
              </td>
              <td className="text-right">{totalTravelers} Pax</td>
              <td className="text-right"><span className="wv-inv-badge-inc">INCLUDED</span></td>
              <td className="text-right"><span className="wv-inv-badge-inc">INCLUDED</span></td>
            </tr>

            <tr>
              <td>
                <div className="wv-inv-item-desc">
                  WanderVista 24/7 Dedicated Concierge & Specialist Care
                </div>
                <div className="wv-inv-item-sub">
                  Personal itinerary designer assigned for full pre-departure adjustments and on-trip support.
                </div>
              </td>
              <td className="text-right">1 Dedicated Concierge</td>
              <td className="text-right"><span className="wv-inv-badge-inc">COMPLIMENTARY</span></td>
              <td className="text-right"><span className="wv-inv-badge-inc">COMPLIMENTARY</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Financial Calculation Box */}
      <div className="wv-inv-calc-box">
        <div className="wv-inv-calc-row">
          <span>Subtotal ({totalTravelers} Traveler{totalTravelers !== 1 ? 's' : ''}):</span>
          <strong>${subtotal.toLocaleString()}</strong>
        </div>
        <div className="wv-inv-calc-row">
          <span>Tourism Tax & Service Coordination (5%):</span>
          <strong>${taxAmount.toLocaleString()}</strong>
        </div>
        <div className="wv-inv-calc-row wv-inv-calc-row--grand">
          <span>Total Estimated Amount:</span>
          <strong>${grandTotal.toLocaleString()} USD</strong>
        </div>
      </div>

      {/* Inclusions and Exclusions side by side */}
      <div className="wv-inv-inc-exc-grid">
        <div className="wv-inv-inc-card">
          <div className="wv-inv-inc-title">
            <Check size={16} /> What is Included in Your Trip:
          </div>
          <ul>
            {inclusions.map((inc, i) => (
              <li key={i}>
                <span className="wv-inv-bullet-inc">✓</span>
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="wv-inv-exc-card">
          <div className="wv-inv-exc-title">
            <ShieldAlert size={16} /> What is NOT Included:
          </div>
          <ul>
            {exclusions.map((exc, i) => (
              <li key={i}>
                <span className="wv-inv-bullet-exc">✕</span>
                <span>{exc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Notes if provided */}
      {data.notes && (
        <div style={{
          backgroundColor: '#f8f6f0',
          border: '1px solid #e7e2d6',
          borderRadius: '6px',
          padding: '10px 14px',
          marginBottom: 'var(--space-6)',
          fontSize: '0.84rem'
        }}>
          <strong style={{ color: '#214a3b', display: 'block', marginBottom: '3px' }}>Client Custom Notes & Preferences:</strong>
          <span style={{ color: '#444d46' }}>"{data.notes}"</span>
        </div>
      )}

      {/* Footer Promise & Signature */}
      <div className="wv-inv-footer">
        <div className="wv-inv-promise">
          <strong>Our Worry-Free Travel Guarantee</strong>
          <p style={{ margin: 0 }}>
            We arrange all accommodations, travelling methods (flights, private cabs, buses), and meals so you can experience your trip without thinking about logistics. Our expert travel designer will contact you within 24 hours to review your preferences.
          </p>
        </div>
        <div className="wv-inv-sign">
          <div className="wv-inv-sign-line">WanderVista Concierge</div>
          <div className="wv-inv-sign-sub">Authorized Travel Designer</div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="wv-invoice-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
        <div className="wv-invoice-modal" onClick={(e) => e.stopPropagation()}>
          <div className="wv-invoice-modal__toolbar">
            <div style={{ fontWeight: 700, color: '#214a3b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#b69a62" /> Official Pro-Forma Trip Bill & Summary
            </div>
            <div className="wv-invoice-modal__toolbar-actions">
              <button
                className="btn btn-primary btn--sm"
                onClick={() => window.print()}
                id="modal-print-invoice-btn"
              >
                <Printer size={15} /> Print / Save as PDF
              </button>
              {onClose && (
                <button
                  className="btn btn-secondary btn--sm"
                  onClick={onClose}
                  aria-label="Close invoice preview"
                >
                  <X size={15} /> Close
                </button>
              )}
            </div>
          </div>
          <div className="wv-invoice-modal__content">
            {invoiceContent}
          </div>
        </div>
      </div>
    );
  }

  return invoiceContent;
}
