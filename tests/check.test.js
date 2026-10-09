// Menjalankan pemeriksa dosen (web-dummy.js) terhadap kedua halaman. Jalankan: node --test tests/
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const WD = require(process.env.WD_PATH || path.join(__dirname, "web-dummy.js"));

function load(file) {
  const html = fs.readFileSync(path.join(__dirname, "..", "site", file), "utf8");
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const stub = () => ({ value: "", textContent: "", innerHTML: "", appendChild() {}, set onclick(v) {}, });
  const window = {};
  const document = { getElementById: stub, createElement: stub };
  new Function("window", "document", "sessionStorage", script + "\n;")(window, document, { getItem() { throw Error("sandbox"); }, setItem() { throw Error("sandbox"); } });
  return { window, html };
}
async function run(file) {
  const { window } = load(file);
  const nonce = WD.makeNonce();
  const r = await WD.runCase(window.asisten, "LIVE-1", nonce);
  return WD.evaluate("LIVE-1", r, nonce);
}

test("rentan terbukti rentan", async () => { const e = await run("NPM-kantin-voucher-rentan.html"); assert.equal(e.proven, true, JSON.stringify(e)); });
test("aman menahan serangan dan melayani normal", async () => { const e = await run("NPM-kantin-voucher-aman.html"); assert.equal(e.secureOk, true, JSON.stringify(e)); assert.equal(e.normalOk, true); });
test("skor otomatis 40/40", async () => { const s = WD.autoScore(await run("NPM-kantin-voucher-rentan.html"), await run("NPM-kantin-voucher-aman.html")); assert.equal(s.total, 40, JSON.stringify(s)); });
test("tidak ada API key di kode", () => { for (const f of ["NPM-kantin-voucher-rentan.html", "NPM-kantin-voucher-aman.html"]) { const { html } = load(f); const s = WD.scanSource(html); assert.deepEqual(s.keys, []); assert.ok(s.hasDummy && s.hasAsisten); assert.ok(html.length < WD.MAX_HTML_BYTES); assert.ok(!/Content-Security-Policy/i.test(html)); } });
