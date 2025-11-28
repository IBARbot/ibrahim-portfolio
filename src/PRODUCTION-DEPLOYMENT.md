# 🚀 PRODUCTION DEPLOYMENT GUIDE

## Addım-Addım Production-a Deploy

---

## 📦 ADDIM 1: KODU EXPORT ETMƏK (5 dəqiqə)

### Figma Make-dən kodu export edin:

1. **Figma Make interfeysi:**
   - Sağ yuxarı küncdə "Export" və ya "Download" düyməsinə basın
   - ZIP faylı endirilə bilər

2. **Və ya manual olaraq:**
   - Bütün faylları local kompüterinizə kopyalayın
   - Struktur qorunmalıdır

### Lazımi fayllar:
```
ibrahim-abdullayev-portfolio/
├── public/
├── src/
│   └── main.tsx
├── components/
│   ├── ui/
│   ├── About.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── Services.tsx
│   ├── AdminDashboard.tsx
│   ├── AdminLogin.tsx
│   ├── AdminSetup.tsx
│   ├── BlogEditor.tsx
│   └── WelcomeModal.tsx
├── pages/
│   └── AdminPage.tsx
├── contexts/
│   └── LanguageContext.tsx
├── utils/
│   ├── api.ts
│   └── supabase/
│       ├── client.ts
│       └── info.tsx
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx
│           └── kv_store.tsx (protected)
├── styles/
│   └── globals.css
├── App.tsx
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── vercel.json
```

---

## 📁 ADDIM 2: GITHUB REPOSITORY YARATMAQ (5 dəqiqə)

### 2.1: GitHub-da yeni repo yaradın:

1. **GitHub.com-a gedin**
2. **"New Repository" düyməsinə basın**
3. **Repository məlumatları:**
   - Name: `ibrahim-abdullayev-portfolio`
   - Description: `Professional flight consultant portfolio with admin panel`
   - Visibility: **Private** (və ya Public)
   - ❌ **README əlavə etməyin** (artıq var)
   - ❌ **.gitignore əlavə etməyin** (artıq var)

4. **"Create Repository" düyməsinə basın**

### 2.2: Local git repo initialize edin:

Terminal açın və export etdiyiniz folder-ə gedin:

```bash
cd ibrahim-abdullayev-portfolio

# Git initialize
git init

# .gitignore faylı yaradın
echo "node_modules
dist
.env
.env.local
.DS_Store
*.log" > .gitignore

# Bütün faylları əlavə edin
git add .

# İlk commit
git commit -m "Initial commit: Portfolio website with admin panel"

# GitHub repo-ya bağlayın (URL-i GitHub-dan kopyalayın)
git remote add origin https://github.com/YOUR_USERNAME/ibrahim-abdullayev-portfolio.git

# Push edin
git branch -M main
git push -u origin main
```

✅ **Kod GitHub-da!**

---

## 🌐 ADDIM 3: VERCEL-DƏ DEPLOY (10 dəqiqə)

### 3.1: Vercel Account Yaradın:

