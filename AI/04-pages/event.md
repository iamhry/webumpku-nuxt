# 📅 Event Page — Spesifikasi Halaman

## Routes

```
Listing: /agenda (id) atau /events (en)
  File: app/pages/agenda/index.vue

Detail: /agenda/[slug] (id)
  File: app/pages/agenda/[slug].vue
```

---

## Composable

```typescript
const { events, currentEvent, loading, error, fetchEvents, fetchEventDetail } = useEvents()
```

---

## Halaman Listing Event

### Struktur

```
1. PageHeader     → "Agenda & Kegiatan"
2. FilterTabs     → Filter: Semua / Mendatang / Berlangsung / Selesai
3. EventList      → List event dengan grid atau list view
4. Pagination     → Load more atau numbered pages
```

### Event Card di Listing

```
Format: Horizontal card
Konten: Tanggal badge | Judul | Lokasi | Status
Warna badge status: 
  - Mendatang: Biru
  - Berlangsung: Hijau  
  - Selesai: Abu-abu
```

---

## Halaman Detail Event

### Struktur

```
1. PageHeader       → Judul event
2. EventMeta        → Tanggal, waktu, lokasi, penyelenggara
3. EventDescription → Deskripsi lengkap
4. EventGallery     → Foto kegiatan (jika tersedia)
5. RelatedEvents    → Event terkait
6. RegisterCTA      → Link daftar/RSVP (jika ada)
```

### Structured Data (Schema.org)

```typescript
useHead({
  title: computed(() => `${currentEvent.value?.title} | UMPKU`),
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Event',
        'name': currentEvent.value?.title,
        'startDate': currentEvent.value?.start_date,
        'endDate': currentEvent.value?.end_date,
        'location': {
          '@type': 'Place',
          'name': currentEvent.value?.location
        },
        'organizer': {
          '@type': 'Organization',
          'name': 'Universitas Muhammadiyah PKU Surakarta'
        }
      }))
    }
  ]
})
```

---

## Anti-Pattern

```
❌ Event listing tanpa filter status
❌ Tidak ada Schema.org Event markup
❌ Event yang sudah lewat tanpa label "Selesai"
❌ Tanggal event yang ambigu (tampilkan lengkap dengan hari)
```
