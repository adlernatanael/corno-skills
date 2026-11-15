# Navegadores, apps Electron, modelos de IA e agentes

Objetivo: recuperar o espaço que navegadores, apps de chat/IA e ferramentas de agente acumulam sem avisar. Parte disso se baixa de novo sozinha, então a ordem importa: desligar, fechar o app, apagar.

## 1. Modelo de IA do Chrome (Gemini Nano, cerca de 4 GB)

O Chrome baixa sozinho o Gemini Nano para recursos locais ("Me ajude a escrever", detecção de golpe, Prompt API para sites e extensões). O arquivo principal é um `weights.bin` dentro de:

| Sistema | Pasta |
|---|---|
| macOS | `~/Library/Application Support/Google/Chrome/OptGuideOnDeviceModel` |
| Windows | `%LOCALAPPDATA%\Google\Chrome\User Data\OptGuideOnDeviceModel` |
| Linux | `~/.config/google-chrome/OptGuideOnDeviceModel` |

Ao lado costuma existir `OptGuideOnDeviceClassifierModel`, menor. O scan procura `OptGuideOnDevice*` em Chrome, Chrome Beta/Canary, Chromium, Edge, Brave, Arc, Dia e Vivaldi.

**Só apagar não resolve: o Chrome baixa de novo.** Ordem certa:

1. **Pergunte se a pessoa usa** algum desses recursos. Desligar o modelo desliga tudo que depende dele.
2. **Desligue o download**, do mais simples ao mais garantido:
   - Configurações → Sistema → IA no dispositivo (On-device AI), nas versões que têm esse botão. Desligar remove o modelo e para os downloads.
   - `chrome://flags/#optimization-guide-on-device-model` → Disabled (e `#prompt-api-for-gemini-nano` → Disabled, se existir). Reinicie o Chrome.
   - **Política** `GenAILocalFoundationalModelSettings = 1` (Chrome 124+). Pela documentação oficial: com 1, o modelo não é baixado e o que já existe é apagado. É a opção que sobrevive a atualizações:
     ```bash
     # Windows (só este usuário; HKLM vale para todos e pede admin)
     reg add "HKCU\Software\Policies\Google\Chrome" /v GenAILocalFoundationalModelSettings /t REG_DWORD /d 1 /f
     # macOS (fora de MDM, o Chrome trata como política recomendada; confira em chrome://policy)
     defaults write com.google.Chrome GenAILocalFoundationalModelSettings -int 1
     # Linux (pede sudo; Chromium usa /etc/chromium/policies/managed)
     sudo mkdir -p /etc/opt/chrome/policies/managed
     echo '{"GenAILocalFoundationalModelSettings": 1}' | sudo tee /etc/opt/chrome/policies/managed/corno-limpa.json
     ```
     Avise que o Chrome passa a mostrar "Gerenciado pela sua organização" no menu. É o efeito normal de qualquer política local.
3. **Feche o Chrome** (`pgrep -f 'Google Chrome'`, `Get-Process chrome`) e apague a pasta.
4. **Confira**: `chrome://policy` mostra a política, `chrome://on-device-internals` mostra o estado do modelo, e a pasta não volta depois de reiniciar.

Para Edge, Brave e outros Chromium, a pasta pode aparecer com o mesmo nome. O caminho de desligar é a flag equivalente (`edge://flags`, `brave://flags`). Não prometa que a política do Chrome vale para eles.

## 2. Versões antigas do navegador

- **macOS**: depois de atualizar, o Chrome guarda a versão anterior em `Google Chrome.app/Contents/Frameworks/Google Chrome Framework.framework/Versions/` até reiniciar, e às vezes ela fica. Só a versão apontada por `Versions/Current` é usada. Com o navegador fechado, as outras pastas de versão podem ir. Vale para Edge (`Microsoft Edge Framework.framework`) e Brave (`Brave Browser Framework.framework`). O Edge também guarda instaladores velhos em `~/Library/Application Support/Microsoft/EdgeUpdater/apps/msedge-stable/<versão>`; fique com a mais nova.
- **Windows**: `C:\Program Files\Google\Chrome\Application\<versão>` antiga some sozinha quando o Chrome reinicia. Peça para reiniciar o navegador antes de apagar na mão. Mesmo para o Edge.
- **Linux**: o gerenciador de pacotes cuida.

## 3. Cache dos navegadores

