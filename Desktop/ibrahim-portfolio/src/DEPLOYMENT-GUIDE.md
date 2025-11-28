# 🚀 Deployment Təlimatı (Deployment Guide)

## 📋 Hazırlıq (Before Starting)

✅ **Yoxlama siyahısı:**
- [ ] Bütün fayllar hazırdır
- [ ] Şəxsi məlumatlar düzgündür
- [ ] Şəkillər əlavə edilib
- [ ] GitHub hesabınız var
- [ ] Vercel/Netlify hesabınız var (və ya yaradın)

---

## 🌐 GitHub-a Yükləmək

### 1️⃣ GitHub Repository Yarat

1. [GitHub.com](https://github.com) → Daxil ol
2. Sağ yuxarı küncdə **"+"** → **"New repository"**
3. Doldur:
   - **Repository name**: `ibrahim-abdullayev-portfolio`
   - **Description**: "Professional flight booking consultation portfolio"
   - **Public** və ya **Private** (Public tövsiyə olunur)
   - ❌ README, .gitignore, license əlavə **ETMƏ** (artıq var)
4. **"Create repository"** klikləyin

### 2️⃣ Faylları Yüklə

**🔴 Variant A: GitHub Desktop (Ən Asan)**

1. [GitHub Desktop](https://desktop.github.com) yüklə və quraşdır
2. Aç → "File" → "Add Local Repository"
3. Layihə qovluğunu seç
4. "Publish repository" klikləyin
5. ✅ Hazır!

**🟡 Variant B: GitHub Web Interface**

1. Yaratdığınız repository səhifəsinə keçin
2. **"uploading an existing file"** linkini klikləyin
3. Figma Make-dən endirdiyiniz bütün faylları sürükləyin
4. Commit message: `Initial commit`
5. **"Commit changes"** klikləyin
6. ✅ Hazır!

**🟢 Variant C: Git Command Line (Advanced)**

```bash
# Layihə qovluğuna keç
cd path/to/your/project

# Git başlat (əgər yoxdursa)
git init

# Bütün faylları əlavə et
git add .

# İlk commit
git commit -m "Initial commit: Ibrahim Abdullayev portfolio"

# Remote əlavə et (YOUR_USERNAME-i dəyişdirin)
git remote add origin https://github.com/YOUR_USERNAME/ibrahim-abdullayev-portfolio.git

# Push et
git branch -M main
git push -u origin main
```

---

## ☁️ Vercel-də Deploy (Tövsiyə Olunan - 2 Dəqiqə!)

### Niyə Vercel?
- ✅ Ən asan və sürətli
- ✅ Pulsuz SSL sertifikatı
- ✅ Avtomatik deploys (GitHub-dan)
- ✅ Global CDN (sürətli)
- ✅ Custom domain dəstəyi

### Addımlar:

**1️⃣ Hesab yarat**
- [vercel.com](https://vercel.com) → "Sign Up"
- **GitHub hesabınızla** daxil olun (ən asan)

**2️⃣ Layihəni import et**
- Dashboard → **"Add New..."** → **"Project"**
- GitHub repository-ni tap: `ibrahim-abdullayev-portfolio`
- **"Import"** klikləyin

**3️⃣ Konfiqurasiya (Avtomatik)**
- **Framework Preset**: Vite ✅ (avtomatik seçilir)
- **Root Directory**: `.` ✅ (saxla)
- **Build Command**: `npm run build` ✅
- **Output Directory**: `dist` ✅
- **"Deploy"** klikləyin

**4️⃣ Gözlə (1-2 dəqiqə)**
- Vercel avtomatik deploy edəcək
- ✅ Link alacaqsan: `https://ibrahim-abdullayev-portfolio.vercel.app`

**5️⃣ Domain əlavə et (Optional)**
- Dashboard → Project → Settings → **Domains**
- Custom domain əlavə et: `ibrahimabdullayev.az`
- DNS təlimatlarını izləyin:
  - A Record: `76.76.21.21`
  - CNAME: `cname.vercel-dns.com`

---

## 🌟 Netlify-də Deploy (Alternativ)

### Addımlar:

**1️⃣ Hesab yarat**
- [netlify.com](https://netlify.com) → "Sign Up"
- GitHub ilə daxil ol

**2️⃣ Layihəni deploy et**
- **"Add new site"** → **"Import an existing project"**
- **"Deploy with GitHub"** seçin
- Repository seçin: `ibrahim-abdullayev-portfolio`

**3️⃣ Build konfiqurasiyası**
```
Build command: npm run build
Publish directory: dist
```

**4️⃣ Deploy**
- **"Deploy site"** klikləyin
- ✅ Link: `https://ibrahim-abdullayev.netlify.app`

**5️⃣ Custom domain**
- Site settings → Domain management
- Custom domain əlavə edin

---

## 🔄 Yeniləmələr (Updates)

### Kod dəyişdirsəniz:

**GitHub Desktop:**
1. Dəyişiklikləri commit et
2. "Push origin" klikləyin
3. ✅ Vercel/Netlify avtomatik yeniləyir!

**Git Command Line:**
```bash
git add .
git commit -m "Update contact info"
git push
```

**GitHub Web:**
1. Faylı açın
2. Edit düyməsinə klikləyin
3. Dəyişiklik et
4. "Commit changes"

💡 **Qeyd**: Vercel/Netlify hər push-dan sonra avtomatik yenidən deploy edir!

---

## 🎯 Domain Konfiqurasiyası

### Vercel ilə Custom Domain:

**Vercel DNS (Ən Asan):**
1. Domain provayderiniz: Nameserver-ləri dəyişin
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
2. Vercel: Domain əlavə edin
3. ✅ Avtomatik SSL (1 saat)

**External DNS:**
1. Domain provayderinizə keçin (Reg.ru, Namecheap, etc.)
2. DNS records əlavə et:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
3. Gözlə (5-30 dəqiqə)

---

## ✅ Deploy Yoxlanışı

**Test edin:**
1. ✅ Sayt açılır
2. ✅ Bütün bölmələr işləyir
3. ✅ Şəkillər görsənir
4. ✅ Dil dəyişməsi işləyir
5. ✅ Mobil responsive
6. ✅ Form göndərilir
7. ✅ Linklər düzdür (WhatsApp, LinkedIn)

**Performance:**
- [PageSpeed Insights](https://pagespeed.web.dev) → URL-i yoxla
- [GTmetrix](https://gtmetrix.com) → Sürəti ölç

---

## 🐛 Problemlər və Həllər

### Problem: "Build failed"
**Həll:**
```bash
# Lokal test et:
npm install
npm run build

# Əgər error varsa, konsola bax və düzəlt
```

### Problem: Şəkillər görünmür
**Həll:**
- URL-ləri yoxla (Hero.tsx, About.tsx)
- Brauzer console-da error var?
- Unsplash URL-ləri işləyir

### Problem: Domain işləmir
**Həll:**
- DNS yayılması 24 saat çəkə bilər
- [DNS Checker](https://dnschecker.org) ilə yoxla
- SSL 1 saat çəkir

---

## 📞 Kömək Lazımdır?

**Resurlar:**
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Vite Docs](https://vitejs.dev)

**Yoxlama:**
- Brauzer console (F12)
- Vercel/Netlify deploy logs
- GitHub commits

---

## 🎉 Uğurlar!

Saytınız artıq onlayn! 🚀

**Növbəti addımlar:**
1. ✅ Google Analytics əlavə et (optional)
2. ✅ SEO optimize et (meta tags)
3. ✅ Social media-da paylaş
4. ✅ Müştərilərə göndər

---

Made with ❤️ for Ibrahim Abdullayev
