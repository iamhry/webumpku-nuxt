<script setup>

import { onMounted, ref } from 'vue'

import axios from "axios";

const services = ref([]);

onMounted(async () => {
  const { data: fetchedServices } = await axios.get("/data/services_two.json");
  services.value = fetchedServices.services;
});


</script>

<template>
    <div id="service-2" class="services-area section-padding">
 		<div class="container">
 			<div class="row">
 				<div class="offset-lg-2 col-lg-8 text-center">
 					<div class="section-title">
 						<h6>Our Services</h6>
 						<h2>We Provide Best<b><br>Industrial Services</b></h2>
 						<p>Industrial equipment modern technique sit amet, consectetur adipisicing elit. <br> Repellendus laboriosam omnis cum.</p>
 					</div>
 				</div>
 			</div>

 			<div class="row">
 				<div class="col-lg-4 col-md-6 col-sm-12"
				 v-for="(service,i) in services.slice(0,6)" :key="service.id"
				>
 					<div class="single-service">
 						<div 
						class="service-bg bg-cover"
						:class="i === 0 ? 'bg-1' : `bg-${i + 1}`"
						>
 						</div>
 						<div class="service-content">
 							<h3>{{ service.title }}</h3>
 							<NuxtLink to="/service-details" class="read-more">Read More</NuxtLink>
 						</div>
 					</div>
 				</div> 				
 			</div>
 		</div>
 	</div>
</template>