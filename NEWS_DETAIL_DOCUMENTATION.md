# News Detail Page - Dokumentasi

Halaman Detail Berita untuk UMPKU dengan integrasi penuh ke Dustrian theme dan backend API.

## 📁 File Structure

```
app/
├── pages/
│   └── berita/
│       └── [slug].vue              # Main news detail page
├── components/news/
│   ├── NewsHero.vue                # Hero banner dengan featured image
│   ├── NewsMeta.vue                # Meta info (author, date, tags)
│   ├── NewsSdgsLabels.vue          # SDG badges dengan warna
│   ├── NewsContent.vue             # Article content (sanitized HTML)
│   ├── NewsShare.vue               # Social sharing buttons
│   ├── RelatedNews.vue             # Related articles (3 items)
│   └── NewsSidebar.vue             # Sidebar (latest news, categories, tags)
└── types/
    └── news.ts                      # Updated NewsArticle type
```

## 🚀 Features

### 1. **News Hero Section** (`NewsHero.vue`)
- Featured image dengan overlay gradient
- Judul berita + tanggal publikasi
- Responsive design (500px desktop, 350px tablet, 280px mobile)

### 2. **News Meta** (`NewsMeta.vue`)
- Penulis, tanggal publikasi, dan jumlah views
- Tags dengan styling khusus
- Meta info dibaca dengan jelas

### 3. **SDGs Labels** (`NewsSdgsLabels.vue`)
- Menampilkan badge SDGs terkait artikel
- Warna konsisten dengan SDG palette resmi
- Clickable untuk navigasi ke detail SDG
- Grid layout responsif

### 4. **News Content** (`NewsContent.vue`)
- Render HTML content dengan `DOMPurify` sanitization
- Styling lengkap untuk typography:
  - Headings (H1-H6)
  - Paragraf dengan text-justification
  - Lists (ul, ol)
  - Blockquotes
  - Tables
  - Code blocks
  - Images dengan shadow
  - Links dengan hover effect
- External links membuka di tab baru

### 5. **News Share** (`NewsShare.vue`)
- Share buttons: Facebook, LinkedIn, WhatsApp, Twitter
- Copy link ke clipboard
- Buttons berubah warna pada hover
- Responsive design tersembunyi teks pada mobile

### 6. **Related News** (`RelatedNews.vue`)
- Menampilkan 3 artikel terkait
- Card design dengan hover effects
- Image zoom effect
- Date badge dengan warna accent

### 7. **Sidebar** (`NewsSidebar.vue`)
- **Berita Terbaru:** 5 artikel terbaru dengan thumbnail
- **Kategori:** Daftar kategori + jumlah artikel
- **Tag Populer:** Cloud tag dengan styling
- **Newsletter:** Subscribe form
- Semua widget dengan design konsisten

## 📍 API Integration

### Endpoint: `GET /api/v1/news/{slug}`

Response structure:
```json
{
  "data": {
    "id": 1,
    "title": "Berita Title",
    "slug": "berita-slug",
    "content": "<p>HTML content</p>",
    "excerpt": "Short description",
    "featured_image": "https://...",
    "published_at": "2026-06-14",
    "meta_title": "SEO Title",
    "meta_description": "SEO Description",
    "og_image": "https://...",
    "author": "Author Name",
    "category": "Category",
    "tags": ["tag1", "tag2"],
    "views": 1234,
    "sdgs": [
      {
        "id": 4,
        "title": "Quality Education",
        "slug": "quality-education",
        "icon_image": "https://..."
      }
    ],
    "related_news": [...]
  }
}
```

## 🎨 SEO & Meta Tags

### Automatic Meta Tags:
- `title` — dari meta_title atau title
- `description` — dari meta_description atau excerpt
- Open Graph: `og:title`, `og:description`, `og:image`, `og:url`
- Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`
- Canonical URL

### Schema.org JSON-LD:
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "...",
  "description": "...",
  "image": "...",
  "datePublished": "...",
  "author": {...},
  "publisher": {...}
}
```

## 📱 Responsive Breakpoints

- **Desktop:** > 1024px — 8-col main, 4-col sidebar
- **Tablet:** 768px - 1024px — Adjusted spacing
- **Mobile:** < 768px — Full width, sidebar expanded below

## ⚙️ Setup Instructions

1. **Pastikan API tersedia** di `http://localhost:8000/api/v1/news/{slug}`
2. **Install dependencies:**
   ```bash
   npm install isomorphic-dompurify
   ```

3. **Akses halaman detail:**
   ```
   http://localhost:3000/berita/[slug]
   ```

## 🔧 Customization

### Mengubah Category & Tags
Di `NewsSidebar.vue`, ganti hardcoded categories dan tags dengan API call:

```typescript
// Fetch categories dari API
const { data: categories } = await useFetch(`${apiBase}/api/v1/categories`)
```

### Mengubah Newsletter Implementation
Di `NewsSidebar.vue`, update `handleSubscribe` untuk call API:

```typescript
const handleSubscribe = async () => {
  await $fetch('/api/v1/newsletter/subscribe', {
    method: 'POST',
    body: { email: email.value }
  })
}
```

### Mengubah Related News Logic
Edit page component `/pages/berita/[slug].vue` untuk customize logika relasi berita.

## 📦 Dependencies

- `isomorphic-dompurify` — HTML sanitization
- Nuxt 4.4.8
- Vue 3.5.38
- TypeScript

## 🎯 Accessibility

- ARIA labels pada tombol share
- Semantic HTML
- Keyboard navigation support
- Color contrast sesuai WCAG

## 📝 Notes

- Semua warna mengikuti Dustrian theme (#0b2e59, #ffc107)
- Layout grid Bootstrap 12-column
- Font rendering optimal di berbagai devices
- Image lazy loading enabled
- DOMPurify mencegah XSS attacks

---

**Developed with ❤️ for UMPKU**

