import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndex from "@/app/components/Blog/BlogIndex";
import BlogShell from "@/app/components/Blog/BlogShell";
import { getBlogCopy, getBlogPosts } from "@/lib/blog";
import { Locale } from "@/lib/i18n";

const localeConfig: Record<Locale, { locale: string }> = {
  en: { locale: "en_US" },
  "pt-BR": { locale: "pt_BR" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const copy = getBlogCopy(lang);

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `/${lang}/blog`,
      languages: {
        "en-US": "/en/blog",
        "pt-BR": "/pt-BR/blog",
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `/${lang}/blog`,
      locale: localeConfig[lang].locale,
      type: "website",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  if (!lang) {
    notFound();
  }

  const copy = getBlogCopy(lang);
  const posts = getBlogPosts(lang);

  return (
    <BlogShell
      lang={lang}
      title={copy.title}
      description={copy.description}
      intro={copy.intro}
      homeLabel={copy.homeLink}
      backLabel={copy.featuredLabel}
    >
      <BlogIndex
        lang={lang}
        posts={posts}
        allPostsLabel={copy.allPostsLabel}
        emptyState={copy.emptyState}
      />
    </BlogShell>
  );
}
