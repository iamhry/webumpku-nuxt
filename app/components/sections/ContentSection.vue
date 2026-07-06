<script setup lang="ts">
defineProps<{ data: any }>()
</script>
<template>
  <section class="about-area section-padding">
    <div class="container content-wide">
      <div v-html="data.content"></div>
    </div>
  </section>
</template>
