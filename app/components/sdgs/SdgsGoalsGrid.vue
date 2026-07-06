<template>
  <div id="goals" class="sdgs-grid-section section-padding">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8">
          <div class="section-title text-center">
            <span>Agenda 2030</span>
            <h2>17 Tujuan Pembangunan Berkelanjutan</h2>
          </div>
        </div>
      </div>
      
      <div class="row g-3">
        <!-- 17 Goals Grid -->
        <div class="col-lg-2 col-md-4 col-sm-6 col-12" v-for="goal in goals" :key="goal.number">
          <NuxtLink :to="`/sdgs/${goal.slug}`" class="sdg-card" :style="{ backgroundColor: goal.color }">
            <div class="sdg-number">{{ goal.number }}</div>
            <div class="sdg-content">
              <h4>{{ goal.shortName }}</h4>
            </div>
            <!-- API Image Support -->
            <img v-if="goal.image" :src="goal.image" class="sdg-bg-img" alt="SDG Icon" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  sdgsData: {
    type: Array,
    default: () => []
  }
})

// Fallback official data if API is empty
const fallbackGoals = [
  { number: 1, shortName: 'No Poverty', color: '#E5243B', slug: 'no-poverty' },
  { number: 2, shortName: 'Zero Hunger', color: '#DDA63A', slug: 'zero-hunger' },
  { number: 3, shortName: 'Good Health', color: '#4C9F38', slug: 'good-health' },
  { number: 4, shortName: 'Quality Education', color: '#C5192D', slug: 'quality-education' },
  { number: 5, shortName: 'Gender Equality', color: '#FF3A21', slug: 'gender-equality' },
  { number: 6, shortName: 'Clean Water', color: '#26BDE2', slug: 'clean-water' },
  { number: 7, shortName: 'Clean Energy', color: '#FCC30B', slug: 'clean-energy' },
  { number: 8, shortName: 'Decent Work', color: '#A21942', slug: 'decent-work' },
  { number: 9, shortName: 'Industry & Innovation', color: '#FD6925', slug: 'industry-innovation' },
  { number: 10, shortName: 'Reduced Inequalities', color: '#DD1367', slug: 'reduced-inequalities' },
  { number: 11, shortName: 'Sustainable Cities', color: '#FD9D24', slug: 'sustainable-cities' },
  { number: 12, shortName: 'Responsible Consumption', color: '#BF8B2E', slug: 'responsible-consumption' },
  { number: 13, shortName: 'Climate Action', color: '#3F7E44', slug: 'climate-action' },
  { number: 14, shortName: 'Life Below Water', color: '#0A97D9', slug: 'life-below-water' },
  { number: 15, shortName: 'Life on Land', color: '#56C02B', slug: 'life-on-land' },
  { number: 16, shortName: 'Peace & Justice', color: '#00689D', slug: 'peace-justice' },
  { number: 17, shortName: 'Partnerships', color: '#19486A', slug: 'partnerships' },
]

const goals = computed(() => {
  if (props.sdgsData && props.sdgsData.length > 0) {
    return props.sdgsData.map((apiGoal: any, index: number) => ({
      ...fallbackGoals[index],
      ...apiGoal
    }))
  }
  return fallbackGoals
})
</script>

<style scoped>
.sdg-card {
  display: block;
  color: white;
  aspect-ratio: 1;
  border-radius: 8px;
  padding: 15px;
  position: relative;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  min-height: 160px;
}
.sdg-card:hover {
  transform: translateY(-5px);
  color: white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
.sdg-number {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  opacity: 0.9;
  position: relative;
  z-index: 2;
}
.sdg-content {
  position: absolute;
  bottom: 15px;
  left: 15px;
  right: 15px;
  z-index: 2;
}
.sdg-content h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  margin: 0;
  text-transform: uppercase;
  line-height: 1.2;
}
.sdg-bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  z-index: 1;
}

/* Custom Grid Adjustments for 17 Items */
@media (min-width: 992px) {
  .col-lg-2 {
    width: 16.666667%; /* 6 items per row */
  }
}
@media (max-width: 991px) and (min-width: 768px) {
  .col-md-4 {
    width: 33.333333%; /* 3 items per row */
  }
}
@media (max-width: 767px) {
  .col-sm-6 {
    width: 50%; /* 2 items per row */
  }
}
@media (max-width: 480px) {
  .col-12 {
    width: 100%; /* 1 item per row */
    aspect-ratio: auto;
    height: 120px;
  }
}
</style>
