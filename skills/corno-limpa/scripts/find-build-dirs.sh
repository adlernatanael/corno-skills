#!/usr/bin/env bash
# Find regenerable dependency and build directories under a code root. Deletes nothing.
# Works on macOS, Linux and Git Bash on Windows.
# Usage: bash find-build-dirs.sh <root> [list_file]
# Prints totals per kind and, if list_file is given, writes one path per line
# (ready for: tr '\n' '\0' < list_file | xargs -0 rm -rf).
# Build dirs (target/, build/, bin/, obj/, .build/) are only listed when a matching
# manifest sits next to them, so hand-written folders with those names are left alone.

root=${1:?usage: find-build-dirs.sh <root> [list_file]}
out=${2:-}
tmp=$(mktemp)

# Dependency and tool cache dirs: unambiguous by name.
find "$root" -type d \( \
    -name node_modules -o -name .next -o -name .turbo -o -name .expo -o -name .svelte-kit \
    -o -name .nuxt -o -name .parcel-cache -o -name .angular -o -name .cxx -o -name __pycache__ \
    -o -name .pytest_cache -o -name .mypy_cache -o -name .ruff_cache -o -name .tox \
    -o -name .dart_tool -o -name .terraform \
    -o -path '*/ios/Pods' -o -path '*/android/.gradle' \
  \) -prune -print 2>/dev/null >> "$tmp"

# Build output, gated on a sibling manifest. Skip anything inside node_modules.
find "$root" -type d \( -name node_modules -prune \) -o -type d \
  \( -name target -o -name build -o -name .build -o -name .venv -o -name venv -o -name bin -o -name obj \) -prune -print 2>/dev/null |
while IFS= read -r d; do
  parent=$(dirname "$d"); name=$(basename "$d")
  case "$name" in
    target) { [ -f "$parent/Cargo.toml" ] || [ -f "$parent/pom.xml" ]; } && echo "$d" ;;
    .build) [ -f "$parent/Package.swift" ] && echo "$d" ;;
    .venv|venv) { [ -f "$parent/pyvenv.cfg" ] || [ -f "$d/pyvenv.cfg" ]; } && echo "$d" ;;
    bin|obj) ls "$parent"/*.csproj "$parent"/*.fsproj >/dev/null 2>&1 && echo "$d" ;;
    build)
      if [ -f "$parent/build.gradle" ] || [ -f "$parent/build.gradle.kts" ] || [ -f "$parent/pubspec.yaml" ]; then echo "$d"
      elif [ "$(basename "$parent")" = ios ] && ls "$parent"/*.xcodeproj >/dev/null 2>&1; then echo "$d"
      fi ;;
  esac
done >> "$tmp"

sort -u "$tmp" -o "$tmp"

kind_of() {
  case "$1" in
    */node_modules) echo node_modules ;;
    */ios/Pods) echo ios/Pods ;;
    */ios/build) echo ios/build ;;
    */android/.gradle) echo android/.gradle ;;
    */build) echo "gradle/flutter build" ;;
    */target) echo "rust/maven target" ;;
    */.build) echo "swift .build" ;;
    */.venv|*/venv) echo "python venv" ;;
    */bin|*/obj) echo ".NET bin/obj" ;;
    *) basename "$1" ;;
  esac
}

tr '\n' '\0' < "$tmp" | xargs -0 du -sk 2>/dev/null | while IFS=$'\t' read -r kb path; do
  printf "%s\t%s\n" "$(kind_of "$path")" "$kb"
done | awk -F'\t' '{s[$1]+=$2; c[$1]++; t+=$2} END{
  for (k in s) printf "%8.1f GB  %5d dirs  %s\n", s[k]/1048576, c[k], k
  printf "%8.1f GB  total\n", t/1048576 > "/dev/stderr"
}' | sort -rn
echo "(largest single dirs)"
tr '\n' '\0' < "$tmp" | xargs -0 du -sk 2>/dev/null | sort -rn | head -10 | awk -F'\t' '{printf "%8.1f GB  %s\n", $1/1048576, $2}'

if [ -n "$out" ]; then cp "$tmp" "$out"; echo "list written to $out ($(wc -l < "$out" | tr -d ' ') paths)"; fi
rm -f "$tmp"
