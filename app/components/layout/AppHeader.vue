<script setup>
import { onMounted } from 'vue'
import { useSettings } from '~/composables/useSettings'

const { settings, fetchSettings } = useSettings()
await fetchSettings()

onMounted(() => {
  const initHeader = setInterval(() => {
    if (window.$ && window.$.fn.sticky) {
      clearInterval(initHeader)

      // Mobile toggle button
      $('.navbar-toggler').on('click', function () {
        $(this).toggleClass('active')
      })

      // Sticky header
      $('.sticky-area').sticky({ topSpacing: 0 })

      // Fix sticky wrapper height collapsing / layout jump issue
      let stickyUpdateAttempts = 0
      const stickyUpdateInterval = setInterval(() => {
        if ($('.sticky-area').length) {
          $('.sticky-area').sticky('update')
        }
        stickyUpdateAttempts++
        if (stickyUpdateAttempts > 10) clearInterval(stickyUpdateInterval)
      }, 500)

      $(window).on('resize', function () {
        if ($('.sticky-area').length) {
          $('.sticky-area').sticky('update')
        }
      })
    }
  }, 100)
})
</script>

<template>
  <header class="umpku-header-area">

    <!-- TOP BAR -->
    <AppTopbar />

    <!-- MAIN HEADER (sticky) -->
    <div class="sticky-area">
      <div class="umpku-header-inner navigation">
        <div class="container-fluid">
          <div class="umpku-header-row">

            <!-- LEFT: Logo -->
            <div class="umpku-header-left">
              <div class="umpku-header-logo">
                <NuxtLink to="/" class="navbar-brand">
                  <img
                    :src="settings.logo || '/assets/img/logo.png'"
                    :alt="settings.site_name || 'UMPKU'"
                  >
                </NuxtLink>
              </div>
            </div>

            <!-- CENTER: Navigation Menu -->
            <div class="umpku-header-menu">
              <div class="main-menu">
                <AppNavigation />
              </div>
            </div>

            <!-- RIGHT: CTA Button + Quick Access -->
            <div class="umpku-header-right">
              <NuxtLink to="/contact" class="umpku-header-cta main-btn">
                {{ $t ? $t('get_quote') : 'Hubungi Kami' }}
                <span class="umpku-cta-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="14" height="14" fill="currentColor">
                    <path d="M31.71,15.29l-10-10L20.29,6.71,28.59,15H0v2H28.59l-8.29,8.29,1.41,1.41,10-10A1,1,0,0,0,31.71,15.29Z"/>
                  </svg>
                </span>
              </NuxtLink>
              <QuickAccessToggle />
            </div>

          </div>
        </div>
      </div>
    </div>

  </header>
</template>

<style scoped>
.umpku-header-area {
  position: relative;
  z-index: 1000;
}

/* Inner header row */
.umpku-header-inner {
  background-color: var(--bg);
  border-bottom: 1px solid var(--border);
  transition: all var(--transition-normal);
}

.umpku-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  min-height: 90px; /* Slightly taller for industrial feel */
  gap: var(--space-4);
}

/* LEFT: Logo */
.umpku-header-left {
  flex-shrink: 0;
}

.umpku-header-logo .navbar-brand {
  display: inline-block;
  line-height: 1;
}

.umpku-header-logo img {
  max-height: 80px;
  width: auto;
  object-fit: contain;
  transition: transform var(--transition-normal);
}

.umpku-header-logo img:hover {
  transform: scale(1.02);
}

/* CENTER: Menu */
.umpku-header-menu {
  flex: 1;
  display: flex;
  justify-content: center;
}

/* RIGHT: CTA + Quick access */
.umpku-header-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* CTA Button override - Industrial Style */
.umpku-header-cta {
  display: inline-flex !important;
  align-items: center;
  gap: var(--space-2);
  background-color: var(--primary) !important;
  color: var(--text-light) !important;
  font-family: var(--font-body) !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  padding: 12px 28px !important;
  border-radius: 4px !important; /* Square edges for industrial feel */
  border: 1.5px solid var(--primary) !important;
  text-decoration: none;
  transition: all var(--transition-normal) !important;
}

.umpku-header-cta:hover {
  background-color: var(--primary-hover) !important;
  border-color: var(--primary-hover) !important;
  color: var(--text-light) !important;
  transform: translateY(-2px);
}

.umpku-cta-arrow {
  display: inline-flex;
  align-items: center;
  transition: transform var(--transition-fast);
}

.umpku-header-cta:hover .umpku-cta-arrow {
  transform: translateX(4px);
}

/* Sticky state override */
:global(.is_stuck) .umpku-header-inner {
  box-shadow: var(--shadow-medium);
}

/* Responsive: hide CTA text on tablet, keep icon */
@media (max-width: 1200px) {
  .umpku-header-row {
    padding: 0 var(--space-4);
  }
}

@media (max-width: 992px) {
  .umpku-header-row {
    padding: 0 var(--space-3);
    min-height: 68px;
  }

  .umpku-header-cta {
    font-size: 12px !important;
    padding: 8px 16px !important;
  }
}

@media (max-width: 768px) {
  .umpku-header-cta {
    display: none !important;
  }
}
</style>
