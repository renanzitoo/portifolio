'use client';

import { Mail, Github, Linkedin } from 'lucide-react';

interface Props {
  messages: Record<string, string>;
}

export default function Contact({ messages }: Props) {
  return (
    <section
      id="contact"
      className="max-w-4xl mx-auto px-4 sm:px-8 py-16 flex flex-col items-center gap-6 mt-20"
    >
      <h2 className="text-3xl font-bold text-center">
        {messages['contact.title']}
      </h2>
      <p className="text-center text-muted max-w-xl">
        {messages['contact.description']}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
        <a
          href="mailto:renan.costa2098@gmail.com"
          className="flex items-center gap-2 text-muted hover:text-foreground hover:underline"
        >
          <Mail className="w-5 h-5" />
          renan.costa2098@gmail.com
        </a>

        <a
          href="https://github.com/renanzitoo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted hover:text-foreground hover:underline"
        >
          <Github className="w-5 h-5" />
          github.com/renanzitoo
        </a>

        <a
          href="https://www.linkedin.com/in/renanzitoo/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted hover:text-foreground hover:underline"
        >
          <Linkedin className="w-5 h-5" />
          linkedin.com/in/renanzitoo
        </a>
      </div>
    </section>
  );
}
