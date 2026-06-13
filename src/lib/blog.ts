import { Locale } from "./i18n";

export type BlogSlug = "start-here" | "inside-the-machine";

export type BlogPost = {
  slug: BlogSlug;
  publishedAt: string;
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
        publishedAt: "2026-06-10",
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
      "inside-the-machine": {
        slug: "inside-the-machine",
        publishedAt: "2026-06-12",
        date: "June 12, 2026",
        readingTime: "6 min read",
        tags: ["Backend", "Systems", "Events"],
        title: "Inside the machine: what I learned on an Amazon site visit",
        summary:
          "A technical visit to an Amazon distribution center made backend ideas feel physical: random storage, optimized picking routes, event-driven flows, and real-time decisions.",
        eyebrow: "Field notes",
        content: [
          "When we buy something online, the 'Buy' button looks like magic. What happens behind it is a carefully orchestrated mix of software, hardware, and people. During a technical visit to an Amazon distribution center, I kept mentally translating everything I saw into backend concepts.",
          "What looks like a huge noisy warehouse is, from a developer's point of view, the physical frontend of a massive distributed system running at very high performance.",
          "The first thing that stood out was random stow: instead of organizing items by obvious categories, the system records the exact location of each product in the warehouse. That is a lot like a key-value mapping or a highly optimized index, where the important part is knowing the precise address of the item, not the visual order around it.",
          "The picker flow was another example of optimization made visible. The worker receives a picking list on a handheld terminal, the backend computes the best route through the warehouse, and the operator follows that path while collecting the products for each order. It is a real-world graph problem paying back time at scale.",
          "Once the items move to the conveyor belts, the backend mindset becomes even more obvious. This kind of operation cannot rely on synchronous requests or a monolith waiting on every step. It needs event-driven architecture, queues, sensors, and fast consumers reacting to order-approved, package-scanned, and route-change events in near real time.",
          "The most impressive part was watching software meet physics. When a scanner reads a box in motion, the system has milliseconds to decide where that package should go. If the response is late, the parcel keeps moving. That makes latency, resilience, and load balancing feel very concrete, because now they are not just abstractions in code, but constraints in the real world.",
          "Leaving the building, I felt that Amazon is not just a retail giant. It is also a software and data engineering machine applied to the physical world. Every conveyor, every scan, and every route is powered by code focused on availability, concurrency, and efficiency.",
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
        publishedAt: "2026-06-10",
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
      "inside-the-machine": {
        slug: "inside-the-machine",
        publishedAt: "2026-06-12",
        date: "12 de junho de 2026",
        readingTime: "6 min de leitura",
        tags: ["Backend", "Sistemas", "Eventos"],
        title: "Por dentro da engrenagem: o que aprendi na minha visita técnica à Amazon",
        summary:
          "Uma visita técnica a um Centro de Distribuição da Amazon fez várias ideias de backend ganharem forma física: armazenamento aleatório, rotas otimizadas, eventos e decisões em tempo real.",
        eyebrow: "Anotações de campo",
        content: [
          "Quando compramos algo na internet, o clique no botão 'Comprar' parece mágica. Mas o que acontece nos bastidores é uma sinfonia perfeitamente orquestrada de software, hardware e pessoas. Durante uma visita técnica a um Centro de Distribuição da Amazon, eu fiquei traduzindo mentalmente tudo o que via para conceitos de backend.",
          "O que para muita gente parece só um galpão grande e barulhento é, para quem desenvolve software, o frontend físico de um sistema distribuído massivo rodando em altíssima performance.",
          "A primeira coisa que me chamou atenção foi o random stow: em vez de organizar os itens por categorias óbvias, o sistema registra o endereço exato de cada produto dentro do galpão. Isso lembra uma estrutura key-value ou um índice muito bem otimizado, em que o importante não é a ordem visual, mas saber o endereço preciso do item.",
          "O fluxo dos pickers foi outro exemplo de otimização aplicada na prática. O operador recebe uma lista de coleta em um terminal portátil, o backend calcula a melhor rota dentro do galpão e a pessoa segue esse caminho enquanto separa os produtos de cada pedido. É um problema de grafos saindo do papel e economizando tempo em escala real.",
          "Quando os itens entram nas esteiras rolantes, a mentalidade de backend fica ainda mais evidente. Uma operação dessas não pode depender de chamadas síncronas ou de um monólito esperando cada etapa responder. Ela precisa de arquitetura orientada a eventos, filas, sensores e consumidores rápidos reagindo a eventos de pedido aprovado, pacote escaneado e mudança de rota quase em tempo real.",
          "A parte mais impressionante foi ver software colidindo com física. Quando um scanner lê uma caixa em movimento, o sistema tem milissegundos para decidir para onde aquele pacote deve ir. Se a resposta atrasar, a encomenda continua fisicamente seu caminho. Isso faz latência, resiliência e balanceamento de carga deixarem de ser abstrações e virarem restrições do mundo real.",
          "Saindo de lá, ficou claro para mim que a Amazon não é só uma gigante do varejo. Ela também é uma máquina de engenharia de software e dados aplicada ao mundo físico. Cada esteira, cada leitura e cada rota são resultado de código focado em disponibilidade, concorrência e eficiência.",
        ],
      },
    },
  },
};

export function getBlogCopy(locale: Locale) {
  return blogCopy[locale];
}

export function getBlogPosts(locale: Locale) {
  return Object.values(blogCopy[locale].posts).sort(
    (left, right) => right.publishedAt.localeCompare(left.publishedAt),
  );
}

export function getBlogPost(locale: Locale, slug: string) {
  return blogCopy[locale].posts[slug as BlogSlug];
}
