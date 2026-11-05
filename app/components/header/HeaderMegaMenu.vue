<script setup lang="ts">
import type { HeaderMenu } from '~/composables/useHeaderMenu'
import { isExternalUrl } from '~/utils/menu'

defineProps<{
  menu: HeaderMenu
  groups: HeaderMenu[]
  colCount: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const onPanelClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement | null
  if (target?.closest('a')) {
    emit('close')
  }
}

const isInternalLink = (url?: string): boolean => {
  if (!url) return false
  return url.startsWith('/') && !url.startsWith('//')
}
</script>

<template>
  <div
    class="rs-mega-menu"
    :class="[
      `rs-mega-cols-${colCount}`,
      { 'rs-mega-menu--has-promos': menu.promos.length > 0 },
    ]"
    @click="onPanelClick"
  >
    <div class="rs-mega-inner" :class="{ 'rs-mega-inner--with-promos': menu.promos.length > 0 }">
      <div class="rs-mega-columns">
        <div v-for="group in groups" :key="group.id" class="rs-mega-column">
          <h5 v-if="group.label" class="rs-mega-heading">
            {{ group.label }}
          </h5>
          <ul class="rs-mega-links">
            <li v-for="link in group.children" :key="link.id">
              <a
                v-if="!isInternalLink(link.to) || isExternalUrl(link.to)"
                :href="link.to"
                :target="link.target || '_blank'"
                rel="noopener noreferrer"
              >
                <span>{{ link.label }}</span>
                <small v-if="link.subtitle">{{ link.subtitle }}</small>
              </a>
              <NuxtLink v-else :to="link.to">
                <span>{{ link.label }}</span>
                <small v-if="link.subtitle">{{ link.subtitle }}</small>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="menu.promos.length" class="rs-mega-promos">
        <article v-for="promo in menu.promos" :key="promo.id" class="rs-mega-promo-card">
          <div v-if="promo.image" class="rs-mega-promo-media">
            <img :src="promo.image" :alt="promo.title" loading="lazy" />
          </div>
          <div class="rs-mega-promo-body">
            <h6>{{ promo.title }}</h6>
            <p v-if="promo.description">{{ promo.description }}</p>
            <a
              v-if="promo.url"
              :href="promo.url"
              class="rs-mega-promo-cta"
              :target="isExternalUrl(promo.url) ? '_blank' : undefined"
              :rel="isExternalUrl(promo.url) ? 'noopener noreferrer' : undefined"
            >
              {{ promo.button_text || 'Selengkapnya' }}
              <i class="fa fa-arrow-right" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>