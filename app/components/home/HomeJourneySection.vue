<template>
  <section class="journey-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <h2 class="journey-title" v-reveal data-reveal="fade-up">Start your UMPKU journey</h2>
          <div v-reveal data-reveal="fade-up" data-reveal-delay="120">
            <NuxtLink to="https://pmb.umpku.ac.id" target="_blank" rel="noopener" class="journey-btn">
              Apply now
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="journey-icon">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Component for the "Start your journey" section below the slider
</script>

<style scoped>
.journey-section {
  padding: 60px 0;
  background-color: #ffffff;
}

.journey-title {
  font-size: 36px;
  font-weight: 700;
  color: #111111;
  margin-bottom: 30px;
  font-family: var(--font-heading, sans-serif);
}

.journey-btn {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffd100; /* UNSW-like yellow */
  color: #111111;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  padding: 15px 25px;
  min-width: 200px;
  border: none;
  transition: all 0.3s ease;
  font-family: monospace; /* The image uses a monospace-like font for "Apply now" */
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.journey-btn:hover {
  background-color: #e6bc00;
  color: #111111;
}

.journey-icon {
  margin-left: 20px;
  transition: transform 0.3s ease;
}

.journey-btn:hover .journey-icon {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .journey-title {
    font-size: 28px;
  }
}
</style>
