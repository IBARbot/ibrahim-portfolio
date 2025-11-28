# 🚀 DEPLOYMENT CHECKLIST

Deployment etməzdən əvvəl bu checklist-i yoxlayın:

---

## 📋 PRE-DEPLOYMENT (Local)

### ✅ Kod Yoxlaması:
- [ ] Bütün fayllar mövcuddur
- [ ] TypeScript errors yoxdur (`npm run build`)
- [ ] Console errors yoxdur
- [ ] Bütün komponentlər işləyir
- [ ] Local test uğurludur (`npm run dev`)

### ✅ Environment Variables:
- [ ] `.env` faylı `.gitignore`-dadır
- [ ] Heç bir secret kod içində hard-coded deyil
- [ ] `VITE_` prefix-i olan variables frontend üçündür

### ✅ Konfiqurasiya Faylları:
- [ ] `package.json` - bütün dependencies əlavə edilib
- [ ] `vercel.json` - routing configured
- [ ] `.gitignore` - lazımsız fayllar ignore edilir
- [ ] `tsconfig.json` - TypeScript configured
- [ ] `vite.config.ts` - Vite configured

---

## 📦 GITHUB

### ✅ Repository Hazırlığı:
- [ ] GitHub account var
- [ ] Yeni repository yaradılıb
- [ ] Repository name: `ibrahim-abdullayev-portfolio`
- [ ] README.md faylı oxunaqlıdır

### ✅ Git Əməliyyatları:
```bash
# 1. Git initialized
git init

# 2. .gitignore yaradılıb
cat .gitignore

# 3. Fayllar staged
git add .

# 4. Commit
git commit -m "Initial commit: Portfolio with admin panel"

# 5. Remote əlavə edilib
git remote add origin https://github.com/YOUR_USERNAME/ibrahim-abdullayev-portfolio.git

# 6. Push
git push -u origin main
```

- [ ] Bütün fayllar GitHub-da görünür
- [ ] Commit history təmizdir
- [ ] Branch: `main`

---

## 🌐 VERCEL DEPLOYMENT

### ✅ Account Setup:
- [ ] Vercel account yaradılıb
- [ ] GitHub bağlanıb

### ✅ Project Configuration:
- [ ] Repository import edilib
- [ ] Framework: **Vite** seçilib
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

### ✅ Environment Variables:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

- [ ] Variables Vercel-də əlavə edilib
- [ ] "Environment" seçimi: **Production, Preview, Development** (hamısı)

### ✅ Deployment:
- [ ] "Deploy" düyməsinə basılıb
- [ ] Build uğurlu keçib (2-3 dəqiqə)
- [ ] Deployment URL alınıb: `https://ibrahim-abdullayev-portfolio.vercel.app`
- [ ] Sayt açılır və işləyir

---

## 🔐 SUPABASE SETUP

### ✅ Project Configuration:
- [ ] Supabase account yaradılıb
- [ ] Yeni project yaradılıb
- [ ] Project name: `ibrahim-abdullayev-portfolio`
- [ ] Region seçilib (ən yaxın)

### ✅ API Keys:
- [ ] **Settings → API** açılıb
- [ ] **Project URL** kopyalanıb
- [ ] **anon/public key** kopyalanıb
- [ ] **service_role key** kopyalanıb (GİZLİ!)

### ✅ Database:
- [ ] `kv_store_45a44eb5` table mövcuddur
- [ ] Table structure düzgündür:
  ```sql
  key: text (primary key)
  value: text
  created_at: timestamp
  ```

---

## ⚡ SUPABASE EDGE FUNCTIONS

### ✅ CLI Setup:
- [ ] Supabase CLI quraşdırılıb
- [ ] `supabase --version` işləyir
- [ ] `supabase login` edilib

### ✅ Function Deployment:
```bash
# 1. Project link
supabase link --project-ref YOUR_PROJECT_REF

# 2. Deploy function
supabase functions deploy server

# 3. Verify
curl https://YOUR_PROJECT_URL.supabase.co/functions/v1/make-server-45a44eb5/health
```

- [ ] Function deploy olunub
- [ ] Health check URL-i işləyir: `/make-server-45a44eb5/health`
- [ ] Response: `{"status":"ok"}`

### ✅ Environment Secrets:
```bash
supabase secrets set SUPABASE_URL=https://xxxxx.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_key
supabase secrets set SUPABASE_ANON_KEY=your_key
supabase secrets set SUPABASE_DB_URL=postgresql://...
```

- [ ] Bütün secrets set edilib
- [ ] Function redeploy edilib (secrets apply olsun)

---

## 🧪 PRODUCTION TEST

### ✅ Frontend Test:
- [ ] Ana səhifə açılır
- [ ] Bütün bölmələr görünür (Hero, About, Services, Contact, Blog)
- [ ] Navigation işləyir
- [ ] Dil dəyişimi işləyir (EN/RU/AZ)
- [ ] Responsive design işləyir (mobile/tablet/desktop)
- [ ] Images yüklənir
- [ ] Animations işləyir
- [ ] WhatsApp button işləyir
- [ ] Contact links işləyir

### ✅ Admin Setup Test:
URL: `https://your-site.vercel.app/admin-setup`

