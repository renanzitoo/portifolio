'use client';

interface FeaturedProjectsProps {
  messages: Record<string, string>;
}

export default function FeaturedProjects({ messages }: FeaturedProjectsProps) {
  const projectIndices = [1, 2, 3, 4];

  return (
    <section id="projects" className="px-6 md:px-12 max-w-6xl mx-auto section-padding border-t border-border">
      <div className="space-y-16">
        <h2 className="text-sm uppercase tracking-[0.2em] text-muted/50 font-semibold">
          {messages['projects.title']}
        </h2>

        <div className="space-y-24">
          {projectIndices.map((i) => (
            <div
              key={i}
              className="group border-b border-border pb-12 last:border-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-baseline">
                <div className="space-y-1">
                  <p className="text-sm font-mono text-muted/50">
                    {messages[`projects.${i}.context`]}
                  </p>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                    {messages[`projects.${i}.title`]}
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-muted leading-snug max-w-xl">
                    {messages[`projects.${i}.desc`]}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:gap-12 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-widest text-muted/40 font-bold">Impact</p>
                      <p className="text-lg font-medium">{messages[`projects.${i}.impact`]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
