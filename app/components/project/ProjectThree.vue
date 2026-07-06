<script setup>

import { onMounted, ref, onUpdated } from "vue";
import axios from "axios";

const projects = ref([]);

onMounted(async () => {
  const { data: fetchedProjects } = await axios.get("/data/projects_three.json");
  projects.value = fetchedProjects.projects;
});

onUpdated(() => {     
	$(".project-slider").owlCarousel({
		loop: true,
		items: 1,
		dots: true,
		nav: false,
		smartSpeed: 3000,
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
				items: 1,
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
    <div id="project-3" class="project-area section-padding">
 		<div class="container content-wide">
 			<div class="row">
 				<div class="col-lg-7">
 					<div class="section-title">
 						<h6>We Build the Dream Project</h6>
 						<h2>We provide you the <b>Highest Quality</b> Work</h2>
 					</div>
 				</div>
 			</div>
 			<div class="row mt-40">
				<div class="project-slider owl-carousel"> 							
				<div 
				v-for="(project, i) in projects.slice(0,6)" :key="project.id"
				class="single-project-item bg-cover"
				:class="i === 0 ? 'project-bg' : `project-bg-${i + 1}`"
				>
					<div class="project-inner">
						<div class="hover-info">
							<h4>{{ project.title }}</h4>
							<p>{{ project.content }}</p>
							<NuxtLink to="/project-details">Read More</NuxtLink>
						</div>
					</div>
				</div> 				
 			</div>
			</div>
 		</div>
 	</div>
</template>