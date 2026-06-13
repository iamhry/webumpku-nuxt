<script setup>

import { onMounted, ref} from 'vue'

import axios from "axios";

const chooseus = ref([]);

onMounted(async () => {
  const { data: fetchedChooseus } = await axios.get("/data/choose-us.json");
  chooseus.value = fetchedChooseus.chooseus;
});


</script>

<template>
    <div class="choose-area">
 		<div class="chooseus-content">
 			<div class="section-title">
 				<h6>Why Choose Us</h6>
 				<h2>Best Solution for <b>Construction</b> & <b>Factory </b>Innovation</h2>
 			</div>
 			<div class="choose-certify"
			v-for="cu in chooseus.slice(0,2)" :key="cu.id"
			>
 				<i :class="cu.icon"></i>
 				<h5>{{ cu.title }}</h5>
 				<p>{{ cu.content }}</p>
 			</div> 			
 		</div>
 		<div class="chooseus-bg bg-cover">
 			<div class="overlay">
 			</div>
 		</div>
 	</div>
</template>