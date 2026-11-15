# Sistema: Windows

Objetivo: tirar a sujeira do Windows e dos apps que não é de desenvolvimento. Comece pelo que o sistema já oferece e é seguro: Configurações → Sistema → Armazenamento → Arquivos temporários, e o Sensor de Armazenamento (Storage Sense) para manter limpo depois.

Comandos marcados com **(admin)** pedem PowerShell elevado. Entregue o comando e explique; não tente elevar sozinho.

## Regenerável (uma confirmação por item)

| O quê | Comando ou caminho | Observação |
|---|---|---|
| Temporários do usuário | `Get-ChildItem $env:TEMP -Force \| Where-Object LastWriteTime -lt (Get-Date).AddDays(-1) \| Remove-Item -Recurse -Force -ErrorAction SilentlyContinue` | Arquivos em uso falham e ficam; é esperado. |
| Temporários do sistema **(admin)** | mesmo comando em `C:\Windows\Temp` | |
| Cache do Windows Update **(admin)** | `net stop wuauserv; net stop bits; Remove-Item C:\Windows\SoftwareDistribution\Download\* -Recurse -Force; net start wuauserv; net start bits` | Atualizações pendentes baixam de novo. |
| Otimização de Entrega **(admin)** | `Delete-DeliveryOptimizationCache -Force` | Cache de atualizações compartilhado com outros PCs. |
| Component store (WinSxS) **(admin)** | `DISM /Online /Cleanup-Image /AnalyzeComponentStore`, depois `DISM /Online /Cleanup-Image /StartComponentCleanup` | Nunca apague WinSxS na mão. `/ResetBase` libera mais, mas impede desinstalar atualizações: pergunte. |
| Dumps de crash | `%LOCALAPPDATA%\CrashDumps`, `C:\Windows\Minidump`, `C:\Windows\MEMORY.DMP` **(admin)** | |
| Sobras de instalador de driver | `C:\NVIDIA`, `C:\AMD`, `C:\Intel` (pastas soltas na raiz com instaladores extraídos) | Confira que só tem instalador antes. |
| Cache de shader de jogos | `steamapps\shadercache` em cada biblioteca do Steam | Recompila no próximo jogo. |

## Pergunte antes

- **Lixeira**: `Clear-RecycleBin -Force` esvazia todas as unidades. Confirme que a pessoa não quer nada de lá.
- **Windows.old** (instalação anterior, 10 a 30 GB): pelo Armazenamento → Arquivos temporários → "Instalações anteriores do Windows". Remove a opção de voltar à versão anterior. O Windows apaga sozinho depois de uns 10 dias.
- **Hibernação** (`hiberfil.sys`, do tamanho de boa parte da RAM): `powercfg /h off` **(admin)** apaga o arquivo, mas desliga hibernar e a Inicialização Rápida. `powercfg /h /type reduced` mantém a Inicialização Rápida com arquivo menor.
- **Pontos de restauração**: `vssadmin list shadowstorage` **(admin)** mostra o uso. Reduza o limite em Proteção do Sistema, não apague na mão.
- **Programas instalados**: Configurações → Aplicativos, ordenado por tamanho, ou `winget list`. Desinstale pelo sistema, nunca apagando a pasta em `Program Files`.

## WSL e Docker Desktop: discos virtuais que não encolhem

Distros WSL e o Docker Desktop guardam tudo em arquivos `.vhdx` (o scan lista). Apagar arquivos dentro do Linux **não** devolve espaço ao Windows sozinho.

1. Limpe dentro primeiro: na distro, siga `sistema-linux.md` e `docker system prune` (veja `ferramentas-dev.md`, Containers).
2. Desligue: `wsl --shutdown` (e feche o Docker Desktop).
3. Encolha o arquivo, um destes:
   - **Melhor, uma vez só**: `wsl --manage <distro> --set-sparse true` (WSL 2 recente). O disco passa a devolver espaço sozinho.
   - Com Hyper-V (Windows Pro) **(admin)**: `Optimize-VHD -Path "<caminho>\ext4.vhdx" -Mode Full`
   - Sem Hyper-V **(admin)**: `diskpart`, depois `select vdisk file="<caminho>\ext4.vhdx"`, `attach vdisk readonly`, `compact vdisk`, `detach vdisk`, `exit`.

Distros da Microsoft Store ficam em `%LOCALAPPDATA%\Packages\<distro>\LocalState\ext4.vhdx`; o Docker Desktop em `%LOCALAPPDATA%\Docker\wsl\disk\docker_data.vhdx`. Faça backup (`wsl --export`) se a distro tiver trabalho que não está em lugar nenhum.

## Nunca

`C:\Windows\WinSxS`, `C:\Windows\Installer`, `C:\ProgramData\Package Cache` (quebram atualização e desinstalação), `C:\Windows\System32`, `pagefile.sys`, `swapfile.sys`, pastas do OneDrive (libere pelo próprio OneDrive: "Liberar espaço"), e qualquer coisa em `Program Files` sem desinstalar pelo sistema.

## Para explorar

Se o scan não explicar para onde foi o espaço: WizTree ou WinDirStat mostram em mapa. Não instale sem pedir. Sem instalar nada: Configurações → Sistema → Armazenamento → "Mostrar mais categorias".
