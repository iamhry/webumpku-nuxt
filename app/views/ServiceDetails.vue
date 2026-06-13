<script setup>

import {BreadCrumb, HeaderThree, 


} from "../components";


</script>
<template>
    <HeaderThree/>
    <BreadCrumb/>
    <div class="service-details-section section-padding">
 		<div class="container">
 			<div class="row">
 				<div class="col-lg-4">
 					<div class="service-list">
 						<h5>Service Lists</h5>
 						<a href="#">Construction<span><i class="las la-arrow-right"></i></span></a>
 						<a href="#">Residential Building<span><i class="las la-arrow-right"></i></span></a>
 						<a class="active" href="#">Maintenance & Repairs<span><i class="las la-arrow-right"></i></span></a>
 						<a href="#">Oil and Gas Refinery <span><i class="las la-arrow-right"></i></span></a>
 						<a href="#">Industrial Solution<span><i class="las la-arrow-right"></i></span></a>

 					</div>

 					<div class="question-section">
 						<h6>Have any Question?</h6>
 						<form action="sendemail.php">
 							<input type="text" name="name" id="name" required="" placeholder="Full Name">
 							<input type="email" name="email" id="email" required="" placeholder="Your E-mail">
 							<textarea name="message" id="message" cols="30" rows="10" required="" placeholder="How can help you?"></textarea>
 							<button class="btn btn-primary" type="submit">Your Question</button>
 						</form>
 					</div>

 					<div class="helpline-section">
 						<div class="helpline-content text-center">
 							<h4>Need Consultancy Help</h4>
 							<p>Gatherin galso sprit moving shall flow</p>
 							<button class="btn btn-primary" type="submit">Contact Us</button>
 						</div>
 					</div>
 				</div>

 				<div class="col-lg-8">
 					<div class="single-service mt-0">
 						<img src="/assets/img/service/single-service-bg.jpg" alt="">
 						<h2>Welding Processing</h2>
 						<p>Air Frieght is express courier lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga sunt necessitatibus,
 							fugit, nesciunt adipisci, exercitationem accusamus possimus repellendus praesentium deleniti
 							explicabo laborum. Voluptates ipsa dignissimos blanditiis quibusdam temporibus cupiditate
 							tempore atque illum sed? Doloribus recusandae pariatur architecto quisquam magni ipsam
 							sapiente adipisci iusto odio eaque, hic repellat quis expedita perferendis? A quick brwon fox jumps over the lazy dog.</p>
 						<p>Great Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestias, dolores
 							maiores est temporibus iste aut, vitae dolorem a nisi, autem eum totam neque quibusdam!</p>
 						<hr>
 						<h5>Building Renovation with Current Technology</h5>
 						<p>Such a game Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia vero ipsam nemo
 							natus, mollitia adipisci sit eveniet non? Nisi doloremque molestiae amet quaerat ipsa
 							maiores dolor deleniti blanditiis pariatur necessitatibus sit nemo, unde nihil eligendi
 							soluta id eum dicta quisquam? a quick brown fox jumps over the lazy dog.</p>
 						<div class="row gy-5">
 							<div class="col-md-6">
 								<div class="service-page-bg">
 									<img src="/assets/img/service/4.jpg" alt="">
 								</div>
 							</div>
 							<div class="col-md-6">
 								<div class="service-page-bg">
 									<img src="/assets/img/service/5.jpg" alt="">
 								</div>
 							</div>
 						</div>
 					</div>
 				</div>
 			</div>
 		</div>
 	</div>
    
</template>