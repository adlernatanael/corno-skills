# Checklist de revisão

Use como lista de candidatos, não como lei: uma regra escrita do projeto (DESIGN.md, guia de estilo) sempre vence esta lista. Prioridade de cima para baixo.

## 0. Cara de IA (slop): corrigir sempre

Sai sem perguntar, a menos que DESIGN.md ou o guia de marca peça por escrito. Troque pelo equivalente sóbrio da casa.

| Slop | Troca por |
|---|---|
| Gradiente de fundo, de texto (`bg-clip-text`), de borda ou de botão; roxo/índigo/rosa "padrão de IA" | Cor sólida do token de destaque ou neutra |
| Brilho (glow), sombra colorida, `drop-shadow` neon | Sombra da escala do projeto, ou borda |
| Glassmorphism em tudo (`backdrop-blur` + fundo translúcido em cards e nav) | Fundo sólido do tema; blur só onde há conteúdo atrás de verdade (overlay) |
| Emoji como ícone de interface; ✨ para "IA" | Ícone da biblioteca da casa, ou nenhum |
| Ícone dentro de quadradinho colorido arredondado em toda lista | Ícone simples na cor do texto, ou só o texto |
| Card dentro de card, sombra e `rounded-2xl` em tudo | Uma camada de superfície; separar com espaço ou divisor |
| Tudo centralizado, inclusive texto corrido e formulários | Alinhado à esquerda; centro só em hero curto e estados vazios |
| Grade de 3 "features" com ícone genérico e texto vago | Conteúdo real do produto, ou remover |
| Pílula "Novo ✨" acima de todo título; badges decorativos | Remover, ou badge só com informação real |
| Fundo de pontos, grade, partículas, beam, globo em tela de produto | Fundo liso do tema (efeito só em landing, e um por página) |
| Fade-in e slide em cada elemento ao rolar | Sem animação, ou só na entrada da seção principal |
| Texto inflado: "Desbloqueie", "Potencialize", "Revolucione", "sem esforço", "de ponta", números inventados ("10x mais rápido") | Frase direta que diz o que a coisa faz |
| Travessões (—) e frases de efeito em toda a copy | Pontuação comum, frase curta |
| Depoimentos, logos de clientes e métricas de exemplo deixados no ar | Remover até existir o real |
| Rótulo em CAIXA ALTA espaçada acima de todo título ("eyebrow") | Remover; o título se basta |
| Uma palavra do título destacada em outra cor, itálico ou negrito | Título inteiro no mesmo tratamento |
| Marcadores 01 / 02 / 03 em conteúdo que não é sequência | Remover; numerar só passos e linhas do tempo de verdade |
| Metadados unidos por ponto médio ("A · B · C") e rótulos "PALAVRA — trecho" | Texto comum, ou campos separados |
| "→" no fim de todo link e botão | Seta só onde indica navegação para frente |
| Fonte mono em todo rótulo pequeno | Fonte do corpo; mono só para código e dado técnico |
| Hover que levanta e brilha em todo card | Hover só no que é clicável, e discreto |
| Paletas-padrão de IA: fundo creme com acento terracota; preto com um verde-ácido ou vermelhão; "jornal" com fio fino e raio zero | Paleta que vem do mundo do produto, com um destaque só |
| Mesmo raio, mesma sombra cinza e mesmo tamanho em todos os cards | Raio e elevação conforme a hierarquia; nem tudo é card |

## 1. Fora do padrão da casa

- Componente feito à mão que já existe na casa (botão com `<div>` estilizado, modal próprio ao lado de um `Dialog` da casa, select nativo onde o app usa `Select`).
- Valor arbitrário com token equivalente: `p-[13px]`, `text-[#333]`, `rounded-[10px]`, `shadow-[...]`, cor hex no meio do JSX.
- `z-[999]` e afins em vez da escala de z-index do projeto.
- Duas famílias de primitivas ou de ícones na mesma tela.
- Raio, sombra, borda e altura de controle diferentes de componentes irmãos (input de 36 px ao lado de botão de 40 px).
- Espaçamento fora da escala, ou a mesma relação (título → conteúdo) com espaço diferente em telas vizinhas.
- Tipografia fora da escala: tamanho, peso ou entrelinha que não aparece em mais lugar nenhum.
- Cor de destaque nova sem motivo; mais de um destaque por tela.

