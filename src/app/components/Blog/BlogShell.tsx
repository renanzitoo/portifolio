import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitch/LanguageSwitcher";

type BlogShellProps = {
  lang: "en" | "pt-BR";
  title: string;
  description: string;
  intro?: string;
  homeLabel: string;
  backLabel?: string;
  children: React.ReactNode;
};

export default function BlogShell({
  lang,
  title,
  description,
  intro,
  homeLabel,
  backLabel,
  children,
}: BlogShellProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 md:px-12 lg:px-16">
        <header className="flex flex-col gap-8 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-5 max-w-3xl">
            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.25em] text-muted/60">
              <Link href={`/${lang}`} className="hover:text-foreground">
                {homeLabel}
              </Link>
              <span className="text-muted/30">/</span>
              <span>Blog</span>
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.24em] text-muted/50">
                {backLabel ?? ""}
              </p>
              <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
                {title}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted">
                {description}
              </p>
              {intro ? (
                <p className="max-w-2xl text-base leading-relaxed text-muted/70">
                  {intro}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 md:flex-col md:items-end md:justify-start">
            <LanguageSwitcher />
            <div className="text-xs uppercase tracking-[0.24em] text-muted/40">
              {lang === "en" ? "English" : "Portuguese"}
            </div>
          </div>
        </header>

        <section className="flex-1 py-10 md:py-14">{children}</section>
      </div>
    </main>
  );
}
