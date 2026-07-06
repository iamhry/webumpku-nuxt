<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

// Mapping of common segments to user-friendly titles
const segmentTitles = {
  about: "About Us",
  "choose-us": "Choose Us",
  team: "Our Team",
  price: "Pricing Plan",
  faq: "FAQ",
  "service-1": "Service - 01",
  "service-2": "Service - 02",
  "service-details": "Service Details",
  project: "Project",
  "project-details": "Project Details",
  blog: "Blog",
  "blog-details": "Blog Details",
  contact: "Contact Us",
  profil: "Profil",
  fakultas: "Fakultas",
  "program-studi": "Program Studi",
  sdgs: "SDGs",
  gallery: "Galeri",
  agenda: "Agenda",
  news: "News"
};

// Generate list of breadcrumb items from route.path
const breadcrumbs = computed(() => {
  const path = route.path;
  const segments = path.split('/').filter(Boolean);
  const crumbs = [{ label: "Home", to: "/" }];
  
  let currentPath = "";
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    
    // Determine label
    let label = segment;
    if (segmentTitles[segment.toLowerCase()]) {
      label = segmentTitles[segment.toLowerCase()];
    } else {
      // Format dynamically: e.g. "tentang-kami" -> "Tentang Kami"
      label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    crumbs.push({
      label,
      to: currentPath
    });
  });
  
  return crumbs;
});

// The title displayed in H1 (the last crumb label or default to route name)
const currentPageTitle = computed(() => {
  if (breadcrumbs.value.length > 1) {
    return breadcrumbs.value[breadcrumbs.value.length - 1].label;
  }
  return "Home";
});
</script>

<template>
  <div class="breadcroumb-area bread-bg">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="breadcroumb-title text-center">
            <h1>{{ currentPageTitle }}</h1>
            <h6>
              <template v-for="(crumb, index) in breadcrumbs" :key="crumb.to">
                <NuxtLink v-if="index < breadcrumbs.length - 1" :to="crumb.to">
                  {{ crumb.label }}
                </NuxtLink>
                <span v-else>{{ crumb.label }}</span>
                <span v-if="index < breadcrumbs.length - 1"> / </span>
              </template>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
