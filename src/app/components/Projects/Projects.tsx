'use client';

import { useEffect, useState } from 'react';

interface Props {
  messages: Record<string, string>;
}

export default function Projects({ messages }: Props) {
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
    <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        {messages['projects.title']}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-label={`${messages[`projects.${i}.title`]} - abrir detalhes`}
            onClick={() => setOpenProjectId(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpenProjectId(i);
              }
            }}
            className="w-full md:w-60 md:h-60 border border-border rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow ease-out flex flex-col justify-between overflow-hidden bg-card cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-border"
          >
            <div>
              <h3 className="text-lg font-semibold mb-1">
                {messages[`projects.${i}.title`]}
              </h3>
              <p className="text-sm text-muted mb-1">
                <strong>{messages[`projects.${i}.role`]}</strong>
              </p>
              <p className="text-sm text-muted mb-2">
                <strong>{messages[`projects.${i}.stack`]}</strong>
              </p>
              <p className="text-sm line-clamp-3">
                {messages[`projects.${i}.desc`]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {openProjectId !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center"
        >
          <div
            className="absolute inset-0 bg-gray-50 dark:bg-gray-900"
            onClick={() => setOpenProjectId(null)}
          />
          <div className="relative z-10 m-4 w-full max-w-3xl rounded-xl border border-border bg-card shadow-xl">
            <div className="flex items-start justify-between p-4 border-b border-border">
              <h3 className="text-xl font-semibold">
                {messages[`projects.${openProjectId}.title`]}
              </h3>
              <button
                onClick={() => setOpenProjectId(null)}
                className="px-3 py-1 rounded text-muted hover:text-foreground"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-[80vh] overflow-y-auto">
              <p className="text-sm text-muted">
                <strong>{messages[`projects.${openProjectId}.role`]}</strong>
              </p>
              <p className="text-sm text-muted">
                <strong>{messages[`projects.${openProjectId}.stack`]}</strong>
              </p>
              <div>
                <p className="text-base leading-relaxed whitespace-pre-line">
                  {messages[`projects.${openProjectId}.details`] ?? messages[`projects.${openProjectId}.desc`]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
