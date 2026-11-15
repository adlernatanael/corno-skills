// What each skill does, for the person deciding whether to install it. The SKILL.md is written for the agent; this
// is the same skill explained to a human, in a few short paragraphs. A skill missing here falls back to its
// description on the page.
export const ABOUT: Record<string, string[]> = {
  "corno-confere": [
    "Agente de IA mente muito dizendo que está pronto. Você vai olhar e faltou o item que pediu no meio da conversa, o botão saiu cinza em vez de preto e o “funciona” era palpite.",
    "A corno-confere é o chicote contra isso. Antes de qualquer “pronto”, ela relê a conversa inteira e põe lado a lado o que foi pedido e o que foi entregue, item por item. Não basta ter feito: tem que ser do jeito que foi pedido, com prova rodada agora (o arquivo e a linha, o teste, o print).",
    "O que ela corrigir obriga uma segunda volta, inteira, do zero, porque correção quebra o que estava certo. “Pronto” só sai quando uma volta passa sem mudar nada. Instalada como plugin, um hook segura o agente quando ele tenta encerrar dizendo que terminou sem conferir.",
  ],
  "corno-testa": [
    "Teste primeiro, do jeito que dá certo: escreve o teste que mostra o comportamento, vê ele falhar pelo motivo certo, escreve o mínimo para passar e só então arruma o código.",
    "Um teste de cada vez, sempre pela interface pública. Ela evita os testes que enganam: o que quebra a cada refatoração, o que calcula o esperado do mesmo jeito que o código e o que foi escrito todo de uma vez antes de qualquer código.",
    "Em bug, o bug vira primeiro um teste que falha. Depois de corrigido, o teste fica lá para ele não voltar.",
  ],
  "corno-investiga": [
    "Para bug difícil, teste que falha de vez em quando ou coisa que ficou lenta. Em vez de chutar uma correção, ela monta um jeito rápido de fazer o problema aparecer: um teste, um curl, um script de navegador ou um git bisect.",
    "Com o problema aparecendo sempre, ela encolhe o caso, levanta hipóteses e testa uma por vez, até ligar e desligar o bug de propósito. Só corrige quando a causa está provada, na raiz, e deixa um teste para segurar.",
    "No fim você recebe a causa em uma frase, a prova e o que mudou. Se não der para reproduzir, ela para e pede o que falta (um log, os passos, um acesso) em vez de inventar.",
  ],
  "corno-revisa": [
    "Revisão de código pesada, focada em estrutura e manutenção, não em vírgula. A pergunta é sempre a mesma: a mudança deixou o código mais simples de entender e de mexer, ou só funciona?",
    "Ela pega arquivo que passou de mil linhas, if espalhado em fluxo que não tem nada a ver, abstração que não paga o que custa, embrulho que só repassa e fallback silencioso. Cada apontamento vem com o que mudar, onde e por que fica mais simples.",
    "Como é pesada, só roda quando você chama pelo nome: /corno-revisa.",
  ],
  "corno-pesquisa": [
    "Responde com o que as fontes dizem, não com o que parece certo. Para perguntas como “qual versão suporta isso”, “a doc ainda diz isso” ou “qual dessas bibliotecas usar”.",
    "Ela vai primeiro na documentação oficial, no código, no changelog e na especificação. Blog e fórum só servem para achar a fonte primária. Cada fato sai com link, versão e data, e o que é dedução fica marcado como dedução.",
    "O resultado fica salvo num Markdown no seu repositório, para você não pesquisar a mesma coisa duas vezes.",
  ],
  "corno-visagem": [
    "Um front-end sênior dentro do seu agente. Ela resolve o pedido inteiro escrevendo o mínimo de código novo: antes de criar qualquer coisa, procura o componente, o token ou a primitiva que o projeto já tem.",
    "Ela não escreve cara de IA: nada de gradiente roxo, brilho, emoji como ícone, card dentro de card ou fade em cada seção. E também não economiza no que importa: acessibilidade, estados de vazio, carregando e erro, celular e teclado entram junto.",
    "No fim ela diz o que deixou de fora ou não conferiu, e o risco que você precisa saber.",
  ],
  "corno-sendo-corno": [
    "A pessoa chata da revisão de interface: olha uma tela, um componente ou o site inteiro e aponta tudo que está errado, sem encostar no código.",
    "Ela compara com o padrão que o seu projeto já tem, não com o gosto dela. Procura cara de IA, componente fora do padrão, estado faltando, acessibilidade quebrada e layout que estoura no celular.",
    "Cada achado vem com arquivo e linha, gravidade (grave, médio, leve), por que importa e como corrigir. Se você quiser a correção, ela passa a lista para a corno-visagem.",
  ],
  "corno-humano": [
    "Tira a cara de IA de um texto sem mudar o que ele diz: o texto do site, o roteiro do vídeo, o post, o README, o e-mail.",
    "Ela corta os vícios que entregam IA: “não é X, é Y”, frase de efeito no fim do parágrafo, tudo em trios, travessão em toda frase, “revolucione”, “potencialize”, “especialistas dizem”. Frase que já soa humana fica como está.",
    "O jeito de falar continua o seu, com as suas gírias e o seu ritmo. Nenhum fato, número ou promessa some, e no fim vem uma lista curta do que mudou.",
  ],
  "corno-com-tdah": [
    "Muda o jeito de responder para uma cabeça com TDAH conseguir usar na hora. A primeira linha é sempre o que fazer agora.",
    "Passos numerados, uma ação por passo, no máximo cinco itens, tempo em número (“15 minutos”) e um lembrete de onde vocês estão a cada resposta. Sem abertura, sem resumo do que fez e sem despedida.",
    "Vale para a conversa inteira, até você pedir para sair.",
  ],
  "corno-julgador": [
    "Descubra se sua ideia é digna de um próximo Elon Musk ou só mais um embalador do atacado. É o consultor que fala a verdade antes de você gastar um ano e dinheiro descobrindo sozinho.",
    "Ela procura onde a ideia quebra: quem paga, por quê, quanto, como o cliente chega até você e o que impede alguém de copiar amanhã. Número de mercado só entra com fonte.",
    "Você recebe um veredito em cinco níveis, os três defeitos que mais podem matar a ideia e um teste de 7 dias, com o número que diz “continua” e o que diz “para”. Dura com a ideia, nunca com você.",
  ],
  "corno-recrutador": [
    "Lê seu currículo ou seu LinkedIn como um recrutador com 200 candidatos na fila. Primeiro diz o que ele vê nos primeiros 6 segundos, depois lê com calma.",
    "Ela lê o arquivo como os sistemas de triagem leem, dá uma nota de 0 a 100, aponta o que te elimina e monta um plano de até 7 mudanças, da que mais rende para a que menos rende. Com uma vaga junto, mede também a aderência a ela.",
    "Reescreve os itens mais fracos sem inventar nada: onde falta um número que só você sabe, ela deixa {XX} para você preencher. Aceita .pdf, .doc, .docx ou o texto do perfil colado.",
  ],
  "corno-limpa": [
    "Libera espaço em disco no macOS, no Windows ou no Linux sem apagar nada que você sentiria falta. Ela mede antes de propor, então você decide vendo os tamanhos.",
    "Ela separa o que volta sozinho (caches, dependências, builds, simuladores, emuladores, modelos de IA, versões velhas de navegador) do que é seu e não volta (documentos, fotos, chaves, código sem commit). O primeiro sai com uma confirmação por categoria; o segundo só com a sua decisão.",
    "Confere o git antes de tocar em qualquer pasta com código, desliga o que se baixa de novo sozinho (como a IA de 4 GB que o Chrome baixa) e termina com o espaço de antes e de depois.",
  ],
  "corno-cria-skill": [
    "Cria uma skill nova ou dá o acabamento numa que já existe, no padrão deste repositório.",
    "Antes de escrever, ela responde que comportamento do agente muda e com que frases a skill deve disparar. Depois escreve curto, em português direto, com o detalhe em arquivos de referência e os scripts testados.",
    "Ela só diz que terminou depois de passar o validador do repositório e o do plugin, ver a página da skill no site e testar a skill numa conversa nova.",
  ],
};
