#!/usr/bin/env bash
# Pemakaian: ./ganti-npm.sh 2315xxxxxx   -> ganti nama file + judul + link dari "NPM" ke NPM kamu
set -e
[ -z "$1" ] && { echo "Pemakaian: $0 <NPM>"; exit 1; }
cd "$(dirname "$0")/site"
for f in NPM-kantin-voucher-*.html; do mv "$f" "${f/NPM/$1}"; done
sed -i "s/NPM-kantin-voucher/$1-kantin-voucher/g; s/NPM · Kantin/$1 · Kantin/g" *.html
cd .. && sed -i "s/NPM-kantin-voucher/$1-kantin-voucher/g" tests/check.test.js
echo "Selesai. File: $(ls site)"
