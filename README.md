# Corno

Skills em português para agentes de código. Funcionam no Claude Code e em qualquer agente que lê skills no formato de pasta com `SKILL.md`.

Site: [corno.dev](https://corno.dev)

## Curral das skills

| Skill | O que faz |
|---|---|
| `corno-com-tdah` | Responde no formato que uma cabeça com TDAH consegue usar na hora: próxima ação primeiro, passos numerados. |
| `corno-confere` | Antes de dizer que terminou, roda a verificação e mostra a saída. |
| `corno-cria-skill` | Cria uma skill nova ou dá acabamento numa existente, no padrão deste repositório. |
| `corno-humano` | Reescreve um texto para soar como gente escrevendo, sem cara de IA. |
| `corno-investiga` | Investiga bug difícil ou lentidão com método: reproduz, levanta hipóteses, testa uma por vez. |
| `corno-limpa` | Libera espaço em disco no macOS, Windows ou Linux sem apagar o que importa, incluindo o modelo de IA de 4 GB que o Chrome baixa sozinho. |
| `corno-pesquisa` | Pesquisa em fontes primárias e salva o que achou num Markdown com links. |
| `corno-revisa` | Revisão de código pesada sobre estrutura e manutenção. Só roda quando chamada pelo nome. |
| `corno-testa` | Desenvolve com teste primeiro. |
| `corno-visagem` | Tira a cara de IA da interface e revisa como front-end sênior, usando o que o projeto já tem. |

## Instalar

**Claude Code**, dentro de uma sessão:

```
/plugin marketplace add adlernatanael/corno-skills
/plugin install corno@corno
```

**Qualquer agente**: clone e copie as pastas para onde o seu agente lê skills (o exemplo usa a do Claude Code):

```bash
git clone https://github.com/adlernatanael/corno-skills.git ~/corno-skills
cp -R ~/corno-skills/skills/* ~/.claude/skills/
```

Ou baixe o `.zip` de uma skill (ou de todas) no site e descompacte na pasta de skills.

## Estrutura

```
skills/<nome>/       uma pasta por skill: SKILL.md, references/, scripts/
scripts/             ferramentas do repositório (check-skills.mjs)
site/                a landing (Astro), gerada a partir das próprias skills
.claude-plugin/      manifesto do plugin e do marketplace do Claude Code
```

## Desenvolver

```bash
node scripts/check-skills.mjs          # valida todas as skills
claude plugin validate .               # valida o plugin
cd site && npm install && npm run dev  # site em http://127.0.0.1:5191
```

Para criar ou revisar uma skill, peça ao agente: ele usa a `corno-cria-skill`, que tem o padrão completo.
