<template>
  <div class="page-section-empty">
    <div class="page-section-empty-icon" aria-hidden="true">
      <i :class="iconClass"></i>
    </div>
    <p class="page-section-empty-text">{{ message }}</p>
    <p v-if="preview" class="page-section-empty-hint">
      Mode preview — isi <code>items</code> / media di CMS agar konten tampil.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  message?: string
  icon?: string
  preview?: boolean
}>(), {
  message: 'Konten section ini belum tersedia.',
  icon: 'las la-layer-group',
  preview: false,
})

const iconClass = computed(() => props.icon || 'las la-layer-group')
</script>

<style scoped>
.page-section-empty {
  text-align: center;
  padding: 40px 24px;
  border: 1px dashed rgba(11, 46, 89, 0.2);
  border-radius: 12px;
  background: rgba(11, 46, 89, 0.03);
}

.page-section-empty-icon {
  font-size: 2rem;
  color: #0b2e59;
  margin-bottom: 12px;
  opacity: 0.55;
}

.page-section-empty-text {
  margin: 0;
  color: #555;
  font-size: 15px;
}

.page-section-empty-hint {
  margin: 10px 0 0;
  font-size: 12px;
  color: #888;
}

.page-section-empty-hint code {
  font-size: 11px;
  background: rgba(0, 0, 0, 0.06);
  padding: 1px 6px;
  border-radius: 4px;
}
</style>
