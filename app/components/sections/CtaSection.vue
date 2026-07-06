<script setup lang="ts">
defineProps<{ data: any }>()
</script>
<template>
  <section class="about-us-area section-padding text-center">
    <div class="container content-wide">
      <h2>{{ data.title || 'Call to Action' }}</h2>
      <NuxtLink :to="data.link || '#'" class="main-btn">{{ data.buttonText || 'Click Here' }}</NuxtLink>
    </div>
  </section>
</template>
