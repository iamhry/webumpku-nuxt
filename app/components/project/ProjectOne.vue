<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const projects = ref([]);

onMounted(async () => {
  const { data: fetchedProjects } = await axios.get("/data/projects.json");
  projects.value = fetchedProjects.projects;
});


</script>

<template>
    <div class="project-area section-padding">
 		<div class="container">
 			<div class="offset-lg-2 col-lg-8 text-center">
 				<div class="section-title">
 					<h6>Recent Project</h6>
 					<h2>Brilliant <b>Ideas</b> With
 						<br>Excellent <b>Work </b></h2>
 					<p>Industrial equipment modern technique sit amet, consectetur adipisicing elit. <br> Repellendus laboriosam omnis cum.</p>
 				</div>
 			</div>
 			<div class="row mt-60">
 				<div class="col-lg-4 col-md-6 col-12"
				 v-for="(project, i) in projects" :key="project.id"
				>
 					<div class="single-project-item bg-cover"
					 :class="i === 0 ? 'project-bg' : `project-bg-${i + 1}`"
					>
 						<div class="project-inner">
 							<NuxtLink to="/project-details" class="project-icon">
 								<i class="las la-plus"></i>
 							</NuxtLink>
 							<div class="hover-info">
 								<h6>{{ project.tag }}</h6>
 								<h4>{{ project.title }}</h4>
 							</div>
 						</div>
 					</div>
 				</div>
 			</div>
 		</div>
 	</div>
</template>