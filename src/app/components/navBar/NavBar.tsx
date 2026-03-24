'use client';

import LanguageSwitcher from '../LanguageSwitch/LanguageSwitcher';

interface NavBarProps {
  lang: string;
}

export const NavBar = ({ lang }: NavBarProps) => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4 max-w-full">
        {/* Logo */}
        <a href="#" className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
          {lang === 'pt-BR' ? 'RC' : 'RC'}
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="#what-i-build" 
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            {lang === 'pt-BR' ? 'O que Construo' : 'What I Build'}
          </a>
          <a 
            href="#projects" 
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            {lang === 'pt-BR' ? 'Projetos' : 'Projects'}
          </a>
          <a 
            href="#current-focus" 
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            {lang === 'pt-BR' ? 'Foco Atual' : 'Focus'}
          </a>
          <a 
            href="#contact" 
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            {lang === 'pt-BR' ? 'Contato' : 'Contact'}
          </a>
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher />
      </div>

      {/* Mobile Menu */}
      <style jsx>{`
        @media (max-width: 768px) {
          nav {
            padding: 0;
          }
        }
      `}</style>
    </nav>
  );
};
