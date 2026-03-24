
import { getMessages, Locale } from "@/lib/i18n";
import Hero from "../components/Hero/Hero";
import WhatIBuild from "../components/WhatIBuild/WhatIBuild";
import FeaturedProjects from "../components/FeaturedProjects/FeaturedProjects";
import CurrentFocus from "../components/CurrentFocus/CurrentFocus";
import TechStack from "../components/TechStack/TechStack";
import CTA from "../components/CTA/CTA";
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
    title: "Renan Costa - Full-Stack Developer",
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
      <Hero messages={messages} />
      <WhatIBuild messages={messages} />
      <FeaturedProjects messages={messages} />
      <CurrentFocus messages={messages} />
      <TechStack messages={messages} />
      <CTA messages={messages} />
      <Contact messages={messages} />
    </>
  );
}
