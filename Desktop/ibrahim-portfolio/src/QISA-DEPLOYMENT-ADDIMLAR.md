# ⚡ Qısa Deployment Addımları

## 🚀 5 Addımda Deploy Et

### 1️⃣ Resend API Key Al (5 dəqiqə)

```
1. https://resend.com → Sign Up (pulsuz)
2. Domain əlavə et: ibrahimabdullayev.com
3. API Keys → Create API Key → Kopyala
4. Supabase Dashboard-ı açıb RESEND_API_KEY-ə yapışdır
5. ADMIN_EMAIL: info@ibrahimabdullayev.com yaz
```

**DNS Settings (Resend-dən alacaqsan):**
- Vercel Dashboard → ibrahimabdullayev.com → DNS
- Resend-dən gələn TXT, MX, CNAME records-u əlavə et

---

### 2️⃣ Local Test (5 dəqiqə)

```bash
# Layihə qovluğuna keç
cd /path/to/ibrahim-abdullayev-portfolio

# Development server başlat
npm run dev

# Browser-də aç: http://localhost:5173
# Test et: 
#   - Services → Book Now düyməsinə bas
#   - Booking form açılır?
#   - Form göndərilir?
```

---

### 3️⃣ GitHub Push (2 dəqiqə)

```bash
git add .
git commit -m "feat: content editor, booking forms, email notifications"
git push origin main
```

---

### 4️⃣ Supabase Edge Function Deploy (3 dəqiqə)

```bash
# Supabase login (ilk dəfə)
supabase login

# Project link (ilk dəfə)
supabase link --project-ref your_project_id

# Deploy
supabase functions deploy server

# Test
curl https://your-project.supabase.co/functions/v1/make-server-45a44eb5/health
```

---

### 5️⃣ Vercel Auto-Deploy İzlə (5 dəqiqə)

```
1. https://vercel.com/dashboard
2. Layihəni seç
3. Deployments-də son deployment gözlə
4. Deploy bitəndə https://ibrahimabdullayev.com açıb test et
```

---

## ✅ Test Checklist

Live saytda test et:

```
☐ Ana səhifə yüklənir
☐ Services → Book Now düyməsi işləyir
☐ Booking form açılır
☐ Flight/Hotel/Insurance/Embassy tabs işləyir
☐ Form göndərilir
☐ Success mesajı görünür
☐ 5 dəqiqədən sonra email gəlir (admin emailinizə)
☐ Admin panel açılır: https://ibrahimabdullayev.com/admin
☐ Məzmunu Redaktə Et düyməsi var
☐ Content Editor açılır və işləyir
```

---

## 🐛 Problem Olarsa

### Email Gəlmirsə:
```bash
# Supabase function logs yoxla
supabase functions logs server --project-ref your_project_id

# Resend dashboard yoxla
https://resend.com/emails

# DNS records yoxla
https://dnschecker.org (domain: ibrahimabdullayev.com)
```

### Booking Form Göndərilmirsə:
```
F12 → Console tab-ı aç
Network tab-ında API request yoxla
Error mesajını kopyala
```

### Content Editor Açılmırsa:
```
Admin panel-ə giriş olunur?
Browser console-da error var?
```

---

## 📞 Sürətli Yardım

**Lazımi Məlumatlar:**
- Browser console logs (F12 → Console → Copy all)
- Network tab (F12 → Network → Filter: booking)
- Supabase function logs
- Error mesajı screenshot

**Environment Variables:**
```env
✅ SUPABASE_URL
✅ SUPABASE_ANON_KEY
✅ SUPABASE_SERVICE_ROLE_KEY
✅ RESEND_API_KEY      ← YENİ
✅ ADMIN_EMAIL         ← YENİ
```

---

## 🎉 İşləyir!

Əgər bütün test-lər keçibsə:
- ✅ Booking formları işləyir
- ✅ Email bildirişləri gəlir
- ✅ Content editor işləyir
- ✅ Admin panel tam funksionaldır

**Təbriklər! Saytınız hazırdır! 🚀**

---

## 📋 Sonrakı İşlər (Optional)

1. **Resend Domain Verification** tamamla (DNS records əlavə et)
2. **Email Design** yaxşılaşdır (istəsən HTML template)
3. **Admin Panel** öyrən və test et
4. **Məzmun** dəyişdirmələr et
5. **Real Booking** test et (öz emailinə göndər)

---

**NOT:** Bu addımlar təxminən 20 dəqiqə çəkir. Əgər problem olarsa, logs-u yoxlayın.
