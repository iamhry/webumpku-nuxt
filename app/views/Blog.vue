<script setup>

import { onMounted, ref} from 'vue'

import axios from "axios";

const blogs = ref([]);

onMounted(async () => {
  const { data: fetchedblogs } = await axios.get("/data/blogs.json");
  blogs.value = fetchedblogs.blogs;
});


import {BreadCrumb, HeaderThree, 

} from "../components";


</script>
<template>
    <HeaderThree/>
    <BreadCrumb/>
    <div class="blog-area gray-bg section-padding">
 		<div class="container">
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
 			<div class="row">
 				<div class="col-lg-4 col-md-6 col-sm-12"
				v-for="blog in blogs.slice(0,9)" :key="blog.id"
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
             <div class="row">
                <ul class="pagination d-flex justify-content-center">                                        
                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                    <li class="page-item" aria-current="page"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>                                        
                    <li class="page-item"><a class="page-link" href="#"><i class="las la-angle-right"></i></a></li>                                        
                </ul>
            </div>
 		</div>
 	</div>
</template>

<style scoped>
    .blog-area .section-title {
        display: none;
    }
</style>