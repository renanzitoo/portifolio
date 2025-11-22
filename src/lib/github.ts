export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
}

export interface ProjectConfig {
  repoName: string;
  title: string;
  role: string;
  stack: string;
  desc: string;
  details: string;
}

const GITHUB_API = 'https://api.github.com';
const GITHUB_USERNAME = 'renanzitoo';

export async function fetchGitHubRepos(limit: number = 10): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&order=desc&per_page=${limit}&type=owner`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const repos: GitHubRepo[] = await response.json();
    return repos.filter(repo => !repo.name.startsWith('.'));
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    return [];
  }
}

export async function getGitHubRepo(repoName: string): Promise<GitHubRepo | null> {
  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch repo ${repoName}:`, error);
    return null;
  }
}

export async function getGitHubReposByNames(repoNames: string[]): Promise<GitHubRepo[]> {
  const repos = await Promise.all(
    repoNames.map(name => getGitHubRepo(name))
  );
  return repos.filter((repo): repo is GitHubRepo => repo !== null);
}

export async function getLatestRepositories(limit: number = 6): Promise<GitHubRepo[]> {
  const repos = await fetchGitHubRepos(limit + 5);
  return repos.slice(0, limit);
}
