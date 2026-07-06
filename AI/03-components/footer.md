# 🦶 Footer Component — Dokumentasi

## Tujuan Dokumen

Spesifikasi komponen footer utama website UMPKU.

---

## Spesifikasi

```
Layout: 4 kolom desktop, 2 kolom tablet, 1 kolom mobile
Background: Dark (#0A1628) atau warna brand
Konten: Logo + Deskripsi | Links | Links | Kontak
Bottom bar: Copyright + Social Media
```

---

## Struktur

```vue
<template>
  <footer class="site-footer" role="contentinfo">
    <!-- Main Footer -->
    <div class="site-footer__main">
      <div class="container">
        <div class="site-footer__grid">
          <!-- Col 1: Brand -->
          <div class="site-footer__brand">
            <NuxtLink to="/" aria-label="UMPKU - Kembali ke beranda">
              <img
                src="/assets/img/logo/logo-umpku-white.png"
                alt="Universitas Muhammadiyah PKU Surakarta"
                width="160"
                height="54"
              />
            </NuxtLink>
            <p class="site-footer__tagline">
              Membangun insan cerdas berkarakter Islami, inovatif, dan berdaya saing global.
            </p>
            <!-- Social Media -->
            <div class="site-footer__social" aria-label="Media sosial">
              <a href="https://instagram.com/umpku" target="_blank" rel="noopener noreferrer" aria-label="Instagram UMPKU">
                <span class="la la-instagram" aria-hidden="true"></span>
              </a>
              <a href="https://youtube.com/umpku" target="_blank" rel="noopener noreferrer" aria-label="YouTube UMPKU">
                <span class="la la-youtube" aria-hidden="true"></span>
              </a>
              <a href="https://facebook.com/umpku" target="_blank" rel="noopener noreferrer" aria-label="Facebook UMPKU">
                <span class="la la-facebook" aria-hidden="true"></span>
              </a>
            </div>
          </div>

          <!-- Col 2: Akademik Links -->
          <nav class="site-footer__nav" aria-label="Navigasi Akademik">
            <h3 class="site-footer__nav-title">Akademik</h3>
            <ul class="site-footer__nav-list" role="list">
              <li><NuxtLink to="/fakultas">Fakultas</NuxtLink></li>
              <li><NuxtLink to="/program-studi">Program Studi</NuxtLink></li>
              <li><NuxtLink to="/penerimaan">Penerimaan Mahasiswa</NuxtLink></li>
              <li><NuxtLink to="/penelitian">Penelitian</NuxtLink></li>
            </ul>
          </nav>

          <!-- Col 3: Profil Links -->
          <nav class="site-footer__nav" aria-label="Navigasi Profil">
            <h3 class="site-footer__nav-title">Profil</h3>
            <ul class="site-footer__nav-list" role="list">
              <li><NuxtLink to="/profil/sejarah">Sejarah</NuxtLink></li>
              <li><NuxtLink to="/profil/visi-misi">Visi & Misi</NuxtLink></li>
              <li><NuxtLink to="/profil/struktur">Struktur Organisasi</NuxtLink></li>
              <li><NuxtLink to="/berita">Berita</NuxtLink></li>
            </ul>
          </nav>

          <!-- Col 4: Contact -->
          <address class="site-footer__contact" aria-label="Informasi Kontak">
            <h3 class="site-footer__nav-title">Kontak</h3>
            <ul class="site-footer__contact-list" role="list">
              <li>
                <span class="la la-map-marker" aria-hidden="true"></span>
                <span>Jl. Tulang Bawang Selatan No.26, Surakarta</span>
              </li>
              <li>
                <span class="la la-phone" aria-hidden="true"></span>
                <a href="tel:+62271722548">(0271) 722548</a>
              </li>
              <li>
                <span class="la la-envelope" aria-hidden="true"></span>
                <a href="mailto:info@umpku.ac.id">info@umpku.ac.id</a>
              </li>
            </ul>
          </address>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="site-footer__bottom">
      <div class="container">
        <div class="site-footer__bottom-inner">
          <p class="site-footer__copyright">
            &copy; {{ currentYear }} Universitas Muhammadiyah PKU Surakarta. Hak cipta dilindungi.
          </p>
          <nav aria-label="Footer Legal Links">
            <ul class="site-footer__legal" role="list">
              <li><NuxtLink to="/kebijakan-privasi">Kebijakan Privasi</NuxtLink></li>
              <li><NuxtLink to="/syarat-ketentuan">Syarat & Ketentuan</NuxtLink></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())
</script>
```

---

## CSS

```css
.site-footer {
  background-color: #0A1628;
  color: rgba(255, 255, 255, 0.8);
}

.site-footer__main {
  padding: var(--space-20) 0 var(--space-16);
}

.site-footer__grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: var(--space-12);
}

.site-footer__brand img { margin-bottom: var(--space-6); }

.site-footer__tagline {
  font-size: 14px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: var(--space-6);
}

.site-footer__social {
  display: flex;
  gap: var(--space-3);
}

.site-footer__social a {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.7);
  font-size: 16px;
  transition: all var(--duration-fast);
}

.site-footer__social a:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: white;
}

.site-footer__nav-title {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: var(--space-6);
}

.site-footer__nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.site-footer__nav-list a {
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  font-size: 14px;
  transition: color var(--duration-fast);
}

.site-footer__nav-list a:hover {
  color: white;
}

/* Bottom Bar */
.site-footer__bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding: var(--space-6) 0;
}

.site-footer__bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.site-footer__copyright {
  font-size: 13px;
  color: rgba(255,255,255,0.5);
}

/* Responsive */
@media (max-width: 1023px) {
  .site-footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-10);
  }
}

@media (max-width: 767px) {
  .site-footer__grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .site-footer__bottom-inner {
    flex-direction: column;
    text-align: center;
  }
}
```

---

## Anti-Pattern

```
❌ Footer tanpa aria-label pada nav
❌ Link footer tanpa teks deskriptif
❌ Tahun copyright hardcode (gunakan computed currentYear)
❌ Social media link tanpa rel="noopener noreferrer"
❌ Icon-only social links tanpa aria-label
❌ Address tag tidak digunakan untuk kontak
❌ Footer terlalu tipis dengan informasi minim
```
