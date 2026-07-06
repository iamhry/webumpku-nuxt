<script setup lang="ts">
import type { SdgGoal } from '~/types/sdgs'
defineProps<{ goals: SdgGoal[] }>()
</script>
<template>
  <div class="row">
    <div class="col-lg-4 col-md-6 col-sm-12" v-for="goal in goals" :key="goal.id">
      <SdgsCard :goal="goal" />
    </div>
  </div>
</template>
