<script setup>

import { onMounted, ref} from 'vue'

import axios from "axios";

const contact = ref([]);

onMounted(async () => {
  const { data: fetchedContact } = await axios.get("/data/contact.json");
  contact.value = fetchedContact.contact;
});

</script>

<template>
    <div class="contact-section bg-cover section-padding">
 		<div class="container">
 			<div class="row">
 				<div class="col-lg-6 col-md-12 col-12 wow fadeInLeft">
 					<div class="contact-info">
 						<div class="section-title">
 							<h6>Contact Us</h6>
 							<h2>Get in <b>Touch</b></h2>
 						</div>
 						<p>If you have a contact Lorem ipsum dolor sit amet cum maiores, excepturi fuga, est doloremque praesentium!</p>
 						<div class="contact-content">
 							<div class="contact-inner"
							v-for="ct in contact.slice(0,3)" :key="ct.id"
							>
 								<i :class="ct.icon"></i>
 								<h6>{{ ct.title }}</h6>
 								<p>{{ ct.content }}</p>
 							</div> 							
 						</div>
 					</div>
 				</div>
 				<div class="col-lg-6 col-md-12 col-12 wow fadeInRight">
 					<div class="contact-form">
 						<form>
 							<div class="row">
 								<div class="col-lg-6 col-md-6 col-12">
 									<input type="text" placeholder="Your Name">
 								</div>
 								<div class="col-lg-6 col-md-6 col-12">
 									<input type="email" placeholder="E-mail">
 								</div>
 								<div class="col-lg-6 col-md-6 col-12">
 									<input type="tel" placeholder="Phone Number">
 								</div>
 								<div class="col-lg-6 col-md-6 col-12">
 									<input type="text" placeholder="Subject">
 								</div>
 								<div class="col-lg-12">
 									<textarea name="message" id="message" cols="30" rows="10" placeholder="Write Message"></textarea>
 								</div>
 								<div class="col-lg-6 col-md-6 col-12">
 									<button class="main-btn">Submit</button>
 								</div>
 							</div>
 						</form>
 					</div>
 				</div>
 			</div>
 		</div>
 	</div>
</template>