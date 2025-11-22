import HighlightedProjectsServer from './HighlightedProjectsServer';

interface Props {
  messages: Record<string, string>;
}

export default function HighlightedProjects({ messages }: Props) {
  return <HighlightedProjectsServer messages={messages} />;
}
