'use client';

interface AboutProps {
  messages: Record<string, string>;
}

export default function About({ messages }: AboutProps) {
  return (
    <section id="about" className="px-6 md:px-12 max-w-6xl mx-auto section-padding border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        <h2 className="text-sm uppercase tracking-[0.2em] text-muted/50 font-semibold">
          {messages['about.title']}
        </h2>
        <div className="max-w-xl">
          <p className="text-xl md:text-2xl text-muted leading-relaxed">
            {messages['about']}
          </p>
        </div>
      </div>
    </section>
  );
}
