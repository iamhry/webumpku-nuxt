<script setup lang="ts">
import HeaderMegaMenu from './HeaderMegaMenu.vue'

defineProps<{
  menus: any[]
  openMegaId: string | number | null
  isMegaMenuItem: (menu: any) => boolean
  megaColumns: (menu: any) => number
  megaColumnGroups: (menu: any) => any[]
  isInternalLink: (url?: string) => boolean
  isActiveMenu: (menu: any) => boolean
}>()

const emit = defineEmits<{
  (e: 'open-mega', id: string | number): void
  (e: 'close-mega'): void
  (e: 'toggle-mega', id: string | number): void
  (e: 'schedule-close-mega'): void
  (e: 'mega-focus-out', evt: FocusEvent, id: string | number): void
}>()
</script>

<template>
  <div class="rs-header-menu">
    <nav class="rs-main-nav" aria-label="Main Navigation">
      <ul class="multipage-menu">
        <li
          v-for="menu in menus"
          :key="menu.id"
          :class="{
            'menu-item-has-children': menu.children?.length > 0 || isMegaMenuItem(menu),
            'has-mega-menu': isMegaMenuItem(menu),
            'is-mega-open': isMegaMenuItem(menu) && openMegaId === menu.id,
          }"
          @mouseenter="isMegaMenuItem(menu) && emit('open-mega', menu.id)"
          @mouseleave="isMegaMenuItem(menu) && emit('schedule-close-mega')"
          @focusin="isMegaMenuItem(menu) && emit('open-mega', menu.id)"
          @focusout="isMegaMenuItem(menu) && emit('mega-focus-out', $event, menu.id)"
        >
          <!-- Leaf item (Single Link) -->
          <template v-if="(!menu.children || menu.children.length === 0) && !isMegaMenuItem(menu)">
            <a
              v-if="!isInternalLink(menu.to)"
              :href="menu.to"
              :target="menu.target"
              rel="noopener"
              :class="{ 'router-link-active': isActiveMenu(menu) }"
            >{{ menu.label }}</a>
            <NuxtLink
              v-else
              :to="menu.to"
              :class="{ 'router-link-active': isActiveMenu(menu) }"
            >{{ menu.label }}</NuxtLink>
          </template>

          <!-- Mega Menu Item -->
          <template v-else-if="isMegaMenuItem(menu)">
            <a
              href="#"
              :class="{ 'router-link-active': isActiveMenu(menu) }"
              :aria-expanded="openMegaId === menu.id"
              @click.prevent="emit('toggle-mega', menu.id)"
            >
              {{ menu.label }}
              <i class="fa fa-angle-down rs-arrow" />
            </a>
            <HeaderMegaMenu
              :menu="menu"
              :groups="megaColumnGroups(menu)"
              :col-count="megaColumnGroups(menu).length > 1 ? Math.min(5, Math.max(2, megaColumnGroups(menu).length)) : megaColumns(menu)"
              @close="emit('close-mega')"
            />
          </template>

          <!-- Standard Submenu Dropdown -->
          <template v-else>
            <a
              href="#"
              :class="{ 'router-link-active': isActiveMenu(menu) }"
              @click.prevent
            >
              {{ menu.label }}
              <i class="fa fa-angle-down rs-arrow" />
            </a>
            <ul class="rs-submenu">
              <li v-for="child in menu.children" :key="child.id">
                <a
                  v-if="!isInternalLink(child.to)"
                  :href="child.to"
                  :target="child.target"
                  rel="noopener"
                  :class="{ 'router-link-active': isActiveMenu(child) }"
                >{{ child.label }}</a>
                <NuxtLink
                  v-else
                  :to="child.to"
                  :class="{ 'router-link-active': isActiveMenu(child) }"
                >{{ child.label }}</NuxtLink>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </nav>
  </div>
</template>