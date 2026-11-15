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
