<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { HeaderMenu } from '~/composables/useHeaderMenu'
import { isExternalUrl } from '~/utils/menu'

const props = defineProps<{
  isOpen: boolean
  menus: HeaderMenu[]
  siteLogo: string
  siteName?: string
  pmbUrl: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()
const activeMenuIds = ref<Record<string | number, boolean>>({})

// Reset state accordion setiap kali drawer ditutup
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    activeMenuIds.value = {}
  }
})

const toggleSubmenu = (id: string | number, e?: Event) => {
  if (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  activeMenuIds.value[id] = !activeMenuIds.value[id]
}

const closeDrawer = () => {
  emit('close')
}

// Cek format link internal
const isInternalLink = (url?: string): boolean => {
  if (!url || url === '#' || url.startsWith('javascript:')) return false
  if (isExternalUrl(url)) return false
  return url.startsWith('/') || !url.includes('://')
}

// Navigasi universal: Menjamin link pasti jalan di mobile tanpa terputus unmount DOM
const handleItemClick = (url?: string, target?: string) => {
  if (!url || url === '#') return

  closeDrawer()

  const external = isExternalUrl(url) || !isInternalLink(url)
  if (external) {
    if (target === '_blank') {
      window.open(url, '_blank')
    } else {
      window.location.href = url
    }
  } else {
    router.push(url)
  }
}

/**
 * Universal Menu Parser:
 * Mengekstrak seluruh item link di dalam menu, baik yang berstruktur:
 * 1. Flat array: menu.children = [ { label, to }, ... ]
 * 2. Grouped columns: menu.children = [ { label, children: [ ... ] }, ... ]
 * 3. Mega menu properties: menu.items, menu.columns, atau menu.groups
 */
const getFlattenedChildren = (menu: any): any[] => {
  if (!menu) return []

  const rawList = menu.children || menu.items || menu.submenus || []
  if (!Array.isArray(rawList) || rawList.length === 0) return []

  const result: any[] = []

  rawList.forEach((item: any) => {
    // Jika item adalah pembungkus kolom/grup yang punya anak lagi
    const subChildren = item.children || item.items || item.links
    if (Array.isArray(subChildren) && subChildren.length > 0) {
      subChildren.forEach((child: any) => {
        result.push({
          ...child,
          groupName: item.label || item.title || null
        })
      })
    } else {
      // Jika item adalah link langsung
      result.push(item)
    }
  })

  return result
}
</script>

<template>
  <Teleport to="body">
    <!-- BACKDROP (Z-INDEX DI BAWAH DRAWER) -->
    <div
      v-if="isOpen"
      class="mob-backdrop"
      aria-hidden="true"
      @click="closeDrawer"
    />

    <!-- DRAWER UTAMA -->
    <aside
      class="mob-drawer"
      :class="{ 'mob-drawer--active': isOpen }"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      <!-- HEADER -->
      <div class="mob-header">
        <div class="mob-logo" @click="handleItemClick('/')">
          <img :src="siteLogo" :alt="siteName || 'UMPKU'" />
        </div>
        <button
          type="button"
          class="mob-close-btn"
          aria-label="Tutup Menu"
          @click="closeDrawer"
        >
          ✕
        </button>
      </div>

      <!-- BODY / DAFTAR MENU -->
      <div class="mob-body">
        <ul class="mob-menu-root">
          <li v-for="menu in menus" :key="menu.id" class="mob-menu-item">
            
            <!-- 1. JIKA MEMILIKI SUBMENU ATAU TIPE MEGA -->
            <template v-if="getFlattenedChildren(menu).length > 0">
              <button
                type="button"
                class="mob-item-bar"
                :aria-expanded="!!activeMenuIds[menu.id]"
                @click="toggleSubmenu(menu.id, $event)"
              >
                <span class="mob-title">{{ menu.label }}</span>
                <span
                  class="mob-arrow"
                  :class="{ 'mob-arrow--open': activeMenuIds[menu.id] }"
                >
                  ▼
                </span>
              </button>

              <!-- DAFTAR ITEM SUBMENU (VERTIKAL MENURUN) -->
              <div v-if="activeMenuIds[menu.id]" class="mob-submenu-container">
                <ul class="mob-sub-list">
                  <li
                    v-for="(sub, idx) in getFlattenedChildren(menu)"
                    :key="sub.id || `${menu.id}-sub-${idx}`"
                    class="mob-sub-item"
                  >
                    <a
                      :href="sub.to || '#'"
                      class="mob-sublink"
                      @click.prevent="handleItemClick(sub.to, sub.target)"
                    >
                      <span class="mob-sublink-title">{{ sub.label || sub.title }}</span>
                      <small v-if="sub.subtitle" class="mob-sublink-desc">{{ sub.subtitle }}</small>
                    </a>
                  </li>
                </ul>

                <!-- PROMO BANNER (JIKA ADA) -->
                <!-- <template v-if="menu.promos && menu.promos.length > 0">
                  <div
                    v-for="promo in menu.promos"
                    :key="`promo-${promo.id}`"
                    class="mob-promo-box"
                    @click="handleItemClick(promo.url)"
                  >
                    <img v-if="promo.image" :src="promo.image" :alt="promo.title" loading="lazy" />
                    <div class="mob-promo-info">
                      <strong>{{ promo.title }}</strong>
                      <p v-if="promo.description">{{ promo.description }}</p>
                      <span>{{ promo.button_text || 'Selengkapnya' }}</span>
                    </div>
                  </div>
                </template> -->
              </div>
            </template>

            <!-- 2. MENU TUNGGAL (BERANDA, DSB) -->
            <template v-else>
              <a
                :href="menu.to || '#'"
                class="mob-item-bar mob-item-bar--link"
                @click.prevent="handleItemClick(menu.to, menu.target)"
              >
                <span class="mob-title">{{ menu.label }}</span>
              </a>
            </template>

          </li>
        </ul>
      </div>

      <!-- FOOTER PMB CTA -->
      <div class="mob-footer">
        <a
          :href="pmbUrl"
          class="mob-cta"
          @click.prevent="handleItemClick(pmbUrl, '_blank')"
        >
          <span>{{ $t ? $t('admission') : 'Pendaftaran PMB' }}</span>
          <span class="mob-cta-icon">→</span>
        </a>
      </div>
    </aside>
  </Teleport>
</template>

<style scoped>
/* ==========================================================================
   ISOLASI PENUH: Bebas dari tabrakan class bootstrap / tema desktop
   ========================================================================== */
.mob-backdrop {
  position: fixed !important;
  inset: 0 !important;
  background-color: rgba(15, 23, 42, 0.6) !important;
  z-index: 99998 !important;
  cursor: pointer !important;
}

.mob-drawer {
  position: fixed !important;
  top: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 82% !important;
  max-width: 320px !important;
  background-color: #ffffff !important;
  z-index: 99999 !important;
  display: flex !important;
  flex-direction: column !important;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2) !important;
  transform: translateX(100%) !important;
  transition: transform 0.28s ease !important;
  box-sizing: border-box !important;
}

