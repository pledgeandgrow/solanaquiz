'use client';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export default function StepCard({ number, title, description, icon }: StepCardProps) {
  return (
    <div className="relative bg-gray-800/50 rounded-xl p-6 border border-purple-900/30 hover:border-purple-500/50 transition-all">
      <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <div className="text-3xl mb-4 mt-2">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-purple-300">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
