import { getMessages, Locale, locales, isValidLocale } from "@/lib/i18n";
import About from "../components/About/About";
import Projects from "../components/Projects/Projects";
import HighlightedProjects from "../components/High/HighlightedProjects";
import Contact from "../components/Contact/Contact";
import { NavBar } from "../components/navBar/NavBar";
import type { Metadata } from "next";

// Gera as rotas estáticas para cada idioma
export function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = isValidLocale(params.lang) ? params.lang : "en";
  await getMessages(lang as Locale); // Opcional, dependendo do seu uso
  return {
    title: "Renan Costa",
    icons: {
      icon: "/profile.jpeg",
    },
  };
}

// ✅ Aqui está o tipo correto — NÃO torne async o tipo
type PageProps = {
  params: {
    lang: string;
  };
};

export default async function Page({ params }: PageProps) {
  const lang = isValidLocale(params.lang) ? params.lang : "en";
  const messages = await getMessages(lang as Locale);

  return (
    <>
      <NavBar lang={lang} />
      <div className="px-4 sm:px-12 lg:px-32 xl:px-12 max-w-4xl mx-auto">
        <About messages={messages} />
        <Projects messages={messages} />
        <HighlightedProjects messages={messages} />
        <Contact messages={messages} />
      </div>
    </>
  );
}
