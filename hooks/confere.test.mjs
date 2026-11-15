import { test } from "node:test";
import assert from "node:assert/strict";
import { asksToCheck, unverifiedClaim } from "./confere.mjs";

const user = (content) => ({ type: "user", message: { content } });
const tool = (name) => ({ type: "assistant", message: { content: [{ type: "tool_use", name }] } });
const result = () => user([{ type: "tool_result", content: "ok" }]);
const say = (text) => ({ type: "assistant", message: { content: [{ type: "text", text }] } });

test("sends a done claim after edits back to check the request", () => {
  assert.equal(unverifiedClaim([user("arruma o login"), tool("Edit"), result(), say("Pronto, corrigi o login.")]), true);
});
test("asks for the check even when a command ran after the edit", () => {
  assert.equal(unverifiedClaim([user("arruma"), tool("Edit"), result(), tool("Bash"), result(), say("Pronto: 12 testes passam.")]), true);
});
test("ignores turns without edits and messages without a claim", () => {
  assert.equal(unverifiedClaim([user("o que é isso?"), say("Pronto é uma palavra.")]), false);
  assert.equal(unverifiedClaim([user("arruma"), tool("Edit"), result(), say("Mudei o arquivo; quer que eu rode os testes?")]), false);
});
test("only looks at the current turn and skips subagents", () => {
  const older = [user("antes"), tool("Edit"), result(), say("Pronto.")];
  assert.equal(unverifiedClaim([...older, user("e agora?"), say("Pronto.")]), false);
  assert.equal(unverifiedClaim([user("x"), { ...tool("Edit"), isSidechain: true }, say("Pronto.")]), false);
});
test("recognizes the person asking whether something is missing", () => {
  for (const p of ["veja se faltou coisa", "terminou?", "confere aí", "tá pronto?", "ficou faltando algo?"]) assert.equal(asksToCheck(p), true, p);
  assert.equal(asksToCheck("cria uma landing nova"), false);
});
