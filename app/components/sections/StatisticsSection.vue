<script setup lang="ts">
defineProps<{ data: any }>()
</script>
<template>
  <section class="services-area section-padding" style="background-color: #f4f5f8;">
    <div class="container content-wide text-center">
      <div class="row">
        <div class="col-md-4" v-if="data.students">
           <h2>{{ data.students }}</h2>
           <p>Students</p>
        </div>
        <div class="col-md-4" v-if="data.faculties">
           <h2>{{ data.faculties }}</h2>
           <p>Faculties</p>
        </div>
        <div class="col-md-4" v-if="data.alumni">
           <h2>{{ data.alumni }}</h2>
           <p>Alumni</p>
        </div>
      </div>
    </div>
  </section>
</template>