- [ ] Səhifə açılır
- [ ] Form göstərilir
- [ ] Admin yaradıla bilir:
  ```
  Email: ibrahim@admin.com
  Password: Ibrahim2024!
  ```
- [ ] Success mesajı görünür
- [ ] Redirect olunur `/admin`-ə

### ✅ Admin Login Test:
URL: `https://your-site.vercel.app/admin`

- [ ] Login səhifəsi açılır
- [ ] Email və password ilə giriş edilir
- [ ] Dashboard açılır
- [ ] 4 tab görünür: Bloqlar, Mesajlar, Newsletter, Statistika

### ✅ Blog System Test:
- [ ] "Yeni Bloq Yarat" düyməsi işləyir
- [ ] Blog Editor açılır
- [ ] Multilingual form göstərilir (EN/RU/AZ)
- [ ] Blog yaradıla bilir
- [ ] Blog siyahıda görünür
- [ ] Ana səhifədə blog görünür
- [ ] Blog redaktə edilə bilir
- [ ] Blog silinə bilir

### ✅ Contact System Test:
- [ ] Ana səhifədə contact form işləyir
- [ ] Mesaj göndərilir
- [ ] Admin panel-də mesaj görünür
- [ ] Status dəyişdirilə bilir
- [ ] Mesaj silinə bilir

### ✅ Backend API Test:
```bash
# Health check
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-45a44eb5/health

# Expected: {"status":"ok"}
```

- [ ] API işləyir
- [ ] Auth endpoints işləyir
- [ ] Blog endpoints işləyir
- [ ] Contact endpoints işləyir

---

## 🔒 SECURITY CHECK

### ✅ Environment Variables:
- [ ] `.env` faylı GitHub-da YOXdur
- [ ] Service role key frontend-də YOXdur
- [ ] Bütün secrets Vercel/Supabase-də düzgün stored

### ✅ CORS:
- [ ] Supabase CORS settings yoxlanıb
- [ ] Production domain əlavə edilib:
  ```
  https://ibrahim-abdullayev-portfolio.vercel.app
  https://ibrahimabdullayev.com (custom domain varsa)
  ```

### ✅ Auth:
- [ ] Admin login işləyir
- [ ] Session management düzgündür
- [ ] Logout işləyir
- [ ] Protected routes auth require edir

---

## 🎨 CUSTOM DOMAIN (İxtiyari)

### ✅ Domain Alınması:
- [ ] Domain alınıb (GoDaddy, Namecheap, etc.)
- [ ] Domain name: `ibrahimabdullayev.com`

### ✅ Vercel Configuration:
- [ ] Vercel → Project → Settings → Domains
- [ ] Domain əlavə edilib
- [ ] DNS records göstərilib:
  ```
  A Record: @ → 76.76.21.21
  CNAME: www → cname.vercel-dns.com
  ```

### ✅ DNS Configuration:
- [ ] Domain provider-də DNS records əlavə edilib
- [ ] Propagation gözlənilir (10-30 dəqiqə)
- [ ] Domain açılır: `https://ibrahimabdullayev.com`
- [ ] SSL certificate aktiv (Vercel automatic)

---

## 📊 MONITORING

### ✅ Vercel Analytics:
- [ ] Vercel dashboard-da analytics enabled
- [ ] Real-time data göstərilir

### ✅ Error Tracking:
- [ ] Browser console-da error yoxdur
- [ ] Vercel logs təmizdir
- [ ] Supabase logs təmizdir

---

## ✅ FINAL CHECKLIST

### Deployment Complete:
- [ ] ✅ Frontend LIVE: `https://ibrahim-abdullayev-portfolio.vercel.app`
- [ ] ✅ Backend LIVE: Supabase Edge Functions
- [ ] ✅ Database LIVE: Supabase KV Store
- [ ] ✅ Admin Panel işləyir
- [ ] ✅ Blog system işləyir
- [ ] ✅ Contact form işləyir
- [ ] ✅ Multilingual işləyir
- [ ] ✅ Responsive design işləyir
- [ ] ✅ SSL active (HTTPS)
- [ ] ✅ Custom domain (varsa)

### Post-Deployment:
- [ ] Admin account yaradılıb
- [ ] İlk blog post əlavə edilib
- [ ] Contact form test edilib
- [ ] Bütün funksiyalar test edilib
- [ ] Performance test edilib
- [ ] SEO check edilib
- [ ] Mobile test edilib

---

## 🎉 SUCCESS!

Əgər bütün checkboxlar ✅ olarsa:

**🚀 SAYT PRODUCTION-DADUR VƏ LIVE-DİR!**

Təbriklər! Saytınız internetdə yaşayır və istifadəyə hazırdır! 🎊

---

## 📞 Problem Yaranarsa:

1. **Browser Console** yoxlayın (F12)
2. **Vercel Logs** yoxlayın (Vercel Dashboard → Deployments → Logs)
3. **Supabase Logs** yoxlayın (Supabase Dashboard → Logs)
4. **Network Tab** yoxlayın (API requests)
5. **/PRODUCTION-DEPLOYMENT.md** oxuyun (troubleshooting section)

---

**Built with ❤️ by Ibrahim Abdullayev**
**Deployed: November 24, 2024**
