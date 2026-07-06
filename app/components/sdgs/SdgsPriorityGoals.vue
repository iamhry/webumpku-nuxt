<template>
  <div class="priority-goals section-padding gray-bg">
    <div class="container">
      <div class="row mb-5">
        <div class="col-lg-8">
          <div class="section-title">
            <span>Fokus Utama</span>
            <h2>Priority Goals UMPKU</h2>
            <p>Sebagai institusi pendidikan kesehatan dan teknologi, kami menempatkan prioritas tertinggi pada beberapa tujuan berikut melalui berbagai inovasi dan kebijakan kampus.</p>
          </div>
        </div>
      </div>
      <div class="row g-4">
        <div class="col-lg-4 col-md-6" v-for="goal in priorities" :key="goal.title">
          <div class="priority-card">
            <div class="p-card-header" :style="{ backgroundColor: goal.color }">
              <h3>{{ goal.title }}</h3>
            </div>
            <div class="p-card-body">
              <p>{{ goal.description }}</p>
              <ul class="impact-list">
                <li v-for="impact in goal.impacts" :key="impact">
                  <i class="las la-check-circle" :style="{ color: goal.color }"></i> {{ impact }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const priorities = [
  {
    title: 'SDG 3: Good Health',
    color: '#4C9F38',
    description: 'Menjamin kehidupan yang sehat dan mendorong kesejahteraan bagi semua orang di segala usia melalui Fakultas Ilmu Kesehatan.',
    impacts: ['15+ Desa Binaan Kesehatan', 'Klinik Kampus Gratis', 'Riset Penyakit Tropis']
  },
  {
    title: 'SDG 4: Quality Education',
    color: '#C5192D',
    description: 'Menjamin pendidikan yang inklusif dan merata serta mendorong kesempatan belajar sepanjang hayat bagi semua.',
    impacts: ['1000+ Beasiswa Mahasiswa', 'Fasilitas Ramah Disabilitas', 'Sertifikasi Dosen Internasional']
  },
  {
    title: 'SDG 9: Industry & Innovation',
    color: '#FD6925',
    description: 'Membangun infrastruktur yang tangguh, mendukung industrialisasi yang inklusif dan berkelanjutan dan membantu perkembangan inovasi.',
    impacts: ['Inkubator Bisnis Kampus', 'Pusat Riset Teknologi Tepat Guna', 'HAKI Terdaftar (50+)']
  }
]
</script>

<style scoped>
.priority-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
}
.p-card-header {
  padding: 25px 20px;
  color: white;
}
.p-card-header h3 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.p-card-body {
  padding: 25px 20px;
  flex: 1;
}
.p-card-body p {
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.6;
}
.impact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.impact-list li {
  margin-bottom: 12px;
  color: #1e293b;
  font-weight: 500;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.impact-list li i {
  font-size: 1.3rem;
  margin-top: 2px;
}
</style>
