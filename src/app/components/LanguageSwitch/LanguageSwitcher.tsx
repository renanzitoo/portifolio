'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    const segments = pathname.split('/');
    if (segments[1]) setCurrentLocale(segments[1]);
  }, [pathname]);

  const switchTo = (lang: string) => {
    if (lang === currentLocale) return;
    const segments = pathname.split('/');
    segments[1] = lang;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => switchTo('en')}
        className={`text-xl hover:opacity-100 transition-opacity ${
          currentLocale === 'en' ? 'opacity-100' : 'opacity-50'
        }`}
        aria-label="Switch to English"
      >
        🇺🇸
      </button>
      <button
        onClick={() => switchTo('pt-BR')}
        className={`text-xl hover:opacity-100 transition-opacity ${
          currentLocale === 'pt-BR' ? 'opacity-100' : 'opacity-50'
        }`}
        aria-label="Mudar para Português"
      >
        🇧🇷
      </button>
    </div>
  );
}