.mob-drawer.mob-drawer--active {
  transform: translateX(0) !important;
}

/* HEADER */
.mob-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 16px !important;
  border-bottom: 1px solid #e2e8f0 !important;
  background-color: #ffffff !important;
  flex-shrink: 0 !important;
}

.mob-logo {
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
}

.mob-logo img {
  height: 36px !important;
  width: auto !important;
  object-fit: contain !important;
}

.mob-close-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 36px !important;
  height: 36px !important;
  background-color: #f1f5f9 !important;
  border: 1px solid #cbd5e1 !important;
  border-radius: 8px !important;
  color: #334155 !important;
  font-size: 1.1rem !important;
  cursor: pointer !important;
}

/* BODY LIST */
.mob-body {
  flex: 1 1 auto !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
  padding: 12px 16px 30px 16px !important;
}

.mob-menu-root {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 2px !important;
}

.mob-menu-item {
  list-style: none !important;
  border-bottom: 1px solid #f1f5f9 !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* BARIS TOMBOL MENU UTAMA */
.mob-item-bar {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
  padding: 14px 4px !important;
  background: transparent !important;
  border: none !important;
  cursor: pointer !important;
  text-align: left !important;
  color: #1e293b !important;
  text-decoration: none !important;
  -webkit-tap-highlight-color: transparent !important;
}

.mob-title {
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  color: #0f172a !important;
}

.mob-arrow {
  font-size: 0.65rem !important;
  color: #64748b !important;
  transition: transform 0.25s ease !important;
}

.mob-arrow.mob-arrow--open {
  transform: rotate(180deg) !important;
}

/* CONTAINER SUBMENU MENURUN */
.mob-submenu-container {
  display: flex !important;
  flex-direction: column !important;
  gap: 6px !important;
  padding: 4px 0 14px 0 !important;
  width: 100% !important;
}

.mob-sub-list {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 6px !important;
  width: 100% !important;
}

.mob-sub-item {
  list-style: none !important;
  width: 100% !important;
  margin: 0 !important;
}

/* LINK KOTAK SUBMENU */
.mob-sublink {
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  box-sizing: border-box !important;
  background-color: #f1f5f9 !important;
  padding: 11px 14px !important;
  border-radius: 6px !important;
  text-decoration: none !important;
  cursor: pointer !important;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05) !important;
  transition: background-color 0.15s ease !important;
}

.mob-sublink:active {
  background-color: #e2e8f0 !important;
}

.mob-sublink-title {
  font-size: 0.8rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.4px !important;
  text-transform: uppercase !important;
  color: #334155 !important;
  pointer-events: none !important;
}

.mob-sublink-desc {
  font-size: 0.72rem !important;
  color: #64748b !important;
  margin-top: 2px !important;
  pointer-events: none !important;
}

/* PROMO BOX */
.mob-promo-box {
  display: flex !important;
  flex-direction: column !important;
  background-color: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  margin-top: 10px !important;
  cursor: pointer !important;
}

.mob-promo-box img {
  width: 100% !important;
  height: 95px !important;
  object-fit: cover !important;
}

.mob-promo-info {
  padding: 10px !important;
}

.mob-promo-info strong {
  display: block !important;
  font-size: 0.85rem !important;
  color: #1e293b !important;
}

.mob-promo-info p {
  font-size: 0.75rem !important;
  color: #64748b !important;
  margin: 2px 0 6px 0 !important;
}

.mob-promo-info span {
  font-size: 0.75rem !important;
  font-weight: 700 !important;
  color: #0284c7 !important;
}

/* FOOTER */
.mob-footer {
  padding: 14px 16px !important;
  border-top: 1px solid #e2e8f0 !important;
  background-color: #ffffff !important;
  flex-shrink: 0 !important;
}

.mob-cta {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  width: 100% !important;
  padding: 12px !important;
  background-color: #ea580c !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
  font-size: 0.95rem !important;
  text-decoration: none !important;
  cursor: pointer !important;
}

.mob-cta-icon {
  font-size: 1.1rem !important;
}
</style>