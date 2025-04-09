'use client';

interface MissionStatementProps {
  title: string;
  description: string;
  values: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export default function MissionStatement({ title, description, values }: MissionStatementProps) {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-400 to-green-300 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {values.map((value, index) => (
          <div 
            key={index} 
            className="bg-gray-800/50 rounded-xl p-6 border border-purple-900/30 hover:border-purple-500/50 transition-all"
          >
            <div className="text-3xl mb-4">{value.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-purple-300">{value.title}</h3>
            <p className="text-gray-400">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
