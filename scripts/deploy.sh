#!/usr/bin/env bash
# Builds the static site and publishes it to the `gh-pages` branch, which
# GitHub Pages serves. Usage: npm run deploy
set -euo pipefail

BASE_PATH=/nextjs-recipe-store npx next build
# Next writes 404.html for unknown paths; .nojekyll keeps the _next/ folder.
touch out/.nojekyll

SHA=$(git rev-parse --short HEAD)
WORKTREE=$(mktemp -d)
trap 'git worktree remove --force "$WORKTREE" 2>/dev/null || true' EXIT

git worktree add --detach "$WORKTREE" >/dev/null
(
  cd "$WORKTREE"
  git checkout --orphan gh-pages-build >/dev/null 2>&1
  git rm -rfq . >/dev/null 2>&1 || true
  cp -a "$OLDPWD/out/." .
  git add -A
  git commit -qm "Deploy $SHA"
  git push -f origin HEAD:gh-pages
)
git branch -D gh-pages-build >/dev/null 2>&1 || true
echo "Published $SHA to gh-pages"
