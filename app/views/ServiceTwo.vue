<script setup>

import { onMounted, ref } from 'vue'

import axios from "axios";

const services = ref([]);

onMounted(async () => {
  const { data: fetchedServices } = await axios.get("/data/services_three.json");
  services.value = fetchedServices.services;
});

import {BreadCrumb, CTAOne, ChooseOne, CounterOne, HeaderThree, PriceSection, ProjectThree, ServicesThree, 

} from "../components";


</script>
<template>
    <HeaderThree/>
    <BreadCrumb/>
    <!-- Service # 03 -->
    <div id="service-3" class="services-area section-padding">
 		<div class="container"> 			
 			<div class="row">
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
    <CounterOne/>
    <ProjectThree/>
    <ChooseOne/>
    <PriceSection/>
    <CTAOne/>
</template>

