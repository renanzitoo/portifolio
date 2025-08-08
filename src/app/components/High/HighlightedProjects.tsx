'use client';

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
            className="w-60 h-60 border border-gray-300 rounded-xl p-4 shadow-md hover:shadow-lg transition flex flex-col justify-between overflow-hidden"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {messages[`${key}.title`]}
              </h3>
              <p className="text-gray-700 text-sm line-clamp-4">
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
                className="text-blue-600 hover:underline"
              >
                GitHub →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
