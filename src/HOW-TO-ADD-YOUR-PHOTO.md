# 📸 Öz Şəklinizi Əlavə Etmək (How to Add Your Photo)

Hal-hazırda saytda placeholder şəkil istifadə olunur. Öz şəklinizi əlavə etmək üçün 2 variant var:

## 🎯 Variant 1: Online Image URL (Ən Asan)

### Addım 1: Şəkilinizi yükləyin
Şəkilinizi bu platformalardan birinə yükləyin:
- [Imgur](https://imgur.com) - Ən asan
- [Cloudinary](https://cloudinary.com) - Peşəkar
- [ImageKit](https://imagekit.io) - Sürətli

### Addım 2: URL götürün
- Şəkli yüklədikdən sonra "Direct Link" və ya "Image URL" əldə edin
- URL bu formada olmalıdır: `https://i.imgur.com/abc123.jpg`

### Addım 3: Kodda dəyişdirin
2 faylda şəkil URL-ni dəyişdirin:

**Fayl 1: `/components/Hero.tsx`**
```tsx
// Bu sətri tapın (səth 8):
const profileImage = "https://images.unsplash.com/photo-1629507208649...";

// Dəyişdirin:
const profileImage = "https://i.imgur.com/SIZIN_SEKIL.jpg";
```

**Fayl 2: `/components/About.tsx`**
```tsx
// Bu sətri tapın (səth 8):
const profileImage = "https://images.unsplash.com/photo-1629507208649...";

// Dəyişdirin:
const profileImage = "https://i.imgur.com/SIZIN_SEKIL.jpg";
```

---

## 📁 Variant 2: Local File (Layihə içində)

### Addım 1: Public qovluğu yaradın
Əgər yoxdursa, layihə kökündə `public` qovluğu yaradın:
```
ibrahim-abdullayev-portfolio/
├── public/              ← Burda
│   └── images/
│       └── profile.jpg  ← Şəkliniz burda
├── src/
├── package.json
└── ...
```

### Addım 2: Şəkli yerləşdirin
- Şəklinizi `/public/images/profile.jpg` kimi yadda saxlayın
- Şəkil formatı: JPG, PNG və ya WebP
- Tövsiyə olunan ölçü: 800x800px və ya daha böyük
- Fayl ölçüsü: <2MB

### Addım 3: Kodda path dəyişdirin

**Fayl 1: `/components/Hero.tsx`**
```tsx
// Dəyişdirin:
const profileImage = "/images/profile.jpg";
```

**Fayl 2: `/components/About.tsx`**
```tsx
// Dəyişdirin:
const profileImage = "/images/profile.jpg";
```

---

## 🎨 Şəkil Tövsiyələri

✅ **Yaxşı şəkil:**
- Peşəkar görünüş
- Yaxşı işıqlandırma
- Təmiz fon (ağ, boz və ya bulanıq)
- Üz aydın görünür
- Yüksək keyfiyyət (heç olmasa 800x800px)

❌ **Pis şəkil:**
- Qaranlıq və ya bulanıq
- Uzaq məsafədən çəkilmiş
- Qarışıq və ya səliqəsiz fon
- Çox kiçik ölçü (<400px)

---

## 🔍 Dəyişiklikləri Yoxlayın

1. Development server işlədiyin:
```bash
npm run dev
```

2. Brauzerdə açın: `http://localhost:5173`

3. Şəkli yoxlayın:
   - Ana səhifədə (Hero section - sağ tərəf)
   - Haqqımda bölməsində (About section - sol tərəf)

4. Əgər şəkil görünmürsə:
   - Brauzer console-da error yoxlayın (F12)
   - URL-in düzgün olduğunu təsdiq edin
   - Şəklin mövcud olduğunu yoxlayın

---

## 🚀 GitHub-a Yükləyin

**Variant 1 istifadə edirsinizsə (Online URL):**
- Sadəcə kod dəyişikliklərini commit edin
- Şəkil artıq onlayndadır, heç nə yükləməyə ehtiyac yoxdur

**Variant 2 istifadə edirsinizsə (Local file):**
```bash
git add public/images/profile.jpg
git add components/Hero.tsx
git add components/About.tsx
git commit -m "Add personal profile photo"
git push
```

---

## ❓ Suallar

- **Şəkil görünmür?** → URL-i brauzer tab-ında açıb yoxlayın
- **Şəkil böyükdür?** → [TinyPNG](https://tinypng.com) ilə sıxın
- **Fonu silmək istəyirsiniz?** → [Remove.bg](https://remove.bg) istifadə edin

---

Uğurlar! 🎉
