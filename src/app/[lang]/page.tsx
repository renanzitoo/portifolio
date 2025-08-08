
import { getMessages, Locale } from "@/lib/i18n";
import About from "../components/About/About";
import Projects from "../components/Projects/Projects";
import HighlightedProjects from "../components/High/HighlightedProjects";
import Contact from "../components/Contact/Contact";
import { NavBar } from "../components/navBar/NavBar";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  await getMessages(lang);
  return {
    title: "Renan Costa",
    icons: {
      icon: "/profile.jpeg",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const messages = await getMessages(lang);

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
