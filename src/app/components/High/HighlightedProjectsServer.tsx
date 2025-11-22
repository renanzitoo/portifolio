import { getLatestRepositories } from '@/lib/github';
import HighlightedProjectsClient from './HighlightedProjectsClient';

interface Props {
  messages: Record<string, string>;
}

export default async function HighlightedProjectsServer({ messages }: Props) {
  const repos = await getLatestRepositories(6);

  return <HighlightedProjectsClient messages={messages} repos={repos} />;
}
