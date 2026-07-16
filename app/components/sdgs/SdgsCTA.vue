<template>
  <section class="section-cta py-6 bg-canvas border-top border-light position-relative overflow-hidden">
    <!-- Ornamen Garis Tipis Editorial Sisi Kiri (Menyelaraskan dengan Tema Tri Dharma) -->
    <div class="accent-structural-line position-absolute start-0 top-0 h-100 d-none d-lg-block"></div>
    
    <div class="container position-relative z-1">
      <div class="row align-items-center justify-content-between g-5">
        
        <!-- Kolom Teks: Typografi Bold & Rapi Sejajar Kiri -->
        <div class="col-lg-7">
          <div class="cta-content text-center text-lg-start">
            <span class="cta-tagline text-uppercase fw-bold mb-2 d-block">
              Bergabung Bersama Kami
            </span>
            <h2 class="cta-title fw-black tracking-tight mb-4 text-dark-title">
              Wujudkan Masa Depan <br class="d-none d-md-block" />yang Lebih Baik
            </h2>
            <p class="cta-desc text-secondary mb-0">
              Tujuan Pembangunan Berkelanjutan bukan hanya tentang apa yang kita capai hari ini, tetapi warisan apa yang kita tinggalkan untuk generasi mendatang. Mari berkontribusi melalui riset, inovasi, dan aksi nyata.
            </p>
          </div>
        </div>

        <!-- Kolom Tombol: Terisolasi Bersih di Sisi Kanan -->
        <div class="col-lg-5 col-xl-4">
          <div class="cta-actions-wrapper p-4 rounded-4 bg-white border border-light text-center">
            <div class="d-flex flex-column gap-3 cta-actions">
              <NuxtLink to="/kontak" class="btn-editorial-primary fw-bold text-decoration-none w-100 justify-content-center">
                <span>Mulai Kolaborasi</span>
                <i class="fa fa-arrow-right arrow-icon"></i>
              </NuxtLink>
              
              <NuxtLink to="/profil" class="btn-editorial-secondary fw-bold text-decoration-none w-100 justify-content-center">
                <span>Pelajari Profil UMPKU</span>
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// CTA doesn't need specific logic right now
</script>

<style scoped>
/* Desain Tokens - Mengunci Palet Warna dari Section Sebelumnya */
.bg-canvas { background-color: #f8fafc; } /* Sama dengan bg-slate-light section prioritas */
.py-6 { padding-top: 5.5rem; padding-bottom: 5.5rem; }
.fw-black { font-weight: 900; }
.tracking-tight { letter-spacing: -0.03em; }
.text-secondary { color: #64748b !important; line-height: 1.75; }
.text-dark-title { color: #0f172a; }

/* Ornamen Garis Pembatas Sisi Kiri */
.accent-structural-line {
  width: 4px;
  background-color: var(--primary-color, #0b2e59);
  opacity: 0.8;
}

/* Tagline & Judul */
.cta-tagline {
  color: var(--primary-color, #0b2e59);
  letter-spacing: 0.15em;
  font-size: 0.8rem;
}

.cta-title {
  font-size: clamp(2.2rem, 4vw, 2.8rem);
  line-height: 1.15;
}

.cta-desc {
  font-size: clamp(0.98rem, 1.6vw, 1.05rem);
  max-width: 580px;
}

/* ==========================================================================
   STYLE EDITORIAL ACTIONS BLOCK (KARTU PUTIH MINIMALIS KHAS BERITA/PRIORITAS)
   ========================================================================== */
.cta-actions-wrapper {
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
}

/* Tombol Utama (Solid Dark Modern) */
.btn-editorial-primary {
  padding: 14px 30px;
  background-color: #0f172a;
  color: #ffffff !important;
  border-radius: 8px;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid #0f172a;
}

.btn-editorial-primary:hover {
  background-color: var(--primary-color, #0b2e59);
  border-color: var(--primary-color, #0b2e59);
  transform: translateY(-2px);
}

.arrow-icon {
  font-size: 0.8rem;
  transition: transform 0.2s ease;
}

.btn-editorial-primary:hover .arrow-icon {
  transform: translateX(4px);
}

/* Tombol Kedua (Clean Border Style) */
.btn-editorial-secondary {
  padding: 14px 30px;
  color: #0f172a !important;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #ffffff;
  transition: all 0.25s ease;
}

.btn-editorial-secondary:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

/* Responsivitas Total */
@media (max-width: 991.98px) {
  .py-6 {
    padding-top: 4.5rem;
    padding-bottom: 4.5rem;
  }
  .cta-content {
    text-align: center !important;
  }
  .cta-desc {
    margin: 0 auto;
  }
  .cta-actions-wrapper {
    margin-top: 20px;
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
}
</style>