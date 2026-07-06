<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { FooterMenuGroup, MenuItem } from '~/types/menu'

const props = defineProps<{
  group: FooterMenuGroup
}>()

const { locale } = useLocale()

const getTitle = (m: MenuItem | FooterMenuGroup) => {
  if (typeof m.title === 'string') return m.title;
  return m.title?.[locale.value] || m.title?.['id'] || '';
}

</script>

<template>
  <div class="footer-widget">
    <h5>{{ getTitle(group) }}</h5>
    <ul>
      <li>
        <template v-for="item in group.items" :key="item.id">
          <a v-if="item.target === '_blank'" :href="item.url || '#'" target="_blank" rel="noopener" class="footer-link">
            <span v-if="group.section === 'services'">- </span>{{ getTitle(item) }}
          </a>
          <NuxtLink v-else :to="item.url || '#'" class="footer-link">
            <span v-if="group.section === 'services'">- </span>{{ getTitle(item) }}
          </NuxtLink>
        </template>
      </li>
    </ul>
  </div>
</template>
