import { getMessages } from '@/lib/i18n';

interface AboutProps {
 messages: Record<string, string>;
}

export default async function About({ messages }: AboutProps) {

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-8" id="about">
      <h1 className="text-3xl font-bold">{messages['about.title']}</h1>
      <p className="text-lg">{messages['about']}</p>
      <img
        src="profile.jpeg"
        alt="Foto de perfil"
        className="w-64 h-64 rounded-full object-cover shadow-lg border-4 border-gray-100"
      />

    </div>
  );
}
