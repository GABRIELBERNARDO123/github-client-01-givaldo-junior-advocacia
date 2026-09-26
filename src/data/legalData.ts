import { PracticeArea, CaseStudy, ClientReviewCase, FaqItem, OfficeInfo } from '../types';

export const officeInfo: OfficeInfo = {
  name: "Dr. Givaldo Júnior Advocacia",
  lawyerName: "Dr. Givaldo Júnior",
  title: "Advogado Especialista em Direito de Família, Cobrança e Imobiliário",
  oabNumber: "OAB/PR 100.231",
  phone: "(45) 99903-3123",
  phoneRaw: "5545999033123",
  email: "givaldo-junior@hotmail.com",
  instagram: "https://instagram.com/givaldojradv",
  address: {
    street: "R. das Perdizes dos Florais, 134",
    neighborhood: "bairro Florais do Paraná",
    city: "Cascavel",
    state: "PR",
    postalCode: "85814-480",
    country: "Brasil",
    full: "Florais do Paraná - R. das Perdizes dos Florais, 134 - bairro Florais do Paraná, Cascavel - PR, 85814-480",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=R.+das+Perdizes+dos+Florais,+134+-+Florais+do+Paran%C3%A1,+Cascavel+-+PR,+85814-480"
  }
};

export const practiceAreas: PracticeArea[] = [
  {
    id: "direito-familia",
    title: "Direito de Família",
    subtitle: "Divórcio, Partilha de Bens, Guarda dos Filhos e Pensão Alimentícia",
    badge: "⭐ Área de Maior Destaque • Especialidade Principal",
    featured: true,
    category: "familia",
    description: "Minha especialidade central com condução humanizada, resolutiva e altamente estratégica. Protejo com prioridade máxima o futuro dos seus filhos, seus direitos patrimoniais e a sua tranquilidade emocional em divórcios em cartório ou judiciais, fixação/revisão de alimentos, guarda compartilhada e partilha de bens.",
    highlights: [
      "Divórcio consensual em cartório (rápido, sem atrito) e divórcio litigioso com medidas protetivas de urgência",
      "Guarda compartilhada equilibrada, regulamentação de convivência e proteção ativa contra alienação parental",
      "Fixação, revisão e cobrança ágil de pensão alimentícia proporcional à renda real",
      "Partilha detalhada e justa de patrimônio (imóveis, empresas, veículos, cotas societárias e investimentos)",
      "Reconhecimento e dissolução formal de união estável com resguardo total de meação"
    ],
    idealFor: "Pessoas que buscam segurança jurídica rigorosa, acolhimento humano e a discrição que sua família merece em momentos delicados."
  },
  {
    id: "divorcio-consensual",
    title: "Divórcio Consensual em Cartório",
    subtitle: "Rápido, discreto, amigável e sem desgastes desnecessários",
    badge: "Direito de Família • Via Extrajudicial",
    featured: true,
    category: "familia",
    description: "Havendo concordância entre os cônjuges, formalizo o seu divórcio diretamente em Tabelionato de Notas em questão de dias. Preservo a intimidade da família, economizo custas e estruturo uma partilha justa e equilibrada.",
    highlights: [
      "Conclusão célere em poucos dias em cartório",
      "Escritura pública com validade jurídica e registral imediata",
      "Estruturação amigável de partilha de patrimônio e alimentos",
      "Realizado presencialmente no escritório em Cascavel ou 100% digital"
    ],
    idealFor: "Casais que optam por encerrar o vínculo matrimonial com respeito, rapidez e economia de tempo e custas."
  },
  {
    id: "divorcio-litigioso",
    title: "Divórcio Litigioso Estratégico",
    subtitle: "Defesa enérgica de direitos, cautelares urgentes e blindagem patrimonial",
    badge: "Direito de Família • Atuação Judicial",
    featured: true,
    category: "familia",
    description: "Quando não há consenso sobre partilha, pensão ou filhos, ou quando a outra parte cria obstáculos ou tenta ocultar patrimônio, atuo com firmeza técnica implacável perante o Poder Judiciário para resguardar cada direito seu.",
    highlights: [
      "Medidas cautelares de arrolamento e bloqueio urgente de bens",
      "Rastreamento de eventuais ocultações patrimoniais e fraudes",
      "Fixação liminar de alimentos provisionais e guarda urgente",
      "Afastamento de cônjuge do lar em situações de coação ou atrito grave"
    ],
    idealFor: "Situações de conflito acentuado, discordância na partilha ou recusa injustificada de acordo pela outra parte."
  },
  {
    id: "partilha-bens",
    title: "Partilha de Bens & Patrimônio Familiar",
    subtitle: "Divisão justa de imóveis, empresas, fazendas e investimentos",
    badge: "Direito de Família • Engenharia Patrimonial",
    featured: true,
    category: "familia",
    description: "A divisão de bens construídos durante a união exige apuração documental rigorosa. Analiso o regime de bens aplicável ao seu caso e garanto que nenhum ativo seu seja omitido, subtraído ou subavaliado.",
    highlights: [
      "Avaliação precisa de imóveis urbanos e rurais, quotas societárias e veículos",
      "Partilha equilibrada de haveres societários e participações empresariais",
      "Estratégia de compensação financeira justa e planejamento tributário de custas",
      "Defesa contra dívidas contraídas exclusivamente pelo outro cônjuge"
    ],
    idealFor: "Famílias e empresários com patrimônio relevante que necessitam de segurança contábil e jurídica."
  },
  {
    id: "pensao-alimenticia",
    title: "Pensão Alimentícia",
    subtitle: "Fixação proporcional, revisão de valores, execução com prisão/penhora e exoneração",
    badge: "Direito de Família • Alimentos & Dignidade",
    featured: true,
    category: "familia",
    description: "Atuação estratégica e incisiva na fixação, revisão ou cobrança enérgica de pensão alimentícia. Analiso com rigor técnico o binômio necessidade dos filhos versus possibilidade de quem paga, atuando na apuração de renda real e quebra de artifícios de ocultação de patrimônio por autônomos ou empresários. Em caso de inadimplência, aplico imediatamente os ritos judiciais de coerção pessoal (prisão civil) e constrição patrimonial (penhora e bloqueio de contas).",
    highlights: [
      "Ação de Fixação de Alimentos com pedido de alimentos provisórios em tutela de urgência imediata",
      "Ação Revisional de Alimentos para majoração (aumento de custos dos filhos) ou redução justificada de encargo",
      "Execução de Alimentos pelo rito de prisão civil (parcelas recentes) e rito de penhora de bens/contas bancárias",
      "Rastreamento de renda oculta de genitores autônomos e empresários (SISBAJUD, quebra de sigilo e sinais exteriores de riqueza)",
      "Ação de Exoneração de Alimentos quando atingida a maioridade e capacidade financeira do filho",
      "Homologação amigável de acordos de pensão com validade de título executivo judicial"
    ],
    idealFor: "Mães ou pais que precisam garantir com urgência o sustento digno dos filhos, cobrar atrasados de forma rápida ou que necessitam readequar judicialmente o valor à sua real capacidade financeira."
  },
  {
    id: "guarda-menores",
    title: "Guarda de Menores",
    subtitle: "Guarda compartilhada equilibrada, guarda unilateral e proteção integral do bem-estar dos filhos",
    badge: "Direito de Família • Proteção Integral da Criança",
    featured: true,
    category: "familia",
    description: "Defesa intransigente do superior interesse da criança e do adolescente. Estruturo arranjos de guarda compartilhada que preservem o equilíbrio emocional e a rotina saudável dos filhos, delimitando com clareza os papéis de cada genitor. Em contextos graves de risco, maus-tratos, abandono afetivo ou instabilidade, atuo perante o Judiciário para obter a guarda unilateral com tutela provisória de urgência.",
    highlights: [
      "Estruturação e formalização de Guarda Compartilhada com foco na coparentalidade harmônica e decisões conjuntas",
      "Ação de Guarda Unilateral com pedido de liminar urgente em situações de risco, vulnerabilidade ou negligência",
      "Ação com medidas protetivas emergenciais contra atos de Alienação Parental (Lei nº 12.318/2010)",
      "Definição técnica da residência-base dos filhos mais adequada aos seus estudos e descanso",
      "Acompanhamento e orientação jurídica completa durante perícias psicossociais com psicólogos e assistentes sociais",
      "Autorização judicial para viagens ao exterior ou mudança de domicílio dos menores (suprimento de consentimento)"
    ],
    idealFor: "Pais e mães que priorizam a segurança, a saúde emocional e o futuro dos filhos, buscando um modelo de guarda seguro que evite desgastes e desavenças."
  },
  {
    id: "direito-convivencia",
    title: "Direito de Convivência & Visitas",
    subtitle: "Regulamentação de dias semanais, finais de semana alternados, férias escolares e feriados",
    badge: "Direito de Família • Convívio & Vínculo Afetivo",
    featured: true,
    category: "familia",
    description: "A convivência equilibrada com ambos os genitores e familiares é um direito fundamental e inviolável da criança. Elaboro planos de convivência minuciosos, eliminando ambiguidades que geram atritos diários. Regulamento a divisão de finais de semana alternados, feriados prolongados, datas festivas (Natal, Ano Novo, aniversários, Dia dos Pais e das Mães) e férias escolares, assegurando também o direito a ligações e chamadas de vídeo regulares.",
    highlights: [
      "Elaboração e homologação judicial de plano detalhado e personalizado de convivência e visitas",
      "Regulamentação equitativa das férias escolares (janeiro e julho), feriados nacionais e aniversários dos familiares",
      "Ação de Cumprimento de Regime de Convivência com aplicação de multa diária (astreintes) em caso de descumprimento",
      "Medidas urgentes de busca e apreensão ou restabelecimento de contato quando há retenção indevida do menor",
      "Estruturação de convivência assistida ou supervisionada em períodos de adaptação, reaproximação ou transição",
      "Garantia e extensão do direito de visitas a avós e pessoas com fortes laços de afeto socioafetivo"
    ],
    idealFor: "Pais ou mães que estão sendo impedidos ou limitados injustamente de conviver com seus filhos, ou famílias que buscam organizar uma rotina de visitas harmoniosa, clara e previsível."
  },
  {
    id: "regularizacao-imoveis",
    title: "Regularização de Imóveis",
    subtitle: "Imóveis sem escritura, contratos de gaveta, imóveis inventariados, retificação de área e desmembramento",
    badge: "Área Especializada",
    category: "complementar",
    description: "Atuação especializada na regularização jurídica, documental e registral de propriedades com pendências. Regularizo imóveis sem escritura, contratos de gaveta e imóveis inventariados, além de conduzir procedimentos de retificação de área e desmembramento perante os Cartórios de Registro de Imóveis e vias judiciais.",
    highlights: [
      "Regularização de imóveis sem escritura definitiva",
      "Regularização de contratos de gaveta e formalização de posse legítima",
      "Regularização de imóveis inventariados e partilhas imobiliárias pendentes",
      "Retificação de área registral (correção de metragens e confrontações na matrícula)",
      "Desmembramento e unificação de imóveis e terrenos perante o Registro Imobiliário"
    ],
    idealFor: "Proprietários, posseiros, herdeiros e investidores que possuem imóveis sem escritura, contratos de gaveta, pendências de inventário ou necessidade de retificação de área e desmembramento."
  },
  {
    id: "recuperacao-credito",
    title: "Recuperação de Crédito (Cobrança)",
    subtitle: "Cobrança extrajudicial ágil e execução judicial de dívidas",
    badge: "Área Especializada",
    category: "complementar",
    description: "Recuperação estratégica de valores e títulos inadimplidos para credores, autônomos e empresas. Aliamos notificações formais e negociação extrajudicial resolutiva a medidas judiciais enérgicas de constrição patrimonial, rastreamento bancário e penhora de bens.",
    highlights: [
      "Cobrança extrajudicial ágil com notificações formais e termos de confissão de dívida",
      "Ação de Execução de Títulos Extrajudiciais (cheques, notas promissórias, duplicatas e contratos)",
      "Ação Monitória e Ação de Cobrança Ordinária com apuração documental",
      "Pesquisa patrimonial e penhora via SISBAJUD, RENAJUD, INFOJUD e SNIPER",
      "Desconsideração da personalidade jurídica em casos de ocultação e fraude contra credores"
    ],
    idealFor: "Empresários, prestadores de serviços e pessoas físicas com valores pendentes a receber que exigem retorno efetivo de crédito."
  }
];

