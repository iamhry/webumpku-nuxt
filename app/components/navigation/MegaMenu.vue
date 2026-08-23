<script setup lang="ts">
import { computed } from 'vue'
import type { Menu, MenuItem, MenuPromo } from '~/types/menu'
import {
  clampMenuColumns,
  getMenuTitle,
  isExternalUrl,
  isGroupMenu,
  menuLinkTo,
} from '~/utils/menu'

const props = defineProps<{
  item: MenuItem
  isOpen: boolean
}>()

const { locale } = useLocale()

const titleOf = (m: Menu) => getMenuTitle(m, locale.value)

const columns = computed(() => clampMenuColumns(props.item.columns, 3))

const columnClass = computed(() => {
  // Bootstrap-ish: distribute remaining space; promo takes ~1 col on large screens
  const map: Record<number, string> = {
    2: 'col-lg-4',
    3: 'col-lg-3',
    4: 'col-lg-2',
    5: 'col-lg-2',
  }
  return map[columns.value] || 'col-lg-3'
})

/** Prefer explicit groups; fallback: treat each top child as a column. */
const groups = computed(() => {
  const children = props.item.children || []
  const onlyGroups = children.filter(child => isGroupMenu(child))
  if (onlyGroups.length) return onlyGroups

  // Fallback: children without nested children become a synthetic "Links" column
  const withNested = children.filter(c => c.children?.length)
  if (withNested.length) return withNested

  if (!children.length) return []

  return [{
    id: `${props.item.id}-fallback`,
    title: props.item.title,
    url: null,
    target: '_self',
    menu_type: 'group' as const,
    children,
  } satisfies Menu]
})

const promos = computed<MenuPromo[]>(() => {
  const list = props.item.promos || []
  return [...list].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
})

const hasPromos = computed(() => promos.value.length > 0)

const linksColClass = computed(() => {
  if (!hasPromos.value) {
    return columns.value <= 3 ? 'col-lg-4' : 'col-lg-3'
  }
  return columnClass.value
})
</script>

<template>
  <div
    class="mega-menu-wrapper"
    :class="{ 'is-open': isOpen }"
    role="region"
    :aria-label="titleOf(item)"
  >
    <div class="mega-menu-inner">
      <div class="row g-4 align-items-start">
        <!-- Link columns -->
        <div
          v-for="group in groups"
          :key="group.id"
          class="col-12 col-md-6"
          :class="linksColClass"
        >
          <h5 class="mega-title">
            {{ titleOf(group) }}
          </h5>
          <ul class="mega-sub-menu list-unstyled mb-0">
            <li
              v-for="link in (group.children || [])"
              :key="link.id"
              class="mega-link-item"
            >
              <a
                v-if="isExternalUrl(link.url) || link.target === '_blank'"
                :href="menuLinkTo(link)"
                class="mega-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="mega-link-title">{{ titleOf(link) }}</span>
                <span v-if="link.subtitle" class="mega-link-subtitle">{{ link.subtitle }}</span>
              </a>
              <NuxtLink
                v-else
                :to="menuLinkTo(link)"
                class="mega-link"
              >
                <span class="mega-link-title">{{ titleOf(link) }}</span>
                <span v-if="link.subtitle" class="mega-link-subtitle">{{ link.subtitle }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Promo cards -->
        <div
          v-if="hasPromos"
          class="col-12 col-lg-3 mega-promos"
        >
          <article
            v-for="promo in promos"
            :key="promo.id"
            class="mega-promo-card"
          >
            <div v-if="promo.image" class="mega-promo-media">
              <img
                :src="promo.image"
                :alt="promo.title"
                loading="lazy"
              >
            </div>
            <div class="mega-promo-body">
              <h6 class="mega-promo-title">{{ promo.title }}</h6>
              <p v-if="promo.description" class="mega-promo-desc">
                {{ promo.description }}
              </p>
              <a
                v-if="promo.url"
                :href="promo.url"
                class="mega-promo-cta"
                :target="isExternalUrl(promo.url) ? '_blank' : undefined"
                :rel="isExternalUrl(promo.url) ? 'noopener noreferrer' : undefined"
              >
                {{ promo.button_text || 'Selengkapnya' }}
                <i class="fa fa-arrow-right" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mega-menu-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  background: #fff;
  border-top: 3px solid var(--primary-color, #0b2e59);
  box-shadow: 0 18px 40px rgba(11, 46, 89, 0.12);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(8px);
  transition: opacity 0.22s ease, transform 0.22s ease, visibility 0.22s ease;
}

.mega-menu-inner {
  width: min(1280px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 1.75rem 0.5rem 2rem;
}

@media (min-width: 992px) {
  :global(li.mega-menu-item:hover) > .mega-menu-wrapper,
  :global(li.mega-menu-item:focus-within) > .mega-menu-wrapper,
  .mega-menu-wrapper.is-open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateY(0);
  }
}

.mega-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--primary-color, #0b2e59);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin: 0 0 0.85rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(11, 46, 89, 0.08);
}

.mega-link {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.45rem 0;
  color: #1f2937;
  text-decoration: none;
  border-radius: 4px;
  transition: color 0.2s ease, padding-left 0.2s ease;
}

.mega-link-title {
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.35;
}

.mega-link-subtitle {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 400;
  line-height: 1.35;
}

.mega-link:hover,
.mega-link:focus-visible {
  color: var(--primary-color, #0b2e59);
  padding-left: 0.35rem;
  outline: none;
}

.mega-promos {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mega-promo-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 12px;
  background: linear-gradient(160deg, #0b2e59 0%, #134a87 100%);
  color: #fff;
  min-height: 180px;
}

.mega-promo-media {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
}

.mega-promo-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.mega-promo-body {
  padding: 1rem 1.1rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.mega-promo-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35;
  color: #fff;
}

.mega-promo-desc {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mega-promo-cta {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #f6c453;
  font-weight: 700;
  font-size: 0.875rem;
  text-decoration: none;
  padding-top: 0.35rem;
}

.mega-promo-cta:hover,
.mega-promo-cta:focus-visible {
  color: #fff;
  outline: none;
}

@media (max-width: 991px) {
  .mega-menu-wrapper {
    position: static;
    width: 100%;
    margin-left: 0;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: none;
    display: none;
    border-top: none;
    box-shadow: none;
    background: #f8fafc;
  }

  .mega-menu-wrapper.is-open {
    display: block;
  }

  .mega-menu-inner {
    width: 100%;
    padding: 0.75rem 0.25rem 1rem;
  }

  .mega-promo-card {
    min-height: 0;
  }
}
</style>
