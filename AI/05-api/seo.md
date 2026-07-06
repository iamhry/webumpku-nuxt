# 🔍 SEO — Panduan Implementasi

## Tujuan Dokumen

Panduan lengkap implementasi SEO di setiap halaman Nuxt 4 website UMPKU.

---

## useHead() — Wajib di Setiap Page

```typescript
// WAJIB ada di setiap file pages/*.vue
useHead({
  title: 'Judul Halaman | UMPKU',
  meta: [
    { name: 'description', content: 'Deskripsi halaman, 150-160 karakter.' },
    
    // Open Graph (untuk share di sosmed)
    { property: 'og:title', content: 'Judul Halaman | UMPKU' },
    { property: 'og:description', content: 'Deskripsi singkat' },
    { property: 'og:image', content: 'https://umpku.ac.id/og-image.jpg' },
    { property: 'og:url', content: 'https://umpku.ac.id/halaman' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'id_ID' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Judul Halaman | UMPKU' },
    { name: 'twitter:description', content: 'Deskripsi singkat' },
    { name: 'twitter:image', content: 'https://umpku.ac.id/og-image.jpg' },
  ],
  link: [
    { rel: 'canonical', href: 'https://umpku.ac.id/halaman' }
  ]
})
```

---

## SEO per Tipe Halaman

### Homepage

```typescript
useHead({
  title: 'Universitas Muhammadiyah PKU Surakarta',
  meta: [
    { name: 'description', content: 'UMPKU — Membangun insan cerdas berkarakter Islami, inovatif, dan berdaya saing global. Daftarkan diri sekarang.' }
  ]
})
```

### Halaman Listing (Berita, Event, Fakultas)

```typescript
useHead({
  title: computed(() => `Berita Terkini | UMPKU`),
  meta: [
    { name: 'description', content: 'Baca berita terbaru dari Universitas Muhammadiyah PKU Surakarta.' }
  ]
})
```

### Halaman Detail (Artikel, Event, Fakultas)

```typescript
useHead({
  title: computed(() => `${currentArticle.value?.title} | UMPKU`),
  meta: [
    { 
      name: 'description', 
      content: computed(() => currentArticle.value?.excerpt || '')
    },
    { property: 'og:type', content: 'article' },
    {
      property: 'og:image',
      content: computed(() => currentArticle.value?.featured_image || '')
    }
  ]
})
```

---

## Structured Data (JSON-LD)

### Organization (di homepage)

```typescript
useHead({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      'name': 'Universitas Muhammadiyah PKU Surakarta',
      'alternateName': 'UMPKU',
      'url': 'https://umpku.ac.id',
      'logo': 'https://umpku.ac.id/assets/img/logo/logo-umpku.png',
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+62-271-722548',
        'contactType': 'customer service',
        'areaServed': 'ID',
        'availableLanguage': 'Indonesian'
      },
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Jl. Tulang Bawang Selatan No.26',
        'addressLocality': 'Surakarta',
        'postalCode': '57157',
        'addressCountry': 'ID'
      }
    })
  }]
})
```

### Article (di halaman detail berita)

```typescript
const articleSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': currentArticle.value?.title,
  'datePublished': currentArticle.value?.published_at,
  'image': currentArticle.value?.featured_image,
  'publisher': {
    '@type': 'Organization',
    'name': 'UMPKU',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://umpku.ac.id/assets/img/logo/logo-umpku.png'
    }
  }
}))
```

---

## Canonical URL

```typescript
// Selalu set canonical, terutama untuk halaman dengan query params
const route = useRoute()
useHead({
  link: [{
    rel: 'canonical',
    href: `https://umpku.ac.id${route.path}`
  }]
})
```

---

## Robots

```typescript
// Halaman yang tidak perlu diindex
useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
// Gunakan untuk: halaman test, halaman admin, halaman 404
```

---

## Checklist SEO per Halaman

```
[ ] Title tag unik dan deskriptif (< 60 karakter)
[ ] Meta description yang compelling (< 160 karakter)
[ ] Tepat satu H1 per halaman
[ ] Hierarchy heading benar (H1 → H2 → H3)
[ ] Semua gambar punya alt text
[ ] Canonical URL terset
[ ] Open Graph tags lengkap
[ ] Structured data relevan (jika ada)
[ ] URL yang bersih dan deskriptif
[ ] Internal links yang relevan
```

---

## Anti-Pattern SEO

```
❌ Title yang sama di semua halaman
❌ Meta description yang terlalu pendek atau kosong
❌ Lebih dari satu H1 per halaman
❌ Gambar tanpa alt text
❌ Tidak ada canonical URL
❌ Konten yang di-render hanya di client-side (tidak terindex)
❌ URL dengan ID angka (gunakan slug)
❌ Broken links internal
```
