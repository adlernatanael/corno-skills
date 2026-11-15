# Polimento: os detalhes com número

Só depois que a interação funciona. Detalhe de polimento nunca passa na frente de interação quebrada. Se o projeto tem uma convenção deliberada e consistente (por exemplo, nenhuma sombra), ela vence esta lista. O mesmo detalhe feito de dois jeitos dentro do projeto é achado.

## Raio concêntrico

Superfície dentro de superfície com recuo uniforme: **raio de fora = raio de dentro + padding + borda**. Card `rounded-2xl` (16 px) com `p-2` (8 px) pede filho `rounded-lg` (8 px). Mesmo raio nos dois fica visivelmente errado. Acima de ~24 px de padding, trate como superfícies separadas e mantenha o token de cada uma.

## Alinhamento óptico

Centro geométrico às vezes parece torto. Ajuste no olho:

- Botão com texto e ícone: comece com ~2 px a menos de padding do lado do ícone (`ps-4 pe-3.5`).
- Triângulo de play: desloque ~2 px na direção da ponta.
- Ícone assimétrico (estrela, seta, chevron): corrija no `viewBox` do SVG; se não der, `translate-x-px` no invólucro.

## Sombra para profundidade, borda para estrutura

- Borda que só existe para dar profundidade vira sombra em camadas translúcidas (um anel de 1 px a ~6% de preto, mais uma sombra curta e uma difusa bem fracas). No escuro, sombra some: use só um anel claro a ~8%.
- Mantenha borda em divisores, células de tabela, estado selecionado e campos de formulário (o contorno do campo precisa de contraste 3:1).
- Debaixo de anel de sombra, deixe `border: 1px solid transparent`: o modo de alto contraste do Windows apaga sombras e desenha essa borda.

## Contorno de imagem

Imagem de conteúdo ganha contorno de 1 px para dentro: `outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10`. Sempre preto ou branco puros com transparência, nunca um cinza tingido da paleta (vira franja colorida). Pule logos e ilustrações com fundo transparente.

## Botões e toque

- Botão pressionado encolhe para `0.96` em 150 ms com `ease-out`. Nunca menos que isso (`scale-95`, `scale-90` parecem quebrar). Desabilitado não encolhe (`enabled:active:scale-[0.96]`).
- Hover só em ponteiro que tem hover: `@media (hover: hover)`. No toque, `:hover` gruda depois do toque e parece selecionado. O `hover:` do Tailwind 4 já faz isso; o do 3 não.
- Controle com estado de pressionado próprio: `-webkit-tap-highlight-color: transparent`, para não somar com o flash cinza.
- Diálogo, gaveta, menu e painel com rolagem: `overscroll-behavior: contain`, para a página de trás não rolar junto.

## Ícones

- Uma biblioteca de ícones por superfície.
- Traço do ícone acompanha o peso do texto do lado: ~1,5 px com texto 400, ~2 px com 500/600, ~2,5 px com 700.
- Ícone usa `currentColor`; hover, selecionado e desabilitado vêm de cor e opacidade no CSS, nunca de outro arquivo. Contorno é o padrão; preenchido marca o ativo.
- Em RTL, espelhe só ícone cujo sentido segue a leitura (setas de voltar e avançar), nunca play, relógio ou logo.

## Transições

- Nomeie as propriedades: `transition-property: scale, opacity`. Nunca `transition-all`.
- Estado interativo (aberto, ativo, hover) usa transição, não `@keyframes`: transição volta do meio se a pessoa reverter, keyframe não.
- Troca de tema: desligue todas as transições, aplique o tema, force um reflow e religue no próximo frame. Senão toda cor anima junto e a troca borra (`next-themes` tem `disableTransitionOnChange`).
- `will-change` só depois de ver engasgo no primeiro frame, e nomeando a propriedade animada. Nunca `will-change: all`.

## Antes de terminar

| Se achar | Troque por |
|---|---|
| Pai com padding e filho com o mesmo `rounded-*` | Raio de fora = dentro + padding |
| `box-shadow: 0 0 0 1px` sem borda | Somar `border: 1px solid transparent` |
| `outline-slate-*`, `outline-zinc-*` ou hex em `img` | `outline-black/10 dark:outline-white/10` |
| `transition-all` | Propriedades nomeadas |
| `animation:` em `:hover` ou classe que liga e desliga | Transição nas mesmas propriedades |
| `active:scale-95` ou menor | `0.96`, e excluir desabilitado |
| `fill="#..."` ou `stroke="#..."` dentro de ícone | `currentColor` |
| `:hover` em CSS puro ou Tailwind 3 fora de `@media (hover: hover)` | Envolver na media query |
| Diálogo ou menu com `overflow-y-auto` sem `overscroll-behavior` | `overscroll-behavior: contain` |
