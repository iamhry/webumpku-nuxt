<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const keyword = ref('')
const wrapperRef = ref<HTMLElement | null>(null)

const toggleSearch = () => {
  isOpen.value = !isOpen.value
}

const closeSearch = () => {
  isOpen.value = false
}

const onDocumentClick = (e: MouseEvent) => {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    closeSearch()
  }
}

const submitSearch = async () => {
  const q = keyword.value.trim()
  if (!q) return
  closeSearch()
  keyword.value = ''
  await navigateTo(`/search?q=${encodeURIComponent(q)}`)
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <div ref="wrapperRef" class="rs-header-search-wrapper">
    <button
      class="rs-search-icon-btn"
      :aria-label="isOpen ? 'Tutup Pencarian' : 'Buka Pencarian'"
      @click.stop="toggleSearch"
    >
      <i :class="isOpen ? 'las la-times' : 'las la-search'" />
    </button>
    <div class="rs-header-search-inner" :class="{ open: isOpen }">
      <form class="rs-header-search-form" @submit.prevent="submitSearch">
        <input
          v-model="keyword"
          type="text"
          placeholder="Cari..."
          autofocus
          @keydown.esc="closeSearch"
        />
        <button type="submit" aria-label="Cari">
          <i class="las la-search" />
        </button>
      </form>
    </div>
  </div>
</template>