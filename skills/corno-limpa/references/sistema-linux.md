# Sistema: Linux

Objetivo: tirar a sujeira do sistema e dos gerenciadores de pacote. Quase tudo fora da home pede `sudo`: explique o comando e rode só se a pessoa autorizar. Descubra a distro com `cat /etc/os-release` e use só os comandos dela.

## Na home (sem sudo)

| O quê | Comando ou caminho | Observação |
|---|---|---|
| Lixeira | `gio trash --empty` | Ou `~/.local/share/Trash`. Confirme antes. |
| Miniaturas | `~/.cache/thumbnails` | Refeitas ao abrir as pastas. |
| Cache geral | `~/.cache/<app>` | Mire nos maiores com o app fechado; não precisa apagar `~/.cache` inteiro. |
| Dados de flatpak desinstalado | `~/.var/app/<id>` sem app correspondente em `flatpak list --app` | Pergunte: pode ter dados do app. |
| AppImages velhos | `~/Applications`, `~/Downloads` | Versões antigas do mesmo app. |

## Gerenciadores de pacote (sudo)

| Distro | Cache | Órfãos e kernels antigos |
|---|---|---|
| Debian, Ubuntu, Mint | `sudo apt-get clean` | Prévia: `apt-get -s autoremove`; depois `sudo apt-get autoremove --purge`. Configs residuais: `dpkg -l \| awk '/^rc/{print $2}' \| xargs -r sudo apt-get purge -y` |
| Fedora, RHEL | `sudo dnf clean all` | `sudo dnf autoremove`. Kernels guardados: `installonly_limit` em `/etc/dnf/dnf.conf` (padrão 3). |
| Arch, Manjaro | `sudo paccache -rk2` (pacman-contrib) e `sudo paccache -ruk0` | Órfãos: `pacman -Qdtq`, depois `pacman -Qdtq \| sudo pacman -Rns -` |
| openSUSE | `sudo zypper clean -a` | `zypper packages --unneeded` para ver; remova pelo zypper. |

O `autoremove` do apt é o jeito certo de tirar kernels antigos. Nunca apague nada de `/boot` na mão.

## Snap e Flatpak

- **Revisões desativadas do snap** (cada atualização guarda a anterior):
  ```bash
  snap list --all | awk '/disabled/{print $1, $3}' | while read -r n r; do sudo snap remove "$n" --revision="$r"; done
  sudo snap set system refresh.retain=2     # guarda só 2 daqui pra frente
  ```
  `/var/lib/snapd/cache` também pode ser esvaziado (`sudo find /var/lib/snapd/cache -type f -delete`).
- **Runtimes flatpak sem uso**: `flatpak uninstall --unused`.

## Logs e dumps (sudo)

- **journal do systemd**: `journalctl --disk-usage` mostra o tamanho. `sudo journalctl --vacuum-size=200M` ou `--vacuum-time=2weeks`. Para limitar de vez: `SystemMaxUse=200M` em `/etc/systemd/journald.conf` e `sudo systemctl restart systemd-journald`.
- **Logs rotacionados**: `sudo find /var/log -type f \( -name '*.gz' -o -name '*.[0-9]' \) -delete`.
- **Core dumps**: `coredumpctl list` para ver; `sudo rm /var/lib/systemd/coredump/*`.

## Docker e Podman

Use `docker system df` e os comandos de `ferramentas-dev.md` (Containers). Nunca apague `/var/lib/docker` ou `~/.local/share/containers` na mão: corrompe o estado.

## Nunca

`/usr`, `/boot`, `/etc` (fora do arquivo de política e do `journald.conf` citados), `/var/lib/dpkg`, `/var/lib/rpm`, `/var/lib/pacman`, `/var/lib/docker`, `~/.local/share/keyrings`, `~/.gnupg`, `~/.ssh`. `/tmp` se limpa ao reiniciar.

## Para explorar

`du -xh -d 1 ~ | sort -h | tail -20` e `sudo du -xh -d 1 / | sort -h | tail -20`. Se estiver instalado: `ncdu`, `gdu` ou o Analisador de Uso de Disco (baobab). Não instale sem pedir.
