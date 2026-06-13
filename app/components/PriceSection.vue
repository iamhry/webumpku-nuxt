<script setup>

import { onMounted, ref } from "vue";
import axios from "axios";

const prices = ref([]);

onMounted(async () => {
  const { data: fetchedPrices } = await axios.get("/data/prices.json");
  prices.value = fetchedPrices.prices;
});

</script>

<template>
    <div class="pricing-section section-padding">
 		<div class="container">
 			<div class="row justify-content-center">
 				<div class="col-lg-12">
 					<div class="section-title text-center">
 						<h6>Pricing</h6>
 						<h2>Choose Your <b>Affordable <br>Package</b></h2>
 					</div>
 				</div>
 			</div>
 			<div class="row">
 				<div class="col-lg-4 col-md-6"
				 v-for="price in prices.slice(0,3)" :key="price.id"
				>
 					<div class="single-price-item wow fadeInLeft" data-wow-delay=".3s">
 						<h5>{{ price.title }}</h5>
 						<div class="price-box">
 							<p><b>{{ price.amount }}</b>/Sq Feet</p>
 							<h6>{{ price.content }}</h6>
 						</div>
 						<div class="price-list">
 							<ul>
 								<li v-for="feat in price.feature" :key="feat.id"><i class="las la-check"></i>{{ feat }}</li>
 								
 							</ul>
 						</div>
 						<a href="#" class="main-btn small-btn">Choose Plan</a>
 					</div>
 				</div> 			
 			</div>
 		</div>
 	</div>
</template>