// components/About/About.tsx
import { getMessages } from '@/lib/i18n';

interface AboutProps {
 messages: Record<string, string>;
}

export default async function About({ messages }: AboutProps) {

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-8" id="about">
      <h1 className="text-3xl font-bold">{messages['about.title']}</h1>
      <p className="text-lg">{messages['about']}</p>
      {/*<p className="text-lg">{messages['about.description1']}</p>
      <p className="text-lg">{messages['about.description2']}</p>*/}
      <img
        src="profile.jpeg"
        alt="Foto de perfil"
        className="w-64 h-64 rounded-full object-cover shadow-lg border-4 border-white"
      />

    </div>
  );
}
