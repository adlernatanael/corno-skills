import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

// The site is built from the skills themselves: one source of truth, nothing copied by hand.
// Paths resolve from the site folder, where `npm run build` runs.
export const SKILLS_DIR = resolve(process.cwd(), "..", "skills");

export interface Skill {
  name: string;
  /** The name without the corno- prefix, as the card shows it. */
  short: string;
  description: string;
  /** The description's first sentence, for the card. */
  summary: string;
  /** The description up to its "Use quando…" part: what the skill does, for people. */
  what: string;
  /** The phrases that make the agent reach for the skill, from the description's quoted examples. */
  triggers: string[];
  /** The "Use quando…" sentence itself, for skills whose triggers are not quoted phrases. */
  when: string;
  body: string;
  /** Every file in the skill folder, relative to it, SKILL.md first. */
  files: string[];
  manualOnly: boolean;
}

function filesUnder(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (f === ".DS_Store") return [];
    return statSync(p).isDirectory() ? filesUnder(p) : [p];
  });
}

function parse(text: string) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error("SKILL.md without frontmatter");
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-z-]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim();
  }
  return { data, body: text.slice(m[0].length) };
}

let cache: Skill[] | undefined;

export function loadSkills(): Skill[] {
  if (cache) return cache;
  cache = readdirSync(SKILLS_DIR)
    .filter((name) => statSync(join(SKILLS_DIR, name)).isDirectory())
    .sort()
    .map((name) => {
      const dir = join(SKILLS_DIR, name);
      const { data, body } = parse(readFileSync(join(dir, "SKILL.md"), "utf8"));
      const description = data.description ?? "";
      const cut = description.search(/\bUse (quando|sempre|antes|depois)/);
      const when = cut === -1 ? "" : description.slice(cut);
      const files = filesUnder(dir)
        .map((p) => relative(dir, p))
        .sort((a, b) => (a === "SKILL.md" ? -1 : b === "SKILL.md" ? 1 : a.localeCompare(b)));
      return {
        name,
        short: name.replace(/^corno-/, ""),
        description,
        summary: description.split(/(?<=[.!?])\s|\s-\s/)[0].replace(/[.]$/, ""),
        what: (cut === -1 ? description : description.slice(0, cut)).trim(),
        triggers: [...when.matchAll(/"([^"]+)"/g)].map((m) => m[1]),
        when,
        // The page already shows the skill's name as its title.
        body: body.replace(/^\s*# .*\n/, ""),
        files,
        manualOnly: data["disable-model-invocation"] === "true",
      };
    });
  return cache;
}
