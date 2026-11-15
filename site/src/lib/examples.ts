// Illustrative exchanges used by the landings. They are examples of the behaviour, not transcripts.

export const SCENES: Record<string, { you: string; agent: string }> = {
  Código: { you: "corrigi o bug, pode subir?", agent: "Rodei a suíte inteira: um teste ainda falha em auth.test.ts. Não está pronto; olha a saída acima." },
  Interface: { you: "deixa essa tela mais bonita", agent: "Tirei o gradiente roxo, troquei o div clicável pelo Button da casa e o estado vazio agora tem uma ação." },
  "Texto e conversa": { you: "humaniza esse post", agent: "Cortei o “não é X, é Y”, os três travessões e o “isso muda tudo”. O resto é a sua voz, intacta." },
  "Negócio e carreira": { you: "julga minha ideia: Uber de passeador de cachorro", agent: "Veredito: funcionalidade querendo ser empresa. Quem paga, se o vizinho já passeia de graça?" },
  Máquina: { you: "meu disco tá cheio", agent: "O maior item é o modelo de IA que o Chrome baixa sozinho. Desligo o download antes de apagar, senão ele volta." },
  "Para quem cria skills": { you: "transforma isso em skill", agent: "Criei com gatilhos, “Quando não usar” e “Pronto quando”. O validador do repo passa." },
};

// What the agent says without the skill, and with it.
export const BEFORE_AFTER: { skill: string; before: string; after: string }[] = [
  { skill: "corno-confere", before: "Pronto! Deve funcionar.", after: "Rodei os testes: 2 falham em pagamento. Ainda não está pronto." },
  { skill: "corno-investiga", before: "Provavelmente é cache. Limpei, tenta de novo.", after: "Reproduzi em 3 segundos. A causa é o fuso horário na data de vencimento." },
  { skill: "corno-visagem", before: "Adicionei um gradiente roxo e um brilho no botão.", after: "Usei o Button da casa, tirei o gradiente e o vazio agora tem uma ação." },
  { skill: "corno-julgador", before: "Que ideia incrível! Tem tudo para dar certo.", after: "Nível 2: funcionalidade querendo ser empresa. Faça 10 conversas antes de codar." },
  { skill: "corno-recrutador", before: "Seu currículo está ótimo!", after: "Nota 58: nenhum bullet tem número. Reescrevi os cinco piores com {XX}." },
  { skill: "corno-humano", before: "Isso não é só um post, é uma revolução.", after: "Cortei a frase de efeito e deixei o fato: lançamos na terça." },
  { skill: "corno-limpa", before: "Apaguei a pasta do Chrome, liberou 4 GB.", after: "Desliguei o download do modelo antes de apagar, senão ele volta amanhã." },
  { skill: "corno-testa", before: "Escrevi o código e depois uns testes que passam.", after: "O teste falhou primeiro pelo motivo certo. Agora passa, com a saída aqui." },
];

