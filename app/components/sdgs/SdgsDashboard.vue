<template>
  <div class="dashboard-section section-padding gray-bg">
    <div class="container">
      <div class="row mb-5 text-center justify-content-center">
        <div class="col-lg-8">
          <div class="section-title">
            <span>Analitik Terbuka</span>
            <h2>SDGs Performance Dashboard</h2>
            <p>Melacak progres pencapaian dan integrasi SDGs di lingkungan Universitas Muhammadiyah Pekajangan Pekalongan berdasarkan indikator internal.</p>
          </div>
        </div>
      </div>
      
      <div class="dashboard-card">
        <div class="row align-items-center">
          <div class="col-lg-4 mb-5 mb-lg-0 text-center">
            <div class="score-circle">
              <div class="score-value">85<span>%</span></div>
              <div class="score-label">SDGs Integration Score</div>
            </div>
            <p class="text-muted mt-4">Kinerja keseluruhan universitas dalam mengadopsi 17 indikator SDGs pada tahun akademik berjalan.</p>
          </div>
          <div class="col-lg-8 ps-lg-5">
            <div class="progress-list">
              <div class="p-item" v-for="item in progress" :key="item.name">
                <div class="p-info">
                  <span class="p-name"><i :class="item.icon" :style="{ color: item.color }"></i> {{ item.name }}</span>
                  <span class="p-val">{{ item.value }}%</span>
                </div>
                <div class="progress">
                  <div class="progress-bar" role="progressbar" :style="{ width: item.value + '%', backgroundColor: item.color }" :aria-valuenow="item.value" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const progress = [
  { name: 'SDG 3 - Good Health & Well-being', value: 92, color: '#4C9F38', icon: 'las la-heartbeat' },
  { name: 'SDG 4 - Quality Education', value: 88, color: '#C5192D', icon: 'las la-book' },
  { name: 'SDG 9 - Industry, Innovation & Infrastructure', value: 75, color: '#FD6925', icon: 'las la-industry' },
  { name: 'SDG 5 - Gender Equality', value: 80, color: '#FF3A21', icon: 'las la-venus-mars' },
  { name: 'SDG 13 - Climate Action', value: 65, color: '#3F7E44', icon: 'las la-leaf' },
]
</script>

<style scoped>
.dashboard-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.05);
}
.score-circle {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  border: 12px solid #f8fafc;
  border-top-color: var(--primary-color, #0b2e59);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
}
.score-circle::before {
  content: '';
  position: absolute;
  top: -12px; left: -12px; right: -12px; bottom: -12px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  z-index: 0;
}
.score-value {
  font-size: 4rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
  position: relative;
  z-index: 1;
}
.score-value span {
  font-size: 1.5rem;
  color: #64748b;
}
.score-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  color: #64748b;
  margin-top: 10px;
  font-weight: 700;
  text-align: center;
  position: relative;
  z-index: 1;
}
.progress-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.p-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
}
.p-name {
  font-weight: 600;
  color: #334155;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.05rem;
}
.p-name i {
  font-size: 1.5rem;
}
.p-val {
  font-weight: 700;
  color: #1e293b;
}
.progress {
  height: 12px;
  background-color: #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
}
.progress-bar {
  border-radius: 10px;
  transition: width 1s ease-in-out;
}
</style>
