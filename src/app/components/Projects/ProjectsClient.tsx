'use client';

import { useEffect, useState } from 'react';

interface Project {
  id: number;
  repoName: string;
  title: string;
  role: string;
  stack: string;
  desc: string;
  details: string;
  gitHubUrl: string;
  stars: number;
  forks: number;
  updatedAt: string;
}

interface Props {
  messages: Record<string, string>;
  projects: Project[];
}

export default function ProjectsClient({ messages, projects }: Props) {
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

  const openProject = projects.find(p => p.id === openProjectId);

  return (
    <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        {messages['projects.title']}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
        {projects.map((project) => (
          <div
            key={project.id}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-label={`${project.title} - abrir detalhes`}
            onClick={() => setOpenProjectId(project.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpenProjectId(project.id);
              }
            }}
            className="w-full md:w-60 md:h-60 border border-border rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow ease-out flex flex-col justify-between overflow-hidden bg-card cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-border"
          >
            <div>
              <h3 className="text-lg font-semibold mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-muted mb-1">
                <strong>{project.role}</strong>
              </p>
              <p className="text-sm text-muted mb-2">
                <strong>{project.stack}</strong>
              </p>
              <p className="text-sm line-clamp-3">
                {project.desc}
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-muted mt-2">
              <span>⭐ {project.stars}</span>
              <span>🔀 {project.forks}</span>
            </div>
          </div>
        ))}
      </div>

      {openProject && (
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
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">
                  {openProject.title}
                </h3>
                <a
                  href={openProject.gitHubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  View on GitHub →
                </a>
              </div>
              <button
                onClick={() => setOpenProjectId(null)}
                className="px-3 py-1 rounded text-muted hover:text-foreground ml-2 flex-shrink-0"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-[80vh] overflow-y-auto">
              <p className="text-sm text-muted">
                <strong>{openProject.role}</strong>
              </p>
              <p className="text-sm text-muted">
                <strong>{openProject.stack}</strong>
              </p>
              <div>
                <p className="text-base leading-relaxed whitespace-pre-line">
                  {openProject.details}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted pt-4 border-t border-border">
                <span>⭐ {openProject.stars} stars</span>
                <span>🔀 {openProject.forks} forks</span>
                <span>Updated: {new Date(openProject.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
