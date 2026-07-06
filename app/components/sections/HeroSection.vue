<script setup lang="ts">
defineProps<{ data: any }>()
</script>
<template>
  <section class="slider-area">
    <div class="single-slide-item" style="height: 600px; display: flex; align-items: center; justify-content: center; background-color: #f8f9fa;">
      <div class="container content-wide text-center">
        <h2>{{ data.title || 'Hero Title' }}</h2>
        <p>{{ data.subtitle || 'Hero Subtitle' }}</p>
      </div>
    </div>
  </section>
</template>
