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
          "If you are actively searching for an internship or job in tech, you have definitely run into the feared Applicant Tracking System (ATS). These automated recruitment systems filter resumes using algorithms for keyword matching and semantic alignment with job descriptions. As computer engineering students approaching the job market, we face a dual problem: the ATS filters require tailoring our resume for every single application to highlight relevant experiences, but doing this manually is an exhausting, time-consuming task prone to formatting errors.",
          "To automate this customization pipeline in a practical way, I built a real-time, event-driven Telegram bot. The core architectural idea is to treat the resume as a structured JSON document (the data layer), the job description as unstructured text (the query layer), and the output PDF as a compiled view (the presentation layer). By separating these layers, we create a reproducible, modular compiler that performs semantic translation via AI and layout compilation via Puppeteer.",
          "Following clean software architecture principles, the TypeScript and Node.js project is structured with a clear separation of concerns in the src/ directory. The configurations layer (src/config.ts) handles the initialization of API clients like Telegraf for the Telegram bot and the integration with the OpenRouter gateway, as well as managing environment variables. The service layer is split into src/services/ai.ts, which interfaces with the inference API and manages the system instructions and schemas, and src/services/pdf.ts, which compiles the HTML/CSS templates into PDFs and manages the headless browser lifecycle.",
          "In addition to services, we have a utility layer (src/utils/skills.ts) that takes raw, unstructured tags generated by the LLM and maps them against pre-defined engineering domains such as Languages, Databases, Backend, and DevOps. For data security, personal information is separated into myResume.json and a baseResume.json template. The personal resume details are kept gitignored, protecting Personally Identifiable Information (PII) from entering version control while keeping the application code modular.",
          "Since Telegram is a stateless interface, the bot manages session progress using a temporary in-memory map (userSessions). When the user sends the /adapt [job description] command, the bot saves the description and prompts the user with inline keyboard buttons to choose the target language. This state machine keeps the flow interactive and lightweight without needing a database connection for short-lived sessions.",
          "Once the language callback is triggered, the AI Service builds a prompt containing the user's raw resume data and the job description, instructing the model to behave as an elite recruiter. The model runs a keyword density analysis on the job description and reformulates professional achievements using the STAR method (Situation, Task, Action, Result), injecting metrics and strong action verbs (such as 'optimized database queries... reducing latency by 50%'). Critically, the AI only outputs structured JSON matching the original schema, ensuring we can parse it reliably.",
          "The JSON returned by the AI is then merged back with the base contact details—which the LLM is not allowed to change in order to prevent hallucinations—and sent to the PDF Service. The template is written in HTML/CSS using strict styling rules. To solve the CPU and memory bottleneck of spawning a new browser process for every document, we implemented the Singleton connection pool pattern in pdf.ts. A single Puppeteer browser is lazily instantiated on demand, and each request opens lightweight tabs (browser.newPage()) that close immediately after PDF compilation. We also utilize CSS directives like @page and page-break-inside: avoid to enforce A4 bounds and prevent awkward layout splits.",
          "A crucial aspect of developing AI projects under a student budget is the API consumption cost. Robust proprietary models like OpenAI's gpt-4o ($2.50/M input, $10.00/M output tokens) or Anthropic's Claude 3.5 Sonnet ($3.00/M input, $15.00/M output tokens) get expensive at scale. For this reason, we integrated with the OpenRouter API gateway to evaluate various models, eventually selecting DeepSeek-v4-Flash. It offers excellent semantic writing quality and structure adherence for a fraction of the cost, pricing at just $0.07 per 1M input tokens and $0.21 per 1M output tokens.",
          "To put the financial difference in perspective, we can perform a quantitative cost analysis of a single execution. The process requires about 2,500 tokens for the baseline JSON resume and prompt parameters, 1,000 tokens for the job description, and 500 tokens for system instructions, totaling roughly 4,000 input tokens. The adapted output JSON resume accounts for about 1,500 tokens. Running this on gpt-4o costs 1.0 cent for input (4,000 * $2.50/1M) and 1.5 cents for output (1,500 * $10.00/1M), totaling 2.5 cents per run. On DeepSeek-v4-Flash, the input costs $0.00028 (4,000 * $0.07/1M) and the output costs $0.000315 (1,500 * $0.21/1M), totaling $0.000595.",
          "This represents an incredible savings of approximately 97.6% per execution. For a student applying to 100 job listings and optimizing their resume for each, using gpt-4o would cost $2.50, whereas DeepSeek-v4-Flash would cost a mere $0.06. This economic difference makes the project highly sustainable and scalable for job hunters on a budget.",
          "The bot's architecture also brought key learnings about engineering trade-offs. Choosing in-memory sessions avoided the latency and hosting costs of database engines (like MongoDB or PostgreSQL) for sessions that only last a few seconds, accepting the minor risk that an active session is lost if the server restarts. Similarly, selecting Puppeteer with HTML/CSS templates over native PDF libraries like PDFKit increased the container deployment size by 150MB to include Chromium, but saved us from manually placing text coordinates, allowing us to build dynamic, responsive resumes with stable layouts.",
          "Building this bot proved that modern development with artificial intelligence requires much more than knowing how to write prompts. Designing decoupled, event-driven architectures, applying software design patterns to reuse heavy resources, and performing detailed cost analyses are the true foundations for building sustainable, production-grade solutions. You can check out the full source code and implementation details of this project on [GitHub](https://github.com/renanzitoo/telegram-resume-adapter) under the MIT license!",
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
          "Se você está ativamente procurando uma vaga de estágio ou emprego na área de tecnologia, certamente já se deparou com o temido ATS (Applicant Tracking System). Esses sistemas de recrutamento automatizados filtram currículos usando algoritmos de correspondência de palavras-chave e alinhamento semântico com as descrições das vagas. Como estudantes de Engenharia de Computação se aproximando do mercado de trabalho, enfrentamos um duplo problema: os filtros de ATS exigem a personalização do nosso currículo para cada candidatura a fim de destacar as experiências relevantes, mas fazer isso manualmente é uma tarefa exaustiva, demorada e propensa a erros de formatação.",
          "Para automatizar esse pipeline de customização de forma prática, desenvolvi um bot no Telegram em tempo real e orientado a eventos. A ideia arquitetural central é tratar o currículo como um documento JSON estruturado (a camada de dados), a descrição da vaga como texto não estruturado (a camada de consulta) e o PDF de saída como uma visualização compilada (a camada de apresentação). Ao separar essas camadas, criamos um compilador modular e reproduzível que executa a tradução semântica por meio de IA e a compilação do layout via Puppeteer.",
          "Seguindo princípios de arquitetura de software limpa, o projeto construído em TypeScript e Node.js foi estruturado com uma separação clara de responsabilidades no diretório src/. A camada de configurações (src/config.ts) lida com a inicialização dos clientes de API, como o Telegraf para o bot do Telegram e a integração com o gateway do OpenRouter, além de gerenciar as variáveis de ambiente. A camada de serviços é dividida em src/services/ai.ts, que faz a interface com a API de inferência e gerencia as instruções do sistema e esquemas de JSON, e src/services/pdf.ts, que compila os templates HTML/CSS em PDFs e gerencia o ciclo de vida do navegador headless.",
          "Além dos serviços, criamos uma camada de utilitários (src/utils/skills.ts) que recebe as tags brutas e não estruturadas geradas pela LLM e as mapeia para domínios de engenharia pré-definidos, como Linguagens, Bancos de Dados, Backend e DevOps. Para a segurança dos dados, as informações pessoais são separadas no arquivo myResume.json e em um template baseResume.json. Os detalhes do currículo pessoal permanecem no arquivo gitignored, protegendo informações de identificação pessoal (PII) de entrarem no controle de versão e mantendo o código da aplicação modular.",
          "Como o Telegram é uma interface sem estado (stateless), o bot gerencia o progresso da sessão através de um mapa temporário na memória do servidor (userSessions). Quando o usuário envia o comando /adapt [descrição da vaga], o bot salva a descrição e solicita ao usuário que selecione o idioma de destino por meio de botões de teclado inline. Essa máquina de estados mantém o fluxo interativo e extremamente leve, eliminando a necessidade de conexões com banco de dados para sessões de curtíssima duração.",
          "Uma vez disparado o callback do idioma, o serviço de IA monta um prompt estruturado contendo os dados brutos do currículo do usuário e a descrição da vaga, instruindo o modelo a agir como um recrutador experiente de elite. O modelo realiza uma análise de densidade de palavras-chave na descrição da vaga e reformula as realizações profissionais usando o método STAR (Situação, Tarefa, Ação e Resultado), injetando métricas e verbos de ação fortes (como 'otimizou consultas de banco de dados... reduzindo a latência em 50%'). Fundamentalmente, a IA retorna o resultado estritamente no mesmo formato do JSON original, garantindo que possamos analisá-lo com segurança.",
          "O JSON adaptado gerado pelo modelo é então mesclado com as informações de contato básicas — as quais a LLM não tem permissão para alterar para evitar alucinações — e enviado ao serviço de PDF. O template é desenvolvido em HTML/CSS utilizando regras rígidas de estilização. Para resolver o gargalo de processamento e memória ao abrir um novo navegador a cada requisição, implementamos o padrão de projeto Singleton no arquivo pdf.ts. Um único navegador Puppeteer é instanciado de forma preguiçosa (lazy) sob demanda, e cada requisição abre apenas abas leves (browser.newPage()) que são fechadas imediatamente após a geração do PDF. Também utilizamos diretivas CSS como @page e page-break-inside: avoid para impor os limites do formato A4 e evitar quebras de layout indesejadas.",
          "Um ponto crucial ao desenvolver projetos de IA com orçamento de estudante são os custos de consumo de API. Modelos proprietários robustos como o GPT-4o da OpenAI ($2.50 por milhão de tokens de entrada, $10.00 por milhão de tokens de saída) ou o Claude 3.5 Sonnet da Anthropic ($3.00 na entrada, $15.00 na saída) tornam-se proibitivos em escala. Por esse motivo, integramos o gateway do OpenRouter para avaliar diferentes modelos e optamos pelo DeepSeek-v4-Flash, que oferece excelente qualidade de escrita semântica e aderência à estrutura do JSON esperado por uma fração microscópica do preço: apenas $0.07 por milhão de tokens de entrada e $0.21 por milhão na saída.",
          "Para colocar essa diferença financeira em perspectiva, podemos realizar uma análise quantitativa de custos para uma única execução. O processo consome cerca de 2.500 tokens para o currículo JSON base e parâmetros do prompt, 1.000 tokens para a descrição da vaga e 500 tokens para as instruções do sistema, somando aproximadamente 4.000 tokens de entrada. O JSON adaptado de saída representa cerca de 1.500 tokens. Rodar esse fluxo no GPT-4o custaria 1,0 centavo de dólar para entrada (4.000 * $2.50/1M) e 1,5 centavos para saída (1.500 * $10.00/1M), totalizando 2,5 centavos de dólar por execução. No DeepSeek-v4-Flash, o custo de entrada é $0.00028 (4.000 * $0.07/1M) e o de saída é $0.000315 (1.500 * $0.21/1M), totalizando $0.000595.",
          "Isso representa uma economia fantástica de aproximadamente 97,6% por execução. Para um estudante que candidata-se a 100 vagas e otimiza seu currículo para cada uma delas, o uso do GPT-4o custaria $2.50, enquanto o DeepSeek-v4-Flash custaria meros $0.06. Essa disparidade econômica viabiliza o projeto de maneira sustentável e escalável para quem está buscando emprego com orçamento limitado.",
          "A arquitetura do bot também trouxe aprendizados valiosos sobre trade-offs de engenharia. Optar por sessões em memória evitou a latência e custos de hospedagem de bancos de dados (como MongoDB ou PostgreSQL) para sessões que duram apenas alguns segundos, aceitando o pequeno risco de perda de estado ativo caso o servidor reinicie. Da mesma forma, escolher o Puppeteer com templates HTML/CSS em vez de bibliotecas nativas de PDF como o PDFKit aumentou o tamanho da imagem de implantação do container em 150MB para incluir o Chromium, mas eliminou a necessidade de posicionar coordenadas de texto manualmente, permitindo construir currículos dinâmicos e responsivos com layouts estáveis.",
          "A criação deste bot provou que o desenvolvimento moderno de sistemas com inteligência artificial exige muito mais do que saber criar prompts. Desenhar arquiteturas desacopladas e orientadas a eventos, aplicar padrões de projetos para reuso de recursos pesados e realizar análises frias e matemáticas dos custos de API são as verdadeiras bases para construir soluções de produção sustentáveis. Você pode conferir o código-fonte completo e os detalhes de implementação no [GitHub](https://github.com/renanzitoo/telegram-resume-adapter) sob a licença MIT!",
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
