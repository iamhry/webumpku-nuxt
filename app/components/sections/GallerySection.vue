<script setup lang="ts">
defineProps<{ data: any }>()
</script>
<template>
  <section class="project-area section-padding">
    <div class="container content-wide">
      <h3>Gallery</h3>
      <div class="row">
         <!-- Assuming data.images is an array of strings -->
         <div class="col-md-4" v-for="(img, idx) in data.images" :key="idx">
            <img :src="img" alt="Gallery Image" class="img-fluid" />
         </div>
      </div>
    </div>
  </section>
</template>
