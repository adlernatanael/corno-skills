# Hierarquia, composição e texto

O que separa tela "desenhada" de tela "gerada" quase nunca é efeito: é hierarquia. Tela gerada é plana, com tudo do mesmo tamanho, peso e espaço, e o olho não sabe para onde ir.

## Um foco por tela

Cada tela existe para uma coisa. Diga qual é antes de mexer e faça ela ganhar por tamanho, contraste, posição ou espaço em volta. O resto desce de nível de propósito. Se tudo compete, nada ganha.

## Escala tipográfica

- Escolha uma razão e suba por ela, em vez de escolher tamanho no olho: ~1,2 para UI densa, ~1,25 para a maioria dos produtos, ~1,333 para telas expressivas. Base de 14 px a 1,25 dá aproximadamente 11 · 14 · 16 · 18 · 22 · 28 · 44. Arredonde para pixel inteiro.
- **Peso e cor fazem mais hierarquia que tamanho.** No mesmo 14 px cabem três níveis: valor (600, cor principal), rótulo (500, secundária), meta (400, apagada). Use os três controles juntos (tamanho, peso, cor), nunca só tamanho.
- Título grande pede tracking levemente negativo; texto corrido pede entrelinha ~1,5 e linha de até ~75 caracteres.
- Teste do olho apertado: aperte os olhos para a tela. Se não distingue título de corpo de rótulo, a hierarquia está fraca.

## Densidade e ritmo

- Densidade é decisão, com número: painel de ferramenta com 12 a 16 px de padding parece bancada; o mesmo card com 24 px parece folheto. Escolha e repita o mesmo número em todo lugar.
- Espaço desigual de propósito: agrupe colado o que é relacionado e ponha ar de verdade entre grupos. Mesmo gap em tudo é sinal de que ninguém decidiu.
- Proporção fala: uma barra lateral de 280 px diz "a navegação serve o conteúdo"; uma de 360 px diz "são pares".

## Cor e superfícies

- ~60/30/10: superfície neutra dominante, um tom secundário, ~10% de destaque. Cinza estrutura; cor comunica (status, ação, identidade). Cor sem motivo é ruído.
- Um destaque usado com intenção vale mais que cinco sem pensar.
- Hierarquia por espaço e peso antes de linhas. Antes de pôr borda ou divisor, tente espaço ou uma mudança sutil de tom.
- Elevação em degraus pequenos: página, card, popover, cada um poucos pontos de luminosidade acima do anterior (no escuro) ou com sombra (no claro). Popover sempre um degrau acima de quem o abriu.
- Barra lateral com o mesmo fundo do conteúdo, separada por uma borda sutil, não por outra cor.
- Campo de texto levemente mais escuro que o entorno: ele recebe conteúdo.
- Bordas com cor translúcida (algo entre 6% e 12% de opacidade sobre o fundo) somem quando você não procura e aparecem quando precisa. Hex sólido fica duro.

## Usar o que existe

A forma mais comum de uma IA estragar um código: construir de novo o que já existe. Para controles, a ordem é:

1. **HTML nativo** quando serve: `<button>`, `<a>`, `<input>`, `<dialog>`, `<details>`.
2. **Primitiva acessível** já instalada para tudo que tem estado difícil (select, combobox, dialog, popover, tooltip, menu, tabs, date picker).
3. **Na mão** só em último caso, e aí com o contrato completo: setas, Enter, Esc, foco preso e devolvido, ARIA, clique fora, trava de rolagem.

Para estilo: componente ou variante da casa → token semântico (`bg-card`, `text-muted-foreground`, nunca `bg-white`, `text-gray-500`) → utilitário só para ajuste único. A mesma string longa de classes repetida em vários lugares é um componente ou token faltando.

## Texto de interface

- Palavras existem na tela para facilitar o uso, não para enfeitar. Antes de escrever, pergunte o que a tela precisa dizer.
- Nomeie pelo que a pessoa entende, não pelo que o sistema faz: "notificações", não "configuração de webhook".
- Voz ativa. O botão diz o que acontece ("Salvar alterações", não "Enviar"), e a ação mantém o nome no fluxo inteiro: o botão "Publicar" gera o aviso "Publicado".
- Erro explica o que houve e como resolver, sem pedir desculpa e sem ser vago. Estado vazio é convite para agir.
- Frase com só a primeira letra maiúscula, verbos simples, sem enchimento. Cada texto faz um trabalho só.

## Tela nova: plano antes do código

Quando for criar e não revisar, escreva um plano curto antes:

- **Quem e o quê**: quem usa, o verbo principal da tela, como deve parecer (com palavras que dizem algo: "denso como mesa de operação", não "limpo e moderno").
- **Tokens**: 4 a 6 cores nomeadas, fontes e papéis, escala de espaço.
- **Layout**: um wireframe em ASCII e o alinhamento.
- **Uma marca**: um elemento que só faria sentido neste produto.

Depois releia o plano e pergunte: outra IA, com um pedido parecido, chegaria no mesmo lugar? Se sim, troque a parte genérica e diga o que trocou. Gaste a ousadia num lugar só e deixe o resto quieto.
