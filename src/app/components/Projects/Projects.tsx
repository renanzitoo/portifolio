'use client';

interface Props {
  messages: Record<string, string>;
}

export default function Projects({ messages }: Props) {
  return (
    <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        {messages['projects.title']}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 justify-items-center">

        {[1, 2, 3].map((i) => (
          <div
          key={i}
          className="w-full md:w-60 md:h-60 border border-gray-300 rounded-xl p-4 shadow-md hover:shadow-lg transition flex flex-col justify-between overflow-hidden"
        >
          <div>
            <h3 className="text-lg font-semibold mb-1">
              {messages[`projects.${i}.title`]}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              <strong>{messages[`projects.${i}.role`]}</strong>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>{messages[`projects.${i}.stack`]}</strong>
            </p>
            <p className="text-gray-700 text-sm line-clamp-3">
              {messages[`projects.${i}.desc`]}
            </p>
          </div>
        </div>
        
        ))}
      </div>
    </section>
  );
}
