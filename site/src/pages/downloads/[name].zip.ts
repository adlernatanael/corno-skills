import type { APIRoute, GetStaticPaths } from "astro";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { zipSync, type Zippable } from "fflate";
import { loadSkills, SKILLS_DIR } from "../../lib/skills";

// One zip per skill, plus "corno-skills" with all of them. Each skill sits in its own folder inside the zip,
// so unzipping into ~/.claude/skills (or any agent's skills folder) is the whole install.
export const getStaticPaths: GetStaticPaths = () => [
  ...loadSkills().map((s) => ({ params: { name: s.name } })),
  { params: { name: "corno-skills" } },
];

export const GET: APIRoute = ({ params }) => {
  const skills = loadSkills().filter((s) => params.name === "corno-skills" || s.name === params.name);
  const tree: Zippable = {};
  for (const s of skills) {
    for (const f of s.files) tree[`${s.name}/${f}`] = new Uint8Array(readFileSync(join(SKILLS_DIR, s.name, f)));
  }
  // A fixed date keeps the zip byte-identical between builds of the same content.
  const zip = zipSync(tree, { level: 9, mtime: new Date("2026-01-01T00:00:00Z") });
  return new Response(zip, { headers: { "Content-Type": "application/zip" } });
};
