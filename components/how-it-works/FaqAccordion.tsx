'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className={`bg-gray-800/50 rounded-xl border transition-all ${
            openIndex === index ? 'border-purple-500/50' : 'border-purple-900/30'
          }`}
        >
          <button
            className="w-full text-left px-6 py-4 flex justify-between items-center"
            onClick={() => toggleFaq(index)}
          >
            <h3 className="font-semibold text-lg">{faq.question}</h3>
            <svg 
              className={`w-5 h-5 transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div 
            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
            }`}
          >
            <p className="text-gray-400">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