export const strategicPillars = [
  {
    step: "01",
    title: "Meu Acolhimento & Diagnóstico Sigiloso",
    description: "Uma conversa reservada e aprofundada diretamente comigo. Ouço a sua história sem pré-julgamentos, examino seus documentos e identifico os pontos críticos que demandam proteção imediata.",
    metric: "100% Sigilo Comigo"
  },
  {
    step: "02",
    title: "Desenho a sua Estratégia Customizada",
    description: "Nenhum caso de família é idêntico a outro. Traço a rota mais inteligente para você: priorizando a via extrajudicial rápida em cartório ou preparando uma defesa judicial robusta.",
    metric: "Plano sob Medida"
  },
  {
    step: "03",
    title: "Minha Negociação Extrajudicial Firme",
    description: "Conduzo pessoalmente o diálogo com a outra parte ou seus advogados com técnica e serenidade, buscando fechar acordos justos que economizem seu tempo, desgaste emocional e custas.",
    metric: "Agilidade & Economia"
  },
  {
    step: "04",
    title: "Minha Defesa Enérgica no Judiciário",
    description: "Se o consenso for inviabilizado pela outra parte, atuo perante os juizados e tribunais com pedidos liminares enérgicos, bloqueio de bens e acompanhamento diário do seu processo.",
    metric: "Atuação Implacável"
  }
];

