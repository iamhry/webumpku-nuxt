<script setup>

import { onMounted, ref} from 'vue'

import axios from "axios";

const team = ref([]);

onMounted(async () => {
  const { data: fetchedTeam } = await axios.get("/data/team.json");
  team.value = fetchedTeam.team;
});

</script>

<template>
    <div class="team-area gray-bg section-padding">
 		<div class="container">
 			<div class="row justify-content-center">
 				<div class="col-lg-12 ">
 					<div class="section-title text-center">
 						<h6>Our Team</h6>
 						<h2>We are a team of <b>creatives</b> <br>people <b>innovation</b></h2>
 					</div>
 				</div>
 			</div>
 			<div class="row">
 				<div class="col-lg-3 col-md-6 col-sm-6"
				v-for="tm in team.slice(0,4)" :key="tm.id"
				>
 					<div class="single-team-member">
 						<div class="team-member-img">
							<img :src="tm.img" alt="">
						</div>
						<div class="team-content">
							<div class="team-title">
								<a href="#">{{ tm.title }}</a>
							</div>
							<div class="team-subtitle">
								<p>{{ tm.sub_title }}</p>
							</div>
							<ul class="team-social">
								<li><a href="#"><i class="fa fa-facebook-f" aria-hidden="true"></i> </a></li>
								<li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i> </a></li>
								<li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i> </a></li>
							</ul>
						</div>
 					</div>
 				</div>
 			</div>
 		</div>
 	</div>
</template>