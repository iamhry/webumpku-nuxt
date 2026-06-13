<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const projects = ref([]);

onMounted(async () => {
  const { data: fetchedProjects } = await axios.get("/data/projects_two.json");
  projects.value = fetchedProjects.projects;
});


</script>
<template>
    <div class="featured-project-area">
 		<div class="content-area">
 			<div class="project-grids bg-cover clearfix">
 				<div class="overlay"></div>
 				<div class="grid"
				v-for="project in projects.slice(0,4)" :key="project.id"
				>
 					<div class="inner">
 						<span class="count">{{ project.number }}</span>
 						<h3>{{project.title}}</h3>
 						<p>{{ project.content }}</p>
 						<a href="#" class="main-btn">Read More</a>
 					</div>
 				</div> 				
 			</div>
 		</div>
 	</div>
</template>