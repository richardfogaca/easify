#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source_path="$repo_root/easify"
codex_root="${CODEX_SKILLS_ROOT:-${CODEX_HOME:-$HOME/.codex}/skills}"
claude_root="${CLAUDE_SKILLS_ROOT:-$HOME/.claude/skills}"
codex_path="$codex_root/easify"
claude_path="$claude_root/easify"

install_link() {
  local destination="$1"
  local target="$2"

  if [[ -L "$destination" ]]; then
    if [[ "$(readlink "$destination")" == "$target" ]]; then
      return
    fi
    rm "$destination"
  elif [[ -e "$destination" ]]; then
    printf 'Conflict: %s is a real file or directory; refusing to overwrite.\n' "$destination" >&2
    exit 2
  fi

  ln -s "$target" "$destination"
}

mkdir -p "$codex_root" "$claude_root"
install_link "$codex_path" "$source_path"
install_link "$claude_path" "$codex_path"

test -f "$codex_path/SKILL.md"
test -f "$claude_path/SKILL.md"
cmp "$source_path/SKILL.md" "$codex_path/SKILL.md"
cmp "$codex_path/SKILL.md" "$claude_path/SKILL.md"

printf 'Codex: %s -> %s\n' "$codex_path" "$source_path"
printf 'Claude: %s -> %s\n' "$claude_path" "$codex_path"
