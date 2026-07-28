<script setup lang="ts">
import type { NewsArticle } from '~/types/news'

defineProps<{ article: NewsArticle }>()

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="news-hero-section">
    <!-- Hero Image with Overlay -->
    <div class="news-hero-image">
      <img
        :src="article.featured_image"
        :alt="article.title"
        class="hero-img"
        loading="lazy"
      />
      <div class="hero-overlay"></div>

      <!-- Hero Content Overlay -->
      <div class="hero-content">
        <div class="container content-wide">
          <div class="hero-text">
            <h1 class="hero-title">{{ article.title }}</h1>
            <div class="hero-meta">
              <span class="meta-item">
                <i class="las la-calendar"></i>
                {{ formatDate(article.published_at) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-hero-section {
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
}

.news-hero-image {
  width: 100%;
  height: 100%;
  position: relative;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(11, 46, 89, 0.72) 0%,
    rgba(11, 46, 89, 0.45) 40%,
    rgba(11, 46, 89, 0.82) 100%
  );
}

.hero-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 60px 0 40px;
  z-index: 2;
}

.hero-text {
  z-index: 3;
  position: relative;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 15px;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-meta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.meta-item {
  color: #e9ecef;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-item i {
  font-size: 1.1rem;
  color: #ffc107;
}

/* Responsive */
@media (max-width: 768px) {
  .news-hero-section {
    height: 350px;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-content {
    padding: 40px 0 30px;
  }
}

@media (max-width: 576px) {
  .news-hero-section {
    height: 280px;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-content {
    padding: 30px 0 20px;
  }

  .hero-meta {
    gap: 10px;
    font-size: 0.85rem;
  }
}
</style>

