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
    you: "o texto do site e o roteiro do vídeo tão com cara de IA, arruma?",
    agent: "Troquei “Revolucione sua rotina com o poder da IA” por “Organiza sua agenda sozinho” e cortei o “E isso muda tudo” do roteiro.",
  },
  "Negócio e carreira": {
    you: "tive uma ideia: um Uber pra passear com cachorro. o que acha?",
    agent: "Por enquanto é funcionalidade querendo ser empresa. Quem tem cachorro já pede pro vizinho de graça.",
  },
  Máquina: {
    you: "o Mac tá dizendo que o disco tá cheio e eu nem consigo atualizar o sistema",
    agent: "O Chrome tinha baixado sozinho uma IA de 4 GB. Desliguei antes de apagar, senão ele baixa de novo. Com o resto, foi de 9 GB para 63 GB livres.",
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
    you: "vê se esse PR do checkout tá bom pra entrar, /corno-revisa",
    steps: [
      { kind: "warn", text: "o arquivo do checkout foi pra 1.200 linhas: dá pra separar o carrinho" },
      { kind: "warn", text: "o desconto de cupom tá calculado em 4 lugares diferentes" },
      { kind: "ok", text: "a regra nova em si tá certa" },
    ],
    result: "Entra com um ajuste: junta o cálculo do cupom num lugar só. Te mostro como fica.",
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
  "corno-limpa": {
    you: "o Mac tá dizendo que o disco tá cheio e eu nem consigo atualizar o sistema",
    steps: [
      { kind: "ok", text: "o Chrome tinha baixado sozinho uma IA de 4 GB: desliguei e apaguei" },
      { kind: "ok", text: "38 GB de dependências de projetos parados (voltam quando precisar)" },
      { kind: "ok", text: "12 GB de simuladores de iPhone que nem abrem mais" },
      { kind: "warn", text: "2 pastas com código que você não salvou no git: deixei" },
    ],
    result: "Tinha 9 GB livres, agora tem 63 GB. Já dá pra atualizar.",
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
