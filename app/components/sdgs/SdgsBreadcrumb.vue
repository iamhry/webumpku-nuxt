<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  sdgName?: string
}>()
</script>

<template>
  <div class="breadcrumb-area gray-bg">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="breadcrumb-inner">
            <h2 class="page-title">{{ sdgName || 'SDGs Detail' }}</h2>
            <ul class="page-list">
              <li><NuxtLink to="/">{{ t('home') }}</NuxtLink></li>
              <li><NuxtLink to="/tujuan-pembangunan-berkelanjutan">{{ t('sdgs') }}</NuxtLink></li>
              <li>{{ t('sdg_detail') }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.breadcrumb-area {
  padding: 40px 0;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.breadcrumb-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.page-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 10px;
}

.page-list li {
  font-size: 14px;
  color: #666;
}

.page-list li a {
  color: #007bff;
  text-decoration: none;
}

.page-list li a:hover {
  text-decoration: underline;
}

.page-list li:not(:last-child)::after {
  content: "/";
  margin-left: 10px;
  color: #ccc;
}

@media (max-width: 768px) {
  .breadcrumb-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
