'use client';

import { useEffect, useState } from 'react';

interface FeaturedProjectsProps {
  messages: Record<string, string>;
}

export default function FeaturedProjects({ messages }: FeaturedProjectsProps) {
  const [openProjectId, setOpenProjectId] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenProjectId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (openProjectId !== null) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [openProjectId]);

  return (
    <section id="projects" className="py-16 md:py-24 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-slate-900 dark:text-white">
          {messages['projects.title']}
        </h2>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`${messages[`projects.${i}.title`]} - View details`}
              onClick={() => setOpenProjectId(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpenProjectId(i);
                }
              }}
              className="group relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer overflow-hidden"
              style={{
                animation: `slideInUp 0.6s ease-out ${(i - 1) * 0.15}s both`,
              }}
            >
              {/* Project Header */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {messages[`projects.${i}.title`]}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {messages[`projects.${i}.role`]}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {messages[`projects.${i}.stack`]}
                </p>
              </div>

              {/* Problem snippet */}
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded border-l-2 border-red-400">
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  <strong className="text-red-600 dark:text-red-400">Problem: </strong>
                  {messages[`projects.${i}.problem`]?.substring(0, 80)}...
                </p>
              </div>

              {/* Solution snippet */}
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded border-l-2 border-green-400">
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                  <strong className="text-green-600 dark:text-green-400">Solution: </strong>
                  {messages[`projects.${i}.solution`]?.substring(0, 80)}...
                </p>
              </div>

              {/* CTA */}
              <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-2 flex items-center gap-1 transition-all">
                View Case Study
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Projects Section */}
        <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900 dark:text-white">
            {messages['other-projects.title']}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {messages['other-projects.desc']}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => {
              const title = messages[`other-projects.${i}.title`];
              const desc = messages[`other-projects.${i}.desc`];
              if (!title) return null;
              
              return (
                <div
                  key={i}
                  className="p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:shadow-lg dark:hover:bg-slate-700 transition-all duration-300"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`,
                  }}
                >
                  <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">{title}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{desc}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <strong>Stack: </strong>{messages[`other-projects.${i}.stack`]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {openProjectId !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenProjectId(null)}
          />
          <div className="relative z-10 w-full max-w-3xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 flex items-start justify-between p-6 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {messages[`projects.${openProjectId}.title`]}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {messages[`projects.${openProjectId}.role`]}
                </p>
              </div>
              <button
                onClick={() => setOpenProjectId(null)}
                className="px-3 py-1 rounded text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white text-2xl"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Stack */}
              <div>
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Technologies</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {messages[`projects.${openProjectId}.stack`]}
                </p>
              </div>

              {/* Problem */}
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-400">
                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Problem</h4>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  {messages[`projects.${openProjectId}.problem`]}
                </p>
              </div>

              {/* Solution */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Solution</h4>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  {messages[`projects.${openProjectId}.solution`]}
                </p>
              </div>

              {/* Technical Depth */}
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-400">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Technical Depth</h4>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  {messages[`projects.${openProjectId}.technical`]}
                </p>
              </div>

              {/* Impact */}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-400">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Impact</h4>
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed">
                  {messages[`projects.${openProjectId}.impact`]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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
