'use client';

import { Mail, Github, Linkedin } from 'lucide-react';

interface Props {
  messages: Record<string, string>;
}

export default function Contact({ messages }: Props) {
  return (
    <section
      id="contact"
      className="py-16 md:py-20 px-4 bg-slate-900 dark:bg-slate-950 text-white"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          {messages['contact.title']}
        </h2>
        
        <p className="text-lg text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          {messages['contact.description']}
        </p>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <a
            href={`mailto:${messages['contact.email']}`}
            className="group p-6 bg-slate-800 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
          >
            <Mail className="w-8 h-8 mx-auto mb-3 group-hover:text-white" />
            <p className="font-semibold mb-1">Email</p>
            <p className="text-sm text-gray-300 group-hover:text-white">{messages['contact.email']}</p>
          </a>

          <a
            href={messages['contact.github']}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-slate-800 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
          >
            <Github className="w-8 h-8 mx-auto mb-3 group-hover:text-white" />
            <p className="font-semibold mb-1">GitHub</p>
            <p className="text-sm text-gray-300 group-hover:text-white">@renanzitoo</p>
          </a>

          <a
            href={messages['contact.linkedin']}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-slate-800 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
          >
            <Linkedin className="w-8 h-8 mx-auto mb-3 group-hover:text-white" />
            <p className="font-semibold mb-1">LinkedIn</p>
            <p className="text-sm text-gray-300 group-hover:text-white">@renanzitoo</p>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-slate-700">
          <p className="text-sm text-gray-400">
            © 2024 Renan Costa. Built with React, Next.js & TypeScript.
          </p>
        </div>
      </div>
    </section>
  );
}
