'use client';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-purple-800 hidden md:block"></div>
      
      <div className="space-y-12">
        {events.map((event, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-6">
            {/* Year with circle */}
            <div className="flex-shrink-0 relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold z-10 relative">
                <span className="text-xs">{event.year}</span>
              </div>
              {index < events.length - 1 && (
                <div className="absolute top-9 bottom-0 left-4 w-1 bg-gradient-to-b from-purple-600 to-purple-800 md:hidden"></div>
              )}
            </div>
            
            {/* Content */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-900/30 flex-1">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">{event.title}</h3>
              <p className="text-gray-400">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
