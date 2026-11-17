// Example conversations used by the landings. They show the behaviour, they are not transcripts. Written the way
// people actually type to an agent, and the way a good colleague would answer.

// One example run per skill, for the curral preview: what the person says, then what the agent does with the skill.
// "ok" lines are done, "no" lines failed or were cut, "warn" lines are left for the person to decide.
export type Step = { kind: "ok" | "no" | "warn" | "plain"; text: string };
export const SKILL_RUNS: Record<string, { you: string; steps: Step[]; result: string }> = {
  "corno-confere": {
    you: "e aí, terminou? queria subir isso ainda hoje",
    steps: [
      { kind: "plain", text: "1ª volta: cada pedido ao lado do que entreguei" },
      { kind: "ok", text: "botão escrito “Entrar”: igual ao pedido (Login.tsx:42)" },
      { kind: "no", text: "botão preto: entreguei cinza escuro, não é o que você pediu" },
      { kind: "no", text: "tirar a barra do header, pedido no meio: esqueci" },
      { kind: "plain", text: "corrigi os dois" },
      { kind: "ok", text: "2ª volta, do zero: 3 de 3 iguais ao pedido, 48 testes passando" },
    ],
    result: "Agora sim, pronto e conferido. Pode subir.",
  },
  "corno-testa": {
    you: "testa o card LOJA-482 do cupom antes de eu subir",
    steps: [
      { kind: "plain", text: "li o card no Jira: 4 critérios de aceite" },
      { kind: "plain", text: "subi o site e a API aqui, tudo respondendo" },
      { kind: "ok", text: "tela: cupom válido aplica 10% no celular e no desktop" },
      { kind: "ok", text: "API: 9 chamadas na collection, todas como esperado" },
      { kind: "no", text: "cupom vencido: aceitou o desconto (passos e resposta salvos)" },
      { kind: "warn", text: "não testei o pagamento real: sem chave do gateway aqui" },
    ],
    result: "Sobe depois de corrigir o cupom vencido. Quer que eu comente isso no card?",
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
    you: "/corno-revisa o PR 214 do checkout",
    steps: [
      { kind: "plain", text: "PR seu, 14 arquivos. Veredito: entra com 2 ajustes" },
      { kind: "no", text: "do PR: checkout.ts foi de 640 pra 1.200 linhas, separa o carrinho" },
      { kind: "no", text: "do PR: o cupom é calculado em 4 lugares, junta numa função só" },
      { kind: "ok", text: "impacto: carrinho e pedido usam o cupom novo, os testes deles passam" },
      { kind: "warn", text: "fora do PR, fica de observação: o frete mistura regra com tela" },
      { kind: "plain", text: "perguntei: corrigir os 2? comentar no PR? você marcou os dois" },
    ],
    result: "Corrigi os 2 e o comentário tá no PR, pela sua conta, escrito como gente.",
  },

  "corno-pesquisa": {
    you: "o Safari já aceita aquele :has() do CSS ou ainda não dá pra usar?",
    steps: [
      { kind: "ok", text: "olhei a tabela de compatibilidade oficial" },
      { kind: "ok", text: "conferi nas notas de versão do Safari" },
      { kind: "plain", text: "aceita desde o Safari 15.4, de 2022" },
    ],
    result: "Pode usar. Salvei as fontes em docs/pesquisa/css-has.md.",
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
    you: "o texto do site e o roteiro do vídeo tão com cara de IA, arruma?",
    steps: [
      { kind: "no", text: "site: “Revolucione sua rotina com o poder da IA”" },
      { kind: "ok", text: "site: “Organiza sua agenda sozinho”" },
      { kind: "no", text: "roteiro: “E isso muda tudo.”" },
      { kind: "ok", text: "roteiro: o vídeo agora termina mostrando o preço" },
    ],
    result: "Tirei a cara de IA dos dois. O jeito de falar continua o seu.",
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