1. **[vercel.com](https://vercel.com)** səhifəsinə gedin
2. **"Sign Up" və ya GitHub ilə login edin**
3. **GitHub account-ınızı bağlayın**

### 3.2: Yeni Project Yaradın:

1. **Vercel Dashboard → "New Project" düyməsinə basın**

2. **GitHub repository seçin:**
   - `ibrahim-abdullayev-portfolio` seçin
   - "Import" düyməsinə basın

3. **Project Settings:**
   - **Project Name:** `ibrahim-abdullayev-portfolio`
   - **Framework Preset:** Vite (auto-detect olacaq)
   - **Build Settings:**
     ```
     Build Command: npm run build
     Output Directory: dist
     Install Command: npm install
     ```

4. **⚠️ ÇOX VACIB - Environment Variables əlavə edin:**

   **"Environment Variables" bölməsinə gedin və əlavə edin:**

   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   ⚠️ **DİQQƏT:** Bu keys-ləri Supabase dashboard-dan almalısınız (Addım 4-də)

5. **"Deploy" düyməsinə basın!**

### 3.3: Deploy prosesi:

- ⏳ Build başlayacaq (2-3 dəqiqə)
- ✅ Uğurlu olarsa: `https://ibrahim-abdullayev-portfolio.vercel.app`
- ❌ Error olarsa: Build logs-u yoxlayın

---

## 🔐 ADDIM 4: SUPABASE PRODUCTION KEYS (5 dəqiqə)

### 4.1: Supabase Dashboard-a gedin:

1. **[supabase.com](https://supabase.com)** → Login
2. **Project-inizi açın** (və ya yeni yaradın)

### 4.2: API Keys əldə edin:

1. **Settings → API**
2. **Copy edin:**
   - **Project URL** → `https://xxxxx.supabase.co`
   - **anon/public key** → `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key** → `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (SECRET!)

### 4.3: Vercel-də Environment Variables yeniləyin:

1. **Vercel Dashboard → Project Settings → Environment Variables**

2. **Əlavə edin:**
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (Backend üçün)
   SUPABASE_DB_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

3. **"Redeploy" düyməsinə basın** (keys yeniləndikdən sonra)

---

## 🔧 ADDIM 5: SUPABASE EDGE FUNCTION DEPLOY (10 dəqiqə)

### 5.1: Supabase CLI quraşdırın:

```bash
# macOS (Homebrew)
brew install supabase/tap/supabase

# Windows (Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux
curl -fsSL https://raw.githubusercontent.com/supabase/cli/main/install.sh | sh
```

### 5.2: Supabase Login:

```bash
# Login
supabase login

# Browser açılacaq, authorize edin
```

### 5.3: Project bağlayın:

```bash
# Project-inizin folder-inə gedin
cd ibrahim-abdullayev-portfolio

# Supabase project link edin
supabase link --project-ref YOUR_PROJECT_REF

# YOUR_PROJECT_REF: Supabase dashboard URL-dən alın
# https://supabase.com/dashboard/project/xxxxx → xxxxx
```

### 5.4: Edge Function deploy edin:

```bash
# Server function deploy edin
supabase functions deploy server

# ✅ Uğurlu olarsa:
# Function URL: https://xxxxx.supabase.co/functions/v1/server
```

### 5.5: Environment Variables set edin:

```bash
# Supabase secrets set edin
supabase secrets set SUPABASE_URL=https://xxxxx.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
supabase secrets set SUPABASE_ANON_KEY=your_anon_key
supabase secrets set SUPABASE_DB_URL=your_db_url
```

---

## 🎯 ADDIM 6: DOMAIN BAĞLAMAQ (İxtiyari - 15 dəqiqə)

### 6.1: Domain alın:

- **GoDaddy**, **Namecheap**, **Google Domains** və s.
- Məsələn: `ibrahimabdullayev.com`

### 6.2: Vercel-də domain əlavə edin:

1. **Vercel Dashboard → Project → Settings → Domains**
2. **"Add" düyməsinə basın**
3. **Domain daxil edin:** `ibrahimabdullayev.com`
4. **DNS records kopyalayın** (Vercel verəcək)

### 6.3: Domain provider-də DNS configure edin:

**DNS Records əlavə edin:**

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**⏳ Propagation gözləyin:** 10-30 dəqiqə

✅ **Domain hazır!** `https://ibrahimabdullayev.com`

---

## 🧪 ADDIM 7: PRODUCTION TEST (10 dəqiqə)

### 7.1: Saytı açın:

```
https://ibrahim-abdullayev-portfolio.vercel.app
```

(və ya custom domain: `https://ibrahimabdullayev.com`)

### 7.2: Test edin:

1. **Ana səhifə açılır?** ✅
2. **Dil dəyişimi işləyir?** ✅
3. **Bütün bölmələr görünür?** ✅

### 7.3: Admin panel test edin:

1. **`/admin-setup` səhifəsinə gedin**
2. **Admin account yaradın:**
   - Email: `ibrahim@admin.com`
   - Şifrə: `Ibrahim2024!`
3. **`/admin` səhifəsinə gedin**
4. **Login edin**
5. **Blog yaradın** ✅
6. **Contact form test edin** ✅
7. **Backend işləyir?** ✅

### 7.4: Browser console yoxlayın:

- **F12 → Console**
- ❌ Error var? → Logs-u oxuyun
- ✅ Error yox? → Mükəmməl!

---

## 🔒 ADDIM 8: TEHLÜKƏSİZLİK (5 dəqiqə)

### 8.1: Environment Variables Yoxlayın:

✅ **FRONTEND-də yalnız bunlar olmalıdır:**
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

❌ **SERVICE_ROLE_KEY ASLA frontend-də olmamalıdır!**

### 8.2: Supabase RLS (Row Level Security):

1. **Supabase Dashboard → Database → Tables**
2. **`kv_store_45a44eb5` table-ı seçin**
3. **"Enable RLS" aktivləşdirin** (security üçün)

### 8.3: CORS Yoxlayın:

1. **Supabase Dashboard → Settings → API**
2. **CORS allowed origins:**
   ```
   https://ibrahim-abdullayev-portfolio.vercel.app
   https://ibrahimabdullayev.com
   https://www.ibrahimabdullayev.com
   ```

---

## 📊 ADDIM 9: MONITORING & ANALYTICS (İxtiyari)

### 9.1: Vercel Analytics:

- **Vercel Dashboard → Analytics tab-ı**
- **Real-time visitor tracking**
- **Performance metrics**

### 9.2: Google Analytics əlavə edin:

**`index.html`-ə əlavə edin:**

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ✅ DEPLOYMENT TAMAMLANDI!

### 🎉 Saytınız artıq LIVE-dir:

- ✅ **Frontend:** Vercel-də host olunur
- ✅ **Backend:** Supabase Edge Functions
- ✅ **Database:** Supabase KV Store
- ✅ **Auth:** Supabase Auth
- ✅ **Domain:** Custom domain (ixtiyari)
- ✅ **SSL:** Auto (Vercel tərəfindən)

### 🔗 Linklər:

- **Production URL:** `https://your-site.vercel.app`
- **Custom Domain:** `https://ibrahimabdullayev.com`
- **Admin Setup:** `https://your-site.vercel.app/admin-setup`
- **Admin Panel:** `https://your-site.vercel.app/admin`

---

## 🐛 PROBLEM HAL ETMƏK

### Build Error:

```bash
# Vercel logs-u yoxlayın:
vercel logs
```

**Ümumi problemlər:**
1. **Dependencies missing** → `npm install` local test edin
2. **Environment variables missing** → Vercel dashboard-da yoxlayın
3. **TypeScript errors** → `npm run build` local test edin

### Backend Error:

```bash
# Supabase function logs:
supabase functions logs server
```

**Ümumi problemlər:**
1. **401 Unauthorized** → Keys yoxlayın
2. **CORS error** → Allowed origins yoxlayın
3. **Database error** → Supabase dashboard logs

---

## 📞 DƏSTƏK

### Supabase Dəstək:
- Documentation: https://supabase.com/docs
- Discord: https://discord.supabase.com

### Vercel Dəstək:
- Documentation: https://vercel.com/docs
- Discord: https://vercel.com/discord

---

## 🚀 NÖVBƏT İ ADDIMLAR:

1. ✅ **SEO Optimization**
   - Meta tags
   - Sitemap
   - robots.txt

2. ✅ **Performance Optimization**
   - Image optimization
   - Lazy loading
   - Code splitting

3. ✅ **Newsletter Integration**
   - Subscribe form frontend
   - Email notifications

4. ✅ **Content Management**
   - Blog yazıları əlavə edin
   - Portfolio case studies
   - Client testimonials

---

## 🎯 ÜMUMİ CHECKLIST:

- [ ] Kod GitHub-da
- [ ] Vercel-də deploy
- [ ] Supabase keys configured
- [ ] Edge functions deployed
- [ ] Admin account yaradılıb
- [ ] Production test edilib
- [ ] Domain bağlanıb (ixtiyari)
- [ ] SSL aktiv
- [ ] Monitoring setup
- [ ] SEO optimized

**UĞURLAR!** 🎉

Problemlər yaranarsa, bu guide-a müraciət edin və ya soruşun!
