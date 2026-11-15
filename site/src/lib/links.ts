export const REPO = "adlernatanael/corno-skills";
export const REPO_URL = `https://github.com/${REPO}`;

// Claude Code: the repo is a plugin marketplace with one plugin, "corno", that carries every skill.
export const INSTALL_CLAUDE = [`/plugin marketplace add ${REPO}`, "/plugin install corno@corno"];

// Any agent that reads Agent Skills folders: clone once, copy the folders you want.
export const INSTALL_CLONE = [`git clone ${REPO_URL}.git ~/corno-skills`, "cp -R ~/corno-skills/skills/* ~/.claude/skills/"];
