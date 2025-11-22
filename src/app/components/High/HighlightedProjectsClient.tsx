'use client';

import { useEffect, useState } from 'react';
import type { GitHubRepo } from '@/lib/github';

interface Props {
  messages: Record<string, string>;
  repos: GitHubRepo[];
}

export default function HighlightedProjectsClient({ messages, repos }: Props) {
  const [openRepoName, setOpenRepoName] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenRepoName(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const getGitHubWebUrl = (apiUrl: string): string => {
    return apiUrl.replace('https://api.github.com/repos/', 'https://github.com/');
  };

  const openRepo = repos.find(repo => repo.name === openRepoName);

  const getLanguageColor = (language: string | null): string => {
    const colors: Record<string, string> = {
      'TypeScript': 'bg-blue-100 text-blue-800',
      'JavaScript': 'bg-yellow-100 text-yellow-800',
      'Python': 'bg-blue-900 text-blue-100',
      'React': 'bg-cyan-100 text-cyan-800',
      'Node.js': 'bg-green-100 text-green-800',
      'Flutter': 'bg-purple-100 text-purple-800',
    };
    return colors[language || 'TypeScript'] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section
      id="highlighted-projects"
      className="max-w-7xl mx-auto px-4 sm:px-8 py-10"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">
        {messages['highlighted.title']}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
        {repos.map((repo) => (
          <div
            key={repo.id}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-label={`${repo.name} - abrir detalhes`}
            onClick={() => setOpenRepoName(repo.name)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpenRepoName(repo.name);
              }
            }}
            className="w-full md:w-60 md:h-60 border border-border rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow ease-out flex flex-col justify-between overflow-hidden bg-card cursor-pointer focus-visible:outline-2 focus-visible:outline-border"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {repo.name}
              </h3>
              <p className="text-sm line-clamp-4">
                {repo.description || 'No description'}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4 text-sm">
              <span className={`px-2 py-1 rounded font-medium ${getLanguageColor(repo.language)}`}>
                {repo.language || 'No Language'}
              </span>
              <a
                href={getGitHubWebUrl(repo.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub →
              </a>
            </div>
          </div>
        ))}
      </div>

      {openRepo && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-start justify-center">
          <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" onClick={() => setOpenRepoName(null)} />
          <div className="relative z-10 m-4 w-full max-w-3xl rounded-xl border border-border bg-card shadow-xl">
            <div className="flex items-start justify-between p-4 border-b border-border">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{openRepo.name}</h3>
                <a
                  href={getGitHubWebUrl(openRepo.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  View on GitHub →
                </a>
              </div>
              <button
                onClick={() => setOpenRepoName(null)}
                className="px-3 py-1 rounded text-muted hover:text-foreground ml-2"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-[80vh] overflow-y-auto">
              <p className="text-base leading-relaxed">
                {openRepo.description || 'No description available'}
              </p>
              <div className="flex flex-wrap gap-2 items-center pt-4 border-t border-border">
                <span className={`px-2 py-1 rounded text-sm font-medium ${getLanguageColor(openRepo.language)}`}>
                  {openRepo.language || 'No Language'}
                </span>
                <span className="text-sm text-muted">
                  ⭐ {openRepo.stargazers_count} stars
                </span>
                <span className="text-sm text-muted">
                  🔀 {openRepo.forks_count} forks
                </span>
                <span className="text-sm text-muted">
                  Updated: {new Date(openRepo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
