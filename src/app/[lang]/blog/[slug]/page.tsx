import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/app/components/Blog/BlogArticle";
import BlogShell from "@/app/components/Blog/BlogShell";
import { getBlogCopy, getBlogPost } from "@/lib/blog";
import { Locale } from "@/lib/i18n";

const localeConfig: Record<Locale, { locale: string }> = {
  en: { locale: "en_US" },
  "pt-BR": { locale: "pt_BR" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getBlogPost(lang, slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: {
        "en-US": `/en/blog/${slug}`,
        "pt-BR": `/pt-BR/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/${lang}/blog/${slug}`, 
      locale: localeConfig[lang].locale,
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const copy = getBlogCopy(lang);
  const post = getBlogPost(lang, slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogShell
      lang={lang}
      title={copy.title}
      description={copy.description}
      homeLabel={copy.homeLink}
      backLabel={copy.backLabel}
    >
      <BlogArticle lang={lang} post={post} backLabel={copy.backLabel} />
    </BlogShell>
  );
}
