<script setup>

import { onMounted, ref} from 'vue'

import axios from "axios";

const chooseus = ref([]);

onMounted(async () => {
  const { data: fetchedChooseus } = await axios.get("/data/choose-us-two.json");
  chooseus.value = fetchedChooseus.chooseus;
});

</script>

<template>
    <div class="choose-us-area section-padding">
 		<div class="container">
 			<div class="row">
 				<div class="offset-lg-2 col-lg-8 text-center">
 					<div class="section-title">
 						<h6>Why Choose Us</h6>
 						<h2>We offer <b>perfect real</b> <br>industrial service</h2>
 					</div>
 				</div>
 			</div>
 			<div class="choose-us-wrapper">
 				<div class="row gx-0">
 					<div class="col-lg-3 col-md-6"
					v-for="cu in chooseus.slice(0,4)" :key="cu.id"
					>
 						<div class="choose-us-inner">
 							<div class="choose-us-icon">
 								<img :src="cu.icon" alt="icon">
 							</div>
 							<h5>{{ cu.title }}</h5>
 							<p>{{ cu.content }}</p>
 						</div>
 					</div> 					
 				</div>
 			</div>
 		</div>
 	</div>

 	<div class="spacer">
 		<div class="spacer-bg bg-cover">
 			<div class="overlay-2"></div> 			
 		</div>
 	</div>
</template>