# Ferramentas de desenvolvimento

Objetivo: recuperar espaço de simuladores, emuladores, SDKs, caches de pacote, VMs e containers. Costumam ser os maiores itens da máquina de quem programa, e quase nunca aparecem com nome claro nas configurações de armazenamento ("System Data" no Mac, "Outros" no Windows).

Caminhos: macOS primeiro, depois Linux e Windows quando diferem. `%LA%` = `%LOCALAPPDATA%`, `~` no Windows = `%USERPROFILE%`.

## Simuladores iOS (só macOS)

```bash
xcode-select -p                         # tem que apontar para o Xcode.app, não para CommandLineTools
xcrun simctl list runtimes              # runtimes instalados
xcrun simctl list devices unavailable   # simuladores cujo runtime sumiu
```

- Simuladores "unavailable" não ligam: peso morto. Antes de declarar mortos, descarte o developer dir errado: se `xcode-select -p` aponta para CommandLineTools, o `simctl` pode mentir. Confira com `DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer xcrun simctl list runtimes`.
- Depois de atualizar Xcode ou macOS, todos os simuladores podem ficar unavailable de uma vez. Apagar (`xcrun simctl delete unavailable`) está certo, mas avise que vai precisar instalar um runtime (Xcode → Settings → Components, ou `xcodebuild -downloadPlatform iOS`) e criar um simulador antes do próximo uso. Apps de teste e logins se perdem.
- Runtimes antigos: `xcrun simctl runtime list` e `xcrun simctl runtime delete <id>`. Cada um tem de 5 a 8 GB.
- Simulador saudável mas sem uso: `xcrun simctl erase <udid>` zera e mantém; `xcrun simctl delete <udid>` remove.
- Outros caminhos:
  - `~/Library/Developer/Xcode/DerivedData`, `~/Library/Developer/XcodeBuildMCP`, `~/Library/Developer/Xcode/Products`, `~/Library/Developer/CoreSimulator/Caches`, `~/Library/Developer/XCTestDevices`, `~/Library/Caches/com.apple.dt.Xcode`: caches de build, pode apagar.
  - `~/Library/Developer/Xcode/iOS DeviceSupport` (e watchOS, tvOS, visionOS): símbolos de aparelhos físicos, refeitos quando o aparelho é plugado. Mantenha só a versão do iOS que a pessoa ainda testa.
  - `~/Library/Developer/Xcode/Archives`: builds publicados com dSYMs. Pergunte, porque servem para simbolicar crashes.

## Android

Pastas: macOS `~/Library/Android/sdk`, Linux `~/Android/Sdk`, Windows `%LA%\Android\Sdk`. Emuladores em `~/.android/avd` nos três.

- **Emuladores (`*.avd`, 2 a 11 GB cada).** Data do último uso: `stat -f %Sm -t %Y-%m-%d <avd>/userdata-qemu.img*` (macOS), `stat -c %y` (Linux), `(Get-Item <arquivo>).LastWriteTime` (Windows). Recomende apagar os parados há meses. Para apagar, remova `<nome>.avd/` e `<nome>.ini`. Wipe Data (Android Studio → Device Manager) mantém o emulador e perde apps e logins.
- **NDK (`sdk/ndk/<versão>`, 2 a 3 GB cada).** Mantenha a versão que os projetos usam. Procure `ndkVersion` em `build.gradle`, `build.gradle.kts` e `gradle.properties`. No React Native, o pin fica no `gradle/libs.versions.toml` do próprio react-native: leia de `node_modules/react-native/gradle/libs.versions.toml` ou do pacote publicado (`curl -sL https://cdn.jsdelivr.net/npm/react-native@<versão>/gradle/libs.versions.toml | grep ndkVersion`). Apague as outras; o Gradle baixa sob demanda.
- **System images (`sdk/system-images`)**: mantenha só as que os emuladores restantes usam.
- **Android Studio antigo**: cada versão deixa caches e logs em `~/Library/Caches/Google/AndroidStudio*` e `~/Library/Logs/Google/AndroidStudio*` (macOS), `~/.cache/Google/AndroidStudio*` (Linux), `%LA%\Google\AndroidStudio*` (Windows). Pastas de versões que não estão mais instaladas podem ir.

## Caches de gerenciador de pacote

Tudo isso baixa de novo sob demanda. Limpe com uma confirmação e **meça de novo**, porque vários comandos não limpam o que o nome sugere.

