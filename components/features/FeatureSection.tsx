'use client';

import Image from 'next/image';

interface FeatureSectionProps {
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
}

export default function FeatureSection({ 
  title, 
  description, 
  features, 
  imageSrc, 
  imageAlt,
  reversed = false 
}: FeatureSectionProps) {
  return (
    <section className="py-16 bg-gray-900/30">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
          <div className="w-full lg:w-1/2">
            <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden">
              {/* Fallback div in case image fails to load */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 flex items-center justify-center">
                <span className="text-2xl text-purple-300">{imageAlt}</span>
              </div>
              
              {/* Image with error handling */}
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                style={{ objectFit: 'cover' }}
                className="z-10"
                onError={(e) => {
                  // Hide the image on error, showing the fallback
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-purple-300">{title}</h2>
            <p className="text-gray-300 mb-6">{description}</p>
            
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center mr-3 mt-1">
                    <svg className="h-3 w-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
