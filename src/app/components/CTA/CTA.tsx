'use client';

interface CTAProps {
  messages: Record<string, string>;
}

export default function CTA({ messages }: CTAProps) {
  return (
    <section id="cta" className="py-20 md:py-28 px-4 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
          {messages['cta.title']}
        </h2>
        
        <p className="text-lg md:text-xl mb-12 opacity-90 animate-fade-in-delay max-w-2xl mx-auto">
          {messages['cta.desc']}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap animate-fade-in-delay-2">
          <a
            href={`mailto:${messages['contact.email']}`}
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {messages['contact.email'] ? 'Email Me' : 'Contact'}
          </a>
          <a
            href={messages['contact.linkedin']}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            LinkedIn
          </a>
          <a
            href={messages['contact.github']}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            GitHub
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fadeIn 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 0.8s ease-out 0.4s both;
        }
      `}</style>
    </section>
  );
}
