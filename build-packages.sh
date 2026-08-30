#!/usr/bin/env bash
set -euo pipefail

# Build all X packages locally and publish them to the local repo.
# Run from the x-repo root. Packages are committed and served via GitHub Pages.
#
# Usage: ./build-packages.sh

cd "$(dirname "$0")"

REPO_DIR="public/repo/x86_64"
XPM_DIR="public/x/x86_64"
OUT_DIR="$(mktemp -d)"
trap 'rm -rf "$OUT_DIR"' EXIT

echo "== Building packages locally =="

# Packages built with PKGBUILD (makepkg) -> pacman .pkg.tar.zst
build_pkgbuild() {
    local dir="$1"
    echo "  - building $dir"
    (cd "packages/$dir" && makepkg -cf --noconfirm)
}

# Packages built with XBUILD (xpkg) -> xpm .xp
build_xbuild() {
    local dir="$1"
    echo "  - building $dir"
    # xpkg build -f packages/$dir/XBUILD -o "$OUT_DIR"
}

# --- pacman-facing packages (committed to public/repo) ---
build_pkgbuild x-release
build_pkgbuild x-dev
build_pkgbuild x-calamares-config
build_pkgbuild x-live-session

# Calamares and kpmcore-git are built once from AUR and committed manually:
#   git clone https://aur.archlinux.org/kpmcore-git.git
#   git clone https://aur.archlinux.org/calamares.git
#   makepkg -si (in each), then copy the *.pkg.tar.zst here.

echo "== Copying packages to repo =="
for pkg in packages/*/*.pkg.tar.zst; do
    [ -f "$pkg" ] || continue
    echo "  + $pkg"
    cp "$pkg" "$REPO_DIR/"
    rm -f "$pkg"
done

echo "== Regenerating pacman database =="
cd "$REPO_DIR"
rm -f x.db x.files x.db.tar.gz.old x.files.tar.gz.old
repo-add -n -R x.db.tar.gz *.pkg.tar.zst
rm -f x.db x.files
cp x.db.tar.gz x.db
cp x.files.tar.gz x.files
sha256sum * > SHA256SUMS
rm -f x.db.tar.gz.old x.files.tar.gz.old

echo "== Done =="
echo "Commit public/repo/x86_64/ and push, then run the deploy workflow."
