<script setup lang="ts">
import { computed } from 'vue'
import { useSettings } from '~/composables/useSettings'
import type { HomepageSection } from '~/types/homepage'

const props = defineProps<{
  section?: HomepageSection
}>()

const { settings } = useSettings()

const backgroundStyle = computed(() => {
  if (props.section && props.section.image) {
    return { backgroundImage: `url(${props.section.image})` }
  }
  return {}
})
</script>

<template>
    <div class="cta-area" :style="backgroundStyle">
 		<div class="overlay"></div>
 		<div class="container">
 			<div class="row align-items-center gy-3">
 				<div class="col-lg-5 col-md-5 col-12">
 					<h2>{{ section?.title || "Let's Get Your Project Started Today!" }}</h2>
 				</div>
 				<div class="col-lg-6 offset-lg-1 col-md-6 offset-md-1 col-12">
 					<div class="contact-info">
 						<div class="row">
 							<div class="col-lg-6">
 								<div class="call">
 									<i class="las la-phone"></i>
 									<h5>Call Us</h5>
 									<p>{{ settings?.phone || '+25847618' }}</p>
 								</div>
 							</div>
 							<div class="col-lg-6">
 								<div class="mail">
 									<i class="las la-envelope"></i>
 									<h5>E-mail</h5>
 									<p>{{ settings?.email || 'info@umpku.ac.id' }}</p>
 								</div>
 							</div>
 						</div>
 					</div>
 				</div>
 			</div>
 		</div>
 	</div>
</template>