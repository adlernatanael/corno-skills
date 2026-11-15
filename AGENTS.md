# Corno: guia para agentes

Repositório das skills do Corno e da landing em corno.dev. Leia o `README.md` para a visão geral.

## O que vive onde

- `skills/corno-*/`: as skills. Cada pasta é publicada como está: no plugin do Claude Code, no `.zip` do site e na página da skill.
- `site/`: Astro estático. Lê `../skills` no build (`site/src/lib/skills.ts`); nenhum conteúdo de skill é copiado à mão para o site.
- `scripts/check-skills.mjs`: validador. Roda antes de qualquer commit que mexa em `skills/`.
- `.claude-plugin/`: um marketplace (`corno`) com um plugin (`corno`) que é o próprio repositório.

## Regras

- **Texto próprio.** Todo texto de skill é escrito do zero. Não copie nem traduza trechos de skills, docs ou posts de terceiros e não cite autores ou projetos de outras pessoas como fonte. O validador recusa frases de atribuição. Ferramentas que a skill manda usar podem ser nomeadas.
- **Padrão de skill**: siga `skills/corno-cria-skill/SKILL.md`.
- **Commits** sem trailer de coautoria de IA (`Co-Authored-By`) e sem linha "Generated with". Mensagem em inglês, no formato `tipo: resumo` (`feat`, `fix`, `docs`, `chore`).
- **Site sem cara de IA.** Mudanças visuais passam pela `corno-visagem`: sem gradiente, sem brilho, sem emoji como ícone, tokens de `site/src/styles/global.css`, e conferido em 375 px e 1280 px.
- **Textos fixos da landing**: a tela do celular diz "Tu quer ver um site de skills pelo celular? é um corno mesmo" com o botão "vou abrir o curral pra tu meu boi", e a seção das skills se chama "Curral das skills". Não mude sem pedido.

## Antes de dizer que terminou

```bash
node scripts/check-skills.mjs
claude plugin validate .
cd site && npm run build
```
