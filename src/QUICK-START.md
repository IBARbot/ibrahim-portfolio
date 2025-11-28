# ⚡ Tez Başlanğıc (Quick Start)

## 🎯 5 Dəqiqədə Deploy Et!

### 1️⃣ GitHub-a Yüklə (2 dəqiqə)

**Figma Make-dən:**
1. Sağ yuxarıda **"Download"** və ya **"Export"** düyməsi
2. ZIP faylını endir və aç

**GitHub:**
1. [github.com](https://github.com) → Yeni repository yarat
2. Ad: `ibrahim-abdullayev-portfolio`
3. Bütün faylları drag & drop et
4. "Commit changes" klikləyin

✅ **GitHub-da hazır!**

---

### 2️⃣ Vercel-də Deploy (2 dəqiqə)

1. [vercel.com](https://vercel.com) → GitHub ilə sign up
2. "New Project" → Repository seç
3. "Deploy" klikləyin
4. ⏳ 1-2 dəqiqə gözlə

✅ **Online!** Link: `https://your-site.vercel.app`

---

### 3️⃣ Şəkli Dəyişdir (1 dəqiqə)

**Ən asan yol:**
1. Şəkli [Imgur](https://imgur.com)-a yüklə
2. Direct link götür
3. GitHub-da 2 fayl düzəlt:
   - `/components/Hero.tsx` (sətir 8)
   - `/components/About.tsx` (sətir 8)
4. URL-i yapışdır: `const profileImage = "https://i.imgur.com/..."`
5. Commit et

✅ **Şəklin deploy olacaq!**

---

## 📁 Layihə Strukturu

```
ibrahim-abdullayev-portfolio/
│
├── 📄 Əsas Fayllar
│   ├── README.md                    # Layihə haqqında
│   ├── DEPLOYMENT-GUIDE.md          # Tam deployment təlimatı
│   ├── HOW-TO-ADD-YOUR-PHOTO.md     # Şəkil əlavə etmək
│   ├── package.json                 # Dependencies
│   └── index.html                   # HTML entry
│
├── ⚙️ Konfiqurasiya
│   ├── vite.config.ts               # Vite settings
│   ├── tsconfig.json                # TypeScript config
│   └── .gitignore                   # Git ignore
│
├── 🎨 Styles
│   └── styles/
│       └── globals.css              # Global CSS + Tailwind
│
├── 🧩 Komponentlər
│   ├── components/
│   │   ├── Navigation.tsx           # Navbar (dil seçimi)
│   │   ├── Hero.tsx                 # Ana səhifə banner
│   │   ├── About.tsx                # Haqqımda bölməsi
│   │   ├── Services.tsx             # Xidmətlər
│   │   ├── Contact.tsx              # Əlaqə formu
│   │   └── ui/                      # Shadcn UI components
│   │
│   └── contexts/
│       └── LanguageContext.tsx      # Tərcümələr (EN/RU/AZ)
│
└── 🚀 Build Files
    └── src/
        ├── App.tsx                  # Main component
        └── main.tsx                 # React entry
```

---

## 🔧 Əsas Dəyişikliklər

### 1. Şəxsi Məlumatlar
**Fayl:** `/contexts/LanguageContext.tsx`

```tsx
// Email (xətt 99, 193, 287)
"contact.emailValue": "ibrahim.abdullayev1@gmail.com",

// WhatsApp (xətt 57, 191, 287)
href: "https://wa.me/994555973923",

// LinkedIn (xətt 71, 195, 289)
href: "https://linkedin.com/in/ibrahim-abdullayev-7bb887152",

// Location (xətt 101, 195, 289)
"contact.locationValue": "Baku, Rashid Behbudov str, Azerbaijan",
```

### 2. Şəkillər
**Fayllar:** 
- `/components/Hero.tsx` (xətt 8)
- `/components/About.tsx` (xətt 8)

```tsx
const profileImage = "URL_BURAYA";
```

### 3. Mətn Dəyişiklikləri
**Fayl:** `/contexts/LanguageContext.tsx`

Tərcümələr üç dildə:
- `en` - English (xətt 15-108)
- `ru` - Русский (xətt 110-202)
- `az` - Azərbaycan (xətt 204-296)

---

## 🌐 Domain Bağla

### Vercel ilə:
1. Dashboard → Project → Settings
2. Domains → Add domain
3. DNS records:
   ```
   A Record: @ → 76.76.21.21
   CNAME: www → cname.vercel-dns.com
   ```

**Və ya Vercel DNS:**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

---

## 📱 Mobil Responsive?

✅ Bəli! Avtomatik:
- Desktop (>1024px)
- Tablet (768-1023px)
- Mobile (<767px)

---

## 🎨 Rəng Təması Dəyişdir?

**Fayl:** `/styles/globals.css`

```css
/* Əsas rənglər (xətt 6-15) */
--primary: teal;        /* Teal → Blue, Green, etc */
--secondary: slate;
```

---

## 📊 Analytics Əlavə Et?

**Google Analytics:**
```html
<!-- index.html <head> içinə əlavə et -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ❓ Tez-tez Verilən Suallar

### Necə yeniləyim?
```bash
git add .
git commit -m "Update"
git push
```
Vercel avtomatik deploy edir!

### Şəkil niyə görünmür?
- URL düzdür?
- HTTPS ilə başlayır?
- Brauzer console-da error var? (F12)

### Domain nə vaxt işləyəcək?
- DNS yayılması: 5 dəqiqə - 24 saat
- SSL sertifikat: ~1 saat
- Yoxla: [dnschecker.org](https://dnschecker.org)

### Forma işləyir?
Forma hal-hazırda demo-dur. Real forma üçün:
- [Formspree](https://formspree.io)
- [EmailJS](https://www.emailjs.com)
- Və ya backend (Supabase, Firebase)

---

## 🆘 Kömək

**Problemlər?**
1. 📖 [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) oxu
2. 📸 [HOW-TO-ADD-YOUR-PHOTO.md](./HOW-TO-ADD-YOUR-PHOTO.md) oxu
3. 🔍 Brauzer console-a bax (F12)
4. 📝 Vercel/Netlify logs yoxla

**Resurlar:**
- [Vercel Docs](https://vercel.com/docs)
- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)

---

## ✅ Yoxlama Siyahısı

Deploy etməzdən əvvəl:

- [ ] Bütün fayllar var
- [ ] Şəxsi məlumatlar düzgün
- [ ] Şəkillər işləyir
- [ ] Forma göndərilir
- [ ] Mobil responsive
- [ ] Dil dəyişməsi işləyir
- [ ] Linklər açılır (WhatsApp, LinkedIn)

Deploy edildikdən sonra:

- [ ] Sayt açılır
- [ ] SSL işləyir (https://)
- [ ] Bütün səhifələr yüklənir
- [ ] Şəkillər görsənir
- [ ] Links düzdür
- [ ] Performance yoxlanıb ([PageSpeed](https://pagespeed.web.dev))

---

## 🎉 Hazır!

Təbrik edirəm! Saytınız artıq online! 🚀

**İndi:**
1. 📱 Social media-da paylaş
2. 📧 Müştərilərə göndər  
3. 🔗 LinkedIn-də əlavə et
4. 💼 CV-yə əlavə et

---

Made with ❤️ in Baku
