<script setup>

import { onMounted } from 'vue'
import MainMenu from '~/components/navigation/MainMenu.vue'
import MobileMenu from '~/components/navigation/MobileMenu.vue'

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
 										<!-- Desktop Menu -->
 										<div class="d-none d-lg-block w-100">
 											<MainMenu />
 										</div>
 										<!-- Mobile Accordion Menu -->
 										<div class="d-block d-lg-none w-100 mt-3">
 											<MobileMenu />
 										</div>

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