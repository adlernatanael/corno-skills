#!/usr/bin/env bash
# Read-only overview of where disk space goes on macOS or Linux. Deletes nothing.
# Usage: bash scan.sh [min_size_mb]   (default 200; smaller entries are hidden)
# Windows: use scan.ps1 instead.

min_mb=${1:-200}
min_kb=$((min_mb * 1024))
os=$(uname -s)
tilde="~"  # bash 5 tilde-expands a literal ~ in ${var/pat/~}

size_kb() { du -sk "$1" 2>/dev/null | awk '{print $1}'; }
human() { awk -v k="$1" 'BEGIN{ if (k>=1048576) printf "%.1f GB", k/1048576; else printf "%d MB", k/1024 }'; }

# Prints "label|path" entries that exist and pass the size threshold, biggest first.
report() {
  local rows="" entry label path kb
  for entry in "$@"; do
    label=${entry%%|*}; path=${entry#*|}
    [ -e "$path" ] || continue
    kb=$(size_kb "$path"); [ -n "$kb" ] && [ "$kb" -ge "$min_kb" ] || continue
    rows="$rows$kb|$label|$path"$'\n'
  done
  printf "%s" "$rows" | sort -t'|' -k1,1nr | while IFS='|' read -r kb label path; do
    [ -n "$kb" ] && printf "%10s  %-30s %s\n" "$(human "$kb")" "$label" "${path/#$HOME/$tilde}"
  done
}

echo "== Disk =="
df -h "$HOME" | awk 'NR==2{print "free " $4 " of " $2 " (" $5 " used)"}'
echo

if [ "$os" = Darwin ]; then
  L="$HOME/Library"; AS="$L/Application Support"; C="$L/Caches"
  BROWSERS=("Chrome|$AS/Google/Chrome" "Chrome Beta/Canary|$AS/Google/Chrome Canary" "Edge|$AS/Microsoft Edge"
            "Brave|$AS/BraveSoftware/Brave-Browser" "Arc|$AS/Arc/User Data" "Dia|$AS/Dia/User Data" "Vivaldi|$AS/Vivaldi")
else
  L=""; AS="${XDG_CONFIG_HOME:-$HOME/.config}"; C="${XDG_CACHE_HOME:-$HOME/.cache}"
  BROWSERS=("Chrome|$AS/google-chrome" "Chrome Beta|$AS/google-chrome-beta" "Chromium|$AS/chromium"
            "Edge|$AS/microsoft-edge" "Brave|$AS/BraveSoftware/Brave-Browser" "Vivaldi|$AS/vivaldi")
fi

echo "== Browser on-device AI models (re-download unless disabled, see references/navegadores-e-ia.md) =="
found=0
for entry in "${BROWSERS[@]}"; do
  label=${entry%%|*}; dir=${entry#*|}
  for m in "$dir"/OptGuideOnDevice* "$dir"/*/OptGuideOnDevice*; do
    [ -d "$m" ] || continue
    kb=$(size_kb "$m"); [ -n "$kb" ] || continue
    printf "%10s  %-30s %s\n" "$(human "$kb")" "$label model" "${m/#$HOME/$tilde}"; found=1
  done
done
[ "$found" = 1 ] || echo "none found"
echo

echo "== Developer tools, caches and AI (>= ${min_mb} MB) =="
common=(
  "Android emulators|$HOME/.android/avd"
  "Gradle caches|$HOME/.gradle/caches"
  "Maven repository|$HOME/.m2/repository"
  "Ivy cache|$HOME/.ivy2/cache"
  "NuGet packages|$HOME/.nuget/packages"
  "npm cache|$HOME/.npm"
  "bun cache|$HOME/.bun/install/cache"
  "yarn berry cache|$HOME/.yarn/berry/cache"
  "Go module cache|$HOME/go/pkg/mod"
  "Cargo registry|$HOME/.cargo/registry"
  "rustup toolchains|$HOME/.rustup"
  "mise installs|$HOME/.local/share/mise/installs"
  "fvm Flutter versions|$HOME/fvm/versions"
  "conda pkgs (anaconda)|$HOME/anaconda3/pkgs"
  "conda pkgs (miniconda)|$HOME/miniconda3/pkgs"
  "conda pkgs (miniforge)|$HOME/miniforge3/pkgs"
  "conda pkgs (user)|$HOME/.conda/pkgs"
  "Puppeteer browsers|$HOME/.cache/puppeteer"
  "agent-browser browsers|$HOME/.agent-browser/browsers"
  "chrome-devtools-mcp profile|$HOME/.cache/chrome-devtools-mcp"
  "Hugging Face models|$HOME/.cache/huggingface"
  "Ollama models|$HOME/.ollama/models"
  "LM Studio models|$HOME/.lmstudio/models"
  "Claude Code old versions|$HOME/.local/share/claude/versions"
  "Claude Code projects|$HOME/.claude/projects"
  "Claude Code worktrees|$HOME/.claude/worktrees"
  "cursor-agent versions|$HOME/.local/share/cursor-agent/versions"
  "Codex sessions|$HOME/.codex/sessions"
  "Codex worktrees|$HOME/.codex/worktrees"
  "Codex runtimes|$HOME/.cache/codex-runtimes"
  "Conductor workspaces|$HOME/Conductor/workspaces"
  "VS Code extensions|$HOME/.vscode/extensions"
  "Cursor extensions|$HOME/.cursor/extensions"
  "Lima VMs|$HOME/.lima"
  "Colima VMs|$HOME/.colima"
  "Tart cache|$HOME/.tart/cache"
  "OrbStack data|$HOME/.orbstack"
  "Downloads|$HOME/Downloads"
)
if [ "$os" = Darwin ]; then
  specific=(
    "iOS simulators|$L/Developer/CoreSimulator/Devices"
    "Simulator caches|$L/Developer/CoreSimulator/Caches"
    "XCTest devices|$L/Developer/XCTestDevices"
    "Xcode DerivedData|$L/Developer/Xcode/DerivedData"
    "XcodeBuildMCP builds|$L/Developer/XcodeBuildMCP"
    "Xcode Products|$L/Developer/Xcode/Products"
    "Xcode Archives (ask)|$L/Developer/Xcode/Archives"
    "iOS DeviceSupport|$L/Developer/Xcode/iOS DeviceSupport"
    "watchOS DeviceSupport|$L/Developer/Xcode/watchOS DeviceSupport"
    "Android SDK|$L/Android/sdk"
    "pnpm store|$L/pnpm/store"
    "Yarn v1 cache|$C/Yarn"
    "CocoaPods cache|$C/CocoaPods"
    "Homebrew cache|$C/Homebrew"
    "uv cache|$C/uv"
    "pip cache|$C/pip"
    "Poetry cache|$C/pypoetry"
    "SwiftPM cache|$C/org.swift.swiftpm"
    "Playwright browsers|$C/ms-playwright"
    "JetBrains Toolbox apps|$AS/JetBrains/Toolbox/apps"
    "JetBrains caches|$C/JetBrains"
    "Claude desktop VM|$AS/Claude/vm_bundles"
    "Claude Work VM|$AS/Claude-Work/vm_bundles"
    "Codex desktop|$AS/Codex"
    "Docker Desktop data|$L/Containers/com.docker.docker"
    "UTM VMs|$L/Containers/com.utmapp.UTM"
    "iOS device backups (ask)|$AS/MobileSync/Backup"
    "iPhone/iPad firmware (.ipsw)|$L/iTunes/iPhone Software Updates"
    "Mail downloads|$L/Containers/com.apple.mail/Data/Library/Mail Downloads"
    "User logs|$L/Logs"
    "Crash reports|$L/DiagnosticReports"
    "User caches (total)|$C"
  )
else
  specific=(
    "Android SDK|$HOME/Android/Sdk"
    "pnpm store|$HOME/.local/share/pnpm/store"
    "Yarn v1 cache|$C/yarn"
    "uv cache|$C/uv"
    "pip cache|$C/pip"
    "Poetry cache|$C/pypoetry"
    "Playwright browsers|$C/ms-playwright"
    "JetBrains caches|$C/JetBrains"
    "JetBrains Toolbox apps|$HOME/.local/share/JetBrains/Toolbox/apps"
    "Thumbnails|$C/thumbnails"
    "Trash|$HOME/.local/share/Trash"
    "Flatpak user apps|$HOME/.local/share/flatpak"
    "Steam|$HOME/.local/share/Steam"
    "Docker Desktop data|$HOME/.docker/desktop"
    "User caches (total)|$C"
  )
fi
report "${common[@]}" "${specific[@]}"
echo

echo "== Largest entries in ~ (>= ${min_mb} MB) =="
for p in "$HOME"/* "$HOME"/.[!.]*; do
  [ -e "$p" ] || continue
  case "$(basename "$p")" in .Trash|Library|.cache|.local|.config) continue;; esac
  kb=$(size_kb "$p"); [ -n "$kb" ] && [ "$kb" -ge "$min_kb" ] && printf "%s|%s\n" "$kb" "$p"
done | sort -t'|' -k1,1nr | head -20 | while IFS='|' read -r kb p; do
  printf "%10s  %s\n" "$(human "$kb")" "${p/#$HOME/$tilde}"
done
echo

if [ "$os" = Darwin ]; then
  echo "== Largest in ~/Library/Application Support (>= ${min_mb} MB) =="
  for p in "$AS"/*; do
    kb=$(size_kb "$p"); [ -n "$kb" ] && [ "$kb" -ge "$min_kb" ] && printf "%s|%s\n" "$kb" "$p"
  done | sort -t'|' -k1,1nr | head -12 | while IFS='|' read -r kb p; do
    app=$(basename "$p"); note=""
    # Heuristic: no /Applications/<name>*.app means the app may be uninstalled.
    ls -d "/Applications/$app"*.app "$HOME/Applications/$app"*.app >/dev/null 2>&1 || ls -d "/Applications/"*"$app"*.app >/dev/null 2>&1 || note="  (no matching app in /Applications?)"
    printf "%10s  %s%s\n" "$(human "$kb")" "$app" "$note"
  done
  echo
  if command -v xcrun >/dev/null 2>&1; then
    echo "== Simulators =="
    echo "developer dir: $(xcode-select -p 2>/dev/null)"
    echo "runtimes installed: $(xcrun simctl list runtimes 2>/dev/null | grep -c -E '^(iOS|watchOS|tvOS|visionOS|xrOS)')"
    echo "unavailable simulators: $(xcrun simctl list devices unavailable 2>/dev/null | grep -c -E '\([0-9A-F-]{36}\)')"
    echo
  fi
  n=$(tmutil listlocalsnapshots / 2>/dev/null | grep -c com.apple)
  [ "${n:-0}" -gt 0 ] && echo "Time Machine local snapshots: $n (macOS purges these itself under pressure)"
  echo "Note: ~/.Trash is often unreadable without Full Disk Access; ask the person whether it's empty."
else
  echo "== Largest in ~/.config and ~/.local/share (>= ${min_mb} MB) =="
  for p in "$AS"/* "$HOME/.local/share"/*; do
    kb=$(size_kb "$p"); [ -n "$kb" ] && [ "$kb" -ge "$min_kb" ] && printf "%s|%s\n" "$kb" "$p"
  done | sort -t'|' -k1,1nr | head -12 | while IFS='|' read -r kb p; do
    printf "%10s  %s\n" "$(human "$kb")" "${p/#$HOME/$tilde}"
  done
  echo
  echo "== System (read-only checks; cleaning these needs sudo) =="
  command -v journalctl >/dev/null && echo "systemd journal: $(journalctl --disk-usage 2>/dev/null | grep -oE '[0-9.]+[KMGT]?B?' | tail -1)"
  [ -d /var/cache/apt/archives ] && echo "apt package cache: $(du -sh /var/cache/apt/archives 2>/dev/null | cut -f1)"
  [ -d /var/cache/dnf ] && echo "dnf cache: $(du -sh /var/cache/dnf 2>/dev/null | cut -f1)"
  [ -d /var/cache/pacman/pkg ] && echo "pacman cache: $(du -sh /var/cache/pacman/pkg 2>/dev/null | cut -f1)"
  command -v snap >/dev/null && echo "disabled snap revisions: $(snap list --all 2>/dev/null | awk '/disabled/' | wc -l | tr -d ' ')"
  command -v flatpak >/dev/null && echo "flatpak: run 'flatpak uninstall --unused' to preview unused runtimes"
  [ -d /var/lib/systemd/coredump ] && echo "core dumps: $(du -sh /var/lib/systemd/coredump 2>/dev/null | cut -f1)"
fi

if command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1; then
  echo; echo "== Docker =="; docker system df 2>/dev/null
fi
