'use client';

interface ContactProps {
  messages: Record<string, string>;
}

export default function Contact({ messages }: ContactProps) {
  return (
    <section id="contact" className="px-6 md:px-12 max-w-6xl mx-auto section-padding border-t border-border mb-20">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        <h2 className="text-sm uppercase tracking-[0.2em] text-muted/50 font-semibold">
          {messages['contact.title']}
        </h2>
        
        <div className="space-y-12">
          <p className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-xl">
            {messages['contact.description']}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <a 
              href={`mailto:${messages['contact.email'] === 'Email' ? 'renanzitoo@gmail.com' : messages['contact.email']}`}
              className="text-lg font-medium border-b border-muted/20 hover:border-white pb-1"
            >
              {messages['contact.email']}
            </a>
            <a 
              href="https://linkedin.com/in/renanzitoo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg font-medium border-b border-muted/20 hover:border-white pb-1"
            >
              {messages['contact.linkedin']}
            </a>
            <a 
              href="https://github.com/renanzitoo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg font-medium border-b border-muted/20 hover:border-white pb-1"
            >
              {messages['contact.github']}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
