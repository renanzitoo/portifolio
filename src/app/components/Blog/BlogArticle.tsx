import Link from "next/link";
import { BlogPost } from "@/lib/blog";

type BlogArticleProps = {
  lang: "en" | "pt-BR";
  post: BlogPost;
  backLabel: string;
};

function renderInline(text: string): React.ReactNode {
  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let keyIdx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    const linkText = match[2];
    const linkUrl = match[3];
    const boldText = match[4];
    const italicText = match[5];
    const codeText = match[6];

    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    if (linkText && linkUrl) {
      const isExternal = linkUrl.startsWith("http://") || linkUrl.startsWith("https://");
      if (isExternal) {
        parts.push(
          <a
            key={`link-${keyIdx++}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline font-semibold"
          >
            {renderInline(linkText)}
          </a>
        );
      } else {
        parts.push(
          <Link
            key={`link-${keyIdx++}`}
            href={linkUrl}
            className="text-foreground hover:underline font-semibold"
          >
            {renderInline(linkText)}
          </Link>
        );
      }
    } else if (boldText) {
      parts.push(
        <strong key={`bold-${keyIdx++}`} className="font-semibold text-foreground">
          {renderInline(boldText)}
        </strong>
      );
    } else if (italicText) {
      parts.push(
        <em key={`italic-${keyIdx++}`} className="italic text-foreground/90">
          {renderInline(italicText)}
        </em>
      );
    } else if (codeText) {
      parts.push(
        <code key={`code-${keyIdx++}`} className="rounded bg-neutral-900/80 px-1.5 py-0.5 font-mono text-sm text-foreground border border-border/40">
          {codeText}
        </code>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
}

function parseMarkdown(content: string[]): React.ReactNode[] {
  const fullText = content.join('\n\n');
  const lines = fullText.split('\n');
  const elements: React.ReactNode[] = [];
  
  let currentParagraphLines: string[] = [];
  let currentList: { type: 'bullet' | 'number'; items: string[] } | null = null;
  let currentCodeBlock: { lang: string; lines: string[] } | null = null;

  const flushParagraph = (keyIdx: string | number) => {
    if (currentParagraphLines.length > 0) {
      const text = currentParagraphLines.join(' ');
      if (text.trim() === '---') {
        elements.push(<hr key={`hr-${keyIdx}`} className="my-8 border-border" />);
      } else {
        elements.push(
          <p key={`p-${keyIdx}`} className="text-lg leading-8 text-muted md:text-xl md:leading-9">
            {renderInline(text)}
          </p>
        );
      }
      currentParagraphLines = [];
    }
  };

  const flushList = (keyIdx: string | number) => {
    if (currentList) {
      const { type, items } = currentList;
      const listClass = type === 'bullet'
        ? "list-disc pl-6 space-y-2 text-lg leading-8 text-muted md:text-xl md:leading-9 my-4"
        : "list-decimal pl-6 space-y-2 text-lg leading-8 text-muted md:text-xl md:leading-9 my-4";
      const Tag = type === 'bullet' ? 'ul' : 'ol';
      elements.push(
        <Tag key={`list-${keyIdx}`} className={listClass}>
          {items.map((item, idx) => (
            <li key={idx} className="pl-1">
              {renderInline(item)}
            </li>
          ))}
        </Tag>
      );
      currentList = null;
    }
  };

  const flushCode = (keyIdx: string | number) => {
    if (currentCodeBlock) {
      const { lang, lines } = currentCodeBlock;
      const code = lines.join('\n');
      elements.push(
        <div key={`code-${keyIdx}`} className="my-6 overflow-hidden rounded-xl border border-border/70 bg-neutral-950/95 font-mono shadow-lg">
          {lang && (
            <div className="flex items-center justify-between border-b border-border/40 bg-neutral-900/50 px-4 py-2.5 text-xs font-mono text-muted/65 uppercase tracking-widest">
              <span>{lang}</span>
            </div>
          )}
          <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-neutral-200">
            <code>{code}</code>
          </pre>
        </div>
      );
      currentCodeBlock = null;
    }
  };

  const flushAll = (keyIdx: string | number) => {
    flushParagraph(keyIdx);
    flushList(keyIdx);
    flushCode(keyIdx);
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (currentCodeBlock) {
      if (trimmed.startsWith('```')) {
        flushCode(i);
      } else {
        currentCodeBlock.lines.push(line);
      }
      continue;
    }

    if (trimmed.startsWith('```')) {
      flushAll(i);
      const lang = trimmed.substring(3).trim();
      currentCodeBlock = { lang, lines: [] };
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushAll(i);
      const title = trimmed.substring(4);
      elements.push(
        <h4 key={`h4-${i}`} className="text-2xl font-bold tracking-tight text-foreground pt-4 mt-6">
          {renderInline(title)}
        </h4>
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushAll(i);
      const title = trimmed.substring(3);
      elements.push(
        <h3 key={`h3-${i}`} className="text-3xl font-bold tracking-tight text-foreground pt-6 mt-8 border-b border-border/30 pb-2">
          {renderInline(title)}
        </h3>
      );
      continue;
    }

    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      flushAll(i);
      const alt = imgMatch[1];
      const src = imgMatch[2];
      elements.push(
        <figure key={`img-${i}`} className="my-8 flex flex-col items-center justify-center space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="w-full rounded-xl border border-border bg-neutral-950/20 shadow-md md:max-w-3xl transition-transform hover:scale-[1.01]"
          />
          {alt && (
            <figcaption className="text-center text-xs text-muted/60 tracking-wider uppercase font-mono">
              {alt}
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    const bulletMatch = line.match(/^(\s*)([\*\-])\s+(.*)$/);
    const numberMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/);

    if (bulletMatch) {
      flushParagraph(i);
      const content = bulletMatch[3];
      if (currentList && currentList.type === 'bullet') {
        currentList.items.push(content);
      } else {
        flushList(i);
        currentList = { type: 'bullet', items: [content] };
      }
      continue;
    }

    if (numberMatch) {
      flushParagraph(i);
      const content = numberMatch[3];
      if (currentList && currentList.type === 'number') {
        currentList.items.push(content);
      } else {
        flushList(i);
        currentList = { type: 'number', items: [content] };
      }
      continue;
    }

    if (trimmed === '') {
      flushAll(i);
      continue;
    }

    flushList(i);
    currentParagraphLines.push(line);
  }

  flushAll('end');

  return elements;
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

      <div className="space-y-6 border-t border-border pt-10">
        {parseMarkdown(post.content)}
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
