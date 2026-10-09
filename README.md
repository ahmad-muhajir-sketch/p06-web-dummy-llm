# P06 · Web Dummy LLM (kasus LIVE-1: chatbot kantin, prompt injection langsung)

Dua halaman HTML satu-file (JS inline, tanpa dependensi) yang memanggil **LLM asli dengan API key milik sendiri**.

| File | Isi |
|---|---|
| `site/NPM-kantin-voucher-rentan.html` | Aturan + pesan digabung, keluaran model dipercaya, `AKSI buat_voucher` langsung dijalankan |
| `site/NPM-kantin-voucher-aman.html` | Kontrol di luar model: pemisahan peran, allowlist tool (tanpa fungsi voucher), validasi keluaran, log keputusan |
| `tests/check.test.js` | Menjalankan `web-dummy.js` dosen (model terburuk) → harus 40/40 |

**API key tidak pernah ada di kode/repo**: diisi lewat kolom di halaman (opsional `sessionStorage`).

## Pengujian lokal
```bash
node --test tests/check.test.js
```
