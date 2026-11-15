# Downloads e pastas pessoais

Objetivo: Downloads termina só com documentos que valem guardar, chaves num lugar privado e o resto apagado ou decidido.

## 1. Inventário

```bash
cd ~/Downloads
ls -lA                     # tudo, com datas
du -sh -- */               # pastas
```

No Windows: `Get-ChildItem ~\Downloads -Force | Sort-Object LastWriteTime`.

Muitas "pastas" são só cópias descompactadas de zips que estão do lado, e muitos arquivos são duplicatas do navegador (`nome (1).ext`).

## 2. Lixo sem ambiguidade (com uma confirmação)

- **Instaladores**: `.dmg`, `.pkg`, `.exe`, `.msi`, `.msix`, `.deb`, `.rpm`, `.AppImage`, `.mcpb`, `Install*.zip`. O app já está instalado ou não é mais desejado. Exceção: `.AppImage` às vezes é o próprio app no Linux. Pergunte se for o único jeito que a pessoa roda aquele programa.
- **ISOs e imagens de disco** (`.iso`, `.img`, `.vhd`): normalmente instaladores de sistema já usados. Pergunte se forem de VM em uso.
- **Zips já extraídos**: apague o zip só se *todas* as entradas existem na pasta irmã:
  ```bash
  z="coisa.zip"; d="${z%.zip}"; missing=0
  while IFS= read -r n; do
    case "$n" in */|__MACOSX*|*.DS_Store) continue;; esac
    [ -e "$d/$n" ] || [ -e "$n" ] || missing=$((missing+1))
  done < <(unzip -Z1 "$z")
  echo "$missing faltando"
  ```
  Alguns arquivos descompactam numa pasta com outro nome; confira o diretório de topo da primeira entrada.
- **Duplicatas exatas**: ache por hash e fique com a cópia sem o sufixo `(1)`.
  ```bash
  # macOS: md5 -r   Linux: md5sum
  find . -maxdepth 1 -type f ! -name .DS_Store -print0 | xargs -0 md5 -r | sort \
    | awk '{h=$1; $1=""; a[h]=a[h] "|" substr($0,2); c[h]++} END{for(h in c) if(c[h]>1) print a[h]}'
  ```
  No Windows:
  ```powershell
  Get-ChildItem -File | Get-FileHash -Algorithm MD5 | Group-Object Hash | Where-Object Count -gt 1 | ForEach-Object { $_.Group.Path -join ' | ' }
  ```
  Mesmo nome com hash diferente é conteúdo diferente: deixe. Mesmo conteúdo com nomes diferentes (uma nota fiscal reexportada) vale apontar.

Mande esses para a lixeira (veja SKILL.md), não para `rm`.

## 3. Separar chaves e credenciais

Procure `.env*`, `*.pem`, `*.p8`, `*.p12`, `*.pfx`, `*.cer`, `*.mobileprovision`, `client_secret_*.json`, `*firebase-adminsdk*.json`, `google-services*.json`, `GoogleService-Info*.plist`, `*backup_code*`, kits de emergência de gerenciador de senha, `*.ovpn`, `*.kdbx` e JSON de service account (`grep -o '"type": *"service_account"'`). Guarde todos, porque vários `env (N).local` costumam ser diferentes entre si. Ofereça mover para uma pasta privada (veja SKILL.md, "Segredos achados durante a limpeza").

## 4. Documentos reais ficam sem perguntar

Informe de rendimentos, extratos, notas fiscais, contratos, documentos pessoais, passagens, currículos, especificações, relatórios e planilhas de trabalho ficam. Se não tiver certeza se um PDF é real ou teste, leia a página 1 com `pdftotext -l 1 arquivo.pdf - | head -c 300`.

## 5. Separar o resto por categoria e perguntar

Grupos típicos, cada um movido para `_revisar/<n>-<nome>/`:

| Grupo | Conteúdo | Recomendação usual |
|---|---|---|
| Prints e imagens geradas | `Screenshot*`, `Captura de tela*`, `CleanShot*`, imagens de IA, banco de imagens, downloads de rede social, GIFs de demo | Apagar tudo |
| Vídeos e áudios | clipes de banco, gravações de tela, áudios de WhatsApp | Apagar tudo |
| Fotos pessoais | `IMG_*` HEIC/DNG/JPG, imagens do WhatsApp | A pessoa arrasta o que fica (insubstituível) |
| Scans de filme, originais | pastas de scan de laboratório, RAW | Manter e oferecer mover para Imagens |
| Assets de design e loja | sets antigos de screenshot, ícones exportados, `.fig`, `.pen` | A pessoa arrasta o que fica |
| Dumps e logs de dev | `.har`, logs exportados, logs de auth, crash logs, scripts soltos | Apagar tudo (HAR e log de auth costumam ter tokens e dados pessoais) |
| Backups de banco e exportações de chat | `*.backup.gz`, saída de `pg_dump`, exportações do WhatsApp | Perguntar; pode ser a única cópia |
| Dados de teste | CSVs de seed, demos de uma linha, extratos de sandbox | Apagar tudo |
| Versões superadas | "Nota 4" ao lado de "Nota 4 revisada", currículos antigos | Apagar; diga qual arquivo mais novo fica |

Abra as pastas separadas e pergunte por grupo. Para documentos que a pessoa quer apagar mas que têm conteúdo útil (roteiros de entrevista, por exemplo), ofereça extrair o útil antes.

## 6. Outras pastas pessoais que costumam inchar

- **Mesa / Desktop**: mesmo tratamento de Downloads.
- **Filmes / Vídeos**: gravações de tela antigas e exportações de editor. Caches de editor de vídeo (Final Cut, Premiere, DaVinci, CapCut) ficam em pastas próprias de cache e são regeneráveis; os projetos não.
- **Anexos salvos pelo Mail** (`~/Library/Containers/com.apple.mail/Data/Library/Mail Downloads` no macOS): cópias de anexos que continuam no e-mail. Regenerável.

## 7. Fim

Remova o `_revisar` vazio e relate quantidade de itens e tamanho antes e depois. Lembre que a lixeira precisa ser esvaziada para o espaço aparecer.

## Arquivos grandes parados

O scan lista arquivos acima de 1 GB fora das pastas do sistema e de dependências que não mudam há 6 meses. Costumam ser vídeos exportados, gravações de tela, imagens de VM, backups antigos e dumps. Nunca são lixo por padrão: espie cada um (`file`, `ffprobe`, `unzip -l`) e pergunte, com três saídas: *Apagar*, *Mover para um disco externo* ou *Manter*. Se a pessoa quer manter e o arquivo é grande, sugira o disco externo antes de apagar outra coisa.
