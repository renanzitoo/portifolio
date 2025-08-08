
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
  params: { lang: Locale };
}): Promise<Metadata> {
  const messages = await getMessages(params.lang);
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
  params: { lang: Locale };
}) {
  const messages = await getMessages(params.lang);

  return (
    <>
      <NavBar lang={params.lang} />
      <div className="px-4 sm:px-12 lg:px-32 xl:px-12 max-w-4xl mx-auto">
        <About messages={messages} />
        <Projects messages={messages} />
        <HighlightedProjects messages={messages} />
        <Contact messages={messages} />
      </div>
    </>
  );
}
