<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  activeCategory: string
  activeTimeframe: 'all' | 'upcoming' | 'past'
  activeMonth: number | null
  activeYear: number | null
}

const props = defineProps<Props>()
const emit = defineEmits([
  'update:activeCategory',
  'update:activeTimeframe',
  'update:activeMonth',
  'update:activeYear',
  'change'
])

const { t } = useI18n()
const { locale } = useLocale()

// Predefined categories mapping
const categories = [
  { value: '', labelId: 'event_all' },
  { value: 'seminar', labelId: 'Seminar' },
  { value: 'workshop', labelId: 'Workshop' },
  { value: 'webinar', labelId: 'Webinar' },
  { value: 'conference', labelId: 'Conference' },
  { value: 'community_service', labelId: 'Community Service' },
  { value: 'international', labelId: 'International' }
]

// Localized Month Lists
const monthsID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]
const monthsEN = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
]

const monthsList = computed(() => {
  return locale.value === 'en' ? monthsEN : monthsID
})

// Dynamic Year options (centering around current year)
const currentYear = new Date().getFullYear()
const yearsList = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1, currentYear + 2]

// Handle updating category
const selectCategory = (categoryVal: string) => {
  emit('update:activeCategory', categoryVal)
  emit('change')
}

// Handle updating timeframe tab
const selectTimeframe = (timeframe: 'all' | 'upcoming' | 'past') => {
  emit('update:activeTimeframe', timeframe)
  emit('change')
}

// Handle select inputs changes
const onMonthChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const val = target.value ? parseInt(target.value) : null
  emit('update:activeMonth', val)
  emit('change')
}

const onYearChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const val = target.value ? parseInt(target.value) : null
  emit('update:activeYear', val)
  emit('change')
}
</script>

<template>
  <div class="event-filter-wrapper animate__animated animate__fadeIn">
    <!-- Category Filter Row -->
    <div class="event-filter-top">
      <button 
        v-for="cat in categories" 
        :key="cat.value"
        class="event-filter-pill"
        :class="{ active: props.activeCategory === cat.value }"
        @click="selectCategory(cat.value)"
      >
        <!-- Use localized labels for standard categories, else display key -->
        {{ cat.value === '' ? t(cat.labelId) : cat.labelId }}
      </button>
    </div>

    <!-- Dropdowns and Timeframe Tabs -->
    <div class="event-filter-bottom">
      <div class="event-filter-selects">
        <!-- Month Dropdown -->
        <div class="event-select-wrapper">
          <select 
            class="event-select" 
            :value="props.activeMonth ?? ''" 
            @change="onMonthChange"
            aria-label="Filter Month"
          >
            <option value="">{{ t('event_filter_all_months') }}</option>
            <option 
              v-for="(monthName, index) in monthsList" 
              :key="index" 
              :value="index + 1"
            >
              {{ monthName }}
            </option>
          </select>
          <span class="event-select-icon"><i class="las la-angle-down"></i></span>
        </div>

        <!-- Year Dropdown -->
        <div class="event-select-wrapper">
          <select 
            class="event-select" 
            :value="props.activeYear ?? ''" 
            @change="onYearChange"
            aria-label="Filter Year"
          >
            <option value="">{{ t('event_filter_all_years') }}</option>
            <option 
              v-for="yr in yearsList" 
              :key="yr" 
              :value="yr"
            >
              {{ yr }}
            </option>
          </select>
          <span class="event-select-icon"><i class="las la-angle-down"></i></span>
        </div>
      </div>

      <!-- Timeframe Toggle Tab (All / Upcoming / Past) -->
      <div class="event-filter-tabs">
        <button 
          class="event-tab-btn" 
          :class="{ active: props.activeTimeframe === 'upcoming' }"
          @click="selectTimeframe('upcoming')"
        >
          {{ t('event_upcoming') }}
        </button>
        <button 
          class="event-tab-btn" 
          :class="{ active: props.activeTimeframe === 'past' }"
          @click="selectTimeframe('past')"
        >
          {{ t('event_past') }}
        </button>
        <button 
          class="event-tab-btn" 
          :class="{ active: props.activeTimeframe === 'all' }"
          @click="selectTimeframe('all')"
        >
          {{ t('event_all') }}
        </button>
      </div>
    </div>
  </div>
</template>
