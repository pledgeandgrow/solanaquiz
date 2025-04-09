'use client';

import { useEffect, useState, useRef } from 'react';

interface StatItemProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

function StatItem({ value, label, prefix = '', suffix = '' }: StatItemProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const duration = 2000;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value, isVisible]);
  
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        <span>{prefix}</span>
        <span ref={countRef}>{count}</span>
        <span>{suffix}</span>
      </div>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}

interface StatsProps {
  stats: {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
  }[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="py-12 bg-gray-800/30 rounded-xl">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              label={stat.label}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
