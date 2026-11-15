# Catálogo de componentes e blocos

Quando a casa não tem o que precisa (degrau 5 da escada), estes são os lugares para buscar. Antes de propor qualquer um:

- Confira se combina com a stack: React, Tailwind, e **a mesma primitiva** do projeto (Radix, Base UI ou React Aria).
- Prefira registry do shadcn (`npx shadcn@latest add @<namespace>/<item>`): o código vira do projeto e segue os tokens. Registry novo se adiciona em `components.json` (`npx shadcn@latest registry add @<namespace>` quando o registry está no índice público).
- Nunca instale uma biblioteca inteira para um efeito só. Copie o item.
- Confira a licença no repositório antes de usar em produto pago.
- Pergunte antes de instalar.

## Componentes de app (produto)

| Fonte | O que tem | Primitiva | Como trazer |
|---|---|---|---|
| [coss ui](https://coss.com/ui) | 56 componentes de app (o kit do Cal.com): Combobox, Autocomplete, Date Picker, Number Field, OTP, Segmented Control, Toast, Composer… | Base UI | Código copiado para o projeto; veja `/ui/docs/get-started` |
| [Animate UI](https://animate-ui.com) | Versões animadas das primitivas (Switch, Tabs, Accordion, Checkbox, Toast, Sliding Number) mantendo a API do shadcn | Radix, Base UI ou React Aria | `npx @animate-ui/cli@latest animate <componente> --dry-run` troca as primitivas dos componentes shadcn existentes; precisa de `motion` |
| [ABUI](https://www.abui.io) | Blocos de agenda e tempo: Timeline estilo Gantt com arrastar e validação de conflito, Availability, Calendar Year; componentes Radio Tabs, Timeline Steps, Table of Contents, Scroll Progress | — (dnd-kit no Timeline) | Código-fonte no GitHub e "Open in v0" em cada bloco |
| [Better Upload](https://better-upload.com) | Upload direto para S3, R2, Backblaze, Tigris, com dropzone pronta | — | `npm i @better-upload/server @better-upload/client` e `npx shadcn@latest add @better-upload/upload-dropzone`; adaptadores para Next.js, TanStack Start, Remix, Hono, Elysia, Express e Fastify |
| [LiveKit Agents UI](https://livekit.com/products/agents-ui) | Interface de agente de voz: visualizadores de áudio (Aura, Wave, Radial, Grid, Bar) com estados ouvindo/falando/pensando, barra de controle, transcrição, sessão completa | shadcn | `npx shadcn@latest registry add @agents-ui`, depois `npx shadcn@latest add @agents-ui/agent-session-view-01` |

## Landing e marketing

Efeitos e blocos daqui são para página de marketing. Em tela de produto, quase sempre viram ruído (veja "Cara de IA" no checklist).

| Fonte | O que tem | Como trazer |
|---|---|---|
| [Tailark](https://tailark.com) | Blocos de site: hero, features, pricing, stats, footer, páginas inteiras e ilustrações | `@tailark-oss` (grátis, sem chave: famílias Mist, Dusk e Veil) e `@tailark` (pago, com chave). Base UI por padrão; versão Radix em `/r/radix/{nome}.json` |
| [Magic UI](https://magicui.design) | Marquee, Bento Grid, Dock, Terminal, Globe, Number Ticker, Text Animate, Blur Fade, Animated Beam, Border Beam, mocks de Safari/iPhone/Android, fundos (Dot Pattern, Retro Grid) | `npx shadcn@latest add @magicui/<item>` |
