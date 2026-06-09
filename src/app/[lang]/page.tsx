import { getMessages, Locale } from "@/lib/i18n";
import Hero from "../components/Hero/Hero";
import FeaturedProjects from "../components/FeaturedProjects/FeaturedProjects";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import type { Metadata } from "next";

const siteName = "Renan Costa";

const localeConfig: Record<Locale, { locale: string; title: string; description: string }> = {
  en: {
    locale: "en_US",
    title: "Renan Costa | Full-Stack & Backend Engineer",
    description:
      "Portfolio of Renan Costa, a Full-Stack and Backend Engineer focused on high-performance systems, AI-driven automation, and scalable B2B products.",
  },
  "pt-BR": {
    locale: "pt_BR",
    title: "Renan Costa | Engenheiro Full-Stack & Backend",
    description:
      "Portfólio de Renan Costa, engenheiro Full-Stack e Backend focado em sistemas de alta performance, automação com IA e produtos B2B escaláveis.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const messages = await getMessages(lang);
  const config = localeConfig[lang];
  const description = messages["hero.subtitle"]
    ? `${messages["hero.subtitle"]} ${messages["hero.description"] ?? ""}`.trim()
    : config.description;

  return {
    title: config.title,
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        "en-US": "/en",
        "pt-BR": "/pt-BR",
      },
    },
    openGraph: {
      title: config.title,
      description,
      url: `/${lang}`,
      siteName,
      locale: config.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description,
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
