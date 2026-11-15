# Read-only overview of where disk space goes on Windows. Deletes nothing.
# Usage: powershell -ExecutionPolicy Bypass -File scan.ps1 [-MinMB 200]
# For code folders and git state, run find-build-dirs.sh and git-audit.sh from Git Bash.
param([int]$MinMB = 200)

$min = $MinMB * 1MB
$U = $env:USERPROFILE; $LA = $env:LOCALAPPDATA; $RA = $env:APPDATA

function SizeOf($p) {
  (Get-ChildItem -LiteralPath $p -Recurse -Force -File -ErrorAction SilentlyContinue |
    Measure-Object -Property Length -Sum).Sum
}
function Human($b) { if ($b -ge 1GB) { '{0:N1} GB' -f ($b / 1GB) } else { '{0:N0} MB' -f ($b / 1MB) } }
function Report($entries) {
  $rows = foreach ($e in $entries) {
    $label, $path = $e -split '\|', 2
    if (-not (Test-Path -LiteralPath $path)) { continue }
    $b = SizeOf $path
    if ($b -ge $min) { [pscustomobject]@{ Bytes = $b; Label = $label; Path = $path.Replace($U, '~') } }
  }
  $rows | Sort-Object Bytes -Descending | ForEach-Object { '{0,10}  {1,-30} {2}' -f (Human $_.Bytes), $_.Label, $_.Path }
}

"== Disk =="
Get-PSDrive -PSProvider FileSystem | Where-Object Used | ForEach-Object {
  '{0}: free {1} of {2}' -f $_.Name, (Human $_.Free), (Human ($_.Used + $_.Free))
}
""

"== Browser on-device AI models (re-download unless disabled, see references/navegadores-e-ia.md) =="
$browsers = @("Chrome|$LA\Google\Chrome\User Data", "Chrome Beta|$LA\Google\Chrome Beta\User Data",
  "Edge|$LA\Microsoft\Edge\User Data", "Brave|$LA\BraveSoftware\Brave-Browser\User Data", "Vivaldi|$LA\Vivaldi\User Data")
$found = $false
foreach ($e in $browsers) {
  $label, $dir = $e -split '\|', 2
  if (-not (Test-Path -LiteralPath $dir)) { continue }
  Get-ChildItem -LiteralPath $dir -Directory -Filter 'OptGuideOnDevice*' -Depth 1 -ErrorAction SilentlyContinue | ForEach-Object {
    '{0,10}  {1,-30} {2}' -f (Human (SizeOf $_.FullName)), "$label model", $_.FullName.Replace($U, '~'); $found = $true
  }
}
if (-not $found) { "none found" }
""

"== Developer tools, caches and AI (>= $MinMB MB) =="
Report @(
  "Android emulators|$U\.android\avd", "Android SDK|$LA\Android\Sdk",
  "Gradle caches|$U\.gradle\caches", "Maven repository|$U\.m2\repository", "NuGet packages|$U\.nuget\packages",
  "npm cache|$LA\npm-cache", "pnpm store|$LA\pnpm\store", "Yarn cache|$LA\Yarn\Cache", "bun cache|$U\.bun\install\cache",
  "Go module cache|$U\go\pkg\mod", "Cargo registry|$U\.cargo\registry", "rustup toolchains|$U\.rustup",
  "pip cache|$LA\pip\Cache", "uv cache|$LA\uv\cache", "Poetry cache|$LA\pypoetry\Cache",
  "conda pkgs|$U\anaconda3\pkgs", "miniconda pkgs|$U\miniconda3\pkgs",
  "Playwright browsers|$LA\ms-playwright", "Puppeteer browsers|$U\.cache\puppeteer",
  "Hugging Face models|$U\.cache\huggingface", "Ollama models|$U\.ollama\models", "LM Studio models|$U\.lmstudio\models",
  "Claude Code projects|$U\.claude\projects", "Claude desktop VM|$RA\Claude\vm_bundles", "Codex sessions|$U\.codex\sessions",
  "VS Code extensions|$U\.vscode\extensions", "Cursor extensions|$U\.cursor\extensions",
  "JetBrains caches|$LA\JetBrains", "Docker Desktop disk|$LA\Docker\wsl", "WSL distros (Store)|$LA\Packages",
  "Steam shader cache|${env:ProgramFiles(x86)}\Steam\steamapps\shadercache",
  "User temp|$env:TEMP", "Downloads|$U\Downloads", "Crash dumps|$LA\CrashDumps"
)
""

"== System (cleaning these needs an elevated prompt) =="
Report @(
  "Windows temp|$env:windir\Temp",
  "Windows Update downloads|$env:windir\SoftwareDistribution\Download",
  "Delivery Optimization|$env:windir\ServiceProfiles\NetworkService\AppData\Local\Microsoft\Windows\DeliveryOptimization",
  "Windows.old|$env:SystemDrive\Windows.old",
  "Memory dumps|$env:windir\Minidump"
)
$h = Get-Item -LiteralPath "$env:SystemDrive\hiberfil.sys" -Force -ErrorAction SilentlyContinue
if ($h) { "{0,10}  {1}" -f (Human $h.Length), "hiberfil.sys (only removable with powercfg /h off; ask)" }
"Recycle Bin: ask the person whether it's empty (sizes per drive in Settings > System > Storage)."
""

"== WSL and virtual disks (.vhdx files never shrink on their own) =="
Get-ChildItem -Path "$LA\Packages", "$LA\Docker" -Recurse -Force -Filter '*.vhdx' -ErrorAction SilentlyContinue |
  Sort-Object Length -Descending | ForEach-Object { '{0,10}  {1}' -f (Human $_.Length), $_.FullName.Replace($U, '~') }
""

"== Largest entries in ~ (>= $MinMB MB) =="
Get-ChildItem -LiteralPath $U -Force -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -notin 'AppData' } |
  ForEach-Object { [pscustomobject]@{ Bytes = $(if ($_.PSIsContainer) { SizeOf $_.FullName } else { $_.Length }); Path = $_.FullName } } |
  Where-Object { $_.Bytes -ge $min } | Sort-Object Bytes -Descending | Select-Object -First 20 |
  ForEach-Object { '{0,10}  {1}' -f (Human $_.Bytes), $_.Path.Replace($U, '~') }
""

"== Largest in AppData\Local and AppData\Roaming (>= $MinMB MB) =="
Get-ChildItem -LiteralPath $LA, $RA -Directory -Force -ErrorAction SilentlyContinue |
  ForEach-Object { [pscustomobject]@{ Bytes = SizeOf $_.FullName; Path = $_.FullName } } |
  Where-Object { $_.Bytes -ge $min } | Sort-Object Bytes -Descending | Select-Object -First 15 |
  ForEach-Object { '{0,10}  {1}' -f (Human $_.Bytes), $_.Path.Replace($U, '~') }

if (Get-Command docker -ErrorAction SilentlyContinue) { ""; "== Docker =="; docker system df 2>$null }
