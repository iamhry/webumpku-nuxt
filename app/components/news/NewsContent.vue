<script setup lang="ts">
import sanitizeHtml from 'sanitize-html'

interface Props {
  content: string
}

const props = defineProps<Props>()

const sanitizeConfig = {
  allowedTags: [
    'p', 'br', 'strong', 'em', 'u', 'del', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'span', 'div', 'pre', 'code'
  ],
  allowedAttributes: {
    '*': ['href', 'title', 'target', 'rel', 'src', 'alt', 'width', 'height', 'class']
  }
}

const sanitizedContent = computed(() => {
  if (!props.content) return ''
  return sanitizeHtml(props.content, sanitizeConfig)
})

// Add target="_blank" rel="noopener noreferrer" to links
const addRelToLinks = (html: string) => {
  if (!html) return '';
  
  return html.replace(/<a\b([^>]*)>/gi, (match, attrs) => {
    // If it's an anchor link, don't modify
    if (/href=["']?#/.test(attrs)) return match;
    
    // Check if target and rel already exist, if not, add them
    let newAttrs = attrs;
    if (!/target=/i.test(newAttrs)) newAttrs += ' target="_blank"';
    if (!/rel=/i.test(newAttrs)) newAttrs += ' rel="noopener noreferrer"';
    
    return `<a${newAttrs}>`;
  });
}
</script>

<template>
  <article class="news-content-wrapper">
    <div
      class="news-content"
      v-html="addRelToLinks(sanitizedContent)"
    ></div>
  </article>
</template>

<style scoped>
.news-content-wrapper {
  margin-bottom: 50px;
}

.news-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #374151;
}

/* Typography */
.news-content :deep(h1),
.news-content :deep(h2),
.news-content :deep(h3),
.news-content :deep(h4),
.news-content :deep(h5),
.news-content :deep(h6) {
  font-weight: 700;
  color: #0b2e59;
  margin-top: 30px;
  margin-bottom: 15px;
  line-height: 1.3;
}

.news-content :deep(h1) {
  font-size: 2rem;
  border-bottom: 3px solid #0b2e59;
  padding-bottom: 10px;
}

.news-content :deep(h2) {
  font-size: 1.6rem;
}

.news-content :deep(h3) {
  font-size: 1.35rem;
}

.news-content :deep(h4) {
  font-size: 1.2rem;
}

/* Paragraph */
.news-content :deep(p) {
  margin-bottom: 20px;
  text-align: justify;
}

/* Emphasis */
.news-content :deep(strong) {
  color: #0b2e59;
  font-weight: 700;
}

.news-content :deep(em) {
  font-style: italic;
  color: #6b7280;
}

.news-content :deep(u) {
  text-decoration: underline;
}

.news-content :deep(del) {
  text-decoration: line-through;
  opacity: 0.6;
}

/* Lists */
.news-content :deep(ul),
.news-content :deep(ol) {
  margin-bottom: 20px;
  margin-left: 30px;
}

.news-content :deep(li) {
  margin-bottom: 10px;
  text-align: justify;
}

.news-content :deep(ul li) {
  list-style-type: disc;
}

.news-content :deep(ol li) {
  list-style-type: decimal;
}

/* Blockquote */
.news-content :deep(blockquote) {
  margin: 25px 0;
  padding: 20px;
  background-color: #f3f4f6;
  border-left: 4px solid #0b2e59;
  font-style: italic;
  color: #4b5563;
  border-radius: 4px;
}

.news-content :deep(blockquote p) {
  margin: 0;
  text-align: left;
}

/* Links */
.news-content :deep(a) {
  color: #0b2e59;
  font-weight: 600;
  text-decoration: underline;
  transition: all 0.3s ease;
}

.news-content :deep(a:hover) {
  color: #ffc107;
  text-decoration-color: #ffc107;
}

/* Images */
.news-content :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 25px 0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(11, 46, 89, 0.1);
}

/* Table */
.news-content :deep(table) {
  width: 100%;
  margin-bottom: 25px;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(11, 46, 89, 0.08);
  border-radius: 8px;
  overflow: hidden;
}

.news-content :deep(table th) {
  background-color: #0b2e59;
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: 600;
}

.news-content :deep(table td) {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.news-content :deep(table tr:last-child td) {
  border-bottom: none;
}

.news-content :deep(table tr:hover) {
  background-color: #f9fafb;
}

/* Code */
.news-content :deep(code) {
  background-color: #f3f4f6;
  color: #0b2e59;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.news-content :deep(pre) {
  background-color: #1f2937;
  color: #f3f4f6;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 20px;
}

.news-content :deep(pre code) {
  background-color: transparent;
  color: #f3f4f6;
  padding: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .news-content {
    font-size: 1rem;
    line-height: 1.7;
  }

  .news-content :deep(h1) {
    font-size: 1.6rem;
  }

  .news-content :deep(h2) {
    font-size: 1.3rem;
  }

  .news-content :deep(h3) {
    font-size: 1.1rem;
  }

  .news-content :deep(ul),
  .news-content :deep(ol) {
    margin-left: 20px;
  }

  .news-content :deep(table) {
    font-size: 0.9rem;
  }

  .news-content :deep(table th),
  .news-content :deep(table td) {
    padding: 10px;
  }
}

@media (max-width: 576px) {
  .news-content {
    font-size: 0.95rem;
  }

  .news-content :deep(h1) {
    font-size: 1.4rem;
  }

  .news-content :deep(blockquote) {
    padding: 15px;
  }

  .news-content :deep(pre) {
    font-size: 0.85rem;
    padding: 10px;
  }
}
</style>

