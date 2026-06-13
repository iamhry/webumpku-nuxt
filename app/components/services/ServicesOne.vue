<script setup>

import { onMounted, ref, onUpdated } from 'vue'

import axios from "axios";

const services = ref([]);

onMounted(async () => {
  const { data: fetchedServices } = await axios.get("/data/services.json");
  services.value = fetchedServices.services;
});

onUpdated(() => {     

		// Service Slider    
        $(".service-slider").owlCarousel({
		loop: true,
		items: 3,
		dots: true,
		nav: false,
		smartSpeed: 1000,
		autoHeight: false,
		touchDrag: true,
		mouseDrag: true,
		margin: 30,
		autoplay: true,
		slideSpeed: 600,
		responsive: {
			0: {
				items: 1,
				nav: false,
				dots: false,
			},
			600: {
				items: 2,
				nav: false,
				dots: false,
			},
			768: {
				items: 2,
				nav: false,
				dots: false,
			},
			1100: {
				items: 3,
				nav: false,
				dots: true,
			}
		}
	});
  
});

</script>

<template>
    <div class="services-area gray-bg section-padding pad-bot-90">
 		<div class="container">
 			<div class="row">
 				<div class="offset-lg-2 col-lg-8 text-center">
 					<div class="section-title">
 						<h6>Services</h6>
 						<h2>Providing the Best Global <b>Industry Services</b></h2>
 					</div>
 				</div>
 			</div>

 			<div class="row mt-30">
 				<div class="col-lg-12">
 					<div class="service-slider owl-carousel">
 						<div class="single-service-area"
						v-for="service in services.slice(0,6)" :key="service.id"
						>
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
</template>