import { ProjectConfig } from './github';

export const projectsConfig: Record<string, ProjectConfig> = {
  'upload-AI': {
    repoName: 'upload-AI',
    title: 'upload-AI',
    role: 'Full-Stack Developer',
    stack: 'React.js, Node.js, TypeScript, OpenAI',
    desc: 'An application that uses the OpenAI API to automatically generate video descriptions and titles.',
    details: 'Web app that takes a video, generates a transcript and uses prompt templates to create SEO-friendly titles and descriptions via OpenAI. Implemented the upload flow with progress feedback, background processing, and safeguards for timeouts/rate limits.',
  },
  'TransactionsREST-API': {
    repoName: 'TransactionsREST-API',
    title: 'TransactionsREST-API',
    role: 'Full-Stack Developer',
    stack: 'Node.js, TypeScript, Express.js',
    desc: 'A RESTful API for managing financial transactions, with authentication and attributes like amount, type, and title.',
    details: 'REST API for personal finances: create, list and categorize transactions. Input validation and consistent error responses. Scripts and a Docker setup to run the API locally.',
  },
  'challenge-01-nodeJS': {
    repoName: 'challenge-01-nodeJS',
    title: 'challenge-01-nodeJS',
    role: 'Back-End Developer',
    stack: 'Node.js, JavaScript',
    desc: 'Ignite Node.js challenge: building a RESTful API to practice back-end fundamentals using JavaScript.',
    details: 'Educational Node.js challenge: build a REST API from scratch to practice routing, middleware, request validation and persistence.',
  },
};

export const displayedProjects = [
  'upload-AI',
  'TransactionsREST-API',
  'challenge-01-nodeJS',
];
