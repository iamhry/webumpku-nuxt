<script setup>

import { onMounted } from 'vue'

onMounted(() => {     
    $('.port-menu li').on('click', function () {
		var selector = $(this).attr('data-filter');

		$('.port-menu li').removeClass("active");

		$(this).addClass("active");

		$(".portfolio-list").isotope({
			filter: selector,
			percentPosition: true,
		});

	});
  
});

</script>


<template>
    <div class="portfolio-area port-2 section-padding">
 		<div class="container">
 			<div class="row justify-content-center">
 				<div class="col-lg-7">
 					<div class="section-title text-center">
 						<h6>Featured Project</h6>
 						<h2><b>Quality Work</b> for Client</h2>
 						<p>We are proud to show you our latest projects. You will find a diverse gallery of developments, remoding, additions and new constructions</p>
 					</div>
 					<ul class="port-menu recent">
 						<li data-filter="*" class="active">All</li>
 						<li data-filter=".construction">Construction</li>
 						<li data-filter=".civil">Civil</li>
 						<li data-filter=".mechanical">Mechanical</li>
 						<li data-filter=".petroleum">Petroleum</li>
 					</ul>
 				</div>
 			</div>
 		</div>
 		<div class="container">
 			<div class="row">
 				<div class="col-lg-12">
 					<div class="portfolio-list recent">
 						<div class="single-portfolio-item port-bg-1 construction mechanical">
 							<div class="details">
 								<div class="info">
 									<h5><a href="#">Construction</a></h5>
 									<NuxtLink to="/project-details">View details <i class="las la-arrow-right"></i></NuxtLink>
 								</div>
 							</div>
 						</div>
 						<div class="single-portfolio-item port-bg-2 mechanical civil">
 							<div class="details">
 								<div class="info">
 									<h5><a href="#">Civil Work</a></h5>
 									<NuxtLink to="/project-details">View details <i class="las la-arrow-right"></i></NuxtLink>
 								</div>
 							</div>
 						</div>
 						<div class="single-portfolio-item port-bg-3 construction petroleum">
 							<div class="details">
 								<div class="info">
 									<h5><a href="#">Mechanical</a></h5>
 									<NuxtLink to="/project-details">View details <i class="las la-arrow-right"></i></NuxtLink>
 								</div>
 							</div>
 						</div>
 						<div class="single-portfolio-item port-bg-4 mechanical petroleum civil">
 							<div class="details">
 								<div class="info">
 									<h5><a href="#">Oil & Petroleum</a></h5>
 									<NuxtLink to="/project-details">View details <i class="las la-arrow-right"></i></NuxtLink>
 								</div>
 							</div>
 						</div>
 						<div class="single-portfolio-item port-bg-5 construction civil">
 							<div class="details">
 								<div class="info">
 									<h5><a href="#">Welding Process</a></h5>
 									<NuxtLink to="/project-details">View details <i class="las la-arrow-right"></i></NuxtLink>
 								</div>
 							</div>
 						</div>
 						<div class="single-portfolio-item port-bg-6 mechanical">
 							<div class="details">
 								<div class="info">
 									<h5><a href="#">Building Renovation</a></h5>
 									<NuxtLink to="/project-details">View details <i class="las la-arrow-right"></i></NuxtLink>
 								</div>
 							</div>
 						</div>
 						<div class="single-portfolio-item port-bg-7 construction petroleum">
 							<div class="details">
 								<div class="info">
 									<h5><a href="#">Interior Design</a></h5>
 									<NuxtLink to="/project-details">View details <i class="las la-arrow-right"></i></NuxtLink>
 								</div>
 							</div>
 						</div>
 						<div class="single-portfolio-item port-bg-8 mechanical petroleum">
 							<div class="details">
 								<div class="info">
 									<h5><a href="#">Architechture</a></h5>
 									<NuxtLink to="/project-details">View details <i class="las la-arrow-right"></i></NuxtLink>
 								</div>
 							</div>
 						</div>
 					</div>
 				</div>
 			</div>
 			<div class="row">
 				<div class="col-lg-12 text-center mt-30">
 					<div class="load-more-btn">
 						<div class="main-btn">Load More</div>
 					</div>
 				</div>
 			</div>
 		</div>
 	</div>
</template>