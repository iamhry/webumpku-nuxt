# 🏗️ Arsitektur Proyek — Website UMPKU

## Tujuan Dokumen

Mendefinisikan arsitektur teknis frontend, pola komunikasi antar layer, dan batasan tanggung jawab setiap bagian sistem. AI Agent wajib memahami arsitektur ini agar tidak merusak alur data yang sudah berjalan.

---

## Gambaran Arsitektur

```
┌─────────────────────────────────────────────┐
│              Browser / Client               │
└─────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│         Nuxt 4 Frontend (SSR)               │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Pages   │  │ Layouts  │  │  Views   │  │
│  └──────────┘  └──────────┘  └──────────┘  │
│        │              │             │       │
│        └──────────────┴─────────────┘       │
│                       │                     │
│  ┌────────────────────▼────────────────┐    │
│  │         Components Layer            │    │
│  │  (UI Components, Sections, Shared)  │    │
│  └────────────────────┬────────────────┘    │
│                       │                     │
│  ┌────────────────────▼────────────────┐    │
│  │         Composables Layer           │    │
│  │  (useNews, useEvents, useFaculties) │    │
│  └────────────────────┬────────────────┘    │
│                       │                     │
│  ┌────────────────────▼────────────────┐    │
│  │           Stores (Pinia)            │    │
│  │  (news, events, homepage, menu)     │    │
│  └────────────────────┬────────────────┘    │
│                       │                     │
│  ┌────────────────────▼────────────────┐    │
│  │          Services Layer             │    │
│  │   (Axios API calls ke Laravel)      │    │
│  └────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
                       │
                       ▼ REST API
┌─────────────────────────────────────────────┐
│         Laravel 13 Backend API              │
│         (dengan CMS Filament)               │
└─────────────────────────────────────────────┘
```

---

## Layer Responsibilities

### 1. Pages Layer (`app/pages/`)

**Tanggung jawab:**
- Definisi routing
- Orchestrasi composable dan state
- Render SEO metadata (`useHead()`)
- Menggabungkan komponen menjadi halaman

**Aturan:**
- ✅ Boleh menggunakan composable
- ✅ Boleh menggunakan store
- ❌ Tidak boleh berisi business logic
- ❌ Tidak boleh langsung call API (gunakan composable)

### 2. Components Layer (`app/components/`)

**Tanggung jawab:**
- Presentasi UI murni
- Interaktivitas lokal (open/close, active state)
- Emit events ke parent

**Aturan:**
- ✅ Boleh menerima data via props
- ✅ Boleh emit events ke parent
- ✅ Boleh memiliki local state (UI only)
- ❌ Tidak boleh langsung call API
- ❌ Tidak boleh import store langsung (kecuali necessary)

### 3. Composables Layer (`app/composables/`)

**Tanggung jawab:**
- Orkestrasi fetch data
- Bridge antara services dan stores
- Menyediakan data + loading + error state ke components

**Aturan:**
- ✅ Menggunakan `useAsyncData()` untuk SSR-safe fetching
- ✅ Memanggil services untuk HTTP request
- ✅ Menulis ke store
- ❌ **Jangan diubah tanpa izin** — ini business logic

### 4. Stores Layer (`app/stores/`)

**Tanggung jawab:**
- Global state management
- Caching data di sisi client
- Shared state antar komponen

**Aturan:**
- ✅ Definisi state, getters, actions
- ❌ **Jangan diubah tanpa izin** — ini business logic

### 5. Services Layer (`app/services/`)

**Tanggung jawab:**
- Axios HTTP calls ke Laravel API
- Request/response type safety

**Aturan:**
- ❌ **Jangan diubah tanpa izin** — ini API contract

---

## Alur Data (Data Flow)

```
User Action
    │
    ▼
Page Component
    │ calls
    ▼
Composable (useNews, useEvents, dll)
    │ calls
    ▼
Service (newsService, eventsService, dll)
    │ HTTP GET/POST
    ▼
Laravel API
    │ JSON Response
    ▼
Service (parse response)
    │ returns data
    ▼
Composable (writes to store)
    │ exposes computed refs
    ▼
Component (renders UI)
    │ displays
    ▼
User Interface
```

---

## Struktur Folder Lengkap

```
webumpku/
├── app/
│   ├── app.vue              # Root component
│   ├── components/          # UI components (lihat 06-nuxt/folder-structure.md)
│   ├── composables/         # Data orchestration layer ⚠️ Jangan ubah
│   ├── layouts/             # Layout templates
│   ├── locales/             # i18n translations (id.json, en.json)
│   ├── pages/               # Route-based pages
│   ├── services/            # API service calls ⚠️ Jangan ubah
│   ├── stores/              # Pinia stores ⚠️ Jangan ubah
│   ├── types/               # TypeScript interfaces
│   └── views/               # Complex view components
├── public/
│   └── assets/              # Static CSS, JS, images
├── nuxt.config.ts           # Nuxt configuration ⚠️ Hati-hati mengubah
└── AI/                      # Handbook ini
```

---

## Konvensi Komunikasi Komponen

```
Parent → Child : props
Child → Parent : $emit / defineEmits
Sibling       : Pinia store atau event bus
Global State  : Pinia
Server State  : useAsyncData + Composable
```

---

## i18n Architecture

Website mendukung dua bahasa:

| Kode | Bahasa | Route Prefix |
|------|--------|-------------|
| `id` | Indonesia | (default, tanpa prefix) |
| `en` | English | `/en/...` |

Gunakan `useI18n()` untuk teks:
```vue
<script setup lang="ts">
const { t } = useI18n()
</script>
<template>
  <h1>{{ t('home.title') }}</h1>
</template>
```

---

## Environment Configuration

```typescript
// Akses config di komponen
const config = useRuntimeConfig()
const apiBase = config.public.apiBase       // http://api.umpku.ac.id
const storageUrl = config.public.storageUrl // http://api.umpku.ac.id/storage
```
