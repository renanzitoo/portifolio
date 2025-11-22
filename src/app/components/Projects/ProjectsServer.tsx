import { getGitHubReposByNames } from '@/lib/github';
import { displayedProjects, projectsConfig } from '@/lib/projectsConfig';
import ProjectsClient from './ProjectsClient';

interface Props {
  messages: Record<string, string>;
}

export default async function ProjectsServer({ messages }: Props) {
  // Fetch repositories from GitHub
  let repos = await getGitHubReposByNames(displayedProjects);

  // If fetch fails, fall back to empty array or use message placeholders
  if (repos.length === 0) {
    console.warn('Could not fetch repositories from GitHub, falling back to configured data');
  }

  // Merge GitHub data with configured data
  const projectsData = displayedProjects.map((repoName, index) => {
    const config = projectsConfig[repoName];
    const repo = repos.find(r => r.name === repoName);

    return {
      id: index + 1,
      ...config,
      gitHubUrl: repo?.url || `https://github.com/renanzitoo/${repoName}`,
      stars: repo?.stargazers_count || 0,
      forks: repo?.forks_count || 0,
      updatedAt: repo?.updated_at || new Date().toISOString(),
    };
  });

  return <ProjectsClient messages={messages} projects={projectsData} />;
}
