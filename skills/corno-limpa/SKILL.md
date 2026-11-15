---
name: corno-limpa
description: Libera espaço em disco com segurança no macOS, Windows ou Linux - mede primeiro, apaga só o que volta sozinho (caches, node_modules, builds, simuladores, emuladores, modelos de IA, o Gemini Nano de 4 GB que o Chrome baixa sozinho, versões antigas de navegadores e CLIs de agente) e pede decisão para o que é pessoal ou insubstituível. Confere o git antes de tocar em qualquer pasta com código. Use quando disserem "disco cheio", "pouco espaço", "o que posso apagar", "limpa meu computador", "libera espaço", "System Data enorme", "o C: está cheio", "disk full", "free up space", mesmo que citem uma pasta só.
---

# Corno limpa

Liberar espaço sem perder nada que a pessoa sentiria falta. Quase tudo que enche o disco de quem programa volta sozinho (dependências, builds, caches, simuladores mortos, modelos baixados). O difícil é a fração que não volta: código sem commit, chaves, fotos, documentos únicos. O fluxo existe para separar uma coisa da outra antes de apagar.

## Regras

- **Mede antes de propor.** Rode o scan primeiro. Com tamanhos na frente a pessoa decide melhor, e o maior item quase nunca é o que ela chutou.
  - macOS e Linux: `bash scripts/scan.sh`
  - Windows: `powershell -ExecutionPolicy Bypass -File scripts/scan.ps1`
  - Pastas de código (qualquer sistema; no Windows via Git Bash): `bash scripts/find-build-dirs.sh <raiz-do-código>`
- **Dois baldes.** *Regenerável* (reinstalar, recompilar ou baixar de novo traz de volta): uma confirmação por categoria. *Insubstituível ou incerto* (documentos, fotos, chaves, trabalho sem commit, dumps): decisão da pessoa, grupo a grupo.
- **Olha o alvo antes de apagar.** Espie arquivos desconhecidos (`head`, `pdftotext -l 1`, `unzip -l`, `file`) em vez de julgar pelo nome. Um `asdsad.pdf` era nota fiscal duplicada; uma pasta com cara de clone velho era a única cópia de um protótipo.
- **Lixeira para arquivo pessoal, apagar direto para cache.** Arquivo pessoal vai para a lixeira, para poder voltar:
  - macOS 14+: `trash <arquivos>`
  - Linux: `gio trash <arquivos>`
  - Windows: `Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile('<arquivo>','OnlyErrorDialogs','SendToRecycleBin')`

  Mandar 80 GB de `node_modules` para a lixeira não libera nada até esvaziar, então regenerável se apaga direto (`rm -rf`, `Remove-Item -Recurse -Force`).
- **Git antes de código.** Nunca apague repo, worktree ou branch sem rodar `scripts/git-audit.sh` nele. Veja `references/codigo.md`.
- **Fecha o app antes de apagar os dados dele.** Confira se está rodando (`pgrep -f '<App>'`, `Get-Process <nome>`). Se estiver, pule e entregue o comando de uma linha para rodar depois de fechar.
- **Bloqueia o que volta sozinho.** Alguns itens se baixam de novo se você só apagar (o modelo de IA do Chrome é o caso clássico). Desligue o recurso primeiro, depois apague. Veja `references/navegadores-e-ia.md`.
- **Relata com números.** Anote o espaço livre antes e depois de cada rodada e diga quanto liberou.
- **Admin só com aviso.** Limpezas que pedem `sudo` ou prompt elevado (journal, cache do apt, Windows Update, `DISM`) são opcionais. Explique o que fazem e entregue o comando, ou rode só se a pessoa autorizar.

## Pedindo decisões

Use a ferramenta de pergunta estruturada se o ambiente tiver uma (no Claude Code: `AskUserQuestion`); senão pergunte direto e espere. Junte 3 ou 4 decisões por vez. A opção recomendada vem primeiro, com "(Recomendado)" no rótulo, e a descrição de cada opção diz o que acontece de verdade: quanto libera, o que se perde, o que precisa reinstalar.

Para grupos de arquivos que a pessoa precisa ver (prints, fotos, vídeos), **separe em pastas**: mova cada grupo para `~/Downloads/_revisar/<n>-<categoria>/`, abra as pastas (`open`, `xdg-open`, `explorer`) e pergunte por grupo: *Apagar tudo* / *Vou arrastar o que fica* / *Manter tudo*. Mover é reversível e a pessoa vê miniaturas em vez de nomes. No fim, remova `_revisar`.

## Fluxo

1. **Linha de base.** Espaço livre, scan geral e `find-build-dirs.sh` na pasta de código. Mostre os maiores itens numa tabela curta antes de fazer qualquer coisa.
2. **Escolhe as áreas junto.** Ofereça as áreas que o scan mostrou. Não assuma que Downloads é o alvo só porque é o clássico.
3. **Trabalha cada área** com o arquivo de referência dela:
   - Downloads e pastas pessoais: `references/pastas-pessoais.md`
   - Pastas de código, repos, worktrees, dumps: `references/codigo.md`
   - Simuladores, emuladores, SDKs, caches de pacote, VMs e containers: `references/ferramentas-dev.md`
   - Navegadores, modelo de IA do Chrome, apps Electron, modelos locais, CLIs e apps de agente: `references/navegadores-e-ia.md`
   - Sujeira do sistema operacional: `references/sistema-mac.md`, `references/sistema-windows.md` ou `references/sistema-linux.md`
4. **Confere** que cada remoção liberou espaço mesmo (vários comandos fazem menos do que o nome promete) e mede de novo.
5. **Fecha.** Antes e depois em números, o que foi apagado, o que ficou e por quê, e o que a pessoa precisa fazer a seguir (instalar dependências antes do próximo build, baixar um runtime de simulador, esvaziar a lixeira). Aponte problemas de segurança achados no caminho (chaves soltas, credenciais em README, dump de produção com dados pessoais) sem imprimir o conteúdo.


## Nunca mexa

- Bibliotecas de fotos por dentro (`Photos Library.photoslibrary`, bancos do Lightroom). Apagar lá dentro corrompe a biblioteca. Se for grande, a saída é mover inteira para um disco externo.
- Chaveiros e cofres de senha (`~/Library/Keychains`, `~/.local/share/keyrings`, Credential Manager), Mail, Messages e pastas sincronizadas por nuvem (iCloud Drive, OneDrive, Dropbox, Google Drive). Apague pelos próprios apps, se for o caso.
- Pastas do sistema fora da home, exceto os caminhos documentados nas referências de sistema. No Windows, nunca `C:\Windows\WinSxS`, `C:\Windows\Installer` ou `C:\ProgramData\Package Cache` na mão: quebra atualização e desinstalação.
- `pagefile.sys` e `swapfile`. O sistema gerencia.
- Qualquer coisa com trabalho sem commit ou sem push, a menos que a pessoa confirme depois de ver o audit.

## Segredos achados durante a limpeza

Chaves e credenciais (`.env*`, `*.pem`, `*.p8`, `*.p12`, JSON de service account, client secrets OAuth, `google-services.json`, códigos de backup, kits de recuperação de gerenciador de senha) não são lixo, mas não devem ficar soltos em Downloads. Ofereça mover para uma pasta privada que a pessoa já usa (por exemplo `~/.private_keys/<data>/`, com `chmod 700` na pasta e `600` em cada arquivo; no Windows, uma pasta só do usuário). Nunca imprima o conteúdo. Para classificar, procure só a estrutura (por exemplo `"type": "service_account"`). Sugira levar códigos de recuperação para um gerenciador de senha.
