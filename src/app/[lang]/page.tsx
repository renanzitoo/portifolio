import { getMessages, Locale } from "@/lib/i18n";
import Hero from "../components/Hero/Hero";
import FeaturedProjects from "../components/FeaturedProjects/FeaturedProjects";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  await getMessages(lang);
  return {
    title: "Renan Costa - Technical Founder & Full-Stack Engineer",
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
    <main className="bg-background text-foreground selection:bg-foreground selection:text-background">
      <Hero messages={messages} />
      <FeaturedProjects messages={messages} />
      <About messages={messages} />
      <Contact messages={messages} />
    </main>
  );
}
