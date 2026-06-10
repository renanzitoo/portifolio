import { Locale } from "./i18n";

export type BlogSlug = "start-here";

export type BlogPost = {
  slug: BlogSlug;
  date: string;
  readingTime: string;
  tags: string[];
  title: string;
  summary: string;
  eyebrow: string;
  content: string[];
};

type BlogCopy = {
  title: string;
  description: string;
  intro: string;
  featuredLabel: string;
  allPostsLabel: string;
  emptyState: string;
  homeLink: string;
  backLabel: string;
  posts: Record<BlogSlug, BlogPost>;
};

const blogCopy: Record<Locale, BlogCopy> = {
  en: {
    title: "Blog",
    description:
      "This is where I will publish my articles, notes, and ideas about the things I am building and learning.",
    intro:
      "I want this space to feel like an engineering journal. Here I will document what I build, what I learn, and the day-to-day details of my Computer Engineering journey.",
    featuredLabel: "Featured post",
    allPostsLabel: "All posts",
    emptyState: "No posts published yet.",
    homeLink: "Home",
    backLabel: "Back to blog",
    posts: {
      "start-here": {
        slug: "start-here",
        date: "June 10, 2026",
        readingTime: "4 min read",
        tags: ["Process", "Architecture", "Writing"],
        title: "Starting a more consistent engineering journal",
        summary:
          "From now on I want to document more of what I am doing, so this first post is a small introduction to the kind of things I will share here.",
        eyebrow: "Getting started",
        content: [
          "I have been building a lot of things in the background, but I have not always stopped to write about the process. I want to change that and start documenting more of the work behind the scenes.",
          "The idea is to use this blog as a place to share what I do in my day-to-day Computer Engineering life: experiments, implementations, lessons learned, and the problems I run into while building.",
          "Some posts will be technical, others will be more like notes from the process, but all of them will come from real things I am doing and learning.",
          "This is the starting point. From here on, I want to write more consistently and turn my work into something easier to revisit, reflect on, and share.",
        ],
      },
    },
  },
  "pt-BR": {
    title: "Blog",
    description:
      "Aqui é onde vou publicar meus artigos, minhas anotações e minhas ideias sobre o que eu estiver construindo e aprendendo.",
    intro:
      "Quero que esse espaço funcione como um diário de engenharia. Aqui vou documentar o que eu construo, o que eu aprendo e os detalhes do meu dia a dia na Engenharia de Computação.",
    featuredLabel: "Post em destaque",
    allPostsLabel: "Todos os posts",
    emptyState: "Ainda não há posts publicados.",
    homeLink: "Início",
    backLabel: "Voltar ao blog",
    posts: {
      "start-here": {
        slug: "start-here",
        date: "10 de junho de 2026",
        readingTime: "4 min de leitura",
        tags: ["Processo", "Arquitetura", "Escrita"],
        title: "Começando a documentar de forma mais consistente",
        summary:
          "A partir de agora quero documentar mais as coisas, então esse primeiro post é uma pequena introdução ao tipo de conteúdo que vou compartilhar por aqui.",
        eyebrow: "Primeiros passos",
        content: [
          "Eu tenho construído bastante coisa nos bastidores, mas nem sempre parei para escrever sobre o processo. Quero mudar isso e começar a documentar mais o que acontece no caminho.",
          "A ideia é usar esse blog como um espaço para compartilhar o que eu faço no meu dia a dia na Engenharia de Computação: experimentos, implementações, aprendizados e os problemas que aparecem enquanto eu construo.",
          "Alguns posts vão ser mais técnicos, outros vão parecer mais anotações de processo, mas todos vão sair de coisas reais que eu estive fazendo e aprendendo.",
          "Esse é só o ponto de partida. A partir daqui eu quero escrever com mais consistência e transformar meu trabalho em algo mais fácil de revisitar, refletir e compartilhar.",
        ],
      },
    },
  },
};

export function getBlogCopy(locale: Locale) {
  return blogCopy[locale];
}

export function getBlogPosts(locale: Locale) {
  return Object.values(blogCopy[locale].posts);
}

export function getBlogPost(locale: Locale, slug: string) {
  return blogCopy[locale].posts[slug as BlogSlug];
}
