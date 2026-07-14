<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { SdgGoal } from '~/types/sdgs'

defineProps<{
  prev: SdgGoal | null
  next: SdgGoal | null
}>()

const { t } = useI18n()

const labelFor = (goal: SdgGoal) => {
  const num = goal.goal_number || goal.number || goal.id
  const name = goal.short_name || goal.name || goal.title || `SDG ${num}`
  return name
}

const toDetail = (goal: SdgGoal) =>
  `/tujuan-pembangunan-berkelanjutan/${goal.slug || goal.id}`
</script>

<template>
  <nav class="sdgs-goal-nav" aria-label="SDG navigation">
    <div class="container">
      <div class="sdgs-goal-nav-row">
        <NuxtLink
          v-if="prev"
          :to="toDetail(prev)"
          class="sdgs-goal-nav-card nav-prev"
        >
          <span class="nav-label">{{ t('previous_goal') }}</span>
          <span class="nav-title">{{ labelFor(prev) }}</span>
        </NuxtLink>
        <div v-else class="sdgs-goal-nav-card nav-prev is-empty"></div>

        <NuxtLink
          v-if="next"
          :to="toDetail(next)"
          class="sdgs-goal-nav-card nav-next"
        >
          <span class="nav-label">{{ t('next_goal') }}</span>
          <span class="nav-title">{{ labelFor(next) }}</span>
        </NuxtLink>
        <div v-else class="sdgs-goal-nav-card nav-next is-empty"></div>
      </div>
    </div>
  </nav>
</template>
