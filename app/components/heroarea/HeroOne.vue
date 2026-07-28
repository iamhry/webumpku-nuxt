<script setup lang="ts">
import { onMounted, nextTick, computed, watch } from 'vue'
import { useHeroSliders } from '~/composables/useHeroSliders'
import { useSeoMeta, useI18n } from '#imports'

declare var $: any

const { locale } = useLocale()
const { sliders, loading, fetchHeroSliders } = useHeroSliders()

// Fetch data SSR compatible
await fetchHeroSliders()

const finalSliders = computed(() => {
  if (sliders.value && sliders.value.length > 0) {
    return sliders.value
  }
  return [
    {
      id: 999,
      title: 'Universitas Muhammadiyah PKU',
      subtitle: 'We Build only big things',
      description: 'Industrial Revolution, in modern history, the process of change from an agrarian \nand handicraft economy to one dominated by industry and machine manufacturing.',
      image: '/assets/img/slider/slide-1.jpg',
      button_text: 'Learn More',
      button_url: '/about',
      locale: locale.value
    }
  ]
})

// SEO Integration
if (finalSliders.value.length > 0) {
  const firstSlide = finalSliders.value[0]
  useSeoMeta({
    title: firstSlide.title,
    description: firstSlide.description,
    ogTitle: firstSlide.title,
    ogDescription: firstSlide.description,
    ogImage: firstSlide.image
  })
}

const initCarousel = () => {
	// Re-initialize carousel
	const $carousel = $('.homepage-slides')
	if ($carousel.hasClass('owl-loaded')) {
		$carousel.trigger('destroy.owl.carousel')
		$carousel.removeClass('owl-hidden')
		$carousel.find('.owl-stage-outer').children().unwrap()
	}
$carousel.owlCarousel({
    items: 1,
    dots: false,
    nav: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,      // Sudah pas (5 detik diam)
    autoplayHoverPause: true,   // PENTING: Berhenti berputar saat di-hover mouse
    
    // Perbaikan Kecepatan Transisi
    smartSpeed: 500,            // Diturunkan ke 500ms agar efek fade terasa smooth & responsif
    animateOut: 'fadeOut',      // Efek memudar
    // animateIn: 'fadeIn',     // Opsional: bisa ditambahkan jika ingin efek masuknya juga memudar
    
    navText: ["<i class='la la-angle-left'></i>", "<i class='la la-angle-right'></i>"],
    responsive: {
        0: { items: 1, nav: false, dots: false },
        600: { items: 1, nav: false, dots: false },
        768: { items: 1, nav: false, dots: false },
        1100: { items: 1, nav: true, dots: false }
    }
});

	$carousel.on("translate.owl.carousel", function () {
		$(".single-slide-item h1").removeClass("animated fadeInUp").css("opacity", "1");
		$(".single-slide-item .rs-banner-subtitle").removeClass("animated fadeInDown").css("opacity", "1");
		$(".single-slide-item p").removeClass("animated fadeInDown").css("opacity", "1");
		$(".single-slide-item a.main-btn").removeClass("animated fadeInDown").css("opacity", "1");
	});

	$carousel.on("translated.owl.carousel", function () {
		$(".single-slide-item h1").addClass("animated fadeInUp").css("opacity", "1");
		$(".single-slide-item .rs-banner-subtitle").addClass("animated fadeInDown").css("opacity", "1");
		$(".single-slide-item p").addClass("animated fadeInDown").css("opacity", "1");
		$(".single-slide-item a.main-btn").addClass("animated fadeInDown").css("opacity", "1");
	});
}

onMounted(async () => {     
    await nextTick()
    initCarousel()
});

watch(finalSliders, async () => {
    if (import.meta.client) {
        await nextTick()
        initCarousel()
    }
})

</script>

