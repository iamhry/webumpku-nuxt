<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const currentPageTitle = computed(() => {
  let currentPath = "";
  switch (route.name) {
      case "about":
      currentPath = "About Us";
      break;   
      case "choose-us":
      currentPath = "Choose Us";
      break;         
      case "team":
      currentPath = "Our Team";
      break;   
      case "price":
      currentPath = "Pricing Plan";
      break;   
      case "faq":
      currentPath = "FAQ";
      break;  
      case "service-1":
      currentPath = "Service - 01";
      break; 
      case "service-2":
      currentPath = "Service - 02";
      break;        
      case "service-details":
      currentPath = "Service Details";
      break;   
      case "project":
      currentPath = "Project";
      break;   
      case "project-details":
      currentPath = "Project Details";
      break;   
      case "blog":
      currentPath = "Blog";
      break;   
      case "blog-details":
      currentPath = "Blog Details";
      break;   
      case "contact":
      currentPath = "Contact";
      break;   
      default:
      currentPath = route.name;
      break;
  }

  return currentPath;
});
</script>

<template>

    <div class="breadcroumb-area bread-bg">
 		<div class="container">
 			<div class="row">
 				<div class="col-lg-12">
 					<div class="breadcroumb-title text-center">
                        <h1>{{ currentPageTitle }}</h1>
 						<h6><NuxtLink to="/">Home</NuxtLink> / {{ currentPageTitle }}</h6>
 					</div>
 				</div>
 			</div>
 		</div>
 	</div>

</template>
