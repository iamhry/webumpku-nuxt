<template>
  <section class="section-cta py-6 bg-canvas border-top border-light position-relative overflow-hidden">
    <!-- Ornamen Geometris Latar Belakang Editorial -->
    <div class="cta-shape shape-1 position-absolute d-none d-lg-block"></div>
    <div class="cta-shape shape-2 position-absolute d-none d-lg-block"></div>
    
    <!-- Ornamen Garis Tipis Editorial Sisi Kiri -->
    <div class="accent-structural-line position-absolute start-0 top-0 h-100 d-none d-lg-block"></div>
    
    <div class="container position-relative z-1">
      <div class="row align-items-center justify-content-between g-5">
        
        <!-- Kolom Teks: Typografi Bold & Rapi Sejajar Kiri -->
        <div class="col-lg-7 pe-lg-5">
          <div class="cta-content text-center text-lg-start">
            <span class="cta-tagline text-uppercase fw-bold mb-3 d-block">
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
          <div class="cta-actions-wrapper p-4 p-md-5 rounded-4 bg-white border border-light">
            <div class="d-flex flex-column gap-3 cta-actions">
              <NuxtLink to="/kontak" class="btn-editorial-primary fw-bold text-decoration-none w-100 d-inline-flex justify-content-center">
                <span>Mulai Kolaborasi</span>
                <i class="fa fa-arrow-right arrow-icon ml-2"></i>
              </NuxtLink>
              
              <NuxtLink to="/profil" class="btn-editorial-secondary fw-bold text-decoration-none w-100 d-inline-flex justify-content-center">
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
// CTA tidak memerlukan logika khusus saat ini
</script>

<style scoped>
/* Desain Tokens - Mengunci Palet Warna Asli */
.bg-canvas { background-color: #f8fafc; }
.py-6 { padding-top: 6.5rem; padding-bottom: 6.5rem; }
.fw-black { font-weight: 900; }
.tracking-tight { letter-spacing: -0.03em; }
.text-secondary { color: #64748b !important; line-height: 1.8; }
.text-dark-title { color: #0f172a; }



/* Ornamen Latar Belakang */
.cta-shape {
  border-radius: 50%;
  background-color: var(--primary-color, #0b2e59);
  opacity: 0.02;
  pointer-events: none;
}
.shape-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  left: -50px;
}
.shape-2 {
  width: 400px;
  height: 400px;
  bottom: -150px;
  right: -50px;
}

/* Tagline & Judul */
.cta-tagline {
  color: var(--primary-color, #0b2e59);
  letter-spacing: 0.18em;
  font-size: 0.85rem;
  position: relative;
}

.cta-title {
  font-size: clamp(2.2rem, 4.2vw, 2.8rem);
  line-height: 1.2;
}

.cta-desc {
  font-size: clamp(0.98rem, 1.6vw, 1.05rem);
  max-width: 580px;
}

/* ==========================================================================
   STYLE EDITORIAL ACTIONS BLOCK (KARTU PUTIH MINIMALIS FLOATING)
   ========================================================================== */
.cta-actions-wrapper {
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-actions-wrapper:hover {
  transform: translateY(-2px);
}

/* Tombol Utama (Solid Dark Modern) */
.btn-editorial-primary {
  padding: 16px 30px;
  background-color: #EA5501;
  color: #ffffff !important;
  border-radius: 10px;
  font-size: 0.95rem;
  align-items: center;
  transition: background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid #EA5501;
}

.btn-editorial-primary:hover {
  background-color: var(--primary-color, #0b2e59);
  border-color: var(--primary-color, #0b2e59);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(11, 46, 89, 0.15);
}

.arrow-icon {
  font-size: 0.8rem;
  margin-left: 8px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-editorial-primary:hover .arrow-icon {
  transform: translateX(4px);
}

/* Tombol Kedua (Clean Border Style) */
.btn-editorial-secondary {
  padding: 16px 30px;
  color: #0f172a !important;
  font-size: 0.95rem;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background-color: #ffffff;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-editorial-secondary:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-2px);
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
    margin-top: 10px;
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
  .btn-editorial-primary, .btn-editorial-secondary {
    padding: 14px 24px;
  }
}
</style>