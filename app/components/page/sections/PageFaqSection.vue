<template>
  <section
    v-if="section.items && section.items.length > 0"
    class="dynamic-page-section page-bg-soft"
  >
    <div class="dynamic-page-container">
      <div class="dynamic-page-reading">

        <!-- Header -->
        <div v-if="section.title || section.subtitle" class="page-section-header">
          <span v-if="section.settings?.kicker" class="page-kicker">{{ section.settings.kicker }}</span>
          <h2 v-if="section.title" class="page-section-title">{{ section.title }}</h2>
          <p v-if="section.subtitle" class="page-section-subtitle">{{ section.subtitle }}</p>
        </div>

        <!-- Accordion -->
        <div class="page-faq-list" role="list">
          <div
            class="page-faq-item"
            :class="{ 'is-open': activeIndex === index }"
            v-for="(item, index) in section.items"
            :key="item.id || index"
            role="listitem"
          >
            <button
              class="page-faq-trigger"
              @click="toggle(index)"
              :aria-expanded="activeIndex === index"
              :id="`faq-btn-${index}`"
              :aria-controls="`faq-body-${index}`"
            >
              <span class="page-faq-q">{{ item.title }}</span>
              <span class="page-faq-icon" aria-hidden="true">
                <i class="las la-plus"></i>
              </span>
            </button>

            <transition name="dp-faq-collapse">
              <div
                v-show="activeIndex === index"
                class="page-faq-body"
                :id="`faq-body-${index}`"
                :aria-labelledby="`faq-btn-${index}`"
                v-html="item.content || item.description"
              ></div>
            </transition>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PageSection } from '~/types/page'

defineProps<{
  section: PageSection
}>()

const activeIndex = ref<number | null>(null)

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>
