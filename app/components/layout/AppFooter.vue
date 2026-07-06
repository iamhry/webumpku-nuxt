<script setup>
import { useSettings } from '~/composables/useSettings'
import { useMenus } from '~/composables/useMenus'
import FooterMenuColumn from '~/components/footer/FooterMenuColumn.vue'

const { settings, fetchSettings } = useSettings()
const { footerMenus, fetchFooterMenus, isLoadingFooter } = useMenus()

await Promise.all([
  fetchSettings(),
  fetchFooterMenus()
])

// Helpers to get specific groups
const mainLinksGroup = computed(() => footerMenus.value?.find(g => g.section === 'main_links'))
const servicesGroup = computed(() => footerMenus.value?.find(g => g.section === 'services'))
const unitsGroup = computed(() => footerMenus.value?.find(g => g.section === 'units'))
</script>

<template>
    <footer class="footer-area" style="background-color: #0a182c;">
 		<div class="container content-wide">
 			<div class="footer-up">
 				<div class="row gy-5">
 					<div class="col-lg-3 col-md-6 col-sm-12">
 						<div class="logo">
 							<img :src="settings.logo_white || settings.logo || '/assets/img/logo-white.png'" :alt="settings.site_name || 'Universitas'">
 						</div>
 						<p class="mb-3">{{ settings.site_description || 'Website resmi Universitas' }}</p>
                        <p v-if="settings.address"><i class="las la-map-marker"></i> {{ settings.address }}</p>
                        <p v-if="settings.email"><i class="las la-envelope"></i> {{ settings.email }}</p>
                        <p v-if="settings.phone"><i class="las la-phone"></i> {{ settings.phone }}</p>
 						<div class="social-area mt-4">
 							<a v-if="settings.facebook" :href="settings.facebook"><i class="lab la-facebook-f"></i></a>
 							<a v-if="settings.instagram" :href="settings.instagram"><i class="lab la-instagram"></i></a>
 							<a v-if="settings.youtube" :href="settings.youtube"><i class="lab la-youtube"></i></a>
 							<a v-if="settings.linkedin" :href="settings.linkedin"><i class="lab la-linkedin"></i></a>
 						</div>
 					</div>
                    
 					<div class="col-lg-2 offset-lg-1 col-md-6 com-sm-12">
                        <FooterMenuColumn v-if="mainLinksGroup" :group="mainLinksGroup" />
                        <div v-else class="footer-widget">
 						    <h5>Tautan Utama</h5>
                            <ul><li><NuxtLink to="/">Beranda</NuxtLink></li></ul>
                        </div>
 					</div>
                    
 					<div class="col-lg-3 col-md-6 col-sm-12">
                        <FooterMenuColumn v-if="servicesGroup" :group="servicesGroup" />
                        <div v-else class="footer-widget">
 						    <h5>Layanan</h5>
                            <ul><li><NuxtLink to="/services">Layanan Kami</NuxtLink></li></ul>
                        </div>
 					</div>
                    
 					<div class="col-lg-3 col-md-6 col-sm-12">
                        <FooterMenuColumn v-if="unitsGroup" :group="unitsGroup" />
                        <div v-else class="footer-widget">
 						    <h5>Unit Kerja</h5>
                            <ul><li><NuxtLink to="/about">Tentang Kami</NuxtLink></li></ul>
                        </div>
 					</div>
 				</div>
 			</div>
 		</div>
        <div class="footer-bottom">
            <div class="container content-wide">
                <div class="row justify-content-center align-items-center">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <p class="copyright-line">© {{ new Date().getFullYear() }} {{ settings.site_name || 'Universitas' }}. All rights reserved.</p>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <p class="privacy">Privacy Policy | Terms &amp; Conditions</p>
                    </div>
                </div>
            </div>
        </div>
 	</footer>
</template>