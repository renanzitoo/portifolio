import { getMessages } from "@/lib/i18n";
import { Locale } from "@/lib/i18n";
import About from "../components/About/About";
import Projects from "../components/Projects/Projects";
import HighlightedProjects from "../components/High/HighlightedProjects";
import Contact from "../components/Contact/Contact";

interface Props {
  params: { lang: Locale };
}

export async function generateMetadata({ params }: Props) {
  const messages = await getMessages(params.lang);
  return {
    title: "Renan Costa", 
  };
}

export default async function Page({ params }: Props) {
  const messages = await getMessages(params.lang);

  return (
    <div className="px-4 sm:px-12 lg:px-32 xl:px-12 max-w-4xl mx-auto">
      <About messages={messages} />
      <Projects messages={messages} />
      <HighlightedProjects messages={messages} />
      <Contact messages={messages} />
    </div>
  );
}
