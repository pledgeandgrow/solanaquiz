'use client';

import Image from 'next/image';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  imageSrc: string;
}

export default function Testimonial({ quote, author, role, imageSrc }: TestimonialProps) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-900/30 hover:border-purple-500/50 transition-all">
      <div className="flex flex-col">
        <div className="mb-6">
          <svg className="h-8 w-8 text-purple-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        
        <p className="text-gray-300 mb-6 italic">{quote}</p>
        
        <div className="mt-auto flex items-center">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border border-purple-500/30">
            {/* Fallback div in case image fails to load */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 flex items-center justify-center">
              <span className="text-sm text-purple-300 font-bold">{author.charAt(0)}</span>
            </div>
            
            {/* Image with error handling */}
            <Image
              src={imageSrc}
              alt={author}
              fill
              style={{ objectFit: 'cover' }}
              className="z-10"
              onError={(e) => {
                // Hide the image on error, showing the fallback
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          <div>
            <h4 className="font-semibold text-white">{author}</h4>
            <p className="text-sm text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
