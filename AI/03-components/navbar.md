# 🧭 Navbar Component — Dokumentasi

## Tujuan Dokumen

Spesifikasi komponen navigasi utama website UMPKU, termasuk desktop nav, mobile menu, dropdown, dan sticky behavior.

---

## Spesifikasi

```
Posisi: Fixed top, full width
Background: Transparent (di hero) → Putih (scroll > 50px)
Height: 80px desktop, 64px mobile
Logo: Kiri
Menu: Tengah/Kanan
Language switcher + CTA: Paling kanan
Mobile: Hamburger → Full overlay menu
```

---

## Struktur Komponen

```
app/components/
├── header/
│   └── HeaderMain.vue        # Wrapper navbar
├── navigation/
│   ├── NavBar.vue            # Desktop navigation
│   ├── NavMobile.vue         # Mobile overlay menu
│   ├── NavDropdown.vue       # Sub-menu dropdown
│   └── NavLangSwitcher.vue   # Language switcher
```

---

## NavBar.vue — Struktur

```vue
<template>
  <header
    class="navbar"
    :class="{ 'navbar--scrolled': isScrolled, 'navbar--open': isMobileOpen }"
    role="banner"
  >
    <div class="container">
      <div class="navbar__inner">
        <!-- Logo -->
        <NuxtLink to="/" class="navbar__logo" aria-label="UMPKU - Halaman Utama">
          <img
            src="/assets/img/logo/logo-umpku.png"
            alt="Universitas Muhammadiyah PKU Surakarta"
            width="180"
            height="60"
          />
        </NuxtLink>

        <!-- Desktop Menu -->
        <nav class="navbar__menu" aria-label="Navigasi Utama" role="navigation">
          <ul class="navbar__list" role="list">
            <li 
              v-for="item in menuItems"
              :key="item.id"
              class="navbar__item"
              :class="{ 'has-dropdown': item.children?.length }"
            >
              <!-- Item tanpa dropdown -->
              <NuxtLink
                v-if="!item.children?.length"
                :to="item.url"
                class="navbar__link"
                :class="{ 'is-active': isActiveRoute(item.url) }"
              >
                {{ item.label }}
              </NuxtLink>

              <!-- Item dengan dropdown -->
              <button
                v-else
                class="navbar__link navbar__dropdown-trigger"
                :aria-expanded="activeDropdown === item.id"
                aria-haspopup="true"
                @click="toggleDropdown(item.id)"
                @keydown.escape="closeDropdown"
              >
                {{ item.label }}
                <span class="la la-angle-down" aria-hidden="true"></span>
              </button>

              <!-- Dropdown -->
              <NavDropdown
                v-if="item.children?.length"
                :items="item.children"
                :is-open="activeDropdown === item.id"
                @close="closeDropdown"
              />
            </li>
          </ul>
        </nav>

        <!-- Right Actions -->
        <div class="navbar__actions">
          <NavLangSwitcher />
          <NuxtLink to="/pendaftaran" class="btn btn-primary btn-sm">
            {{ $t('nav.apply') }}
          </NuxtLink>

          <!-- Hamburger -->
          <button
            class="navbar__hamburger"
            :aria-expanded="isMobileOpen"
            aria-controls="mobile-menu"
            :aria-label="isMobileOpen ? 'Tutup menu' : 'Buka menu'"
            @click="isMobileOpen = !isMobileOpen"
          >
            <span class="navbar__hamburger-line" aria-hidden="true"></span>
            <span class="navbar__hamburger-line" aria-hidden="true"></span>
            <span class="navbar__hamburger-line" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <NavMobile
      id="mobile-menu"
      :is-open="isMobileOpen"
      :items="menuItems"
      @close="isMobileOpen = false"
    />
  </header>
</template>

<script setup lang="ts">
const { menuItems } = useMenu()
const route = useRoute()

const isScrolled = ref(false)
const isMobileOpen = ref(false)
const activeDropdown = ref<number | null>(null)

const isActiveRoute = (url: string) => route.path.startsWith(url)

const toggleDropdown = (id: number) => {
  activeDropdown.value = activeDropdown.value === id ? null : id
}

const closeDropdown = () => {
  activeDropdown.value = null
}

// Close mobile menu on route change
watch(() => route.path, () => {
  isMobileOpen.value = false
  closeDropdown()
})

// Scroll detection
onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>
```

---

## CSS

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  transition: background-color var(--duration-normal) var(--ease-default),
              box-shadow var(--duration-normal) var(--ease-default);
}

/* Transparent state (di atas hero) */
.navbar:not(.navbar--scrolled) {
  background-color: transparent;
}

.navbar:not(.navbar--scrolled) .navbar__link {
  color: white;
}

/* Scrolled state */
.navbar--scrolled {
  background-color: var(--color-white);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}

.navbar--scrolled .navbar__link {
  color: var(--color-text);
}

.navbar__inner {
  display: flex;
  align-items: center;
  height: 80px;
  gap: var(--space-8);
}

.navbar__logo {
  flex-shrink: 0;
}

.navbar__menu {
  flex: 1;
  display: flex;
  justify-content: center;
}

.navbar__list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--space-2);
}

.navbar__link {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 6px;
  transition: color var(--duration-fast), background-color var(--duration-fast);
  background: none;
  border: none;
  cursor: pointer;
}

.navbar__link:hover,
.navbar__link.is-active {
  color: var(--color-accent);
}

/* Hamburger — mobile only */
.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
}

.navbar__hamburger-line {
  display: block;
  width: 22px;
  height: 2px;
  background: currentColor;
  transition: transform var(--duration-fast);
}

@media (max-width: 1023px) {
  .navbar__menu { display: none; }
  .navbar__hamburger { display: flex; }
  .navbar__inner { height: 64px; }
}
```

---

## Anti-Pattern

```
❌ Navbar yang bukan fixed (konten ter-jump saat scroll)
❌ Tidak ada transisi saat scroll
❌ Logo tanpa alt text
❌ Menu mobile yang tidak accessible (keyboard trap)
❌ Dropdown yang tidak tutup saat Escape ditekan
❌ Tidak ada active state pada link aktif
❌ CTA button tidak ada di navbar
❌ Hamburger tanpa aria-label dan aria-expanded
```
