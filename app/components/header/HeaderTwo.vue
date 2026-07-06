<script setup>

import { onMounted } from 'vue'
import { useSettings } from '~/composables/useSettings'
import MainMenu from '~/components/navigation/MainMenu.vue'
import MobileMenu from '~/components/navigation/MobileMenu.vue'

const { settings } = useSettings()

onMounted(() => {     
    
	$(".navbar-toggler").on("click", function () {
		$(this).toggleClass("active");
	});

	// Menu sub-nav toggler logic has been moved to Vue components (MenuItem.vue)

	$('.sticky-area').sticky({
		topSpacing: 0,
	});
  
});

</script>

<template>
    <header id="header-2" class="header-area">
 		<div class="container">
 			<div class="row align-items-center">
 				<div class="col-lg-3">
 					<div class="logo"> 						
						 <NuxtLink class="navbar-brand" to="/"><img :src="settings.logo || '/assets/img/logo.png'" :alt="settings.site_name || 'Universitas'"></NuxtLink>
 					</div>
 				</div>
 				<div class="col-lg-9 text-end">
 					<div id="header-aside">
 						<div class="aside-content">
 							<div class="inner">
 								<div class="info-one">
 									<div class="info-wrap">
 										<div class="info-i"><span><i class="las la-clock"></i></span></div>
 										<div class="info-c">Monday-Friday<br><span>08.00-20.00</span></div>
 									</div>
 								</div>
 								<div class="info-two">
 									<div class="info-wrap">
 										<div class="info-i"><span><i class="las la-map-marker"></i></span></div>
 										<div class="info-c">New York, USA<br><span>66, Broklyn St.</span></div>
 									</div>
 								</div>
 								<div class="info-three">
 									<div class="info-wrap">
 										<div class="info-i"><span><i class="las la-mobile"></i></span></div>
 										<div class="info-c">{{ settings.phone || '(+1)212-946-2064' }}<br><span>{{ settings.email || 'info@dustrian.com' }}</span></div>
 									</div>
 								</div>
 							</div>
 						</div>
 					</div>
 				</div>
 			</div>
 		</div>
 		<div class="container-fluid">
 			<div class="sticky-area">
 				<div class="navigation">
 					<div class="row">
 						<div class="col-lg-8">
							<div class="main-menu">
 								<nav class="navbar navbar-expand-lg">
 									<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
 										<span class="navbar-toggler-icon"></span>
 										<span class="navbar-toggler-icon"></span>
 										<span class="navbar-toggler-icon"></span>
 									</button>

 									<div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
 										<!-- Render Dynamic Menu from API -->
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
 						<div class="col-lg-4 text-center">
 							<div class="header-right-content">
 								<NuxtLink to="/contact"class="header-btn main-btn">Get a Quote</NuxtLink>
 							</div>
 						</div>
 						<!-- Responsive Logo-->
 						<div class="col-md-4 col-sm-4">
 							<div class="responsive-logo">
 								<img :src="settings.logo || '/assets/img/logo.png'" :alt="settings.site_name || 'Universitas'">
 							</div>
 						</div>
 					</div>
 				</div>
 			</div>
 		</div>
 	</header>
</template>