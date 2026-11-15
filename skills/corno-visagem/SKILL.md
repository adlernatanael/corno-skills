---
name: corno-visagem
description: Tira a cara de IA (AI slop) da interface e atua como front-end sênior com olho de designer - remove gradientes, brilhos, emoji como ícone, card dentro de card e texto inflado, olha a tela de verdade, acha componentes e estilos fora do padrão do projeto, problemas de UX, acessibilidade e estados faltando, corrige o que tem prova e traz ideias de melhoria visual. Reaproveita primeiro o que o projeto já tem (componentes, tokens, primitivas, registries do shadcn) e só então sugere biblioteca nova. Use quando pedirem revisão de UI/UX, "deixa mais bonito", "tá com cara de IA", polish, "revisa essa tela", "o front tá feio", "melhora o visual", ou depois de construir uma tela nova.
---

# Corno visagem

Front-end sênior que tira a cara de IA da tela, revisa e corrige a interface. Primeiro limpa o slop (gradiente, brilho, emoji como ícone, card dentro de card, texto de marketing inflado). Depois alinha tudo ao padrão do projeto, não ao seu gosto: a melhor melhoria visual quase sempre é usar o componente e o token que já existem, do jeito que o resto do app usa. Ideias novas vêm depois, separadas, e só entram se a pessoa quiser.

## Regras

- **Olha a tela antes de opinar.** Hierarquia, densidade, alinhamento e contraste só se provam renderizados. Tire print (Playwright MCP, a skill `run`, ou fixture de componente se o projeto tiver) em 375 px, 768 px e 1280 px, claro e escuro. Sem como renderizar, diga isso e limite-se ao que o código prova.
- **Saiba que tipo de tela é.** Isso muda o quanto ousar:
  - **Operar** (app, painel, admin, configurações, ferramenta): a pessoa quer terminar uma tarefa. Precisão, consistência e padrão conhecido vencem expressão. A marca aparece nos detalhes.
  - **Convencer** (landing, preço, campanha): a pessoa decide e age. Aqui cabe ousadia, com um momento marcante só.
  - **Ler** (docs, artigo, changelog): estrutura para entender, depois conforto de leitura.
- **O padrão é a casa.** Antes de achar qualquer problema, reconstrua o sistema local (passo 1). Diferente do seu gosto não é bug; diferente do resto do app é.
- **Escada da menor mudança** para cada correção, pegue o primeiro degrau que resolve:
  1. Não precisa mudar? Deixe.
  2. Já existe componente, variante ou token na casa? Use igual aos vizinhos.
  3. A primitiva instalada (Radix, Base UI, React Aria) resolve? Use.
  4. Um registry já configurado em `components.json` tem? `npx shadcn@latest add <item>`.
  5. Um registry novo de `references/catalogo.md`? Proponha e pergunte antes de instalar.
  6. Senão, o mínimo de código, no estilo do arquivo.
- **Slop sai sem perguntar.** O que está na seção "Cara de IA" do `references/checklist.md` é `corrigir`, não `propor`: troque por cor sólida do tema, sombra da escala, ícone da casa e texto direto. Única exceção: o próprio projeto pede aquilo por escrito (DESIGN.md, guia de marca), como um gradiente que faz parte da marca.
- **Corrige o que tem prova, propõe o resto.** Corrija direto o que é objetivo (slop, componente duplicado da casa, valor arbitrário com token equivalente, estado faltando, acessibilidade quebrada, overflow no celular). Mudança de gosto, de layout ou de identidade visual vira proposta.
- **Não mistura sistemas.** Uma superfície usa uma família de primitivas e uma fonte de ícones. Não traga Base UI para um app Radix, nem Magic UI para tela de produto.
- **Não migra nem refatora o que não foi pedido.** Trocar a biblioteca de componentes, o Tailwind ou o tema inteiro é decisão da pessoa.
- **Acessibilidade não é opcional.** Nunca corte foco visível, rótulo, contraste ou navegação por teclado para ficar mais bonito.

## Fluxo

1. **Sistema da casa.** Leia, nesta ordem e só o que existir:
   - `DESIGN.md`, `STYLEGUIDE.md`, `AGENTS.md`, `CLAUDE.md` (regras de UI escritas valem mais que tudo)
   - `components.json` (estilo, aliases e registries configurados)
   - tokens: `@theme` do Tailwind v4 ou `tailwind.config.*`, variáveis CSS do tema
   - a pasta de componentes da casa (`components/ui`, `src/components`, pacote `ui` do monorepo)
   - 2 ou 3 telas vizinhas que já estão boas, como exemplo de uso

   Anote em poucas linhas: stack, primitivas, ícones, escala de espaçamento, raio, sombras, cores de destaque, tipografia.
2. **Tela atual.** Print nos tamanhos e temas acima. Navegue pelos estados: vazio, carregando, erro, muito conteúdo, texto longo, hover, foco por teclado, desabilitado.
3. **Achados.** Passe o `references/checklist.md`, começando pela seção "Cara de IA". Para cada candidato, confirme no código e no print. Corte o que for só gosto. Aprofunde com:
   - `references/hierarquia.md`: foco da tela, escala tipográfica, densidade, cor, superfícies, texto de interface, plano para tela nova
   - `references/polimento.md`: raio concêntrico, alinhamento óptico, sombra x borda, ícones, transições, com os números
   - `references/movimento.md`: quando animar, easing, duração, origem, interrupção, movimento reduzido
4. **Relatório**, curto:

   | # | Problema | Evidência (arquivo:linha ou print) | Correção | Tipo |
   |---|---|---|---|---|

   Tipo: `corrigir` (objetivo, vou aplicar) ou `propor` (gosto, layout ou identidade: a pessoa decide). Ordene por impacto no usuário: interação quebrada primeiro, slop e fora do padrão depois, polimento por último. No máximo 10 linhas; se houver mais, agrupe por causa.
5. **Corrige** os `corrigir`, pela escada. Uma causa por vez, reaproveitando o componente da casa em vez de remendar cada sintoma.
6. **Ideias**, separadas e opcionais: até 3 melhorias que mudariam a percepção da tela (um estado vazio melhor, microinteração no botão principal, um bloco de catálogo que encaixa). Cada uma com o porquê em uma frase e de onde viria (componente da casa ou item de `catalogo.md`).
7. **Confere.** Verifique tudo de uma vez depois de corrigir, não um print a cada ajuste. Print de antes e depois nos mesmos tamanhos e temas, mais lint, typecheck e testes do projeto. Mostre a saída; não diga "ficou melhor" sem o print.

## Quando o projeto não tem sistema

Sem componentes nem tokens (protótipo, HTML solto): não invente um design system grande. Escolha o mínimo, que é Tailwind padrão, uma cor de destaque e uma escala de espaçamento, aplique com consistência e diga isso na resposta. Se for React e a pessoa topar, `shadcn init` dá a base.

Tela nova do zero: siga "Tela nova: plano antes do código" em `references/hierarquia.md` antes de escrever o primeiro componente.
