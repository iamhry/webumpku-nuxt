<script setup>
const { locale, setLocale } = useLocale()
</script>

<template>
  <div class="language-switcher dropdown d-inline-block">
    <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false" style="padding: 5px 15px; font-weight: bold; border: none;">
      <i class="las la-globe"></i> {{ locale.toUpperCase() }}
    </button>
    <ul class="dropdown-menu" aria-labelledby="languageDropdown">
      <li>
        <button type="button" class="dropdown-item" :class="{ 'active': locale === 'id' }" @click="setLocale('id')">
          Indonesia
        </button>
      </li>
      <li>
        <button type="button" class="dropdown-item" :class="{ 'active': locale === 'en' }" @click="setLocale('en')">
          English
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.language-switcher .dropdown-item.active {
  background-color: #f4f5f8;
  color: #000;
  font-weight: bold;
}
</style>
