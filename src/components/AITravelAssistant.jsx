import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, MessageCircle, X, Send, Bot, User,
  MapPin, ArrowRight, Compass, ShieldCheck, Hotel, Plane, Utensils
} from 'lucide-react';
import { destinations } from '../data/destinations';
import { packages } from '../data/packages';
import './AITravelAssistant.css';

const SUGGESTIONS = [
  'Do you arrange all flights, cabs & meals?',
  'Suggest a 5-day romantic beach escape',
  'What is included in the Swiss Alps package?',
  'Best time to visit Kyoto?',
  'Family-friendly trips under $2,000',
];

export default function AITravelAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am Vista AI, your personal WanderVista travel concierge. Whether you're looking for hidden tropical islands, mountain chalets, or want to know how we arrange all your accommodations, transit (bus, flight, cab), and meals so you can travel worry-free — ask me anything!",
      time: 'Just now',
    },
  ]);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // AI Knowledge-based response engine
  const generateResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Inclusions, flights, cabs, buses, food, accommodation
    if (q.includes('flight') || q.includes('cab') || q.includes('bus') || q.includes('food') || q.includes('meal') || q.includes('accommodat') || q.includes('hotel') || q.includes('arrange') || q.includes('what we do')) {
      return {
        text: "Yes! At WanderVista, our core aim is that you enjoy every second of your trip without ever thinking about travel logistics. We arrange all handpicked accommodations, complete travel logistics (domestic/international flights, comfortable intercity buses, panoramic trains, and private cabs with chauffeurs), and provide daily gourmet meals and authentic local dining.",
        action: { label: 'Plan a Worry-Free Trip', path: '/contact' },
      };
    }

    // 2. Swiss Alps
    if (q.includes('swiss') || q.includes('alps') || q.includes('alpine')) {
      return {
        text: "Our Alpine Serenity package in the Swiss Alps is a 6-day journey featuring the iconic Glacier Express panoramic rail, boutique mountain chalets, scenic hikes around the Matterhorn & Gornergrat, and authentic fondue dinners. Sample price is $2,490/person.",
        action: { label: 'View Alpine Serenity Details', path: '/packages/alpine-serenity' },
      };
    }

    // 3. Bali
    if (q.includes('bali') || q.includes('indonesia')) {
      return {
        text: "Bali is one of our most beloved destinations! We recommend visiting between April and October. Our 'Bali Island Escape' (5 Days / 4 Nights) covers Seminyak beachfront, Ubud rice terraces, private temple ceremonies at Tirta Empul, and a sunset seafood dinner at Jimbaran Bay for $1,290/person.",
        action: { label: 'Explore Bali Island Escape', path: '/packages/bali-island-escape' },
      };
    }

    // 4. Kyoto / Japan
    if (q.includes('kyoto') || q.includes('japan')) {
      return {
        text: "Kyoto is magical! The best times are spring (March–May for cherry blossoms) and autumn (October–November for vibrant maple foliage). Our Kyoto Cultural Journey includes private machiya stays, guided early-morning Torii gate walks, tea ceremonies, and Bullet Train transfers.",
        action: { label: 'View Kyoto Cultural Journey', path: '/packages/kyoto-cultural-journey' },
      };
    }

    // 5. Romantic or beach escape
    if (q.includes('romance') || q.includes('romantic') || q.includes('beach') || q.includes('honeymoon') || q.includes('maldives') || q.includes('santorini')) {
      return {
        text: "For a dream romantic beach escape, we highly recommend the Maldives (overwater villas with marine safaris) or Santorini, Greece (cliffside whitewashed suites overlooking the Aegean caldera). Both include private sunset boat charters, gourmet candlelight dinners, and seamless seaplane or private cab transfers.",
        action: { label: 'Browse Romantic Packages', path: '/packages' },
      };
    }

    // 6. Family trips or budget
    if (q.includes('family') || q.includes('child') || q.includes('kid') || q.includes('budget') || q.includes('cheap') || q.includes('cost')) {
      return {
        text: "We specialize in family-friendly itineraries that balance engaging cultural activities with downtime. For budgets under $2,000 per person, both our Bali Island Escape ($1,290) and Kerala Backwaters ($980) offer private family transport, family villa options, and kid-safe cultural immersions.",
        action: { label: 'Customize a Family Trip', path: '/contact' },
      };
    }

    // 7. Booking / Contact / 24 hours
    if (q.includes('book') || q.includes('contact') || q.includes('expert') || q.includes('quote') || q.includes('how to')) {
      return {
        text: "Booking is simple! Head to our 'Plan Your Trip' page, fill in your preferred destination, style, and travel window. Once submitted, our dedicated destination experts will review your request and contact you within 24 hours with a tailored, no-obligation itinerary proposal.",
        action: { label: 'Start Free Trip Enquiry', path: '/contact' },
      };
    }

    // Default intelligent fallback
    return {
      text: `That sounds like a wonderful travel idea! WanderVista covers extraordinary destinations across Asia, Europe, and the Indian Ocean. Every journey is 100% customized with accommodations, flights/cabs/buses, and food arranged so you can travel with complete peace of mind. Would you like me to recommend a destination or package?`,
      action: { label: 'Explore All Destinations', path: '/destinations' },
    };
  };

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const resp = generateResponse(query);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: resp.text,
        action: resp.action,
        time: 'Just now',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 650);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating launcher button */}
      <button
        className="ai-launcher-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close AI Travel Concierge' : 'Chat with Vista AI Travel Concierge'}
        aria-expanded={isOpen}
        id="vista-ai-launcher"
      >
        <div className="ai-launcher-btn__content">
          <Sparkles size={18} className="ai-launcher-btn__icon" />
          <span className="ai-launcher-btn__text">Ask Travel AI</span>
        </div>
        <span className="ai-launcher-btn__ping" />
      </button>

      {/* Slide-out / floating modal */}
      {isOpen && (
        <div className="ai-chat-window" role="dialog" aria-label="Vista AI Travel Assistant">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-chat-header__info">
              <div className="ai-chat-header__avatar" aria-hidden="true">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="ai-chat-header__title">Vista AI Concierge</h3>
                <span className="ai-chat-header__status">
                  <span className="ai-chat-header__dot" /> Online • 24/7 Travel Guide
                </span>
              </div>
            </div>
            <button
              className="ai-chat-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick value banner */}
          <div className="ai-chat-subbanner">
            <ShieldCheck size={14} />
            <span>We arrange all stays, flights, cabs, buses & dining for you.</span>
          </div>

          {/* Messages list */}
          <div className="ai-chat-messages">
            {messages.map((m) => (
              <div key={m.id} className={`ai-message ai-message--${m.sender}`}>
                <div className="ai-message__bubble">
                  <p>{m.text}</p>
                  {m.action && (
                    <button
                      className="ai-message__cta"
                      onClick={() => {
                        setIsOpen(false);
                        navigate(m.action.path);
                      }}
                    >
                      {m.action.label} <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message ai-message--ai">
                <div className="ai-message__bubble ai-message__typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions */}
          <div className="ai-chat-suggestions">
            <span className="ai-chat-suggestions__label">Quick travel questions:</span>
            <div className="ai-chat-suggestions__list">
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  className="ai-suggestion-chip"
                  onClick={() => handleSend(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="ai-chat-input-area">
            <input
              type="text"
              className="ai-chat-input"
              placeholder="Ask about destinations, cabs, hotels, food..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Chat with Vista AI"
              id="ai-chat-input"
            />
            <button
              className="ai-chat-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim()}
              aria-label="Send message"
              id="ai-chat-send"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
