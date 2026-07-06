<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  isError?: boolean
  errorMsg?: string | null
}

defineProps<Props>()
const emit = defineEmits(['reset-filters'])

const { t } = useI18n()
</script>

<template>
  <div class="event-empty-wrapper py-5 text-center my-4">
    <div class="event-empty-icon">
      <i v-if="isError" class="las la-exclamation-triangle text-danger animate__animated animate__bounceIn"></i>
      <i v-else class="las la-calendar-times text-muted animate__animated animate__pulse animate__infinite"></i>
    </div>
    
    <h3 class="event-empty-title">
      {{ isError ? (errorMsg || t('event_error')) : t('event_empty') }}
    </h3>
    
    <p class="event-empty-desc">
      {{ isError 
        ? 'Terjadi kendala saat menghubungkan ke server. Silakan coba beberapa saat lagi.' 
        : 'Silakan ubah filter kategori, bulan, atau tahun untuk mencari agenda kampus lainnya.' }}
    </p>

    <button 
      v-if="!isError" 
      class="event-filter-pill active" 
      @click="emit('reset-filters')"
    >
      <i class="las la-sync-alt mr-2"></i> Reset Filter
    </button>
  </div>
</template>
