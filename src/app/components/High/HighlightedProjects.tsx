'use client';

import { useEffect, useState } from 'react';

interface Props {
  messages: Record<string, string>;
}

export default function HighlightedProjects({ messages }: Props) {
  const projectKeys = [
    'highlighted.1',
    'highlighted.2',
    'highlighted.3',
    'highlighted.4',
    'highlighted.5',
    'highlighted.6',
  ];

  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenKey(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section
      id="highlighted-projects"
      className="max-w-7xl mx-auto px-4 sm:px-8 py-12"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">
        {messages['highlighted.title']}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center">
        {projectKeys.map((key) => (
          <div
            key={key}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-label={`${messages[`${key}.title`]} - abrir detalhes`}
            onClick={() => setOpenKey(key)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpenKey(key);
              }
            }}
            className="w-60 md:h-60 border border-border rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow ease-out flex flex-col justify-between overflow-hidden bg-card cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-border"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {messages[`${key}.title`]}
              </h3>
              <p className="text-sm line-clamp-4">
                {messages[`${key}.description`]}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm">
              <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 font-medium">
                {messages[`${key}.language`]}
              </span>
              <a
                href={messages[`${key}.link`]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground hover:underline"
              >
                GitHub →
              </a>
            </div>
          </div>
        ))}
      </div>

      {openKey && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-stretch justify-stretch">
          <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" onClick={() => setOpenKey(null)} />
          <div className="relative z-10 w-full h-full bg-card">
            <div className="sticky top-0 flex items-start justify-between p-4 border-b border-border bg-card">
              <h3 className="text-xl font-semibold">{messages[`${openKey}.title`]}</h3>
              <button
                onClick={() => setOpenKey(null)}
                className="px-3 py-1 rounded text-muted hover:text-foreground"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <div className="p-4 h-[calc(100%-56px)] overflow-y-auto">
              <div className="mx-auto max-w-3xl space-y-4">
                <p className="text-sm text-muted"><strong>{messages[`${openKey}.language`]}</strong></p>
                <div>
                  <p className="text-base leading-relaxed whitespace-pre-line">
                    {messages[`${openKey}.details`] ?? messages[`${openKey}.description`]}
                  </p>
                </div>
                <div>
                  <a
                    href={messages[`${openKey}.link`]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted hover:text-foreground underline"
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
