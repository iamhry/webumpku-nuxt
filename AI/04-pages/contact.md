# 📞 Contact Page — Spesifikasi Halaman

## Route

```
id: /kontak
en: /contact
File: app/pages/kontak/index.vue
```

---

## Tujuan Halaman

Menyediakan channel komunikasi yang mudah dan jelas antara publik dengan UMPKU.

---

## Composable

```typescript
const { submitContact, loading, error, success } = useContact()
```

---

## Struktur Section

```
1. PageHeader          → "Hubungi Kami"
2. ContactGrid         → (7 col form) + (5 col info kontak)
3. MapSection          → Embedded Google Maps
4. DepartmentContacts  → Daftar kontak per unit (opsional)
```

---

## Form Kontak

### Fields

```
- Nama Lengkap* (text, autocomplete: name)
- Email*         (email, autocomplete: email)
- Nomor HP       (tel, autocomplete: tel)
- Subjek*        (text)
- Pesan*         (textarea, 6 rows)
- [Submit button]
```

### Validasi Frontend

```typescript
const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const validate = () => {
  let isValid = true
  errors.name = form.name.trim() ? '' : 'Nama wajib diisi'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) 
    ? '' : 'Email tidak valid'
  errors.subject = form.subject.trim() ? '' : 'Subjek wajib diisi'
  errors.message = form.message.trim().length >= 10 
    ? '' : 'Pesan minimal 10 karakter'
  return Object.values(errors).every(e => !e)
}
```

---

## Informasi Kontak

```
Alamat: Jl. Tulang Bawang Selatan No.26, Surakarta 57157
Telp:   (0271) 722548
Email:  info@umpku.ac.id
Instagram: @umpku_official
WhatsApp: link ke wa.me/...
```

---

## SEO

```typescript
useHead({
  title: 'Hubungi Kami | UMPKU',
  meta: [
    { name: 'description', content: 'Hubungi Universitas Muhammadiyah PKU Surakarta. Formulir kontak, alamat, nomor telepon, dan peta lokasi kampus.' }
  ]
})
```

---

## Anti-Pattern

```
❌ Form kontak tanpa validasi
❌ Submit tanpa loading state
❌ Tidak ada feedback sukses setelah submit
❌ Nomor telepon tanpa link tel:
❌ Email tanpa link mailto:
❌ Google Maps yang blokir halaman (pastikan iframe-only)
```
