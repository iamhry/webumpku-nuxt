<script setup>

import { onMounted } from 'vue'

onMounted(() => {     
    
	$(".navbar-toggler").on("click", function () {
		$(this).toggleClass("active");
	});

	$(".navbar-nav li a").on("click", function () {
		$(".sub-nav-toggler").removeClass("active");
	});

	var subMenu = $(".navbar-nav .sub-menu");

	if (subMenu.length) {
		subMenu
			.parent("li")
			.children("a")
			.append(function () {
				return '<button class="sub-nav-toggler"> <i class="fa fa-angle-down"></i> </button>';
			});

		var subMenuToggler = $(".navbar-nav .sub-nav-toggler");

		subMenuToggler.on("click", function () {
			$(this).parent().parent().children(".sub-menu").slideToggle();
			return false;
		});
	}

	$('.sticky-area').sticky({
		topSpacing: 0,
	});
  
});

</script>

<template>
    <header id="header-3" class="header-area absolate-header">
 		<div class="sticky-area">
 			<div class="navigation">
 				<div class="container">
 					<div class="row align-items-center">
 						<div class="col-lg-3">
 							<div class="logo"> 								
								 <NuxtLink class="navbar-brand" to="/"><img src="/assets/img/logo-white.png" alt=""></NuxtLink>
 							</div>
 						</div>
 						<div class="col-lg-6">
							<div class="main-menu">
 								<nav class="navbar navbar-expand-lg">
 									<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
 										<span class="navbar-toggler-icon"></span>
 										<span class="navbar-toggler-icon"></span>
 										<span class="navbar-toggler-icon"></span>
 									</button>

 									<div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
 										<ul class="navbar-nav m-auto">
 											<li class="nav-item">
 												<a class="nav-link active" href="#">Home
 													<span class="sub-nav-toggler">
 													</span>
 												</a>
 												<ul class="sub-menu">
 													<li><NuxtLink to="/">Home-Main</NuxtLink></li>
 													<li><NuxtLink to="/">Home-Industry</NuxtLink></li>
 													<li><NuxtLink to="/">Home-Construction</NuxtLink></li>
 												</ul>
 											</li>

 											<li class="nav-item">
 												<a class="nav-link" href="#">Pages
 													<span class="sub-nav-toggler">
 													</span>
 												</a>
 												<ul class="sub-menu">
 													<li><NuxtLink to="/about">About us</NuxtLink></li>
 													<li><NuxtLink to="/choose-us">Why Choose Us</NuxtLink></li>
 													<li><NuxtLink to="/team">Our Team</NuxtLink></li>
 													<li><NuxtLink to="/price">Pricing</NuxtLink></li>
 													<li><NuxtLink to="/faq">FAQ</NuxtLink></li>
 												</ul>
 											</li>
 											<li class="nav-item">
 												<a class="nav-link" href="#">Services
 													<span class="sub-nav-toggler">
 													</span>
 												</a>
 												<ul class="sub-menu">
 													<li><NuxtLink to="/service-1">Services-01</NuxtLink></li>
 													<li><NuxtLink to="/service-2">Services-02</NuxtLink></li>
 													<li><NuxtLink to="/service-details">Service Details</NuxtLink></li>
 												</ul>

 											</li>

 											<li class="nav-item">
 												<a class="nav-link" href="#">Projects
 													<span class="sub-nav-toggler">
 													</span>
 												</a>
 												<ul class="sub-menu">
 													<li><NuxtLink to="/project">Projects</NuxtLink></li>
 													<li><NuxtLink to="/project-details">Project Details</NuxtLink></li>
 												</ul>
 											</li>

 											<li class="nav-item">
 												<a class="nav-link" href="#">Blog
 													<span class="sub-nav-toggler">
 													</span>
 												</a>
 												<ul class="sub-menu">
 													<li><NuxtLink to="/blog">Blog</NuxtLink></li>
 													<li><NuxtLink to="/blog-details">Blog Details</NuxtLink></li>
 												</ul>
 											</li>
 											<li class="nav-item">
 												<NuxtLink class="nav-link" to="/contact">Contact</NuxtLink>
 											</li>
 										</ul>

 									</div>
 								</nav>
 							</div>
 						</div>
 						<div class="col-lg-3 text-end">
 							<div class="header-right-content">
 								<NuxtLink to="/contact" class="header-btn main-btn">Get a Quote</NuxtLink>
 							</div>
 						</div>
 					</div>
 				</div>
 			</div>
 		</div>
 	</header>
</template>