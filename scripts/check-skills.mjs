#!/usr/bin/env node
// Checks every skill in skills/: frontmatter shape, name matching its folder, a description with triggers,
// referenced files that exist, and no third-party attribution left in the text. Exits 1 on any problem.
// Usage: node scripts/check-skills.mjs
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = join(root, "skills");
const problems = [];

export function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-z-]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim();
  }
  return { data, body: text.slice(m[0].length) };
}

function filesUnder(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? filesUnder(p) : [p];
  });
}

// Attribution phrases that should never ship: every text in the repo is our own.
const ATTRIBUTION = /(adaptad[oa]s? de|baseado em|inspirad[oa] (em|por)|adapted from|based on|inspired by|courtesy of|©)/i;

for (const name of readdirSync(skillsDir).sort()) {
  const dir = join(skillsDir, name);
  if (!statSync(dir).isDirectory()) continue;
  const where = `skills/${name}`;
  const skillPath = join(dir, "SKILL.md");
  if (!existsSync(skillPath)) {
    problems.push(`${where}: missing SKILL.md`);
    continue;
  }
  const fm = parseFrontmatter(readFileSync(skillPath, "utf8"));
  if (!fm) {
    problems.push(`${where}/SKILL.md: missing frontmatter`);
    continue;
  }
  if (!/^corno-[a-z0-9-]+$/.test(name)) problems.push(`${where}: folder must be corno-<lowercase-with-hyphens>`);
  if (fm.data.name !== name) problems.push(`${where}/SKILL.md: name "${fm.data.name}" does not match folder`);
  const desc = fm.data.description ?? "";
  if (desc.length < 80) problems.push(`${where}/SKILL.md: description too short (${desc.length} chars)`);
  if (desc.length > 1024) problems.push(`${where}/SKILL.md: description over 1024 chars`);
  if (!/\buse (quando|sempre|antes|depois)/i.test(desc)) problems.push(`${where}/SKILL.md: description has no "Use quando…" triggers`);

  // Every relative link or `references/…` / `scripts/…` path mentioned must exist.
  const mentioned = new Set();
  for (const m of fm.body.matchAll(/\]\(((?:references|scripts)\/[^)#\s]+)/g)) mentioned.add(m[1]);
  for (const m of fm.body.matchAll(/`((?:references|scripts)\/[A-Za-z0-9._/-]+\.(?:md|sh|ps1|mjs|js|py))`/g)) mentioned.add(m[1]);
  for (const rel of mentioned) if (!existsSync(join(dir, rel))) problems.push(`${where}/SKILL.md: mentions ${rel}, which does not exist`);

  for (const file of filesUnder(dir)) {
    if (!/\.(md|sh|ps1|mjs|js|py)$/.test(file)) continue;
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      if (ATTRIBUTION.test(line)) problems.push(`${file.slice(root.length + 1)}:${i + 1}: attribution text: ${line.trim().slice(0, 80)}`);
    });
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (problems.length) {
    console.error(problems.join("\n"));
    console.error(`\n${problems.length} problem(s)`);
    process.exit(1);
  }
  console.log(`ok: ${readdirSync(skillsDir).length} skills`);
}
