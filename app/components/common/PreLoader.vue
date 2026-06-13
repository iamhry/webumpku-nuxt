<script setup>
import { onMounted } from "vue";

onMounted(() => {
    setTimeout(function () {
		$("#loader").fadeOut(200);
	}, 200);

	jQuery(window).on("load", function () {
		jQuery(".site-preloader-wrap, .slide-preloader-wrap").fadeOut(1000);
	});
});

</script>

<template>
<div id="loader">
 		<div class="loading">
 			<div></div>
 		</div>
 	</div>    
</template>