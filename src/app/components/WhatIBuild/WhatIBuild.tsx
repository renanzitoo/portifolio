'use client';

interface WhatIBuildProps {
  messages: Record<string, string>;
}

export default function WhatIBuild({ messages }: WhatIBuildProps) {
  const capabilities = [1, 2, 3, 4, 5].map(i => messages[`what-i-build.${i}`]);

  return (
    <section id="what-i-build" className="py-16 md:py-24 px-4 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-slate-900 dark:text-white">
          {messages['what-i-build.title']}
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
          {messages['what-i-build.desc']}
        </p>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 dark:border-slate-700 rounded-lg hover:shadow-lg dark:hover:bg-slate-800 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">✓</div>
                <p className="text-lg text-slate-700 dark:text-gray-200">{capability}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
