<script setup>

import { onMounted, ref} from 'vue'

import axios from "axios";

const features = ref([]);

onMounted(async () => {
  const { data: fetchedFeatures } = await axios.get("/data/features.json");
  features.value = fetchedFeatures.features;
});


</script>

<template>
    <div class="feature-area section-padding">
 		<div class="container">
 			<div class="row">
 				<div class="col-lg-6 col-md-12 col-sm-12">
 					<div class="section-title">
 						<h6>Features</h6>
 						<h2> We manage & organized Quality <b>Industrial</b> Project</h2>
 					</div>
 					<div class="single-feature-item"
					v-for="feature in features.slice(0,3)" :key="feature.id"
					>
 						<div class="feature-icon">
 							<i :class="feature.icon"></i>
 						</div>
 						<div class="feature-content">
 							<h5>{{ feature.title }}</h5>
 							<p>{{ feature.content }}</p>
 						</div>
 					</div> 					
 				</div>
 				<div class="col-lg-6 col-md-12 col-sm-12">
 					<div class="feature-image">
 						<img src="/assets/img/feature/feature.png" alt="">
 					</div>
 				</div>
 			</div>
 		</div>
 	</div>
</template>