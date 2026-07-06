<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { MenuItem } from '~/types/menu'

const props = defineProps<{
  item: MenuItem
  isOpen: boolean
}>()

const { locale } = useLocale()
const getTitle = (m: MenuItem) => {
  if (typeof m.title === 'string') return m.title;
  return m.title?.[locale.value] || m.title?.['id'] || '';
}
</script>

<template>
  <div class="mega-menu-wrapper shadow-sm rounded" :class="{ 'mobile-open': isOpen }">
    <div class="container-fluid p-4">
      <div class="row g-4">
        <div v-for="column in item.children" :key="column.id" class="col-lg-3 col-md-6 col-sm-12">
          <h5 class="mega-title font-weight-bold text-primary mb-3">{{ getTitle(column) }}</h5>
          <ul class="mega-sub-menu list-unstyled">
            <li v-for="link in column.children" :key="link.id" class="mb-2">
              <a v-if="link.target === '_blank'" :href="link.url || '#'" target="_blank" rel="noopener" class="mega-link text-decoration-none text-dark">
                {{ getTitle(link) }}
              </a>
              <NuxtLink v-else :to="link.url || '#'" class="mega-link text-decoration-none text-dark">
                {{ getTitle(link) }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mega-menu-wrapper {
  position: absolute;
  left: 0;
  width: 100vw;
  background-color: #fff;
  border-top: 3px solid var(--primary-color, #0b2e59);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  transform: translateY(10px);
}

@media (min-width: 992px) {
  /* Parent li needs to be position: static for 100vw to work correctly usually, 
     but assuming standard bootstrap navbar styling */
  li.mega-menu-item:hover .mega-menu-wrapper {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

@media (max-width: 991px) {
  .mega-menu-wrapper {
    position: static;
    width: 100%;
    opacity: 1;
    visibility: visible;
    transform: none;
    display: none;
    border-top: none;
  }
  .mega-menu-wrapper.mobile-open {
    display: block;
  }
  .mega-title {
    font-size: 1.1rem;
    margin-top: 15px;
  }
  .mega-link {
    display: block;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
  }
}

.mega-link:hover {
  color: var(--primary-color, #0b2e59) !important;
  padding-left: 5px;
  transition: all 0.2s;
}
</style>
