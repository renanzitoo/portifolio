import { Locale } from "./i18n";

export type BlogSlug = "start-here" | "inside-the-machine" | "resume-optimizer";

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
      "resume-optimizer": {
        slug: "resume-optimizer",
        publishedAt: "2026-06-21",
        date: "June 21, 2026",
        readingTime: "8 min read",
        tags: ["AI", "Backend", "NodeJS", "Puppeteer"],
        title: "Real-Time Resume Optimization: How I Built a Telegram Bot Using LLMs and Puppeteer",
        summary:
          "An analysis of event-driven architecture, separation of concerns, and API cost optimization using DeepSeek-v4-Flash and OpenRouter.",
        eyebrow: "Engineering journal",
        content: [
          "If you are actively searching for an internship or job in tech, you have definitely run into the feared Applicant Tracking System (ATS). These automated recruitment systems filter resumes using algorithms for keyword matching and semantic alignment.",
          "For a student or junior professional, this creates an exhausting dilemma: either you manually adapt your resume for every single job opening, or your profile risks being discarded before a human even reads it. To automate this process in a practical way, I built a real-time, event-driven Telegram bot. It ingests a job description, semantically aligns a master JSON resume using AI, and outputs a high-quality PDF using a headless browser.",
          "The project is structured with a clear separation of concerns in TypeScript and Node.js. The configuration layer initializes the APIs (Telegraf for Telegram and the integration with the OpenRouter gateway) and manages credentials. The AI service interfaces with the model and validates the output JSON structure, while the PDF service manages the Puppeteer lifecycle and compiles HTML/CSS templates into PDFs. We keep personal data stored locally in a gitignored file to secure personal information.",
          "Since Telegram is a stateless interface, the bot manages session progress using a temporary in-memory map. When the job description is received, the bot stores it and prompts the user to select their desired language. The AI service then builds a prompt containing the original resume and the job description, instructing the model to act as an experienced recruiter by analyzing keywords and rewriting professional achievements using the STAR method (Situation, Task, Action, Result).",
          "The adapted JSON generated by the model is injected into an HTML template and compiled into a PDF. The main performance bottleneck in this flow is browser startup. To solve this, we implemented the Singleton design pattern in the PDF service. A single Puppeteer browser is instantiated when the server starts, and each request only opens lightweight tabs that close immediately after compilation, preventing memory leaks and high CPU consumption.",
          "A crucial aspect of developing AI projects under a student budget is the API consumption cost. Robust proprietary models like OpenAI's GPT-4o or Anthropic's Claude 3.5 Sonnet get expensive at scale. For this reason, we used the OpenRouter API to connect to the DeepSeek-v4-Flash model, which offers excellent semantic writing quality and structure adherence for an extremely reduced price.",
          "Calculating the cost of a single run with a standard input resume and the generated response, we estimate the usage of about 4,000 input tokens and 1,500 output tokens. While processing this resume using GPT-4o would cost about 2.5 cents per run, the same process running on DeepSeek-v4-Flash costs approximately 0.06 cents. This represents a 97.6% savings. For anyone adapting resumes for dozens or hundreds of job postings, the financial difference is massive.",
          "The bot's architecture also brought key learnings about engineering trade-offs. Choosing in-memory sessions avoided the latency and costs of a database infrastructure for sessions that only last a few seconds. Similarly, selecting Puppeteer with HTML/CSS templates, despite increasing the deployment image size, allowed flexibility and speed in styling that native PDF engines like PDFKit would make very tedious.",
          "Building this bot proved that modern development with artificial intelligence requires much more than knowing how to write prompts. Structuring asynchronous event-driven systems, reusing heavy server connections and resources, and carefully evaluating API costs are the real foundations for building sustainable solutions.",
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
      "resume-optimizer": {
        slug: "resume-optimizer",
        publishedAt: "2026-06-21",
        date: "21 de junho de 2026",
        readingTime: "8 min de leitura",
        tags: ["IA", "Backend", "NodeJS", "Puppeteer"],
        title: "Otimizando o Currículo em Tempo Real: Como Criei um Bot no Telegram com LLMs e Puppeteer",
        summary:
          "Uma análise sobre arquitetura orientada a eventos, separação de conceitos e otimização de custos usando DeepSeek-v4-Flash e OpenRouter.",
        eyebrow: "Diário de engenharia",
        content: [
          "Se você está ativamente procurando uma vaga de estágio ou emprego na área de tecnologia, certamente já se deparou com o temido ATS (Applicant Tracking System). Esses sistemas de recrutamento automatizados filtram currículos usando algoritmos de correspondência de palavras-chave e alinhamento semântico.",
          "Para um estudante ou profissional júnior, isso cria um dilema exaustivo: ou você adapta manualmente o seu currículo para cada vaga, ou seu perfil corre o risco de ser descartado antes mesmo de um humano lê-lo. Para resolver esse problema de forma automatizada e prática, desenvolvi um bot no Telegram em tempo real e orientado a eventos que recebe a descrição de uma vaga de emprego, alinha semanticamente um currículo base em formato JSON usando inteligência artificial e gera um arquivo PDF de alta qualidade usando um navegador headless.",
          "O projeto foi estruturado com uma separação clara de responsabilidades em TypeScript e Node.js. A camada de configurações inicializa as APIs (Telegraf para o Telegram e a integração com o gateway OpenRouter) e gerencia as credenciais. O serviço de IA interfaceia com o modelo e valida a estrutura do JSON de saída, enquanto o serviço de PDF gerencia o ciclo de vida do Puppeteer e compila templates HTML/CSS para PDF. Mantemos os dados pessoais salvos localmente em um arquivo separado e ignorado pelo Git, garantindo a segurança das informações.",
          "Como o Telegram é uma interface sem estado, o bot gerencia o progresso através de um mapa de sessões temporário na memória do servidor. Quando a descrição da vaga é recebida, o bot registra a informação e solicita que o usuário selecione o idioma desejado. A partir disso, o serviço de IA monta um prompt contendo o currículo original e a descrição da vaga, instruindo o modelo a atuar como um recrutador experiente: analisando palavras-chave e reescrevendo as realizações profissionais usando o método STAR (Situação, Tarefa, Ação e Resultado).",
          "O JSON adaptado gerado pelo modelo é injetado em um template HTML e compilado para PDF. O grande gargalo de performance nesse fluxo é a inicialização do navegador. Para solucionar isso, implementamos o padrão de projeto Singleton no serviço de PDF. Um único navegador Puppeteer é instanciado ao iniciar o servidor, e cada requisição abre apenas abas leves que são fechadas imediatamente após a compilação, o que evita vazamentos de memória e alto consumo de CPU.",
          "Um ponto crucial do desenvolvimento de projetos desse tipo sob um orçamento estudantil é o custo da API de IA. Modelos proprietários robustos como o GPT-4o da OpenAI ou o Claude 3.5 Sonnet da Anthropic custam caro em escala. Por isso, utilizamos a API do OpenRouter para conectar ao modelo DeepSeek-v4-Flash, que oferece excelente qualidade de escrita semântica e adesão à estrutura de JSON esperada por um preço extremamente reduzido.",
          "Fazendo as contas para uma única execução com um currículo de entrada padrão e a resposta gerada, estimamos o consumo de cerca de 4.000 tokens de entrada e 1.500 de saída. Enquanto processar esse currículo usando o GPT-4o custaria cerca de 2.5 centavos de dólar por execução, o mesmo processo rodando no DeepSeek-v4-Flash custa aproximadamente 0.06 centavos de dólar. Isso representa uma economia de 97.6%. Para quem está adaptando currículos para dezenas ou centenas de vagas, a diferença financeira é brutal.",
          "A arquitetura do bot também trouxe importantes aprendizados sobre trade-offs de engenharia. Optar por sessões em memória evitou a latência e custos de uma infraestrutura de banco de dados para sessões que duram poucos segundos. Da mesma forma, escolher o Puppeteer com templates em HTML e CSS, apesar de aumentar o tamanho da imagem de implantação, permitiu flexibilidade e agilidade na estilização que motores nativos de PDF como o PDFKit tornariam muito difíceis.",
          "A criação desse bot demonstrou que o desenvolvimento de sistemas modernos com inteligência artificial exige muito mais do que saber criar prompts. Estruturar sistemas assíncronos orientados a eventos, reutilizar conexões e recursos pesados de servidor e avaliar friamente os custos de API são as verdadeiras bases para construir soluções sustentáveis.",
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
