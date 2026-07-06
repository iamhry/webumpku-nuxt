<script setup lang="ts">
import { defineProps, defineEmits, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  sdgs: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

// Close on escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div 
    class="sdgs-modal-overlay" 
    :class="{ 'active': show }"
    @click.self="closeModal"
  >
    <div class="sdgs-modal-content">
      <div class="sdgs-modal-header">
        <h4>Sustainable Development Goals</h4>
        <button class="sdgs-modal-close" @click="closeModal" aria-label="Close modal">&times;</button>
      </div>
      <div class="sdgs-modal-body">
        <div class="sdgs-modal-grid">
          <NuxtLink 
            v-for="goal in sdgs" 
            :key="goal.id"
            :to="`/tujuan-pembangunan-berkelanjutan/${goal.slug || goal.id}`"
            class="sdgs-modal-item"
            :title="`${goal.id} ${goal.title || goal.name}`"
          >
            <img 
              v-if="goal.icon_image && goal.icon_image.startsWith('http')" 
              :src="goal.icon_image" 
              :alt="`SDG ${goal.id}`" 
              loading="lazy"
            />
            <div v-else class="sdg-number-badge" :style="{ backgroundColor: goal.color || '#f5f5f5', color: goal.color ? '#fff' : '#000' }">{{ goal.id }}</div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sdgs-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.sdgs-modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.sdgs-modal-content {
  background-color: #fff;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-20px);
  transition: transform 0.3s ease;
}

.sdgs-modal-overlay.active .sdgs-modal-content {
  transform: translateY(0);
}

.sdgs-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.sdgs-modal-header h4 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--primary-color, #0b2e59);
}

.sdgs-modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: #888;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
}

.sdgs-modal-close:hover {
  color: #333;
}

.sdgs-modal-body {
  padding: 20px;
}

.sdgs-modal-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.sdgs-modal-item {
  display: block;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.sdgs-modal-item:hover {
  transform: scale(1.1);
}

.sdgs-modal-item img {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  object-fit: cover;
}

.sdg-number-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
