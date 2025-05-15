import { getMessages, Locale, locales, isValidLocale } from "@/lib/i18n";
import About from "../components/About/About";
import Projects from "../components/Projects/Projects";
import HighlightedProjects from "../components/High/HighlightedProjects";
import Contact from "../components/Contact/Contact";
import { NavBar } from "../components/navBar/NavBar";
import type { Metadata, ResolvingMetadata } from "next";

// Tipos corrigidos
type Props = {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

// Gera as rotas estáticas para cada idioma
export function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

// ✔️ Novo padrão de tipagem
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { lang } = await params;
  const validLang = isValidLocale(lang) ? lang : "en";
  await getMessages(validLang as Locale);
  return {
    title: "Renan Costa",
    icons: { icon: "/profile.jpeg" },
  };
}

// ✔️ Também aqui
export default async function Page({ params }: Props) {
  const { lang } = await params;
  const validLang = isValidLocale(lang) ? lang : "en";
  const messages = await getMessages(validLang as Locale);

  return (
    <>
      <NavBar lang={validLang} />
      <div className="px-4 sm:px-12 lg:px-32 xl:px-12 max-w-4xl mx-auto">
        <About messages={messages} />
        <Projects messages={messages} />
        <HighlightedProjects messages={messages} />
        <Contact messages={messages} />
      </div>
    </>
  );
}
