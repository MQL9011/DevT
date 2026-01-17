#!/usr/bin/env bash
set -euo pipefail

staged_files="$(git diff --cached --name-only)"

if [[ -z "${staged_files}" ]]; then
  exit 0
fi

if echo "${staged_files}" | rg -q '^(openspec/|\.cursor/commands/openspec-)'; then
  :
fi

if echo "${staged_files}" | rg -qv '^openspec/'; then
  if ! echo "${staged_files}" | rg -q '^openspec/changes/[^/]+/proposal\.md$'; then
    echo "OpenSpec guard: 检测到非 openspec 变更但未包含 proposal.md。"
    echo "请先创建 openspec/changes/<change-id>/proposal.md 并纳入提交。"
    exit 1
  fi
fi

exit 0