## 2. A tela aguenta a vida real?

Abra cada estado e pergunte:

- **Sem dados**: aparece um convite claro para o primeiro passo, com um botão só? Tela em branco não vale.
- **Esperando**: o formato do conteúdo aparece antes dele (placeholder com a mesma forma), ou a tela inteira vira um spinner?
- **Deu errado**: a mensagem aparece perto de onde a pessoa clicou e diz como sair dessa? Um toast que some sozinho não basta.
- **Ação sem volta** (apagar, cancelar assinatura, sair sem salvar): pede confirmação dizendo exatamente o que se perde?
- **Hierarquia de ações**: dá para apontar a ação principal em um segundo? As outras parecem secundárias de fato?
- **Botão travado**: se está desabilitado, a tela diz o que falta? Muitas vezes é melhor deixar clicar e mostrar o que falta.
- **Formulário**: colar funciona, o que foi digitado continua lá depois de um erro, e o foco vai para o primeiro campo com problema?
- **Conteúdo hostil**: nome enorme sem espaço, número de nove dígitos, lista com 500 itens, tradução comprida (português ocupa bem mais espaço que inglês). Nada estoura nem empurra o layout.

## 3. Dá para usar sem mouse e sem enxergar bem?

- Navegue só com Tab, Shift+Tab, Enter, Espaço e Esc. Tudo é alcançável, na ordem que faz sentido, e você sempre vê onde o foco está.
- Ícone sozinho num botão precisa de um nome que o leitor de tela fale; o ícone em si fica escondido do leitor.
- Campo sem rótulo visível ou associado é campo mudo. A mensagem de erro precisa estar ligada ao campo, não só pintada de vermelho do lado.
- Clicável é `button` ou `a` de verdade. Div com onClick perde teclado, foco e significado.
- Janela modal: ao abrir, o foco entra nela e não escapa; ao fechar (inclusive com Esc), volta para quem abriu.
- Cinza claro sobre branco reprova. Meça o contraste de texto e ícone nos dois temas, e nunca use só cor para dizer "erro" ou "selecionado".
- O que aparece no hover precisa aparecer também com foco de teclado e com toque.
- Estrutura conta: títulos em ordem sem pular nível, lista como lista, tabela com cabeçalho, imagem com descrição útil (ou vazia, se for enfeite).

## 4. Cabe em qualquer tela?

- Em 375 px de largura não existe rolagem para o lado.
- Altura de tela cheia usa a unidade dinâmica (`dvh`), que não briga com a barra do navegador do celular; barras fixas respeitam o recorte do aparelho (`safe-area-inset`).
- Dedo é grosso: alvo de toque com pelo menos 44 px de lado.
- Imagem e vídeo reservam o espaço antes de carregar (`aspect-ratio`, largura e altura), para o texto não pular.
- Ícone e texto alinhados na mesma linha; cards de uma grade com as bordas batendo.

## 5. O texto respira?

- Títulos quebram em linhas equilibradas (`text-wrap: balance`) e parágrafos evitam palavra sozinha na última linha (`text-wrap: pretty`).
- Número que muda ou que se compara (preço, tabela, contador) usa algarismos de largura fixa (`tabular-nums`), para não dançar.
- Texto corrido com 60 a 75 caracteres por linha.
- Espaçamento entre letras só levemente negativo em título grande, se o sistema não define outro; caixa alta espaçada como enfeite é slop.

## 6. Movimento

Siga `movimento.md`. O mínimo: nada anima sem motivo, só `transform` e `opacity` se movem, resposta a clique é quase instantânea e quem pede menos movimento recebe menos movimento.

## 7. Tema e tokens

- Cores via token do tema, funcionando em claro e escuro; nenhuma cor fixa que some num dos temas.
- Sombras da escala padrão do projeto.
- Borda e divisor com a mesma cor de token em todo lugar.
