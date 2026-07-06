<script setup>

import { onMounted, ref} from 'vue'

import axios from "axios";

const blogs = ref([]);

onMounted(async () => {
  const { data: fetchedblogs } = await axios.get("/data/blogs.json");
  blogs.value = fetchedblogs.blogs;
});

</script>

<template>
    <div class="blog-area gray-bg section-padding">
 		<div class="container content-wide">
 			<div class="row">
 				<div class="col-lg-6 col-md-12 col-12">
 					<div class="section-title">
 						<h6>Blog</h6>
 						<h2>What <b>happen</b> inside our <b>company</b></h2>
 					</div>
 				</div>

 				<div class="col-lg-6 text-end">

 				</div>
 			</div>
 			<div class="row mt-30">
 				<div class="col-lg-4 col-md-6 col-sm-12"
				v-for="blog in blogs.slice(0,3)" :key="blog.id"
				>
 					<div class="single-blog-item">
 						<div class="blog-bg">
 							<img :src="blog.bg" alt="blog-bg">
 							<span class="blog-date">{{ blog.date }}</span>
 						</div>
 						<div class="blog-content">
 							<p class="blog-meta">{{ blog.tag }}</p>
 							<h5><NuxtLink to="/blog-details">{{ blog.title }}</NuxtLink></h5>
 							<p>{{ blog.content }}</p>
 							<NuxtLink to="/blog-details" class="read-more">Read More</NuxtLink>
 						</div>

 					</div>
 				</div>
 				
 			</div>
 		</div>
 	</div>
</template>