export const realCaseStudies: CaseStudy[] = [
  {
    id: "1",
    tag: "Divórcio Consensual & Patrimônio",
    title: "Partilha de R$ 3,8M em Cartório Concluída em 14 Dias",
    challenge: "Casal de empresários em Cascavel decidira se separar, mas havia grande tensão sobre a divisão de 4 imóveis urbanos e quotas sociais de duas empresas.",
    strategy: "Estruturei mediação extrajudicial direta, alinhei os valores venais e elaborei minuta de escritura pública com compensação justa.",
    result: "Divórcio formalizado e averbado em cartório em 14 dias úteis, sem exposição pública e com economia de tributos e custas judiciais.",
    duration: "14 dias úteis"
  },
  {
    id: "2",
    tag: "Guarda Compartilhada & Convivência",
    title: "Reversão de Convivência Restritiva e Proteção dos Menores",
    challenge: "Pai era impedido de conviver com as filhas gêmeas de 5 anos sob alegações infundadas, sofrendo tentativa velada de alienação parental.",
    strategy: "Ingressei com pedido liminar com robusto conjunto probatório, fixação imediata de regime provisório de visitas e perícia psicossocial.",
    result: "Obtive decisão liminar favorável estabelecendo convivência equilibrada em menos de 72 horas, homologando guarda compartilhada pacífica.",
    duration: "Liminar em 72h"
  },
  {
    id: "3",
    tag: "Pensão & Ocultação de Bens",
    title: "Descoberta de Renda Real e Fixação Justa de Alimentos",
    challenge: "Genitor declarava renda formal mínima, embora ostentasse padrão de vida elevado com viagens e veículos em nome de terceiros.",
    strategy: "Ajuizei ação de alimentos com pedido de quebra de sigilo e instrução minuciosa com sinais exteriores de riqueza e faturamento.",
    result: "Fixação de pensão correspondente a 5 vezes o valor inicialmente oferecido, cobrindo colégio particular, plano de saúde e moradia dos filhos.",
    duration: "Sentença Favorável"
  }
];

