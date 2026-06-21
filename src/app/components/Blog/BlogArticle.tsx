import Link from "next/link";
import { BlogPost } from "@/lib/blog";

type BlogArticleProps = {
  lang: "en" | "pt-BR";
  post: BlogPost;
  backLabel: string;
};

function renderContent(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    const [_, linkText, url] = match;

    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    const isExternal = url.startsWith("http://") || url.startsWith("https://");
    if (isExternal) {
      parts.push(
        <a
          key={url + matchIndex}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:underline"
        >
          {linkText}
        </a>
      );
    } else {
      parts.push(
        <Link
          key={url + matchIndex}
          href={url}
          className="text-foreground hover:underline"
        >
          {linkText}
        </Link>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function BlogArticle({ lang, post, backLabel }: BlogArticleProps) {
  return (
    <article className="mx-auto max-w-4xl space-y-12">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted/45">
          <span>{post.eyebrow}</span>
          <span className="text-muted/25">•</span>
          <span>{post.date}</span>
          <span className="text-muted/25">•</span>
          <span>{post.readingTime}</span>
        </div>

        <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
          {post.title}
        </h2>

        <p className="max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
          {post.summary}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-8 border-t border-border pt-10">
        {post.content.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-8 text-muted md:text-xl md:leading-9">
            {renderContent(paragraph)}
          </p>
        ))}
      </div>

      <div className="border-t border-border pt-8">
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-muted/60 hover:text-foreground"
        >
          <span>{backLabel}</span>
        </Link>
      </div>
    </article>
  );
}
