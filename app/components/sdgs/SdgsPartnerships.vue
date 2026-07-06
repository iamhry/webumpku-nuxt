<template>
  <div class="sdgs-partnerships section-padding pt-0">
    <div class="container">
      <div class="row text-center mb-5 justify-content-center">
        <div class="col-lg-8">
          <div class="section-title">
            <span>Kolaborasi Global</span>
            <h2>SDGs Partnerships</h2>
            <p>Pencapaian Agenda 2030 tidak dapat dilakukan sendiri. UMPKU bangga bekerja sama dengan berbagai lembaga nasional dan internasional.</p>
          </div>
        </div>
      </div>
      <div class="row align-items-center justify-content-center g-4">
        <!-- Mock Logos -->
        <div class="col-lg-2 col-md-3 col-4 text-center" v-for="n in 6" :key="n">
          <div class="partner-logo">
            <img :src="`https://placehold.co/200x100/f8f9fa/64748b?text=Partner+${n}`" class="img-fluid grayscale-hover" alt="Partner Logo">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.partner-logo {
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.03);
  transition: transform 0.3s;
}
.partner-logo:hover {
  transform: translateY(-5px);
}
.grayscale-hover {
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s;
}
.partner-logo:hover .grayscale-hover {
  filter: grayscale(0%);
  opacity: 1;
}
</style>