Em geral não vale a pena: enche de novo em dias e o navegador gerencia. Exceção: **dados de site** gigantes (Service Worker / CacheStorage de um site pode passar de 1 GB). Mande a pessoa olhar em `chrome://settings/content/all` (ordenar por dados armazenados) ou `about:preferences#privacy` no Firefox e limpar site a site. Isso preserva logins dos outros sites, coisa que apagar pasta não faz.

## 4. Apps Electron (Slack, Discord, Teams, Notion, Figma, WhatsApp, Spotify, Linear, Cursor…)

Dentro da pasta de dados de cada app (`~/Library/Application Support/<App>`, `~/.config/<App>`, `%APPDATA%\<App>`), são regeneráveis, **com o app fechado**:

- `Cache`, `Code Cache`, `GPUCache`, `DawnCache`, `DawnGraphiteCache`, `DawnWebGPUCache`
- `Service Worker/CacheStorage` e `Service Worker/ScriptCache`
- as mesmas pastas dentro de `Partitions/*/` (Notion, Slack e Teams usam partições)
- `Crashpad/completed` e `Crashpad/pending` (relatórios de crash)

Não apague `Local Storage`, `IndexedDB`, `Cookies` nem `Session Storage`: é onde ficam login e dados offline.

Mídia baixada por apps de mensagem (Telegram, WhatsApp, Discord) e músicas offline (Spotify `PersistentCache`/`Storage`) são da pessoa. Prefira o gerenciador de armazenamento do próprio app e pergunte.

## 5. Modelos de IA locais

| Onde | Como limpar |
|---|---|
| Ollama (`~/.ollama/models`) | `ollama list`, depois `ollama rm <nome>`. Diga há quanto tempo cada um não é usado. |
| LM Studio (`~/.lmstudio/models/<publisher>/<modelo>`) | Apague a pasta do modelo, ou pela aba My Models. |
| Hugging Face (`~/.cache/huggingface/hub`) | `huggingface-cli scan-cache` mostra por modelo e `huggingface-cli delete-cache` remove o escolhido. Na CLI nova (`hf`), os subcomandos mudaram de nome entre versões: confira `hf cache --help`. |
| PyTorch e Whisper (`~/.cache/torch`, `~/.cache/whisper`) | Baixam de novo no próximo uso. |
| ComfyUI, Automatic1111, Fooocus (`models/`, `outputs/`) | Modelos se baixam de novo; `outputs/` são imagens da pessoa: pergunte. |
| Pinokio (`~/pinokio`) | Cada app instalado leva o próprio venv e modelos. Desinstale pelo Pinokio; `~/pinokio/cache` pode ir. |
| Apple Intelligence, Copilot+ PC | Gerenciados pelo sistema. Desligue nos ajustes do sistema; nunca apague à mão. |

## 6. CLIs e apps de agente

- **Versões antigas de CLI**: o Claude Code (instalação nativa) guarda cada versão em `~/.local/share/claude/versions`; o cursor-agent em `~/.local/share/cursor-agent/versions`. Fique com a versão para onde aponta o binário (`readlink ~/.local/bin/claude`, `readlink ~/.local/bin/cursor-agent`) e apague o resto. O Copilot CLI guarda pacotes em `~/.copilot/pkg`.
- **Codex**: `~/.cache/codex-runtimes` (runtimes baixados), `~/.codex/.tmp`, `~/Library/Caches/com.openai.codex` (instaladores do auto-update), `~/Library/Application Support/Codex/Crashpad`. Regeneráveis com o app fechado.
- **VM do Claude desktop**: `~/Library/Application Support/Claude/vm_bundles` (10 a 20 GB; também em pastas secundárias como `Claude-Work`). O app baixa de novo quando precisa. Feche o app antes.
- **Navegadores de automação**: `~/.agent-browser/browsers` guarda builds do Chrome para teste (fique com a mais nova), `~/.cache/chrome-devtools-mcp/chrome-profile`, `~/.gemini/antigravity-browser-profile`, Playwright e Puppeteer (veja `ferramentas-dev.md`).
- **Histórico de sessão** (`~/.claude/projects`, `~/.codex/sessions`): ofereça apagar arquivos com mais de N dias (`find <pasta> -type f -mtime +30 -delete`) em vez de tudo, para as conversas recentes continuarem retomáveis. Quase sempre o grosso é recente, então estime antes de prometer um número.
- **Worktrees de agente**: veja `codigo.md`, seção 3.
- **Logs**: `~/Library/Logs/Claude`, `~/Library/Logs/com.openai.codex` e afins podem ir.
