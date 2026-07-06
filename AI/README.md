# 📚 AI Agent Handbook — Universitas Muhammadiyah PKU Surakarta

> **Dokumen ini adalah handbook resmi untuk AI Agent yang bekerja pada proyek frontend website UMPKU.**
> Baca seluruh handbook ini sebelum menulis satu baris kode pun.

---

## 🎯 Tentang Handbook Ini

Handbook ini dirancang untuk memastikan setiap AI Agent yang bekerja pada proyek ini:

- Memahami **visi dan tujuan** website Universitas Muhammadiyah PKU Surakarta
- Mengikuti **design system** yang telah ditetapkan secara konsisten
- Mematuhi **standar coding** Nuxt 4 + Vue 3 Composition API
- Tidak merusak **business logic** dan **API layer** yang sudah ada
- Menghasilkan kode yang **production-ready**, aksesibel, dan SEO-friendly

---

## 📂 Struktur Handbook

| Folder | Isi | Prioritas |
|--------|-----|-----------|
| `01-project/` | Visi, arsitektur, tech stack, standar coding | 🔴 Wajib baca |
| `02-design-system/` | Typography, warna, spacing, layout, animasi | 🔴 Wajib baca |
| `03-components/` | Dokumentasi komponen UI utama | 🟡 Baca sesuai kebutuhan |
| `04-pages/` | Spesifikasi setiap halaman website | 🟡 Baca sesuai kebutuhan |
| `05-api/` | Standar API, composable, loading/error state, SEO | 🟡 Baca sesuai kebutuhan |
| `06-nuxt/` | Struktur folder, naming, SSR, performa, gambar | 🔴 Wajib baca |

---

## 🚦 Alur Kerja AI Agent

```
1. Baca AI_AGENT.md         → Pahami aturan utama
2. Baca 01-project/         → Pahami konteks proyek
3. Baca 02-design-system/   → Pahami sistem desain
4. Baca 06-nuxt/            → Pahami aturan teknis Nuxt
5. Baca file spesifik       → Sesuai komponen/halaman yang dikerjakan
6. Tulis kode               → Ikuti semua aturan di handbook
7. Jelaskan perubahan       → Sebutkan file yang dibuat/diubah
```

---

## 🏛️ Konteks Proyek

| Atribut | Detail |
|---------|--------|
| **Klien** | Universitas Muhammadiyah PKU Surakarta |
| **Frontend** | Nuxt 4, Vue 3 Composition API, SSR |
| **Backend** | Laravel 13 REST API |
| **CMS** | Filament |
| **i18n** | Bahasa Indonesia (default) + English |
| **State Management** | Pinia |
| **HTTP Client** | Axios |

---

## 🎨 Identitas Visual

Website UMPKU dirancang sebagai **modern university website** dengan karakter:

- **Premium & Profesional** — Layak disejajarkan dengan UNSW, MIT, Stanford
- **Humanis & Akademik** — Hangat namun tetap formal
- **Bersih & Fokus** — Whitespace luas, tidak berantakan
- **Mobile-First** — Responsive dari 320px hingga 1440px+

Inspirasi visual: UNSW Sydney, MIT, Stanford, Stripe, Apple, webarq.com

---

## ⚡ Quick Reference

```
Font: Sora (heading) + Inter (body)
H1: clamp(54px, 8vw, 110px)
Container: max-width 1440px
Section padding: 120px (desktop) / 80px (tablet) / 60px (mobile)
Color BG: #FFFFFF | Text: #111111 | Muted: #666666
Grid: 12 kolom, gap 32px
```

---

## 📖 Cara Menggunakan Handbook Ini

### Ketika memberi instruksi ke AI Agent:

```
"Berdasarkan handbook di AI/, buat komponen [NamaKomponen] sesuai:
- Design system di 02-design-system/
- Standar komponen di 03-components/[komponen].md
- Aturan Nuxt di 06-nuxt/
Jangan ubah API dan business logic."
```

### Contoh instruksi lengkap:

```
Baca AI/AI_AGENT.md dan AI/03-components/hero.md,
lalu buat komponen HeroSection.vue yang sesuai dengan:
- Typography dari AI/02-design-system/typography.md
- Warna dari AI/02-design-system/colors.md
- Animasi dari AI/02-design-system/animation.md
Gunakan composable useHeroSliders yang sudah ada. Jangan buat composable baru.
```

---

## 🔗 Dokumen Terkait

- [AI_AGENT.md](./AI_AGENT.md) — Aturan utama untuk AI Agent
- [01-project/vision.md](./01-project/vision.md) — Visi produk
- [02-design-system/design-principle.md](./02-design-system/design-principle.md) — Prinsip desain utama

---

*Handbook ini dikelola oleh tim Frontend UMPKU. Perbarui setiap kali ada perubahan arsitektur atau design system.*
