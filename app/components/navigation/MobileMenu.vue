<script setup lang="ts">
import { ref } from 'vue'
import type { MenuItem } from '~/types/menu'
import {
  getMenuTitle,
  hasMenuChildren,
  isExternalUrl,
  isMegaMenu,
  menuLinkTo,
} from '~/utils/menu'

defineProps<{
  menus: MenuItem[]
}>()

const { locale } = useLocale()
const titleOf = (m: MenuItem) => getMenuTitle(m, locale.value)
const activeMenuId = ref<number | string | null>(null)

const toggleMenu = (id: number | string) => {
  activeMenuId.value = activeMenuId.value === id ? null : id
}
</script>

<template>
  <div class="mobile-menu-accordion">
    <template v-if="menus?.length">
      <ul class="mobile-nav-list">
        <li
          v-for="menu in menus"
          :key="menu.id"
          class="mobile-nav-item"
        >
          <template v-if="hasMenuChildren(menu) || isMegaMenu(menu)">
            <div
              class="mobile-nav-header"
              :class="{ active: activeMenuId === menu.id }"
              @click="toggleMenu(menu.id)"
            >
              <span>{{ titleOf(menu) }}</span>
              <span class="mobile-nav-toggler"><i class="fa fa-angle-down" /></span>
            </div>

            <ul
              v-show="activeMenuId === menu.id"
              class="mobile-sub-menu"
            >
              <template v-if="isMegaMenu(menu)">
                <li
                  v-for="group in (menu.children || [])"
                  :key="group.id"
                  class="mobile-mega-block"
                >
                  <div class="mobile-mega-title">{{ titleOf(group) }}</div>
                  <ul class="mobile-mega-sub-menu">
                    <li
                      v-for="link in (group.children || [])"
                      :key="link.id"
                    >
                      <a
                        v-if="isExternalUrl(link.url) || link.target === '_blank'"
                        :href="menuLinkTo(link)"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{{ titleOf(link) }}</span>
                        <small v-if="link.subtitle">{{ link.subtitle }}</small>
                      </a>
                      <NuxtLink
                        v-else
                        :to="menuLinkTo(link)"
                      >
                        <span>{{ titleOf(link) }}</span>
                        <small v-if="link.subtitle">{{ link.subtitle }}</small>
                      </NuxtLink>
                    </li>
                  </ul>
                </li>

                <li
                  v-for="promo in (menu.promos || [])"
                  :key="`promo-${promo.id}`"
                  class="mobile-promo-item"
                >
                  <component
                    :is="promo.url ? 'a' : 'div'"
                    class="mobile-promo-card"
                    v-bind="promo.url
                      ? {
                          href: promo.url,
                          target: isExternalUrl(promo.url) ? '_blank' : undefined,
                          rel: isExternalUrl(promo.url) ? 'noopener noreferrer' : undefined,
                        }
                      : {}"
                  >
                    <img
                      v-if="promo.image"
                      :src="promo.image"
                      :alt="promo.title"
                      loading="lazy"
                    >
                    <div class="mobile-promo-body">
                      <strong>{{ promo.title }}</strong>
                      <p v-if="promo.description">{{ promo.description }}</p>
                      <span
                        v-if="promo.url"
                        class="mobile-promo-cta"
                      >
                        {{ promo.button_text || 'Selengkapnya' }}
                      </span>
                    </div>
                  </component>
                </li>
              </template>

              <template v-else>
                <li
                  v-for="child in menu.children"
                  :key="child.id"
                >
                  <a
                    v-if="isExternalUrl(child.url) || child.target === '_blank'"
                    :href="menuLinkTo(child)"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ titleOf(child) }}
                  </a>
                  <NuxtLink
                    v-else
                    :to="menuLinkTo(child)"
                  >
                    {{ titleOf(child) }}
                  </NuxtLink>
                </li>
              </template>
            </ul>
          </template>

          <template v-else>
            <a
              v-if="isExternalUrl(menu.url) || menu.target === '_blank'"
              :href="menuLinkTo(menu)"
              class="mobile-nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ titleOf(menu) }}
            </a>
            <NuxtLink
              v-else
              :to="menuLinkTo(menu) === '#' ? '/' : menuLinkTo(menu)"
              class="mobile-nav-link"
            >
              {{ titleOf(menu) }}
            </NuxtLink>
          </template>
        </li>
      </ul>
    </template>

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
.mobile-menu-accordion { width: 100%; }

.mobile-nav-list,
.mobile-sub-menu,
.mobile-mega-sub-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-nav-item { border-bottom: 1px solid #e9ecef; }

.mobile-nav-link,
.mobile-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}

.mobile-nav-header.active { color: var(--primary-color, #0b2e59); }
.mobile-nav-header.active .mobile-nav-toggler i { transform: rotate(180deg); }
.mobile-nav-toggler i { transition: transform 0.3s; }

.mobile-sub-menu {
  background: #f8f9fa;
  padding-bottom: 8px;
}

.mobile-sub-menu a {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 15px;
  color: #555;
  text-decoration: none;
  border-bottom: 1px solid #eee;
}

.mobile-sub-menu a:hover {
  color: var(--primary-color, #0b2e59);
  padding-left: 20px;
}

.mobile-sub-menu small {
  color: #888;
  font-size: 0.78rem;
}

.mobile-mega-title {
  font-weight: 700;
  padding: 10px 15px;
  color: #0b2e59;
  background: #eef2f7;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.03em;
}

.mobile-promo-item { padding: 10px 15px; }

.mobile-promo-card {
  display: block;
  overflow: hidden;
  border-radius: 10px;
  background: linear-gradient(160deg, #0b2e59 0%, #134a87 100%);
  color: #fff;
  text-decoration: none;
}

.mobile-promo-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
}

.mobile-promo-body { padding: 12px 14px 14px; }
.mobile-promo-body strong { display: block; margin-bottom: 4px; }
.mobile-promo-body p {
  margin: 0 0 8px;
  font-size: 0.85rem;
  opacity: 0.9;
}
.mobile-promo-cta {
  font-size: 0.85rem;
  font-weight: 700;
  color: #f6c453;
}

@media (min-width: 992px) {
  .mobile-menu-accordion { display: none; }
}
</style>
