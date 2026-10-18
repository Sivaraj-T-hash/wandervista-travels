import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQAccordion.css';

export default function FAQAccordion({ faqs }) {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="faq-accordion" role="list">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className={`faq-item${isOpen ? ' faq-item--open' : ''}`}
            role="listitem"
          >
            <button
              className="faq-item__trigger"
              onClick={() => toggle(faq.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${faq.id}`}
              id={`faq-trigger-${faq.id}`}
            >
              <span className="faq-item__question">{faq.question}</span>
              <span className="faq-item__icon" aria-hidden="true">
                <ChevronDown size={18} />
              </span>
            </button>
            <div
              id={`faq-answer-${faq.id}`}
              className="faq-item__panel"
              role="region"
              aria-labelledby={`faq-trigger-${faq.id}`}
              hidden={!isOpen}
            >
              <p className="faq-item__answer">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