// One example run per skill, for the curral preview: what you say, then what the agent does with the skill on.
// "ok" lines passed, "no" lines failed or were cut, "warn" lines are left for you to decide.
export type Step = { kind: "ok" | "no" | "warn" | "plain"; text: string };
export const SKILL_RUNS: Record<string, { you: string; steps: Step[]; result: string }> = {
  "corno-confere": {
    you: "terminou?",
    steps: [
      { kind: "ok", text: "botão de login trocado (src/Login.tsx:42)" },
      { kind: "ok", text: "testes: 48 passam, 0 falham" },
      { kind: "no", text: "faltou: tirar a barra do header, pedida no meio" },
    ],
    result: "Ainda não: 2 de 3 itens feitos. Fazendo o que falta.",
  },
  "corno-testa": {
    you: "cobre o cálculo de frete com teste",
    steps: [
      { kind: "no", text: "frete_gratis_acima_de_200 falhou: esperado 0, veio 15" },
      { kind: "ok", text: "corrigido o mínimo para passar" },
      { kind: "ok", text: "suíte inteira: 31 passam" },
    ],
    result: "Falhou primeiro pelo motivo certo. Agora passa.",
  },
  "corno-investiga": {
    you: "funcionava ontem",
    steps: [
      { kind: "ok", text: "reproduzido em 3 s com um curl" },
      { kind: "ok", text: "git bisect: quebrou no commit a41f" },
      { kind: "ok", text: "causa: fuso horário na data de vencimento" },
    ],
    result: "Corrigido na raiz, com teste de regressão.",
  },
  "corno-revisa": {
    you: "/corno-revisa",
    steps: [
      { kind: "warn", text: "Checkout.tsx passou de 1.200 linhas" },
      { kind: "warn", text: "if de cupom espalhado em 4 lugares" },
    ],
    result: "Entra com ajustes: separe o cálculo do cupom antes.",
  },
  "corno-pesquisa": {
    you: "o Node 22 já tem fetch estável?",
    steps: [
      { kind: "ok", text: "changelog oficial do Node" },
      { kind: "ok", text: "documentação da API global fetch" },
    ],
    result: "Sim. Salvo em docs/pesquisa/fetch-node.md, com links.",
  },
  "corno-visagem": {
    you: "deixa essa tela mais bonita",
    steps: [
      { kind: "ok", text: "gradiente roxo removido" },
      { kind: "ok", text: "div clicável virou o Button da casa" },
      { kind: "ok", text: "estado vazio ganhou uma ação" },
    ],
    result: "Pulei o modo escuro: ninguém pediu.",
  },
  "corno-sendo-corno": {
    you: "aponta os problemas dessa tela",
    steps: [
      { kind: "no", text: "grave: botão só com ícone sem nome (Header.tsx:18)" },
      { kind: "warn", text: "médio: p-[13px] fora da escala (Card.tsx:9)" },
      { kind: "warn", text: "leve: raio diferente dos cards irmãos" },
    ],
    result: "Veredito: entra com ajustes. Não mexi no código.",
  },
  "corno-humano": {
    you: "humaniza esse post",
    steps: [
      { kind: "no", text: "“Não é só um app, é uma revolução.”" },
      { kind: "ok", text: "“Lançamos o app na terça.”" },
    ],
    result: "Cortei 3 frases de efeito. A voz continua sua.",
  },
  "corno-com-tdah": {
    you: "só me diz o que fazer",
    steps: [
      { kind: "plain", text: "1. Abra src/auth.ts" },
      { kind: "plain", text: "2. Troque a linha 42 pelo trecho abaixo" },
      { kind: "plain", text: "3. Rode npm test" },
    ],
    result: "Agora: o passo 1. Leva 2 minutos.",
  },
  "corno-julgador": {
    you: "julga minha ideia: Uber de passeador de cachorro",
    steps: [
      { kind: "no", text: "dor: o vizinho já passeia de graça" },
      { kind: "no", text: "diferencial: um concorrente copia em um mês" },
      { kind: "ok", text: "teste de 7 dias: 10 conversas com donos" },
    ],
    result: "Nível 2: funcionalidade querendo ser empresa.",
  },
  "corno-recrutador": {
    you: "analisa meu currículo (curriculo.pdf)",
    steps: [
      { kind: "plain", text: "6 segundos: dev pleno, 5 anos, nenhum número" },
      { kind: "no", text: "0 de 12 bullets com resultado" },
      { kind: "ok", text: "PDF com texto, coluna única" },
    ],
    result: "Nota 58, fraco. Reescrevi os 5 piores com {XX}.",
  },
  "corno-limpa": {
    you: "meu disco tá cheio",
    steps: [
      { kind: "ok", text: "38 GB em node_modules (volta com npm install)" },
      { kind: "ok", text: "4,1 GB do modelo de IA do Chrome, download desligado" },
      { kind: "warn", text: "2 pastas com código sem commit: não mexo" },
    ],
    result: "Livre antes: 12 GB. Agora: 53 GB.",
  },
  "corno-cria-skill": {
    you: "transforma isso em skill",
    steps: [
      { kind: "ok", text: "skills/corno-ritual/SKILL.md criado" },
      { kind: "ok", text: "gatilhos, Quando não usar e Pronto quando" },
      { kind: "ok", text: "validador do repo: ok" },
    ],
    result: "Pronta. Teste dizendo um gatilho numa conversa nova.",
  },
};
