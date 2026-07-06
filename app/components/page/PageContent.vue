<template>
  <section class="dynamic-page-main" v-if="content">
    <div class="container">
      <div class="dynamic-page-content-inner">
        <div class="dynamic-page-content" v-html="content"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  content?: string
}>()
</script>
