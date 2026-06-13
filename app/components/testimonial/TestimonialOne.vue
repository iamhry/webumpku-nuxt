<script setup>

import { onMounted, onUpdated, ref } from "vue";
import axios from "axios";

const testimonials = ref([]);

onMounted(async () => {
  const { data: fetchedTestimonials } = await axios.get("/data/testimonials.json");
  testimonials.value = fetchedTestimonials.testimonials;
});

onUpdated(() => {     

    $('.testimonial-carousel').owlCarousel({
		items: 1,
		margin: 30,
		dots: true,
		nav: false,
		loop: true,
		autoplay: true,
		responsiveClass: true,
		responsive: {
			575: {
				items: 1,
				nav: false,
				dots: false,
			},

			767: {
				items: 2,
				nav: false
			},

			990: {
				items: 2,
				loop: true,

			},
			1200: {
				items: 3,
				dots: true,
				loop: true,
			}
		}
	});

  
});

</script>


<template>
    <div class="testimonial-area gray-bg section-padding">
 		<div class="capricorn-testimonial">
 			<div class="container">
 				<div class="row">
 					<div class="col-lg-12 text-center ">
 						<div class="section-title">
 							<h6>Testimonial</h6>
 							<h2>Happy <b> Client </b>Says <br>About Us</h2>
 						</div>
 					</div>
 				</div>

 				<div class="row">
 					<div class="col-lg-12">
 						<div class="testimonial-carousel owl-carousel">
 							<div class="single-team-item"
							v-for="t in testimonials.slice(0,3)" :key="t.id"
							>
 								<div class="testimonial-icon"><i class="las la-quote-left"></i></div>
 								<p>{{ t.content }}</p>
 								<div class="testimonial-author">
									<div class="testimonial-img">
										<img :src="t.author_img" alt="">
									</div>
									<div class="author-info">
										<h5>{{ t.author_name }}</h5><span>{{ t.author_designation}}</span>
									</div>
								</div>
 							</div> 							
 						</div>
 					</div>
 				</div>
 			</div>
 		</div>
 	</div>
</template>