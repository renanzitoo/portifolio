'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  const switchTo = (lang: string) => {
    if (lang === currentLocale) return;
    const segments = pathname.split('/');
    segments[1] = lang;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex gap-4 text-xs font-mono tracking-widest uppercase">
      <button
        onClick={() => switchTo('en')}
        className={`${currentLocale === 'en' ? 'text-white' : 'text-muted/40'} hover:text-white transition-colors`}
      >
        EN
      </button>
      <span className="text-muted/20">/</span>
      <button
        onClick={() => switchTo('pt-BR')}
        className={`${currentLocale === 'pt-BR' ? 'text-white' : 'text-muted/40'} hover:text-white transition-colors`}
      >
        PT
      </button>
    </div>
  );
}