<template>
	<div v-if="loading" class="homepage-slides">
 		<div class="single-slide-item">
 			<div class="overlay"></div>
 			<div class="hero-area-content">
 				<div class="container content-wide">
 					<div class="row">
 						<div class="col-xxl-7 col-xl-8 col-lg-10 wow fadeInUp animated" data-wow-delay=".2s">
 							<div class="rs-banner-content">
 								<span class="rs-banner-subtitle">
 									<span class="subtitle-text">Loading...</span>
 									<span class="rs-border-line"></span>
 								</span>
 								<h1 class="rs-banner-title main-title text-3xl font-bold leading-tight md:text-7xl md:max-xl:text-5xl">We are leader<br> Industrial Business</h1>
 								<div class="rs-banner-descrip">
 									<p> Industrial Revolution, in modern history, the process of change from an agrarian <br>and handicraft economy to one dominated by industry and machine manufacturing.</p>
 								</div>
 								<div class="rs-banner-btn mt-4">
 									<NuxtLink to="/about" class="main-btn rs-btn has-theme-yellow has-icon has-bg">
 										Learn More
 										<span class="icon-box">
 											<svg class="icon-first" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
 												<path d="M31.71,15.29l-10-10L20.29,6.71,28.59,15H0v2H28.59l-8.29,8.29,1.41,1.41,10-10A1,1,0,0,0,31.71,15.29Z"></path>
 											</svg>
 											<svg class="icon-second" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
 												<path d="M31.71,15.29l-10-10L20.29,6.71,28.59,15H0v2H28.59l-8.29,8.29,1.41,1.41,10-10A1,1,0,0,0,31.71,15.29Z"></path>
 											</svg>
 										</span>
 									</NuxtLink>
 								</div>
 							</div>
 						</div>
 					</div>
 				</div>
 			</div>
 		</div>
	</div>

    <div v-else class="homepage-slides owl-carousel" :key="locale">
 		<div class="single-slide-item" v-for="slide in finalSliders" :key="slide.id" :style="{ backgroundImage: `url(${slide.image})` }">
 			<div class="overlay"></div>
 			<div class="hero-area-content">
 				<div class="container content-wide">
 					<div class="row">
 						<div class="col-xxl-7 col-xl-8 col-lg-10 wow fadeInUp animated" data-wow-delay=".2s">
 							<div class="rs-banner-content">
 								<span class="rs-banner-subtitle">
 									<span class="subtitle-text">{{ slide.subtitle }}</span>
 									<span class="rs-border-line"></span>
 								</span>
 								<h1 class="rs-banner-title main-title text-3xl font-bold leading-tight md:text-7xl md:max-xl:text-5xl" v-html="slide.title ? slide.title.replace(/\n/g, '<br>') : ''"></h1>
 								<div class="rs-banner-descrip">
 									<p v-html="slide.description ? slide.description.replace(/\n/g, '<br>') : ''"></p>
 								</div>
 								<div class="rs-banner-btn mt-4">
 									<NuxtLink :to="slide.button_url" class="main-btn rs-btn has-theme-yellow has-icon has-bg">
 										{{ slide.button_text }}
 										<span class="icon-box">
 											<svg class="icon-first" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
 												<path d="M31.71,15.29l-10-10L20.29,6.71,28.59,15H0v2H28.59l-8.29,8.29,1.41,1.41,10-10A1,1,0,0,0,31.71,15.29Z"></path>
 											</svg>
 											<svg class="icon-second" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
 												<path d="M31.71,15.29l-10-10L20.29,6.71,28.59,15H0v2H28.59l-8.29,8.29,1.41,1.41,10-10A1,1,0,0,0,31.71,15.29Z"></path>
 											</svg>
 										</span>
 									</NuxtLink>
 								</div>
 							</div>
 						</div>
 					</div>
 				</div>
 			</div>
 		</div>
 	</div>
</template>

<style scoped>
.rs-banner-content {
  color: #fff;
}
.rs-banner-subtitle {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 20px;
  letter-spacing: 2px;
}
.rs-border-line {
  width: 60px;
  height: 2px;
  background: var(--brand-accent);
  display: inline-block;
}
.rs-banner-title {
  margin-bottom: 20px;
  background: none !important;
  -webkit-text-fill-color: #fff !important;
  color: #fff !important;
}
.rs-banner-descrip p {
  margin-bottom: 30px;
  font-size: 18px;
  line-height: 1.6;
}
.rs-banner-btn .rs-btn {
  gap: 12px;
}
.icon-box {
  position: relative;
  width: 14px;
  height: 14px;
  display: inline-flex;
  overflow: hidden;
}
.icon-first, .icon-second {
  width: 14px;
  height: 14px;
  fill: currentColor;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
}
.icon-second {
  transform: translateX(-100%);
}
.rs-btn:hover .icon-first {
  transform: translateX(100%);
}
.rs-btn:hover .icon-second {
  transform: translateX(0);
}
</style>