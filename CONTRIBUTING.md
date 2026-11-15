# Contribuir

## Uma skill nova ou mudança numa existente

1. Siga o padrão de `skills/corno-cria-skill/SKILL.md`: pasta `skills/corno-<nome>/`, `name` igual à pasta, descrição com "Use quando…" e as frases que disparam a skill, corpo curto com "Quando não usar" e "Pronto quando".
2. **Texto próprio.** Escreva do zero. Não copie nem traduza trechos de outras skills, docs ou posts, e não cite autores ou projetos de terceiros como fonte. Ferramentas que a skill manda usar podem ser nomeadas.
3. Script novo é só leitura por padrão, roda nos sistemas que a skill promete e diz no topo como usar.
4. Coloque a skill na tabela do `README.md`, no grupo certo, e no mapa de grupos em `site/src/lib/skills.ts`.
5. Rode antes de abrir o PR:

   ```bash
   node scripts/check-skills.mjs
   claude plugin validate .
   cd site && npm run build
   ```

6. Teste de verdade: numa conversa nova, diga uma das frases de gatilho e confira que a skill entrou e mudou o comportamento.

## Site

Mudanças visuais seguem a `corno-visagem`: sem gradiente, sem brilho, sem emoji como ícone, com os tokens de `site/src/styles/global.css`, conferidas em 375 px e 1280 px. Os textos da tela do celular e o nome "Curral das skills" são fixos.

## Commits

Mensagem em inglês no formato `tipo: resumo` (`feat`, `fix`, `docs`, `chore`), sem trailer de coautoria de IA.
