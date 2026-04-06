'use client';

import LanguageSwitcher from '../LanguageSwitch/LanguageSwitcher';

interface HeroProps {
  messages: Record<string, string>;
}

export default function Hero({ messages }: HeroProps) {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-6xl mx-auto section-padding relative">
      <div className="absolute top-12 right-6 md:right-12">
        <LanguageSwitcher />
      </div>
      
      <div className="space-y-8">
        <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9]">
          {messages['hero.title']}
        </h1>

        <div className="max-w-2xl space-y-6">
          <p className="text-xl md:text-2xl text-muted font-medium leading-tight">
            {messages['hero.subtitle']}
          </p>
          <p className="text-lg md:text-xl text-muted/60 leading-relaxed">
            {messages['hero.description']}
          </p>
        </div>

        <div className="flex gap-8 pt-4">
          <a
            href="#projects"
            className="text-lg font-medium hover:text-muted underline underline-offset-8 decoration-1"
          >
            {messages['hero.cta.primary']}
          </a>
          <a
            href="#contact"
            className="text-lg font-medium hover:text-muted underline underline-offset-8 decoration-1"
          >
            {messages['hero.cta.secondary']}
          </a>
        </div>
      </div>
    </section>
  );
}
