'use client';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-900/30 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-900/20">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-purple-300">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
