<template>
  <section class="page-cta-section text-white py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-8">
          <h3 class="cta-title mb-3" v-if="title">{{ title }}</h3>
          <div class="cta-content" v-if="content" v-html="content"></div>
        </div>
        <div class="col-lg-4 text-lg-end mt-4 mt-lg-0">
          <NuxtLink :to="link" class="btn btn-light btn-lg px-4 fw-bold shadow-sm" v-if="link">
            {{ buttonText || 'Jelajahi Sekarang' }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  content?: string
  buttonText?: string
  link?: string
}>()
</script>
