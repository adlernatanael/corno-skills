# Sistema: macOS

Objetivo: tirar a sujeira do próprio macOS e dos apps que não é de desenvolvimento. Comece pelo que o sistema já oferece: Ajustes → Geral → Armazenamento mostra recomendações e o tamanho por categoria.

## Regenerável (uma confirmação por item)

| O quê | Onde | Observação |
|---|---|---|
| Lixeira | `~/.Trash` | Muitas vezes ilegível sem Acesso Total ao Disco. Pergunte se está vazia ou peça para esvaziar pelo Finder. |
| Logs e relatórios de crash | `~/Library/Logs`, `~/Library/DiagnosticReports` | `/Library/Logs/DiagnosticReports` pede sudo. |
| Firmware de iPhone/iPad | `~/Library/iTunes/iPhone Software Updates`, `iPad Software Updates`, `iPod Software Updates`, `Apple TV Software Updates` | Arquivos `.ipsw` de 5 a 8 GB cada. O Finder baixa de novo se precisar restaurar um aparelho. |
| Instaladores do macOS | `/Applications/Install macOS *.app` | 12 GB ou mais. Só serve para criar pendrive de instalação. |
| Anexos salvos pelo Mail | `~/Library/Containers/com.apple.mail/Data/Library/Mail Downloads` | Cópias; o anexo continua no e-mail. |
| Caches de apps | `~/Library/Caches/<app>` | Com o app fechado. Mire nos maiores (o scan mostra o total); não precisa apagar a pasta inteira. |
| Caches de apps em sandbox | `~/Library/Containers/<bundle-id>/Data/Library/Caches` e `.../Data/tmp` | Word, Excel, Podcasts (`tmp/StreamedMedia`), App Store, mediaanalysisd, UTM. Com o app fechado. |
| Miniaturas do Quick Look | `qlmanage -r cache` | Pequeno, mas resolve preview travado. |
| Caches de nuvem | `~/Library/Caches/com.getdropbox.dropbox`, `com.google.GoogleDrive`, `com.microsoft.OneDrive` | O conteúdo baixado em si se libera pelo app: "Somente online" / "Liberar espaço". Nunca apague dentro de `~/Library/CloudStorage`. |

## Pergunte antes

- **Backups de iPhone/iPad** (`~/Library/Application Support/MobileSync/Backup`): podem ser a única cópia. Gerencie pelo Finder → aparelho → Gerenciar Backups, que mostra a data de cada um.
- **Snapshots locais do Time Machine**: `tmutil listlocalsnapshots /`. O macOS apaga sozinho quando falta espaço, então o "espaço ocupado" é em boa parte ilusório. Se precisar agora: `tmutil thinlocalsnapshots / 100000000000 4` pede ao sistema para liberar até ~100 GB, ou `tmutil deletelocalsnapshots <data>` para um específico.
- **Anexos do Messages**: nunca pela pasta. Ajustes → Geral → Armazenamento → Mensagens, ou Mensagens → Ajustes → "Manter mensagens".
- **Dados de app desinstalado** (`~/Library/Application Support/<App>`, `~/Library/Containers/<bundle-id>`, `~/Library/Group Containers/<id>`): o scan marca pastas sem app correspondente em `/Applications`. Confira com `mdfind "kMDItemCFBundleIdentifier == '<bundle-id>'"` antes de apagar, porque o app pode estar em outro lugar (`~/Applications`, Setapp).
- **LaunchAgents órfãos** (`~/Library/LaunchAgents/*.plist`): se o programa apontado não existe mais, o plist é lixo. Descarregue com `launchctl bootout gui/$(id -u) <plist>` antes de apagar. Não mexa nos de `/Library/LaunchDaemons` sem certeza.

## Nunca

`/System`, `/private/var/folders` (temporários do sistema; reiniciar limpa), `/private/var/db`, `~/Library/Keychains`, `~/Library/Mail`, `~/Library/Messages`, `~/Library/Mobile Documents`, bibliotecas do Fotos e do Music.

## Para explorar

Se o scan não explicar para onde foi o espaço: `du -xh -d 1 ~ | sort -h | tail -20`, ou `ncdu ~` se estiver instalado. GrandPerspective e DaisyDisk mostram em mapa, mas não instale nada sem pedir.
