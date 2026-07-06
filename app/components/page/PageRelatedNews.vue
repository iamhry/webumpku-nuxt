<template>
  <section class="page-related-news py-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h3 class="section-title mb-4">{{ title || 'Berita Terkait' }}</h3>
          <p v-if="content" v-html="content" class="mb-4"></p>
          <div class="alert alert-info border-0 shadow-sm rounded">
            Daftar berita terkait akan segera tersedia.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  content?: string
}>()
</script>
