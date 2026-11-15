// Example conversations used by the landings. They show the behaviour, they are not transcripts. Written the way
// people actually type to an agent, and the way a good colleague would answer.

// One exchange per skill group, for the sticky stage on /nova.
export const SCENES: Record<string, { you: string; agent: string }> = {
  Código: {
    you: "corrigi o bug do login, posso subir?",
    agent: "Ainda não. Rodei os testes e um ainda falha no auth.test.ts. Arrumo e te aviso.",
  },
  Interface: {
    you: "essa tela tá feia demais, dá um jeito",
    agent: "Tirei o gradiente roxo, usei o botão que o projeto já tem e a lista vazia agora diz o que fazer.",
  },
  "Texto e conversa": {
    you: "escrevi esse post do lançamento, tá com cara de ChatGPT?",
    agent: "Um pouco. Cortei o “não é X, é Y” e duas frases de efeito. O resto é você mesmo.",
  },
  "Negócio e carreira": {
    you: "tive uma ideia: um Uber pra passear com cachorro. o que acha?",
    agent: "Por enquanto é funcionalidade querendo ser empresa. Quem tem cachorro já pede pro vizinho de graça.",
  },
  Máquina: {
    you: "meu Mac tá sem espaço nenhum, o que eu posso apagar?",
    agent: "Achei 41 GB que voltam sozinhos. Antes, desligo o download do modelo de IA do Chrome, senão ele baixa de novo.",
  },
  "Para quem cria skills": {
    you: "sempre faço o mesmo ritual pra subir release, vira skill?",
    agent: "Virou. Coloquei quando usar, quando não usar e quando tá pronto. O validador passou.",
  },
};

