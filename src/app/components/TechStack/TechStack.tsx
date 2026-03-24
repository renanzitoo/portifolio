'use client';

interface TechStackProps {
  messages: Record<string, string>;
}

export default function TechStack({ messages }: TechStackProps) {
  const categories = [
    { key: 'languages', label: messages['tech-stack.languages'] },
    { key: 'frontend', label: messages['tech-stack.frontend'] },
    { key: 'backend', label: messages['tech-stack.backend'] },
    { key: 'mobile', label: messages['tech-stack.mobile'] },
    { key: 'devops', label: messages['tech-stack.devops'] },
    { key: 'emerging', label: messages['tech-stack.emerging'] },
  ];

  return (
    <section id="tech-stack" className="py-16 md:py-24 px-4 bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-900 dark:text-white">
          {messages['tech-stack.title']}
        </h2>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.key}
              className="p-6 border border-gray-200 dark:border-slate-700 rounded-lg hover:shadow-lg dark:hover:bg-slate-800 transition-all duration-300"
              style={{
                animation: `fadeInScale 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                {category.label}
              </h3>
              <ul className="space-y-3">
                {messages[`tech-stack.${category.key}.items`]
                  .split(', ')
                  .map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-slate-700 dark:text-gray-300"
                    >
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
