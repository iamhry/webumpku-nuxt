<script setup lang="ts">
defineProps<{
  email?: string
  phone?: string
  schedule?: string
  facebook?: string
  instagram?: string
  youtube?: string
  linkedin?: string
}>()

const { locale, setLocale } = useLocale()
</script>

<template>
  <div class="rs-header-top-inner">
    <div class="rs-header-info-wrapper">
      <div v-if="email" class="rs-header-info-item">
        <div class="rs-header-contact-item">
          <span>Email.</span>
          <h6><a :href="`mailto:${email}`">{{ email }}</a></h6>
        </div>
      </div>
      <div v-if="phone" class="rs-header-info-item">
        <div class="rs-header-contact-item">
          <span>Telp.</span>
          <h6><a :href="`tel:${phone}`">{{ phone }}</a></h6>
        </div>
      </div>
    </div>

    <div class="rs-header-top-right">
      <div v-if="schedule" class="rs-header-info-item">
        <div class="rs-header-contact-item">
          <div class="rs-theme-social" v-if="facebook || instagram || youtube || linkedin">
            <a v-if="facebook" :href="facebook" target="_blank" rel="noopener" aria-label="Facebook">
              <i class="lab la-facebook-f" />
            </a>
            <a v-if="instagram" :href="instagram" target="_blank" rel="noopener" aria-label="Instagram">
              <i class="lab la-instagram" />
            </a>
            <a v-if="youtube" :href="youtube" target="_blank" rel="noopener" aria-label="YouTube">
              <i class="lab la-youtube" />
            </a>
            <a v-if="linkedin" :href="linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">
              <i class="lab la-linkedin-in" />
            </a>
          </div>
        </div>
      </div>
      <div class="rs-lang-switcher">
        <a :class="{ active: locale === 'id' }" @click.prevent="setLocale('id')">ID</a>
        <span class="rs-lang-divider">|</span>
        <a :class="{ active: locale === 'en' }" @click.prevent="setLocale('en')">EN</a>
      </div>
    </div>
  </div>
</template>