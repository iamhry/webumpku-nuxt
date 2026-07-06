<template>
  <DynamicHomepageRenderer />
</template>

<script setup lang="ts">
import DynamicHomepageRenderer from '~/components/home/DynamicHomepageRenderer.vue'
import { useI18n, useLocaleHead } from '#imports'

const { locale } = useI18n()
const i18nHead = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
    dir: i18nHead.value.htmlAttrs!.dir
  },
  title: locale.value === 'en' ? 'Welcome to Our University' : 'Selamat Datang di Universitas Kami',
  meta: [
    { name: 'description', content: locale.value === 'en' ? 'Official University Website and Homepage' : 'Website Resmi Universitas' },
    ...(i18nHead.value.meta || [])
  ],
  link: [
    ...(i18nHead.value.link || [])
  ]
})
</script>