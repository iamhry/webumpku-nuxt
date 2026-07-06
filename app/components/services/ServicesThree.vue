<script setup>

import { onMounted, ref } from 'vue'

import axios from "axios";

const services = ref([]);

onMounted(async () => {
  const { data: fetchedServices } = await axios.get("/data/services_three.json");
  services.value = fetchedServices.services;
});

</script>

<template>
    <div id="service-3" class="services-area section-padding">
 		<div class="container content-wide">
 			<div class="row">
 				<div class="offset-lg-2 col-lg-8 text-center">
 					<div class="section-title">
 						<h6>What We do</h6>
 						<h2>We offer <b>perfect real</b> <br>industrial service</h2>
 						<p>We can service all of constuction sites from starting to ending,<br>wall pluster, lift and glass fitting, doors and window installation.</p>
 					</div>
 				</div>
 			</div>
 			<div class="row mt-30">
 				<div class="col-lg-6 col-md-6 col-sm-12"
				v-for="(service,i) in services.slice(0,4)" :key="service.id"
				>
 					<div class="single-service-wrapper">
 						<div class="row gx-0">
 							<div class="col-lg-6">
 								<div 
								class="single-service-bg bg-cover"
								:class="i === 0 ? 'service-bg-1' : `service-bg-${i + 1}`"
								>
 								</div>

 							</div>
 							<div class="col-lg-6">
 								<div class="single-service-area">
 									<div class="service-icon">
 										<i :class="service.icon"></i>
 									</div>
 									<h5>{{ service.title }}</h5>
 									<p>{{ service.content }}</p>
 									<NuxtLink to="/service-details" class="read-more">Read More</NuxtLink>
 								</div>
 							</div>
 						</div>
 					</div>
 				</div>
 				
 			</div>
 		</div>
 	</div>
</template>