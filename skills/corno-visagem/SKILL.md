---
name: corno-visagem
description: Front-end sênior com preguiça boa - faz a menor mudança completa na interface, reaproveitando os componentes, tokens e primitivas que o projeto já tem, e escreve UI sem cara de IA, com hierarquia, estados, acessibilidade e movimento no padrão. Use quando for criar ou mexer em tela, componente, landing ou estilo, ou quando pedirem "faz essa tela", "deixa mais bonito", "melhora o visual", "tira a cara de IA", "arruma esse layout" ou "polish this UI".
---

# Corno visagem

A melhor interface é a que usa o que já existe. Escreva a menor mudança que resolve o pedido inteiro, no padrão da casa e sem slop, e termine dizendo o que ficou de fora.

## Antes de escrever

1. **Leia o pedido e o código que ele toca.** Liste onde a mudança precisa chegar: o componente, quem o usa, estilos, testes, stories ou fixtures. Isso é o escopo; enfeite não é.
2. **Reconstrua o sistema da casa** em poucas linhas, lendo só o que existir: `DESIGN.md` ou guia de estilo, `AGENTS.md`/`CLAUDE.md`, `components.json`, tokens (`@theme`, `tailwind.config.*`, variáveis CSS), a pasta de componentes e 2 telas vizinhas que já estão boas. Regra de UI escrita no projeto vence tudo daqui.
3. **Saiba que tela é.** *Operar* (app, painel, configurações): precisão e padrão conhecido vencem expressão. *Convencer* (landing, preço): cabe ousadia, num momento só. *Ler* (docs, artigo): estrutura e conforto de leitura.

## A menor mudança completa

Para cada parte do pedido, pegue o primeiro degrau que resolve:

1. Precisa existir? Opção, variante e animação que ninguém pediu ficam de fora; diga numa linha o que pulou.
2. A casa já tem o componente, a variante ou o token? Use do jeito que os vizinhos usam.
3. A primitiva instalada (Radix, Base UI, React Aria) ou um elemento HTML nativo resolve? Use.
4. Um registry já configurado em `components.json` tem? `npx shadcn@latest add <item>`.
5. Um registry novo de `references/catalogo.md`? Proponha e pergunte antes de instalar.
6. Senão, o mínimo de código, no estilo do arquivo.

Preguiça na solução, nunca na mudança. Junto com a tela vêm os estados (vazio, carregando, erro, texto longo), o celular, o teclado e o foco. Sem wrapper, prop, variante ou token "para depois". Valor arbitrário só quando não existe token, com uma linha dizendo por quê.

## Nunca escreva

- Gradiente de fundo, de texto, de borda ou de botão; a paleta roxa/índigo padrão de IA.
- Brilho, sombra colorida, vidro fosco decorativo.
- Emoji como ícone; ✨ para dizer "IA"; ícone em quadradinho colorido em toda lista.
- Card dentro de card; o mesmo raio e a mesma sombra em tudo; tudo centralizado.
- Rótulo em caixa alta acima de todo título; uma palavra do título em outra cor; 01/02/03 em conteúdo que não é sequência; "→" em todo botão.
- Fade-in em cada seção; hover que levanta todo card.
- Texto inflado ("Desbloqueie", "Potencialize", "Revolucione") e números inventados.

A única exceção é o projeto pedir aquilo por escrito, como um gradiente que faz parte da marca.

## O padrão sênior enquanto escreve

- **Hierarquia**: um foco por tela, escala tipográfica por razão, peso e cor antes de tamanho, densidade decidida. Veja `references/hierarquia.md`, que também tem o plano para tela nova do zero.
- **Detalhes com número**: raio concêntrico, alinhamento óptico, sombra ou borda, ícones, transições. Veja `references/polimento.md`.
- **Movimento**: o quanto animar depende de quantas vezes por dia a pessoa vê aquilo; só `transform` e `opacity`; respeite movimento reduzido. Veja `references/movimento.md`.
- **Acessibilidade**: elemento nativo antes de ARIA, nome em botão de ícone, rótulo em campo, foco visível, alvo de 44 px no toque, contraste nos dois temas. Nunca corte isso para ficar bonito.
- **Texto**: o botão diz o que faz, o erro diz como sair, o vazio convida a agir.
- **Um sistema por superfície**: uma família de primitivas, uma biblioteca de ícones. Não migre biblioteca, Tailwind ou tema sem pedido.

## Quando não usar

Para só apontar problemas sem mexer no código, use a `corno-sendo-corno`. Para back-end puro, nenhuma das duas.

## Pronto quando

- Lint, typecheck e testes do projeto passam, com a saída na resposta.
- Se der para ver a tela (servidor de dev, story, fixture), você conferiu no celular e no desktop. Se não deu, diga que não viu.
- A resposta termina com uma ou duas linhas: o que você pulou ou não conferiu, e o risco que a pessoa precisa saber.
