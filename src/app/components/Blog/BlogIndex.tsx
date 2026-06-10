import Link from "next/link";
import { BlogPost } from "@/lib/blog";

type BlogIndexProps = {
  lang: "en" | "pt-BR";
  posts: BlogPost[];
  allPostsLabel: string;
  emptyState: string;
};

export default function BlogIndex({
  lang,
  posts,
  allPostsLabel,
  emptyState,
}: BlogIndexProps) {
  if (posts.length === 0) {
    return <p className="text-muted">{emptyState}</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm uppercase tracking-[0.24em] text-muted/50">
          {allPostsLabel}
        </h2>
        <span className="text-xs uppercase tracking-[0.22em] text-muted/40">
          {posts.length}
        </span>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group rounded-3xl border border-border bg-white/[0.02] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.04] md:p-8"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted/45">
                  <span>{post.eyebrow}</span>
                  <span className="text-muted/25">•</span>
                  <span>{post.date}</span>
                  <span className="text-muted/25">•</span>
                  <span>{post.readingTime}</span>
                </div>

                <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                  <Link href={`/${lang}/blog/${post.slug}`} className="hover:underline underline-offset-4">
                    {post.title}
                  </Link>
                </h3>

                <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                  {post.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
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
          </article>
        ))}
      </div>
    </div>
  );
}
