<script setup>

import { onMounted, ref} from 'vue'

import axios from "axios";

const services = ref([]);

onMounted(async () => {
  const { data: fetchedServices } = await axios.get("/data/services.json");
  services.value = fetchedServices.services;
});


import {BreadCrumb, HeaderThree, FeatureOne, ServicesTwo, CTAOne,

} from "../components";

</script>

<template>
    <HeaderThree/>
    <BreadCrumb/>
	<!-- Service # 01  -->
    <div class="services-area gray-bg section-padding pad-bot-90">
 		<div class="container"> 			
 			<div class="row">
 				<div class="col-lg-4 col-md-6 col-sm-12"
				v-for="service in services.slice(0,6)" :key="service.id"
				>
 					<div class="single-service-area mb-30">
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
    <FeatureOne/>
    <ServicesTwo/>
    <CTAOne/>
    
</template>

<style scoped>
    #service-2 {
        background: #f6f6f6;
    }	
</style>