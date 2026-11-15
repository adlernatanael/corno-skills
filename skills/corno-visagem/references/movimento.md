# Movimento

Animação boa a pessoa não percebe; animação ruim ela sente toda vez. Antes de adicionar ou corrigir, mapeie a stack (CSS, Motion, React Spring, GSAP), os tokens de easing e duração que já existem e a personalidade do produto (app divertido ou painel sério). Estenda os tokens da casa; não crie uma escala paralela.

## Frequência decide

| Quantas vezes por dia | Exemplos | Regra |
|---|---|---|
| Dezenas ou centenas | atalho de teclado, paleta de comandos, hover em linha, troca de aba, digitação | Sem animação, ou no máximo 150 ms de `opacity`/cor |
| Algumas | modal, popover, toast, menu | Curta e funcional, 150 a 250 ms |
| Raras | primeiro carregamento, sucesso, estado vazio, onboarding | Pode ser expressiva |

Ação disparada pelo teclado nunca espera animação para acontecer.

## Easing e duração

- Entrada e resposta a interação: `ease-out` (rápido no começo, sente-se responsivo). Um bom padrão forte: `cubic-bezier(0.23, 1, 0.32, 1)`.
- Nunca `ease-in` em interface: começa devagar e parece travado.
- Movimento de um ponto a outro na tela: `ease-in-out`.
- Durações: feedback até 150 ms; elementos pequenos até 200 ms; modal e gaveta 200 a 300 ms. Mais que 300 ms em UI de produto parece lento.
- Saída é mais curta e menor que a entrada: ~150 ms, um deslocamento pequeno e fixo (não a altura inteira do elemento). Gaveta que fecha pode deslizar até o fim porque o destino tem significado.
- Mola em UI: sem quique (`bounce: 0`). Quique só em momento raro e lúdico.

## Física e origem

- Nada nasce do zero: entrar de `scale(0.95)` com `opacity: 0`, nunca de `scale(0)`.
- Popover e menu crescem a partir do gatilho (`transform-origin` no lado do botão; Radix e Base UI expõem a variável). Modal centralizado cresce do centro.
- Para entrada em sequência que comunica hierarquia (título, texto, ações), escalone ~100 ms entre blocos. Nunca escalone interação de rotina, nem lista longa.
- Troca de ícone em estado raro (copiar → copiado, play → pause): cruze os dois com escala de ~0,25 para 1, opacidade e um pouco de blur, ~300 ms.

## Interrupção

- Estado que liga e desliga usa transição ou mola, que retomam do meio se a pessoa reverter. Keyframe roda uma linha do tempo fixa e pula.
- `AnimatePresence` em volta de troca de estado: `initial={false}`, para o estado padrão não animar ao montar. Não use isso numa entrada intencional.

## Desempenho

- Anime só `transform` e `opacity` (e `filter` com cuidado). Nunca `width`, `height`, `top`, `left`, `margin`, `padding`.
- Nada de `blur()` ou `backdrop-filter` grande animado.
- Pause loop fora da tela (IntersectionObserver ou a opção do próprio componente).
- Animação ligada à rolagem: `animation-timeline: scroll()` ou `view()` em CSS antes de listener de scroll em JS.

## Acessibilidade

- Movimento, escala e blur só com `prefers-reduced-motion: no-preference` (`motion-safe:` no Tailwind, `MotionConfig reducedMotion="user"` no Motion).
- Com movimento reduzido, troque por um fade curto de opacidade, não por sumir na hora.
- Toda mudança animada também deixa uma pista parada (cor, ícone, texto). Movimento nunca é o único sinal.

## Oportunidades que costumam faltar

- Feedback de clique no botão principal (escala 0,96).
- Origem certa em popovers que hoje surgem do centro.
- Transição de altura em accordion via `grid-template-rows: 0fr → 1fr` em vez de animar `height`.
- Contador numérico que anima o valor (com `tabular-nums` para não tremer).
