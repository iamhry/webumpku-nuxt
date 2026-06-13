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

	$(".video-play-btn").magnificPopup({
    type: "iframe",
  });
  
});

</script>


<template>
    <div class="skill-area">
 		<div class="skill-bg bg-cover">
 			<div class="overlay">
 			</div>
 			<div class="pop-up-video">
 				<a href="https://www.youtube.com/watch?v=KO3VhTsDwDM" class="video-play-btn mfp-iframe">
 					<i class="fa fa-play"></i>
 				</a>
 			</div>
 		</div>
 		<div class="skill-content">
 			<div class="section-title">
 				<h6>Our Achievement</h6>
 				<h2>Our Brilliant <b><br>Creativity</b> & <b>Skill</b></h2>
 			</div>
 			<p>There are planty industrial solution the filed. One of the best civil work in downtown have done by expert contractor.</p>
 			<div class="row gx-0">
 				<div class="col-lg-6 col-md-6 col-sm-6"
				 v-for="cn in counter.slice(0,4)" :key="cn.id"
				>
 					<div class="single-counter-box one">
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