| Ferramenta | Comando | Pegadinha |
|---|---|---|
| npm | `npm cache clean --force` | Não toca em `~/.npm/_npx` (cache do npx, muitas vezes 5 GB+). Apague direto. No Windows o cache fica em `%LA%\npm-cache`. |
| pnpm | `pnpm store prune` | Só remove pacotes que nenhum projeto referencia, então a store continua grande enquanto houver dependências instaladas. |
| bun | `bun pm cache rm` | Falha calado fora de projeto. Apague `~/.bun/install/cache` direto. |
| yarn | `yarn cache clean` | Berry guarda cache global em `~/.yarn/berry/cache`. |
| corepack | apague `~/.cache/node/corepack` | Baixa de novo a versão do gerenciador quando precisar. |
| pip | `pip cache purge` | |
| uv | `uv cache clean` (ou `uv cache prune` para só o que não é usado) | |
| Poetry | `poetry cache list`, depois `poetry cache clear --all <nome>` | |
| conda / mamba | `conda clean --all` | Pastas `pkgs` em `~/anaconda3`, `~/miniconda3`, `~/miniforge3`, `~/.conda`. |
| CocoaPods | `pod cache clean --all` | |
| Gradle | apague `~/.gradle/caches` | O próximo build Android baixa tudo de novo. `~/.gradle/wrapper/dists` guarda uma distribuição por versão; as antigas podem ir. |
| Maven | apague `~/.m2/repository` | |
| Ivy / sbt | apague `~/.ivy2/cache` | |
| NuGet | `dotnet nuget locals all --clear` | |
| Go | `go clean -modcache` e `go clean -cache` | |
| Cargo | apague `~/.cargo/registry/cache` e `~/.cargo/git/checkouts` | |
| rustup | `rustup toolchain list`, depois `rustup toolchain uninstall <velho>` | Toolchains nightly antigos acumulam. |
| mise / asdf | `mise prune` | Remove versões de runtime que nenhum projeto pede. |
| fvm (Flutter) | `fvm list`, depois `fvm remove <versão>` | |
| Homebrew | `brew cleanup --prune=all` e `brew autoremove` | `autoremove` tira dependências órfãs; mostre a prévia (`brew autoremove --dry-run`). |
| Navegadores de teste | `~/Library/Caches/ms-playwright` (macOS), `~/.cache/ms-playwright` (Linux), `%LA%\ms-playwright` (Windows), `~/.cache/puppeteer` | Voltam com o comando de install da ferramenta. |
| SwiftPM | apague `~/Library/Caches/org.swift.swiftpm` | |

## Editores

- **Extensões velhas do VS Code / Cursor / Windsurf** (`~/.vscode/extensions`, `~/.cursor/extensions`, `~/.windsurf/extensions`): o editor deixa a versão antiga ao atualizar e anota em `.obsolete`. Pastas listadas nesse arquivo podem ir com o editor fechado. Várias versões da mesma extensão (`publisher.nome-1.2.3`, `publisher.nome-1.3.0`): fique com a mais nova.
- **Caches do editor**: `Cache`, `CachedData`, `CachedExtensionVSIXs`, `Code Cache`, `GPUCache` dentro da pasta de dados do editor (`~/Library/Application Support/Code`, `~/.config/Code`, `%APPDATA%\Code`). Regeneráveis, com o editor fechado.
- **JetBrains**: o Toolbox guarda versões antigas de cada IDE em `Toolbox/apps`. Nas configurações de cada IDE no Toolbox, desligue a opção de manter versões para rollback e remova as velhas. Caches e logs por versão em `~/Library/Caches/JetBrains/<IDE><versão>` e `~/Library/Logs/JetBrains` (macOS), `~/.cache/JetBrains` (Linux), `%LA%\JetBrains` (Windows): versões que não estão mais instaladas podem ir.

## Containers e VMs

- **Docker**: comece por `docker system df`. Em ordem de risco:
  1. `docker builder prune` (cache de build, regenerável)
  2. `docker image prune -a` (imagens sem container usando)
  3. `docker container prune` (containers parados)
  4. `docker volume prune` **só com confirmação**: volumes guardam dados de banco local.

  O disco virtual do Docker Desktop não encolhe sozinho ao apagar imagens. No Mac, encolhe com o tempo (arquivo esparso); se não encolher, Settings → Resources → reduzir o limite. No Windows, veja `sistema-windows.md` (compactar `.vhdx`).
- **OrbStack** (`~/.orbstack`), **Colima** (`~/.colima`), **Lima** (`~/.lima`): `orb`, `colima` e `limactl` listam as VMs. Apague VMs paradas pelo próprio comando, não pela pasta.
- **UTM, Parallels, VMware, VirtualBox, Tart**: VMs inteiras de 20 a 100 GB. Sempre pergunte. Caches e temporários do UTM (`~/Library/Containers/com.utmapp.UTM/Data/tmp` e `.../Library/Caches`) e `~/.tart/cache` são regeneráveis.
- **Nix**: `nix-collect-garbage -d` (apaga gerações antigas; avise que perde rollback).

## Bancos e ferramentas de API locais

Postgres.app, MySQL, MongoDB, Redis e similares guardam dados de verdade. Não trate como cache. Logs deles (`*.log` dentro da pasta de dados) podem ir com o serviço parado.

## Sobras de apps desinstalados

Procure pastas ocultas na home e pastas de dados de app (`~/Library/Application Support/<App>`, `~/.config/<app>`, `%APPDATA%\<App>`, `%LA%\<App>`) cujo app não está mais instalado. Um terminal desinstalado já deixou um log de 42 GB em `~/.fig/logs`. Antes de apagar, confira que nenhum arquivo de inicialização do shell (`~/.zshrc`, `~/.zprofile`, `~/.bashrc`, perfil do PowerShell) ainda carrega coisa dessa pasta.
