# 🎨 Design Principles — Website UMPKU

## Tujuan Dokumen

Mendefinisikan prinsip-prinsip desain fundamental yang menjadi dasar setiap keputusan visual. Baca dokumen ini sebelum membuat atau mengubah tampilan apapun.

---

## Filosofi Desain

> **"Less is more. Every element must earn its place."**

Website UMPKU bukan sekadar template universitas. Ia adalah representasi digital dari institusi akademik bertaraf internasional yang berakar pada nilai-nilai Islam. Desain harus mencerminkan **keunggulan, kepercayaan, dan keterbukaan**.

---

## 5 Prinsip Inti

### 1. Clarity First (Kejelasan di Atas Segalanya)

Setiap pengunjung harus langsung memahami:
- Di mana mereka berada
- Apa yang bisa mereka temukan
- Apa langkah selanjutnya

```
✅ Visual hierarchy yang jelas
✅ CTA yang menonjol
✅ Navigasi yang intuitif
❌ Terlalu banyak elemen bersaing perhatian
❌ Warna terlalu ramai
❌ Teks kecil dan padat
```

### 2. Whitespace as Design (Ruang Kosong adalah Desain)

Whitespace bukan kekosongan. Ia adalah **napas** yang membuat konten terasa premium dan mudah dicerna.

```css
/* ✅ Berikan ruang yang cukup */
.section {
  padding: var(--section-padding-y) 0; /* 120px desktop */
}

.card {
  padding: 40px;
}

/* ❌ Jangan terlalu rapat */
.section { padding: 30px 0; }
.card { padding: 10px; }
```

### 3. Typography as Hierarchy (Tipografi sebagai Hierarki)

Typography yang kuat menggantikan kebutuhan dekorasi berlebihan. Ukuran dan berat font harus menciptakan hierarki yang jelas.

```
H1 → Pernyataan utama halaman (hanya satu per halaman)
H2 → Judul section
H3 → Sub-judul atau judul card
Body → Konten utama
Small → Label, caption, metadata
```

### 4. Motion with Purpose (Animasi yang Bermakna)

Animasi bukan hiasan. Setiap animasi harus:
- Memandu perhatian pengguna
- Memberikan feedback atas aksi
- Memperjelas transisi state

```
✅ Fade-in saat scroll masuk viewport
✅ Hover effect pada interactive elements
✅ Smooth transition antar halaman
❌ Animasi yang mengganggu atau lambat
❌ Parallax yang membuat pusing
❌ Auto-playing video dengan suara
```

### 5. Accessibility as Foundation (Aksesibilitas adalah Fondasi)

Desain yang baik adalah desain yang dapat diakses semua orang, termasuk pengguna dengan disabilitas.

```
✅ Contrast ratio minimal 4.5:1 untuk text
✅ Focus indicator yang visible
✅ Alt text pada semua gambar
✅ Keyboard navigable
❌ Warna sebagai satu-satunya pembeda informasi
❌ Text yang terlalu kecil (< 14px untuk body)
```

---

## Visual Language

### Komposisi

| Elemen | Pendekatan |
|--------|------------|
| **Layout** | Full-width sections, container 1440px |
| **Grid** | 12 kolom, gap 32px, simetris |
| **Alignment** | Left-aligned teks utama, center untuk hero |
| **Hierarchy** | Size + weight + color + space |

### Tone Visual

| Sifat | Implementasi |
|-------|-------------|
| **Premium** | Tipografi besar, whitespace luas, gambar HQ |
| **Akademik** | Layout terstruktur, konten informatif |
| **Modern** | Gradient halus, animasi smooth, grid rapi |
| **Humanis** | Foto orang nyata, warna hangat, tone personal |
| **Bersih** | Maksimal 3 warna per section, tidak ada clutter |

---

## Referensi Visual dan Prinsip yang Diambil

### UNSW Sydney
- Typography display besar dan berani
- Full-width hero dengan overlay teks
- Section yang terstruktur dan akademik

### MIT
- Keberanian menggunakan whitespace ekstrem
- Konten padat namun tidak terasa sesak
- Warna merah brand yang konsisten

### Stanford
- Grid yang rapi dan presisi
- Foto kampus yang menginspirasi
- CTA yang efektif dan tidak agresif

### Stripe
- Micro-animations yang smooth
- Gradien halus dan elegan
- Layout yang presisi hingga pixel

### Apple
- Detail premium di setiap elemen
- Gambar dengan kualitas sinematik
- Teks marketing yang kuat dan singkat

---

## Anti-Pattern Desain

```
❌ Menggunakan lebih dari 4 warna berbeda dalam satu halaman
❌ Font lebih dari 2 family (Sora + Inter sudah cukup)
❌ Border radius yang berlebihan (>16px untuk card besar)
❌ Drop shadow yang terlalu tebal
❌ Background pattern yang mengganggu keterbacaan
❌ Terlalu banyak animasi dalam satu viewport
❌ Tombol CTA lebih dari 2 dalam satu section
❌ Gambar dengan resolusi rendah atau blurry
❌ Ikon yang tidak konsisten style-nya
❌ Margin/padding yang tidak konsisten (random values)
```

---

## Design Decision Framework

Ketika menghadapi keputusan desain, tanyakan:

1. **Apakah ini memperjelas konten?** Jika tidak, hapus.
2. **Apakah ini konsisten dengan halaman lain?** Jika tidak, sesuaikan.
3. **Apakah ini aksesibel?** Jika tidak, perbaiki dulu.
4. **Apakah ini mobile-friendly?** Jika tidak, redesign.
5. **Apakah ini mencerminkan brand UMPKU?** Jika tidak, revisi.
