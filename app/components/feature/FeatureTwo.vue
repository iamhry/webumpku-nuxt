<script setup>

import { onMounted, ref} from 'vue'

import axios from "axios";

const features = ref([]);

onMounted(async () => {
  const { data: fetchedFeatures } = await axios.get("/data/features_two.json");
  features.value = fetchedFeatures.features;
});

</script>

<template>
    <div class="feat-area gray-bg pad-bot-50">
 		<div class="container">
 			<div class="row">
 				<div class="col-lg-4 col-md-4 col-sm-12"
				v-for="(feat,i) in features.slice(0,3)" :key="feat.id"
				>
 					<div 
					class="single-feat-item bg-cover"
					:class="i === 0 ? 'feat-bg' : `feat-bg-${i + 1}`"
					>
 						<div class="feat-content">
 							<h5>{{ feat.title }}</h5>
 						</div>
 					</div>
 				</div>
 			</div>
 		</div>
 	</div>
</template>