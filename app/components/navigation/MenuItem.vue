<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import type { MenuItem as MenuItemType } from '~/types/menu'
import MegaMenu from './MegaMenu.vue'

const props = defineProps<{
  item: MenuItemType
}>()

const { locale } = useLocale()
const route = useRoute()

const getTitle = (m: MenuItemType) => {
  if (typeof m.title === 'string') return m.title;
  return m.title?.[locale.value] || m.title?.['id'] || '';
}
const title = computed(() => getTitle(props.item))

const hasChildren = computed(() => props.item.children && props.item.children.length > 0)
const isMegaMenu = computed(() => props.item.type === 'mega' || props.item.is_mega_menu)

const isOpen = ref(false)
const toggleSubMenu = () => {
  isOpen.value = !isOpen.value
}

const isActive = computed(() => {
  const url = props.item.url;
  if (!url || url === '#') return false;
  return route.path === url || route.path.startsWith(url);
})

const linkUrl = computed(() => props.item.url || '#')
</script>

<template>
  <li class="nav-item" :class="{ 'dropdown': hasChildren && !isMegaMenu, 'mega-menu-item position-static': isMegaMenu }">
    <template v-if="!hasChildren">
      <a v-if="item.target === '_blank'" :href="linkUrl" class="nav-link" :class="{ 'active': isActive }" target="_blank" rel="noopener">
        {{ title }}
      </a>
      <NuxtLink v-else :to="linkUrl" class="nav-link" :class="{ 'active': isActive }">
        {{ title }}
      </NuxtLink>
    </template>
    
    <a v-else href="#" class="nav-link" :class="{ 'active': isActive }" @click.prevent="toggleSubMenu">
      {{ title }}
      <span class="sub-nav-toggler" @click.stop.prevent="toggleSubMenu" :class="{ 'active': isOpen }">
        <i class="fa fa-angle-down"></i>
      </span>
    </a>
    
    <!-- Recursive Standard Dropdown -->
    <ul v-if="hasChildren && !isMegaMenu" class="sub-menu" :style="{ display: isOpen ? 'block' : '' }">
      <MenuItem v-for="child in item.children" :key="child.id" :item="child" />
    </ul>

    <!-- Mega Menu -->
    <MegaMenu v-if="hasChildren && isMegaMenu" :item="item" :isOpen="isOpen" />
  </li>
</template>

<style scoped>
/* Handled mainly by theme CSS, but we add minor overrides for the toggler state */
.sub-nav-toggler.active i {
  transform: rotate(180deg);
  transition: transform 0.3s;
}
.sub-nav-toggler i {
  transition: transform 0.3s;
}

@media (max-width: 991px) {
  .sub-menu {
    display: none;
  }
}
</style>
