# Pastas de código

Objetivo: tirar tudo que reinstalar ou recompilar traz de volta e decidir sobre worktrees, clones e arquivos de dados com base no estado do git.

No Windows, rode os scripts `.sh` pelo Git Bash (vem com o Git for Windows).

## 1. Saída de build regenerável

Meça com `bash scripts/find-build-dirs.sh ~/Code` (use a raiz de código da pessoa). Ele acha e soma:

| Pasta | O que traz de volta |
|---|---|
| `node_modules` | `pnpm/npm/yarn/bun install` |
| `ios/Pods` | `pod install` ou `npx expo run:ios` |
| `ios/build`, `android/build`, `android/app/build`, `android/.gradle`, `.cxx` | o próximo build nativo |
| `.next`, `.turbo`, `.expo`, `.svelte-kit`, `.nuxt`, `.parcel-cache`, `.angular` | o próximo dev ou build |
| `target/` do Rust (muitas vezes `src-tauri/target`) ou do Maven | `cargo build` / `mvn package`; o primeiro build é lento |
| `.build/` do Swift | `swift build` |
| `.venv`, `venv`, `__pycache__`, `.pytest_cache`, `.mypy_cache`, `.ruff_cache`, `.tox` | recriar o venv e reinstalar; caches voltam sozinhos |
| `.dart_tool`, `build/` do Flutter | `flutter pub get` / `flutter build` |
| `bin/`, `obj/` do .NET | `dotnet build` |
| `.terraform` | `terraform init` |

`target/`, `build/`, `bin/` e `obj/` só contam como build quando estão ao lado do manifesto certo (`Cargo.toml`, `pom.xml`, `build.gradle`, `pubspec.yaml`, `*.csproj`). Alguns repos commitam `dist/` ou guardam arquivos feitos à mão em `build/`.

Uma confirmação para a categoria inteira, depois apague a partir da lista salva:
```bash
tr '\n' '\0' < lista.txt | xargs -0 rm -rf
```
Sem lixeira aqui, porque ela não libera nada até ser esvaziada. Avise que vai precisar instalar as dependências antes do próximo build.

Com pnpm, o espaço liberado é menor que o total do `du` porque os pacotes são hard links da store compartilhada. É esperado.

## 2. Estado do git antes de apagar qualquer repo, worktree ou branch

Rode `bash scripts/git-audit.sh <pasta-ou-repo> …`. Para cada repo ou worktree ele mostra:

- `dirty`: arquivos alterados ou não rastreados, ignorando `node_modules`, `.expo` e `.turbo`
- `unpushed`: commits em qualquer branch que não estão em nenhum remoto
- `remote`: a URL do origin. `none` quer dizer **só local**: apagar destrói a única cópia.
- `in_default`: se o HEAD já está na branch padrão do remoto (`origin/HEAD`)
- `last`: data do último commit

Como ler:
- `dirty=0` e `in_default=yes`: pode remover.
- PR com squash merge mostra `in_default=no` mesmo com o trabalho mergeado. Se tiver `gh`, confira com `gh pr list --head <branch> --state merged`.
- Qualquer `dirty > 0`, `remote=none` ou `unpushed > 0`: mostre o que tem lá (data, autor, `git status --short`) e pergunte. Diga com todas as letras que apagar é permanente.
- Se perguntarem "quem está usando?", confira `lsof +D <pasta>` e `pgrep -fl <nome>` (no Windows, o Resource Monitor ou `handle.exe`), e diga o autor do último commit e a data do arquivo mais novo.

## 3. Worktrees de agentes

Ferramentas de código com IA deixam pilhas de worktrees, cada uma com seu `node_modules`. Lugares comuns: `.claude/worktrees/`, `~/.claude/worktrees`, `~/.codex/worktrees`, `~/Conductor/workspaces`, `~/.t3/worktrees`, `.paseo/worktrees/`, `orca/workspaces/`, `miforca/workspaces/`, `.wt-*`. Apagar o `node_modules` delas (passo 1) recupera a maior parte. Para remover a worktree em si:

```bash
git -C <repo> worktree remove <caminho>   # recusa se houver mudança sem commit, e é essa a ideia
git -C <repo> worktree prune
```

- `git worktree remove` mantém a branch e os commits, então remover uma worktree limpa não perde nada.
- O git não apaga uma branch que está em checkout numa worktree. Remova a worktree primeiro.
- `git branch -d` checa "mergeado" contra o HEAD local, não contra o remoto, então recusa branches já mergeadas em `origin/main`. Confira `git rev-list --count origin/HEAD..<branch>` igual a 0 e use `-D`.
- Pasta dentro de uma pasta de worktrees sem arquivo `.git` não é worktree. Deixe e avise.
- Worktrees mexidas nos últimos dias provavelmente estão em uso. Pergunte antes, mesmo limpas.

## 4. Arquivos grandes de dados nos repos

Procure arquivos acima de 300 MB: `find <raiz> -type f -size +300M -not -path '*/.git/*'`. Dumps de banco (`*.sql`, `*.dump`, `*.backup`) numa pasta de código costumam ser cópias de produção com dados pessoais. Recomende apagar (os dados continuam no banco) e confira se estão versionados (`git ls-files --error-unmatch`). Apague dumps grandes com `rm`, porque a lixeira não liberaria o espaço.

`.git` gigante: `git count-objects -vH` mostra o tamanho. `git gc --prune=now` ajuda pouco em repo normal; o ganho real vem de clonar de novo com `--filter=blob:none` se a pessoa não precisa do histórico de binários. Pergunte antes.

## 5. Arquivos sensíveis: apontar, não apagar

Enquanto escaneia, anote chaves privadas soltas (`*.pem`, `*.p8` na raiz de um workspace), credenciais em README e fixtures com dados reais de conta. Informe os caminhos sem imprimir o conteúdo e deixe a pessoa decidir.
