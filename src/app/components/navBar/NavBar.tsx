'use client';

import LanguageSwitcher from '../LanguageSwitch/LanguageSwitcher';

interface NavBarProps {
  lang: string;
}

export const NavBar = ({ lang }: NavBarProps) => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 p-4 border-b border-gray-300 w-full">
      <div className="flex items-center justify-between w-full max-w-4xl">
        <h1 className="text-lg font-semibold">
          {lang === 'pt-BR' ? 'Renan Costa - Engenheiro de Computação' : 'Renan Costa - Computer Engineering'}
        </h1>

        <div className="flex items-center gap-6">
          <a href="#about" className="text-blue-500 hover:underline">
            {lang === 'pt-BR' ? 'Sobre' : 'About'}
          </a>
          <a href="#projects" className="text-blue-500 hover:underline">
            {lang === 'pt-BR' ? 'Projetos' : 'Projects'}
          </a>
          <a href="#contact" className="text-blue-500 hover:underline">
            {lang === 'pt-BR' ? 'Contato' : 'Contact'}
          </a>

          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};
