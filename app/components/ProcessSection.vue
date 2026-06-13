<script setup>

import { onMounted, ref} from 'vue'

import axios from "axios";

const process = ref([]);

onMounted(async () => {
  const { data: fetchedProcess } = await axios.get("/data/process.json");
  process.value = fetchedProcess.process;
});

</script>

<template>
    <div class="process-area section-padding pad-bot-60">
 		<div class="container">
 			<div class="row">
 				<div class="offset-lg-2 col-lg-8 text-center">
 					<div class="section-title">
 						<h6>Our Process</h6>
 						<h2>How We <b>Works</b></h2>
 					</div>
 				</div>
 			</div>
 			<div class="row process-item-wrap">
 				<div class="col-lg-3 col-md-6 col-12"
				v-for="pr in process.slice(0,4)" :key="pr.id"
				>
 					<div class="single-process-item">
 						<div class="process-num">
 							<p>{{ pr.number }}</p>
 						</div>
 						<div class="process-icon">
 							<img :src="pr.icon" alt="icon">
 						</div>
 						<div class="process-content">
 							<h5>{{ pr.title }}</h5>
 							<p>{{ pr.content }}</p>
 						</div>
 					</div>
 				</div> 			
 			</div>
 		</div>
 	</div>
</template>