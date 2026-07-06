<template>
  <section class="py-5 bg-white position-relative overflow-hidden">
    <!-- Decorative background blobs -->
    <div class="position-absolute top-0 end-0 translate-middle-y rounded-circle bg-warning opacity-10" style="width: 300px; height: 300px; filter: blur(40px);"></div>
    <div class="position-absolute bottom-0 start-0 translate-middle-x rounded-circle opacity-10" style="width: 400px; height: 400px; background-color: var(--sdg-14); filter: blur(50px);"></div>
    
    <div class="sdgs-container py-5 text-center position-relative z-1">
      <div class="mx-auto" style="max-width: 800px;">
        <span class="badge bg-primary text-white rounded-pill px-3 py-2 mb-4 shadow-sm" style="font-size: 0.9rem;">
          Bergabung Bersama Kami
        </span>
        <h2 class="sdgs-title mb-4 text-dark" style="font-size: 3rem;">
          Wujudkan Masa Depan yang Lebih Baik
        </h2>
        <p class="lead text-muted mb-5">
          Tujuan Pembangunan Berkelanjutan bukan hanya tentang apa yang kita capai hari ini, tetapi warisan apa yang kita tinggalkan untuk generasi mendatang. Mari berkontribusi melalui riset, inovasi, dan aksi nyata.
        </p>
        
        <div class="d-flex justify-content-center gap-3 flex-wrap">
          <NuxtLink to="/kontak" class="sdgs-btn sdgs-btn-primary shadow-lg px-5 py-3 fs-5">
            Mulai Kolaborasi
          </NuxtLink>
          <NuxtLink to="/profil" class="sdgs-btn bg-white border border-2 text-dark px-5 py-3 fs-5 hover-bg-light">
            Pelajari Profil UMPKU
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// CTA doesn't need specific logic right now
</script>

<style scoped>
.hover-bg-light:hover {
  background-color: #f8f9fa !important;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}
</style>
