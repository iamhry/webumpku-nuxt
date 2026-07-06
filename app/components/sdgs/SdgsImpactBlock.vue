<template>
  <div class="impact-section section-padding position-relative">
    <div class="container">
      <div class="row align-items-center bg-primary-custom rounded-custom overflow-hidden">
        <div class="col-lg-6 p-5">
          <div class="impact-content text-white">
            <span class="badge bg-warning text-dark mb-3 px-3 py-2">Dampak Nyata</span>
            <h2 class="text-white mb-4 fw-bold">Research & Community Impact</h2>
            <p class="mb-4 opacity-75">Kami percaya bahwa inovasi akademik harus memberikan dampak nyata pada masyarakat. Peneliti dan mahasiswa kami secara aktif terjun ke lapangan untuk mengimplementasikan solusi berbasis SDGs melalui program pengabdian.</p>
            
            <div class="row mt-4">
              <div class="col-sm-6 mb-4">
                <div class="i-stat">
                  <h3 class="display-5 fw-bold text-warning mb-1">120+</h3>
                  <span class="text-uppercase small fw-semibold">Desa Binaan</span>
                </div>
              </div>
              <div class="col-sm-6 mb-4">
                <div class="i-stat">
                  <h3 class="display-5 fw-bold text-warning mb-1">Rp 5M</h3>
                  <span class="text-uppercase small fw-semibold">Hibah Penelitian</span>
                </div>
              </div>
            </div>
          </div>
        </div>
         <div class="col-lg-6 p-0 h-100 position-relative">
           <div class="video-box h-100">
             <img src="/assets/img/skill-bg.jpg" alt="Impact Video" class="img-fluid w-100 h-100 object-fit-cover" style="min-height: 400px;" />
             <div class="play-btn">
               <i class="las la-play"></i>
             </div>
           </div>
         </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-primary-custom {
  background-color: var(--primary-color, #0b2e59);
}
.rounded-custom {
  border-radius: 20px;
}
.object-fit-cover {
  object-fit: cover;
}
.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: var(--secondary-color, #f39c12);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 0 10px rgba(243, 156, 18, 0.3);
}
.play-btn:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 0 0 15px rgba(243, 156, 18, 0.2);
}
</style>
