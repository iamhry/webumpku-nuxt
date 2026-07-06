<script setup>
import { useI18n } from '#imports'
import { useSettings } from '~/composables/useSettings'

const { locale, setLocale } = useI18n()
const { settings } = useSettings()
</script>

<template>
  <div class="umpku-header-top">
    <div class="container-fluid">
      <div class="umpku-header-top-inner">

        <!-- Left: Contact Info Items -->
        <div class="umpku-header-info-wrapper">
          <div class="umpku-header-contact-item" v-if="settings.email">
            <span class="umpku-contact-label">Email.</span>
            <h6 class="umpku-contact-value">
              <a :href="`mailto:${settings.email}`">{{ settings.email }}</a>
            </h6>
          </div>
          <div class="umpku-header-contact-item" v-if="settings.phone">
            <span class="umpku-contact-label">Telp.</span>
            <h6 class="umpku-contact-value">
              <a :href="`tel:${settings.phone}`">{{ settings.phone }}</a>
            </h6>
          </div>
        </div>

        <!-- Right: Schedule + Social Media + Language Switcher -->
        <div class="umpku-header-top-right">

          <div class="umpku-topbar-social">
            <a v-if="settings.facebook" :href="settings.facebook" target="_blank" rel="noopener" aria-label="Facebook"><i class="lab la-facebook-f"></i></a>
            <a v-if="settings.instagram" :href="settings.instagram" target="_blank" rel="noopener" aria-label="Instagram"><i class="lab la-instagram"></i></a>
            <a v-if="settings.youtube" :href="settings.youtube" target="_blank" rel="noopener" aria-label="YouTube"><i class="lab la-youtube"></i></a>
            <a v-if="settings.linkedin" :href="settings.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="lab la-linkedin"></i></a>
            <a v-if="settings.twitter" :href="settings.twitter" target="_blank" rel="noopener" aria-label="Twitter/X"><i class="lab la-twitter"></i></a>
          </div>
          <div class="umpku-language-switcher">
            <a :class="{ active: locale === 'id' }" @click.prevent="setLocale('id')">ID</a>
            <span class="umpku-lang-divider">|</span>
            <a :class="{ active: locale === 'en' }" @click.prevent="setLocale('en')">EN</a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.umpku-header-top {
  background-color: #F7F7F7; /* Light background */
  border-bottom: none;
  padding: 12px 0;
}

.umpku-header-top-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  gap: var(--space-5);
}

/* Left group: wraps multiple contact items */
.umpku-header-info-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

/* Each item: label on top, value below */
.umpku-header-contact-item {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.umpku-contact-label {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  color: #616161;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.umpku-contact-value {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: #616161;
  margin: 0;
  white-space: nowrap;
}

.umpku-contact-value a {
  color: #616161;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.umpku-contact-value a:hover {
  color: var(--primary);
}

/* Right group */
.umpku-header-top-right {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

/* Social media icons */
.umpku-topbar-social {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.umpku-topbar-social a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px; /* Industrial square/rounded corners */
  background-color: transparent;
  color: #616161;
  font-size: 14px;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.umpku-topbar-social a:hover {
  background-color: var(--primary);
  color: var(--white);
  transform: translateY(-2px);
}

/* Language switcher */
.umpku-language-switcher {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.umpku-language-switcher a {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  color: #616161;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color var(--transition-fast);
}

.umpku-language-switcher a:hover,
.umpku-language-switcher a.active {
  color: var(--primary);
}

.umpku-lang-divider {
  color: #616161;
  font-size: 12px;
  opacity: 0.3;
}

/* Responsive */
@media (max-width: 992px) {
  .umpku-header-top-inner {
    padding: 0 var(--space-4);
    flex-wrap: wrap;
    gap: var(--space-2);
    justify-content: center;
  }

  .umpku-header-top-right {
    gap: var(--space-4);
  }

  .umpku-header-info-wrapper {
    gap: var(--space-4);
  }
}

@media (max-width: 576px) {
  .umpku-header-top {
    display: none;
  }
}
</style>