export const clientResolvedCases: ClientReviewCase[] = [
  {
    id: "lidiane-rodrigues",
    name: "Lidiane Rodrigues Lirio",
    role: "1 avaliação no Google",
    timeAgo: "1 ano atrás",
    rating: 5,
    highlight: "Causa resolvida muito mais rápida do que o esperado",
    reviewText: "Foi simplesmente incrível, indico de olhos fechados! Atencioso, dedicado realmente com sua profissão e além de tudo um ser humano de muita empatia e zeloso com seus clientes. Minha causa foi resolvido muito mais rápida do que o esperado e ele sempre me dava devolutivas de como estava o andamento do processo sem mesmo eu está exigindo. Parabéns! Givaldo é uns dos poucos advogados que conheço que age tão honestamente.",
    initials: "LR",
    verified: true
  },
  {
    id: "edmar-twardowski",
    name: "Edmar Twardowski",
    role: "Local Guide • 73 avaliações • 449 fotos no Google",
    timeAgo: "1 ano atrás",
    rating: 5,
    highlight: "Não é aquele advogado que tem que ficar cobrando: resolve tudo",
    reviewText: "Excelente profissional!!! Prestativo, corre trás mesmo, não é aquele tipo de advogado que você tem que ficar cobrando, ele realmente trabalha até resolver tudo. Parabéns Givaldo e obrigado pelas vezes que precisei de orientação.",
    initials: "ET",
    verified: true
  },
  {
    id: "jeziel-martins",
    name: "Jeziel Martins",
    role: "Local Guide • 5 avaliações no Google",
    timeAgo: "1 ano atrás",
    rating: 5,
    highlight: "Resultados excepcionais e acima das expectativas",
    reviewText: "Atendimento cordial e personalizado, profissional altamente qualificado e experiente. Resultados excepcionais e acima das expectativas. Parabéns Givaldo pelo excelente trabalho",
    initials: "JM",
    verified: true
  },
  {
    id: "jocasta-germann",
    name: "Jocasta Germann",
    role: "1 avaliação no Google",
    timeAgo: "1 ano atrás",
    rating: 5,
    highlight: "Honestidade, trabalho transparente e rapidez nas respostas",
    reviewText: "O Advogado Givaldo Junior é um excelente profissional, respeitoso, atencioso, explica tudo nos mínimos detalhes, não deixa o cliente esperando dias por uma resposta, expõe todas as opções disponíveis pra cada caso e sugere a melhor p/ o cliente, cobra um valor justo, executa um trabalho honesto e transparente! Super indico!!!",
    initials: "JG",
    verified: true
  },
  {
    id: "silene-wiesenhutter",
    name: "Silene Wiesenhutter da Luz",
    role: "1 avaliação no Google",
    timeAgo: "1 ano atrás",
    rating: 5,
    highlight: "Resultado favorável no processo com competência e dedicação",
    reviewText: "Um excelente profissional, obtive uma experiência muito boa, Dr. Givaldo sempre atualizando sobre andamento e sanando as dúvidas que eu tinha. Obtivemos um resultado favorável no processo por conta da sua competência e dedicação. Recomendo muito! Um ótimo advogado.",
    initials: "SW",
    verified: true
  },
  {
    id: "ana-paula-kurlapski",
    name: "Ana Paula Kurlapski",
    role: "1 avaliação no Google",
    timeAgo: "1 ano atrás",
    rating: 5,
    highlight: "Sempre resolve e nunca fala que o problema não tem solução",
    reviewText: "Excelente profissional e muito abençoado 🙏 Só tenho a agradecer Doutor Givaldo. Sempre quando tem um problema pra resolver,ele sempre resolve, nunca falou que aquele problema não tinha solução, confio de olhos fechados nele.",
    initials: "AP",
    verified: true
  },
  {
    id: "poli-carvalho",
    name: "Poli Carvalho",
    role: "1 avaliação no Google",
    timeAgo: "7 meses atrás",
    rating: 5,
    highlight: "Ótimo trabalho com a clareza e agilidade que precisávamos",
    reviewText: "Dr.Givaldo. Agradeço a disposição e agilidade efetuado em seus serviços, prestou um ótimo trabalho com clareza e agilidade como precisávamos .",
    initials: "PC",
    verified: true
  },
  {
    id: "sandra-diehl",
    name: "Sandra Mara Diehl",
    role: "1 avaliação no Google",
    timeAgo: "1 ano atrás",
    rating: 5,
    highlight: "Trabalha com dedicação e competência em cada processo",
    reviewText: "Advogado doutor Givaldo Júnior, um ótimo profissional, além de muito prestativo, trabalha com dedicação em cada processo , eu super indico. Gratidão pela competência em todos os serviços prestados!",
    initials: "SM",
    verified: true
  },
  {
    id: "ana-stckel",
    name: "Ana Stckel",
    role: "1 avaliação no Google",
    timeAgo: "1 ano atrás",
    rating: 5,
    highlight: "Processos bem ágeis, facilidade de pagamento e sempre prestativo",
    reviewText: "Dr. Givaldo é um dos melhores advogados que eu já conheci, sempre ali disposto a tirar dúvidas, os processos são bem ágeis, e as formas de pagamentos também são ótimas. Eu super recomendo.",
    initials: "AS",
    verified: true
  },
  {
    id: "fernanda-kurlapski",
    name: "Fernanda Kurlapski",
    role: "1 avaliação no Google",
    timeAgo: "7 meses atrás",
    rating: 5,
    highlight: "Ajudou a resolver o problema e tirou todas as dúvidas",
    reviewText: "Sem dúvidas Indico o Doutor, me ajudou a resolver um problema, e tirou todas as minha duvidas, bem prestativo atencioso. Excelente Profissional Muito grata..",
    initials: "FK",
    verified: true
  }
];

