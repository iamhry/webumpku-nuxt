<script setup lang="ts">
interface Props {
  count?: number
}

// Default menampilkan 6 kartu skeleton jika props count tidak diisi
withDefaults(defineProps<Props>(), {
  count: 6
})
</script>

<template>
  <div class="row g-4">
    <div 
      v-for="i in count" 
      :key="i" 
      class="col-lg-4 col-md-6 col-sm-12"
    >
      <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white skeleton-card p-3">
        <!-- Thumbnail Skeleton -->
        <div class="skeleton-bone skeleton-img rounded-3 mb-3"></div>

        <!-- Content Lines Skeleton -->
        <div class="card-body p-1">
          <!-- Badge Skeleton -->
          <div class="skeleton-bone skeleton-badge rounded-pill mb-3"></div>

          <!-- Title Skeleton (2 Baris) -->
          <div class="skeleton-bone skeleton-text w-100 mb-2"></div>
          <div class="skeleton-bone skeleton-text w-75 mb-3"></div>

          <!-- Meta Info Skeleton (Tanggal / Deadline) -->
          <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
            <div class="skeleton-bone skeleton-meta rounded-2"></div>
            <div class="skeleton-bone skeleton-meta rounded-2 w-25"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Base Pulse Animation */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-bone {
  background: linear-gradient(
    90deg,
    #f1f5f9 25%,
    #e2e8f0 37%,
    #f1f5f9 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

.skeleton-card {
  aspect-ratio: 16 / 12;
  display: flex;
  flex-direction: column;
}

.skeleton-img {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.skeleton-badge {
  width: 90px;
  height: 22px;
}

.skeleton-text {
  height: 16px;
  border-radius: 4px;
}

.skeleton-meta {
  width: 40%;
  height: 14px;
}
</style>