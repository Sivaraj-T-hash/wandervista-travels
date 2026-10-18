// =========================================
// WANDERVISTA TRAVELS — INQUIRY & TICKET STORAGE
// Local storage solution (no database required)
// =========================================

const STORAGE_KEY = 'wandervista_inquiries';

// Pre-seeded demo inquiries so default demo codes also work
const DEMO_INQUIRIES = [
  {
    id: 'WV-84291',
    type: 'trip_enquiry',
    createdAt: '2026-10-17T10:30:00.000Z',
    dateFormatted: 'Oct 17, 2026, 10:30 AM',
    fullName: 'David Sterling',
    email: 'david.sterling@example.com',
    phone: '+1 (555) 392-1849',
    destination: 'Munnar',
    packageName: 'Kerala Green Trails',
    travelStyle: 'Nature & Wildlife',
    timeline: '1 to 3 months',
    duration: '4 Days / 3 Nights',
    adults: 2,
    children: 0,
    totalTravelers: 2,
    ratePerPerson: 690,
    subtotal: 1380,
    taxAmount: 69,
    grandTotal: 1449,
    notes: 'Prefer a hilltop tea planter bungalow with sunrise terrace.',
    status: 'In Review by Destination Specialist',
    reviewer: 'Sarah Jenkins (Senior Itinerary Designer)',
    eta: 'Guaranteed response within 24 hours',
    details: 'Accommodations at tea estate resort, airport cab transfers, and backwater canoe excursion are currently being finalized.'
  },
  {
    id: 'WV-21595',
    type: 'support_ticket',
    createdAt: '2026-10-16T15:20:00.000Z',
    dateFormatted: 'Oct 16, 2026, 03:20 PM',
    fullName: 'Elena Rostova',
    email: 'elena.r@example.com',
    topic: 'Accommodations & Room Selection',
    bookingRef: 'WV-21595',
    message: 'Requesting connecting suites for family trip with wheelchair accessible ground floor access.',
    status: 'Resolution in Progress',
    reviewer: 'Marcus Vance (Senior Guest Relations Manager)',
    eta: 'Response within 24 hours guaranteed',
    details: 'Accessible ground-floor hillside chalet confirmed with resort management. Final voucher updating.'
  }
];

export function getStoredInquiries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading inquiries from localStorage:', e);
    return [];
  }
}

export function saveInquiry(inquiry) {
  try {
    const existing = getStoredInquiries();
    // Filter out if duplicate ID exists, then prepend
    const updated = [inquiry, ...existing.filter((item) => item.id.toUpperCase() !== inquiry.id.toUpperCase())];
    // Keep last 100 records
    const trimmed = updated.slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    return inquiry;
  } catch (e) {
    console.error('Error saving inquiry to localStorage:', e);
    return inquiry;
  }
}

export function findInquiryById(refId) {
  if (!refId || typeof refId !== 'string') return null;
  const cleanId = refId.trim().toUpperCase();

  // 1. Search locally stored user submissions first
  const stored = getStoredInquiries();
  const match = stored.find((item) => item.id.toUpperCase() === cleanId);
  if (match) return match;

  // 2. Search default demo inquiries fallback
  const demoMatch = DEMO_INQUIRIES.find((item) => item.id.toUpperCase() === cleanId);
  if (demoMatch) return demoMatch;

  return null;
}
