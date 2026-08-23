<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { MenuItem as MenuItemType } from '~/types/menu'
import MegaMenu from './MegaMenu.vue'
import {
  getMenuTitle,
  hasMenuChildren,
  isExternalUrl,
  isMegaMenu as checkIsMegaMenu,
  menuLinkTo,
} from '~/utils/menu'

const props = defineProps<{
  item: MenuItemType
}>()

const { locale } = useLocale()
const route = useRoute()

const title = computed(() => getMenuTitle(props.item, locale.value))
const hasChildren = computed(() => hasMenuChildren(props.item))
const isMegaMenu = computed(() => checkIsMegaMenu(props.item))
const isParent = computed(() => hasChildren.value || isMegaMenu.value)
const linkUrl = computed(() => menuLinkTo(props.item))
const isExternal = computed(() => isExternalUrl(props.item.url) || props.item.target === '_blank')

const isOpen = ref(false)
const toggleSubMenu = () => {
  isOpen.value = !isOpen.value
}

const isActive = computed(() => {
  const url = props.item.url
  if (!url || url === '#') return false
  return route.path === url || route.path.startsWith(url)
})
</script>

<template>
  <li
    class="nav-item"
    :class="{
      dropdown: hasChildren && !isMegaMenu,
      'mega-menu-item position-static': isMegaMenu,
      open: isOpen,
    }"
  >
    <template v-if="!isParent">
      <a
        v-if="isExternal"
        :href="linkUrl"
        class="nav-link"
        :class="{ active: isActive }"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ title }}
      </a>
      <NuxtLink
        v-else
        :to="linkUrl === '#' ? '/' : linkUrl"
        class="nav-link"
        :class="{ active: isActive }"
      >
        {{ title }}
      </NuxtLink>
    </template>

    <a
      v-else
      href="#"
      class="nav-link"
      :class="{ active: isActive }"
      :aria-expanded="isOpen"
      @click.prevent="toggleSubMenu"
    >
      {{ title }}
      <span
        class="sub-nav-toggler"
        :class="{ active: isOpen }"
        @click.stop.prevent="toggleSubMenu"
      >
        <i class="fa fa-angle-down" />
      </span>
    </a>

    <ul
      v-if="hasChildren && !isMegaMenu"
      class="sub-menu"
      :style="{ display: isOpen ? 'block' : '' }"
    >
      <MenuItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
      />
    </ul>

    <MegaMenu
      v-if="isMegaMenu"
      :item="item"
      :is-open="isOpen"
    />
  </li>
</template>

<style scoped>
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
