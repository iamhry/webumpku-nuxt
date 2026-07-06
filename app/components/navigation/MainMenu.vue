<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import type { MenuItem as MenuItemType } from '~/types/menu'

defineProps<{
  menus: MenuItemType[]
}>()
</script>

<template>
  <ul class="navbar-nav m-auto">
    <!-- Dynamic Menu Rendering -->
    <template v-if="menus && menus.length > 0">
      <MenuItem v-for="menu in menus" :key="menu.id" :item="menu" />
    </template>
    
    <!-- Error/Fallback State Minimal Menu -->
    <template v-else>
      <li class="nav-item">
        <NuxtLink class="nav-link" to="/">Beranda</NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link" to="/about">Tentang</NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link" to="/news">Berita</NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link" to="/sdgs">SDGs</NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link" to="/contact">Kontak</NuxtLink>
      </li>
    </template>
  </ul>
</template>

<style scoped>
.skeleton-text {
  color: transparent !important;
  background-color: #e2e8f0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
  margin: 0 10px;
  min-width: 80px;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
</style>
