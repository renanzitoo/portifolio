import Link from "next/link";
import { BlogPost } from "@/lib/blog";

type BlogArticleProps = {
  lang: "en" | "pt-BR";
  post: BlogPost;
  backLabel: string;
};

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
            {paragraph}
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