export const faqItems: FaqItem[] = [
  {
    question: "Posso me divorciar mesmo se o meu cônjuge for contra e se recusar a assinar?",
    category: "Divórcio",
    answer: "Sim, com absoluta certeza. No Brasil, o divórcio é um direito potestativo incondicionado (Emenda Constitucional 66/2010). Ninguém é obrigado a permanecer casado. Se o outro cônjuge se recusar a assinar ou criar dificuldades, eu ingresso com a Ação de Divórcio no Judiciário, e o juiz decreta a dissolução do casamento independentemente da concordância dele. As questões de partilha e filhos podem ser decididas no próprio processo ou posteriormente.",
    practicalTip: "A recusa do outro cônjuge apenas transfere o procedimento do cartório para a via judicial, mas jamais impede a sua liberdade."
  },
  {
    question: "Quanto tempo demora um divórcio sob a sua condução?",
    category: "Prazos",
    answer: "Se for consensual (amigável) e sem filhos menores, consigo finalizar em cartório em questão de dias (frequentemente entre 3 a 15 dias). Caso haja filhos menores e exista consenso, realizo por via judicial com homologação célere pelo Ministério Público (cerca de 30 a 60 dias). Em casos litigiosos, a duração depende das perícias, mas obtenho as medidas urgentes (pensão provisória, guarda provisória e afastamento do lar) logo no início por meio de liminares.",
    practicalTip: "Minha prioridade técnica é sempre buscar o caminho mais rápido e menos oneroso para você."
  },
  {
    question: "O atendimento comigo pode ser realizado totalmente online?",
    category: "Atendimento",
    answer: "Sim, com total conforto e sigilo. Eu atendo você presencialmente em meu escritório em Cascavel/PR ou em consultas jurídicas 100% online por videoconferência com gravação e sigilo assegurado para clientes em todo o Paraná, no Brasil e brasileiros no exterior. Você me envia os documentos de forma digital e assina tudo pelo celular com validade jurídica completa.",
    practicalTip: "Você tem a minha atenção pessoal e direta sem precisar se deslocar."
  },
  {
    question: "Como funciona a divisão dos bens adquiridos durante o casamento?",
    category: "Partilha",
    answer: "A regra de divisão depende do regime de bens adotado no casamento. No regime padrão (Comunhão Parcial de Bens), todos os bens adquiridos onerosamente durante a união pertencem a ambos em partes iguais (50% para cada), independentemente de quem pagou ou em nome de quem está registrado. Bens recebidos por herança ou doação exclusiva geralmente não entram na partilha.",
    practicalTip: "Realizo um levantamento documental preventivo com você para evitar que a outra parte oculte ou desvie patrimônio."
  },
  {
    question: "Como defendo a guarda dos seus filhos perante o juiz?",
    category: "Filhos",
    answer: "A regra geral prevista pela legislação brasileira é a Guarda Compartilhada, na qual ambos os pais tomam decisões conjuntas sobre a criação, educação e saúde dos filhos. Estabeleço uma base de residência principal (o lar que atende melhor à rotina escolar e de descanso) e um cronograma saudável e equilibrado de convivência. Em situações de violência ou risco, atuo para obter a guarda unilateral.",
    practicalTip: "Foco rigorosamente no melhor interesse das crianças, afastando conflitos desnecessários e alienação parental."
  },
  {
    question: "Qual o valor correto da pensão alimentícia? Existe porcentagem fixa de 30%?",
    category: "Pensão",
    answer: "Não existe na lei uma porcentagem fixa de 30%. O valor é determinado pelo binômio Necessidade de quem recebe versus Possibilidade de quem paga, com razoabilidade e proporcionalidade. Calculo minuciosamente as despesas reais dos seus filhos e demonstro a capacidade contributiva da outra parte para fixar um valor justo.",
    practicalTip: "Se a outra parte for autônoma ou empresária, analiso sinais exteriores de riqueza e movimentações para comprovar a renda real."
  },
  {
    question: "Se não éramos casados no papel, tenho os mesmos direitos da união estável?",
    category: "União Estável",
    answer: "Sim. A Constituição e o Código Civil equiparam a união estável ao casamento para efeitos de partilha e direitos. Se a convivência foi pública, contínua, duradoura e com o objetivo de constituir família, aplico a regra da comunhão parcial de bens. Proponho a ação de reconhecimento e dissolução de união estável cumulada com a partilha de todo o patrimônio construído.",
    practicalTip: "Fotos, contratos, comprovantes de endereço conjunto e testemunhas comprovam com eficácia a união estável."
  }
];

export const documentChecklistData = [
  {
    category: "Identificação Pessoal",
    items: [
      "Seu documento de identidade com foto (RG ou CNH)",
      "Comprovante de residência atualizado (últimos 3 meses)",
      "Certidão de Casamento atualizada (expedida nos últimos 90 dias)",
      "Pacto antenupcial (caso vocês tenham firmado)"
    ]
  },
  {
    category: "Quando vocês têm Filhos Menores",
    items: [
      "Certidão de Nascimento de todos os filhos",
      "Comprovantes de despesas regulares (escola, plano de saúde, medicamentos)",
      "Rotina e cronograma de atividades extracurriculares"
    ]
  },
  {
    category: "Patrimônio a Partilhar",
    items: [
      "Matrículas atualizadas dos imóveis ou contratos de compra e venda",
      "Documentos dos veículos (CRLV)",
      "Extratos bancários e comprovantes de investimentos (se houver)",
      "Contrato social e balancetes da empresa (em caso de sociedade)",
      "Comprovantes de financiamentos ou dívidas em aberto do casal"
    ]
  }
];
