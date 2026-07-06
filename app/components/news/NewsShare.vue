<script setup lang="ts">
import type { NewsArticle } from '~/types/news'

interface Props {
  article: NewsArticle
}

const props = defineProps<Props>()

// Get current URL
const currentUrl = computed(() => {
  if (process.client) {
    return window.location.href
  }
  return ''
})

// Clipboard
const copyLinkState = ref<boolean>(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl.value)
    copyLinkState.value = true
    setTimeout(() => {
      copyLinkState.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Social URLs
const shareUrls = computed(() => ({
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl.value)}`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl.value)}`,
  whatsapp: `https://wa.me/?text=${encodeURIComponent(props.article.title + ' ' + currentUrl.value)}`,
  twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl.value)}&text=${encodeURIComponent(props.article.title)}`
}))

const openShare = (url: string) => {
  window.open(url, '_blank', 'width=600,height=400')
}
</script>

<template>
  <div class="news-share-section">
    <div class="share-wrapper">
      <div class="share-label">
        <i class="las la-share-alt"></i>
        <span>Bagikan Berita Ini</span>
      </div>

      <div class="share-buttons">
        <!-- Facebook -->
        <button
          class="share-btn facebook"
          @click="openShare(shareUrls.facebook)"
          title="Bagikan di Facebook"
          aria-label="Share on Facebook"
        >
          <i class="fab fa-facebook-f"></i>
          <span class="btn-text">Facebook</span>
        </button>

        <!-- LinkedIn -->
        <button
          class="share-btn linkedin"
          @click="openShare(shareUrls.linkedin)"
          title="Bagikan di LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <i class="fab fa-linkedin-in"></i>
          <span class="btn-text">LinkedIn</span>
        </button>

        <!-- WhatsApp -->
        <button
          class="share-btn whatsapp"
          @click="openShare(shareUrls.whatsapp)"
          title="Bagikan di WhatsApp"
          aria-label="Share on WhatsApp"
        >
          <i class="fab fa-whatsapp"></i>
          <span class="btn-text">WhatsApp</span>
        </button>

        <!-- Twitter -->
        <button
          class="share-btn twitter"
          @click="openShare(shareUrls.twitter)"
          title="Bagikan di Twitter"
          aria-label="Share on Twitter"
        >
          <i class="fab fa-twitter"></i>
          <span class="btn-text">Twitter</span>
        </button>

        <!-- Copy Link -->
        <button
          class="share-btn copy-link"
          :class="{ copied: copyLinkState }"
          @click="copyToClipboard"
          title="Salin Link"
          aria-label="Copy link to clipboard"
        >
          <i class="las la-link"></i>
          <span class="btn-text">{{ copyLinkState ? 'Tersalin!' : 'Salin Link' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-share-section {
  margin-bottom: 50px;
  padding: 30px;
  background: linear-gradient(135deg, #f8f9fa 0%, #f3f4f6 100%);
  border-radius: 12px;
  border-top: 3px solid #0b2e59;
}

.share-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.share-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #0b2e59;
  font-size: 1rem;
  white-space: nowrap;
}

.share-label i {
  font-size: 1.3rem;
  color: #ffc107;
}

.share-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  flex: 1;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;
  color: white;
  min-width: 120px;
}

.share-btn i {
  font-size: 1.1rem;
}

/* Facebook */
.share-btn.facebook {
  background: linear-gradient(135deg, #1877f2 0%, #0a66c2 100%);
  border-color: #1877f2;
}

.share-btn.facebook:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(24, 119, 242, 0.3);
}

/* LinkedIn */
.share-btn.linkedin {
  background: linear-gradient(135deg, #0077b5 0%, #005a87 100%);
  border-color: #0077b5;
}

.share-btn.linkedin:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 119, 181, 0.3);
}

/* WhatsApp */
.share-btn.whatsapp {
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  border-color: #25d366;
}

.share-btn.whatsapp:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
}

/* Twitter */
.share-btn.twitter {
  background: linear-gradient(135deg, #1da1f2 0%, #1a8cd8 100%);
  border-color: #1da1f2;
}

.share-btn.twitter:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(29, 161, 242, 0.3);
}

/* Copy Link */
.share-btn.copy-link {
  background: linear-gradient(135deg, #0b2e59 0%, #1a4a7e 100%);
  border-color: #0b2e59;
}

.share-btn.copy-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(11, 46, 89, 0.3);
}

.share-btn.copy-link.copied {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-color: #10b981;
}

.btn-text {
  display: inline;
}

/* Responsive */
@media (max-width: 768px) {
  .share-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  .share-buttons {
    width: 100%;
  }

  .share-btn {
    flex: 1;
    min-width: calc(50% - 6px);
  }

  .btn-text {
    display: none;
  }
}

@media (max-width: 576px) {
  .news-share-section {
    padding: 20px;
  }

  .share-label {
    font-size: 0.95rem;
  }

  .share-btn {
    min-width: auto;
    padding: 8px 14px;
    font-size: 0.85rem;
  }

  .share-btn i {
    font-size: 1rem;
  }

  .share-buttons {
    gap: 10px;
  }

  .share-btn {
    flex: 1;
  }
}
</style>

