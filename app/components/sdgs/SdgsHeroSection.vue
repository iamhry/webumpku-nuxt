<template>
  <div class="sdgs-hero section-padding pt-150 pb-100">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="hero-content">
            <span class="sub-title">UMPKU untuk Dunia</span>
            <h2>Sustainable Development Goals (SDGs)</h2>
            <p>Universitas Muhammadiyah PKU Surakarta berkomitmen penuh dalam mendukung Agenda 2030 PBB. Kami mengintegrasikan 17 Tujuan Pembangunan Berkelanjutan melalui Tri Dharma Perguruan Tinggi: Pendidikan, Penelitian, dan Pengabdian kepada Masyarakat.</p>
            <NuxtLink to="#goals" class="main-btn mt-4">Jelajahi 17 Goals</NuxtLink>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="hero-image text-lg-end text-center">
            <img src="/assets/img/achievement.jpg" alt="SDGs UMPKU Impact" class="img-fluid rounded shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.sdgs-hero {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}
.hero-content .sub-title {
  color: var(--primary-color, #0b2e59);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 15px;
  display: block;
}
.hero-content h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1e293b;
  line-height: 1.2;
}
.hero-content p {
  font-size: 1.1rem;
  color: #475569;
  margin-bottom: 30px;
  line-height: 1.8;
}
</style>
