#!/usr/bin/env bash
# Report whether repos and worktrees hold work that exists nowhere else. Read-only
# (apart from `git fetch`, which only updates remote-tracking refs).
# Usage: bash git-audit.sh <path> [<path> ...]
#   Each path may be a repo, a worktree, or a folder containing them (searched 4 levels deep).
# Columns:
#   size, dirty (changed/untracked files, ignoring node_modules/.expo/.turbo),
#   unpushed (commits on local branches that no remote has),
#   in_default (HEAD already contained in origin/HEAD: yes/no/?),
#   last (last commit date), branch, remote (none = local-only), path
# Set NO_FETCH=1 to skip fetching.

audit() {
  r=$1
  git -C "$r" rev-parse --git-dir >/dev/null 2>&1 || { printf "%-7s NOT-A-REPO %s\n" "$(du -sh "$r" 2>/dev/null | cut -f1)" "$r"; return; }
  [ -n "$NO_FETCH" ] || git -C "$r" fetch -q --all --prune 2>/dev/null
  branch=$(git -C "$r" rev-parse --abbrev-ref HEAD 2>/dev/null)
  remote=$(git -C "$r" remote get-url origin 2>/dev/null | sed -E 's#https://[^@/]+@#https://#')
  [ -n "$remote" ] || remote=none
  dirty=$(git -C "$r" status --porcelain 2>/dev/null | grep -v -E '^\?\? (.*/)?(node_modules|\.expo|\.turbo)/?$' | wc -l | tr -d ' ')
  if [ "$remote" = none ]; then
    unpushed=$(git -C "$r" rev-list --count --branches 2>/dev/null)
  else
    unpushed=$(git -C "$r" rev-list --count --branches --not --remotes 2>/dev/null)
  fi
  def=$(git -C "$r" symbolic-ref -q --short refs/remotes/origin/HEAD 2>/dev/null)
  [ -n "$def" ] || { git -C "$r" rev-parse -q --verify origin/main >/dev/null 2>&1 && def=origin/main; }
  if [ -n "$def" ]; then
    [ "$(git -C "$r" rev-list --count "$def..HEAD" 2>/dev/null)" = 0 ] && in_default=yes || in_default=no
  else
    in_default="?"
  fi
  last=$(git -C "$r" log -1 --format=%cs 2>/dev/null)
  printf "%-7s dirty=%-4s unpushed=%-4s in_default=%-4s last=%-10s %-40s remote=%s  %s\n" \
    "$(du -sh "$r" 2>/dev/null | cut -f1)" "$dirty" "$unpushed" "$in_default" "$last" "[$branch]" "$remote" "$r"
}

for p in "$@"; do
  if [ -e "$p/.git" ]; then
    audit "$p"
  else
    find "$p" -maxdepth 4 -name node_modules -prune -o -name .git -print 2>/dev/null | while IFS= read -r g; do
      audit "$(dirname "$g")"
    done
  fi
done
