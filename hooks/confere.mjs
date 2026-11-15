#!/usr/bin/env node
// corno-confere as a hook, so it does not depend on the agent remembering.
// UserPromptSubmit: when the person asks whether something is missing or done, point the agent at corno-confere.
// Stop: when the agent ends a turn that changed files by claiming it is done, send it back once to check every part
// of the request. Never blocks twice in a row (stop_hook_active), and stays silent on any error.
import { readFileSync } from "node:fs";

const ASK =
  /(faltou|falta(ndo)? (algo|alguma coisa|coisa)|ficou faltando|esqueceu (algo|alguma)|confere|conferiu|verifica (se|a[ií])|checa (se|a[ií])|terminou\?|t[aá] pronto\?|est[aá] pronto\?|ficou pronto\?|anything missing|did you miss|is it done)/i;
const CLAIM =
  /\b(pronto|feito|terminei|terminad[oa]|conclu[ií]d[oa]|corrigi|corrigid[oa]|resolvid[oa]|funciona|funcionando|tudo certo|testes? (passam|passou|passando)|done|fixed|all green|works now|should work)\b/i;
const EDITS = new Set(["Edit", "Write", "MultiEdit", "NotebookEdit"]);

export function asksToCheck(prompt) {
  return ASK.test(prompt ?? "");
}

/** True when the turn changed files and its final message claims completion. */
export function unverifiedClaim(entries) {
  const main = entries.filter((e) => !e.isSidechain && (e.type === "user" || e.type === "assistant"));
  // The turn starts after the last prompt the person typed (a user entry whose content is text, not a tool result).
  let start = 0;
  main.forEach((e, i) => {
    const c = e.message?.content;
    const typed = typeof c === "string" || (Array.isArray(c) && c.some((b) => b.type === "text"));
    if (e.type === "user" && typed) start = i + 1;
  });
  let edited = false;
  let lastText = "";
  main.slice(start).forEach((e) => {
    if (e.type !== "assistant") return;
    for (const b of e.message?.content ?? []) {
      if (b.type === "tool_use" && EDITS.has(b.name)) edited = true;
      if (b.type === "text") lastText = b.text;
    }
  });
  return edited && CLAIM.test(lastText);
}

function main() {
  const input = JSON.parse(readFileSync(0, "utf8"));
  if (input.hook_event_name === "UserPromptSubmit" && asksToCheck(input.prompt)) {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "UserPromptSubmit",
          additionalContext:
            "A pessoa quer saber se falta algo. Use a skill corno-confere: releia tudo que foi pedido nesta conversa, inclusive mensagens que chegaram no meio, liste item por item, confira cada um com prova, faça o que faltou e diga o que não deu para fazer.",
        },
      }),
    );
    return;
  }
  if (input.hook_event_name === "Stop" && !input.stop_hook_active && input.transcript_path) {
    const entries = readFileSync(input.transcript_path, "utf8")
      .split("\n")
      .filter(Boolean)
      .map((l) => {
        try {
          return JSON.parse(l);
        } catch {
          return {};
        }
      });
    if (unverifiedClaim(entries)) {
      process.stdout.write(
        JSON.stringify({
          decision: "block",
          reason:
            "corno-confere: antes de dizer que terminou, releia tudo que foi pedido nesta conversa desde o último pronto, inclusive mensagens que chegaram no meio. Liste item por item e prove cada um com algo rodado agora (arquivo, teste, build, print, status remoto), faça o que faltou e só então responda, dizendo o que não deu para fazer.",
        }),
      );
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    main();
  } catch {
    // A hook must never break the session.
  }
}
