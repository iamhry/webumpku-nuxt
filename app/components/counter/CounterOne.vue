<script setup>

import { onMounted, ref, onUpdated } from 'vue'

import axios from "axios";

const counter = ref([]);

onMounted(async () => {
  const { data: fetchedCounter } = await axios.get("/data/counter.json");
  counter.value = fetchedCounter.counter;
});

onUpdated(() => {     
    $(".counter-number span").counterUp({
		delay: 10,
		time: 1000,

	});
  
});

</script>


<template>
    <div class="achievement-area">
 		<div class="overlay-2"></div>
 		<div class="container">
 			<div class="row">
 				<div class="col-lg-3 col-md-6 col-sm-6"
				v-for="cn in counter.slice(0,4)" :key="cn.id"
				>
 					<div class="single-counter-box">
 						<div class="fact-icon">
 							<i :class="cn.icon"></i>
 						</div>
 						<p class="counter-number"><span>{{ cn.number }}</span></p>
 						<h6>{{ cn.title }}</h6>
 					</div>
 				</div> 				
 			</div>
 		</div>
 	</div>
</template>