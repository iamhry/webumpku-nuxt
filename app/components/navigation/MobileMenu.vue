<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { MenuItem } from '~/types/menu'

defineProps<{
  menus: MenuItem[]
}>()

const { locale } = useLocale()

const getTitle = (m: MenuItem) => {
  if (typeof m.title === 'string') return m.title;
  return m.title?.[locale.value] || m.title?.['id'] || '';
}

const activeMenuId = ref<number | string | null>(null)

const toggleMenu = (id: number | string) => {
  if (activeMenuId.value === id) {
    activeMenuId.value = null
  } else {
    activeMenuId.value = id
  }
}
</script>

<template>
  <div class="mobile-menu-accordion">
    <!-- Dynamic Menu Rendering -->
    <template v-if="menus && menus.length > 0">
      <ul class="mobile-nav-list">
        <li v-for="menu in menus" :key="menu.id" class="mobile-nav-item">
          <template v-if="menu.children && menu.children.length > 0">
            <div class="mobile-nav-header" @click="toggleMenu(menu.id)" :class="{ 'active': activeMenuId === menu.id }">
              {{ getTitle(menu) }}
              <span class="mobile-nav-toggler"><i class="fa fa-angle-down"></i></span>
            </div>
            <ul class="mobile-sub-menu" v-show="activeMenuId === menu.id">
              <li v-for="child in menu.children" :key="child.id">
                <!-- If it's a Mega Menu column wrapper -->
                <template v-if="menu.type === 'mega' || menu.is_mega_menu">
                  <div class="mobile-mega-title">{{ getTitle(child) }}</div>
                  <ul class="mobile-mega-sub-menu" v-if="child.children && child.children.length > 0">
                    <li v-for="subchild in child.children" :key="subchild.id">
                      <a v-if="subchild.target === '_blank'" :href="subchild.url || '#'" target="_blank" rel="noopener">
                        {{ getTitle(subchild) }}
                      </a>
                      <NuxtLink v-else :to="subchild.url || '#'">
                        {{ getTitle(subchild) }}
                      </NuxtLink>
                    </li>
                  </ul>
                </template>
                <!-- Standard Dropdown Child -->
                <template v-else>
                   <a v-if="child.target === '_blank'" :href="child.url || '#'" target="_blank" rel="noopener">
                     {{ getTitle(child) }}
                   </a>
                   <NuxtLink v-else :to="child.url || '#'">
                     {{ getTitle(child) }}
                   </NuxtLink>
                </template>
              </li>
            </ul>
          </template>
          <template v-else>
            <a v-if="menu.target === '_blank'" :href="menu.url || '#'" class="mobile-nav-link" target="_blank" rel="noopener">
              {{ getTitle(menu) }}
            </a>
            <NuxtLink v-else :to="menu.url || '#'" class="mobile-nav-link">
              {{ getTitle(menu) }}
            </NuxtLink>
          </template>
        </li>
      </ul>
    </template>

    <!-- Error/Fallback State Minimal Menu -->
    <template v-else>
       <ul class="mobile-nav-list">
          <li class="mobile-nav-item"><NuxtLink to="/" class="mobile-nav-link">Beranda</NuxtLink></li>
          <li class="mobile-nav-item"><NuxtLink to="/about" class="mobile-nav-link">Tentang</NuxtLink></li>
          <li class="mobile-nav-item"><NuxtLink to="/news" class="mobile-nav-link">Berita</NuxtLink></li>
          <li class="mobile-nav-item"><NuxtLink to="/sdgs" class="mobile-nav-link">SDGs</NuxtLink></li>
          <li class="mobile-nav-item"><NuxtLink to="/contact" class="mobile-nav-link">Kontak</NuxtLink></li>
       </ul>
    </template>
  </div>
</template>

<style scoped>
.mobile-menu-accordion {
  width: 100%;
}

.mobile-nav-list, .mobile-sub-menu, .mobile-mega-sub-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-nav-item {
  border-bottom: 1px solid #e9ecef;
}

.mobile-nav-link, .mobile-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.mobile-nav-header.active {
  color: var(--primary-color, #0b2e59);
}

.mobile-nav-header.active .mobile-nav-toggler i {
  transform: rotate(180deg);
}

.mobile-nav-toggler i {
  transition: transform 0.3s;
}

.mobile-sub-menu {
  background-color: #f8f9fa;
  padding-left: 15px;
}

.mobile-sub-menu a {
  display: block;
  padding: 10px 15px;
  color: #555;
  text-decoration: none;
  border-bottom: 1px solid #eee;
}

.mobile-sub-menu a:hover {
  color: var(--primary-color, #0b2e59);
  padding-left: 20px;
  transition: all 0.2s;
}

.mobile-mega-title {
  font-weight: 600;
  padding: 10px 15px;
  color: #444;
  background-color: #f1f3f5;
}

.skeleton-text {
  color: transparent !important;
  background-color: #e2e8f0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
  min-height: 40px;
  margin-bottom: 10px;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

@media (min-width: 992px) {
  .mobile-menu-accordion {
    display: none;
  }
}
</style>
