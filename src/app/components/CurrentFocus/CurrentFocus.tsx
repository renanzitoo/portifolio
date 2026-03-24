'use client';

interface CurrentFocusProps {
  messages: Record<string, string>;
}

export default function CurrentFocus({ messages }: CurrentFocusProps) {
  const focuses = [1, 2, 3].map(i => messages[`current-focus.${i}`]);

  return (
    <section id="current-focus" className="py-16 md:py-24 px-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-slate-900 dark:text-white">
          {messages['current-focus.title']}
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
          {messages['current-focus.desc']}
        </p>

        {/* Focus Areas */}
        <div className="space-y-6">
          {focuses.map((focus, index) => (
            <div
              key={index}
              className="p-8 bg-white dark:bg-slate-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500"
              style={{
                animation: `slideInLeft 0.6s ease-out ${index * 0.15}s both`,
              }}
            >
              <p className="text-lg text-slate-700 dark:text-gray-100 leading-relaxed">
                {focus}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