// One example run per skill, for the curral preview: what the person says, then what the agent does with the skill.
// "ok" lines are done, "no" lines failed or were cut, "warn" lines are left for the person to decide.
export type Step = { kind: "ok" | "no" | "warn" | "plain"; text: string };
export const SKILL_RUNS: Record<string, { you: string; steps: Step[]; result: string }> = {
  "corno-confere": {
    you: "e aí, terminou? queria subir isso ainda hoje",
    steps: [
      { kind: "ok", text: "trocar o botão de login: feito (Login.tsx:42)" },
      { kind: "ok", text: "rodei os testes: 48 passaram" },
      { kind: "no", text: "tirar a barra do header, que você pediu no meio: esqueci" },
    ],
    result: "Quase. Faltou a barra do header, já tô tirando e te aviso.",
  },
  "corno-testa": {
    you: "o frete grátis acima de 200 tá cobrando 15, cobre isso com teste?",
    steps: [
      { kind: "no", text: "escrevi o teste antes: falhou, veio 15 em vez de 0" },
      { kind: "ok", text: "corrigi só a regra do frete" },
      { kind: "ok", text: "rodei tudo: 31 testes passando" },
    ],
    result: "Pronto. Se alguém quebrar o frete de novo, o teste pega.",
  },
  "corno-investiga": {
    you: "o boleto tá saindo com vencimento errado, ontem tava funcionando",
    steps: [
      { kind: "ok", text: "consegui repetir o erro aqui em 3 segundos" },
      { kind: "ok", text: "achei o commit que quebrou: o de ontem à tarde" },
      { kind: "ok", text: "a causa: o fuso horário na data de vencimento" },
    ],
    result: "Corrigi na raiz e deixei um teste pra não voltar.",
  },
  "corno-revisa": {
    you: "/corno-revisa, dá uma olhada no checkout antes do merge",
    steps: [
      { kind: "warn", text: "o Checkout.tsx passou de 1.200 linhas" },
      { kind: "warn", text: "a regra de cupom tá espalhada em 4 lugares" },
    ],
    result: "Entra, mas separa o cálculo do cupom antes. Te mostro como.",
  },
  "corno-pesquisa": {
    you: "dá pra usar fetch direto no Node 22 ou ainda precisa de lib?",
    steps: [
      { kind: "ok", text: "li o changelog oficial do Node" },
      { kind: "ok", text: "conferi na documentação da API" },
    ],
    result: "Dá, já é estável. Deixei as fontes em docs/pesquisa/fetch-node.md.",
  },
  "corno-visagem": {
    you: "essa tela tá feia demais, dá um jeito",
    steps: [
      { kind: "ok", text: "tirei o gradiente roxo" },
      { kind: "ok", text: "troquei o div clicável pelo botão que o projeto já tem" },
      { kind: "ok", text: "a lista vazia agora diz o que fazer" },
    ],
    result: "Ficou no padrão do resto do app. Modo escuro eu não mexi.",
  },
  "corno-sendo-corno": {
    you: "antes de eu aprovar esse PR, o que tá errado nessa tela?",
    steps: [
      { kind: "no", text: "grave: o botão de fechar não tem nome pro leitor de tela" },
      { kind: "warn", text: "médio: um espaçamento fora do padrão no card" },
      { kind: "warn", text: "leve: um card com borda diferente dos outros" },
    ],
    result: "Dá pra aprovar depois de arrumar o botão. Não mexi em nada.",
  },
  "corno-humano": {
    you: "escrevi esse post do lançamento, tá com cara de ChatGPT?",
    steps: [
      { kind: "no", text: "“Não é só um app, é uma revolução.”" },
      { kind: "ok", text: "“Lançamos o app na terça.”" },
    ],
    result: "Tava um pouco. Cortei três frases de efeito, o resto é você.",
  },
  "corno-com-tdah": {
    you: "não entendi nada, só me diz o que fazer",
    steps: [
      { kind: "plain", text: "1. Abre o arquivo src/auth.ts" },
      { kind: "plain", text: "2. Troca a linha 42 por esse trecho" },
      { kind: "plain", text: "3. Roda npm test" },
    ],
    result: "Começa pelo 1. Leva uns 2 minutos.",
  },
  "corno-julgador": {
    you: "tive uma ideia: um Uber pra passear com cachorro. o que acha?",
    steps: [
      { kind: "no", text: "quem paga? quem tem cachorro já pede pro vizinho" },
      { kind: "no", text: "uma empresa grande copia isso em um mês" },
      { kind: "ok", text: "dá pra testar em 7 dias conversando com 10 donos" },
    ],
    result: "Por enquanto é funcionalidade querendo ser empresa. Faz as 10 conversas antes de programar.",
  },
  "corno-recrutador": {
    you: "mandei uns 40 currículos e ninguém me chamou, olha aí (curriculo.pdf)",
    steps: [
      { kind: "plain", text: "em 6 segundos o recrutador vê: dev pleno, 5 anos, nenhum resultado" },
      { kind: "no", text: "nenhum dos 12 itens diz o que você entregou" },
      { kind: "ok", text: "o PDF é lido direitinho pelos sistemas de triagem" },
    ],
    result: "Nota 58. Reescrevi os 5 piores itens, só falta você pôr os números.",
  },
  "corno-limpa": {
    you: "meu Mac tá sem espaço nenhum, o que eu posso apagar?",
    steps: [
      { kind: "ok", text: "38 GB de node_modules (voltam com um npm install)" },
      { kind: "ok", text: "4 GB de um modelo de IA que o Chrome baixou sozinho" },
      { kind: "warn", text: "2 pastas com código que você não commitou: não mexi" },
    ],
    result: "Liberei 42 GB. As duas pastas eu deixei pra você decidir.",
  },
  "corno-cria-skill": {
    you: "sempre faço o mesmo ritual pra subir release, vira skill?",
    steps: [
      { kind: "ok", text: "criei a skills/corno-release" },
      { kind: "ok", text: "coloquei quando usar, quando não usar e quando tá pronto" },
      { kind: "ok", text: "o validador do repo passou" },
    ],
    result: "Tá pronta. Testa dizendo “sobe a release” numa conversa nova.",
  },
};
