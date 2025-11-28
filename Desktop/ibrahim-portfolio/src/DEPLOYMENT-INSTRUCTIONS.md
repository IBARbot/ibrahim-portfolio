# 🚀 Deployment İnstruksiyaları

## Yeni Funksiyalar

### ✅ Tamamlanmış Dəyişikliklər:

1. **Content Editor (Məzmun Redaktoru)**: Admin paneldən bütün sayt məzmununu (Hero, About, Services, Testimonials, Contact) idarə edə bilərsiniz
2. **Booking Forms (Sifariş Formaları)**: Uçuş, Otel, Sığorta və Səfirlik sorğuları üçün formalar
3. **Email Bildirişləri**: Hər form göndəriləndə avtomatik olaraq sizin emailinizə məlumat gəlir
4. **Backend API**: Booking formları və content management üçün tam API dəstəyi

---

## 📋 Deployment Addımları

### 1️⃣ API KEY-ləri Təyin Edin

Sizin admin emailiniz və Resend API key daxil etməlisiniz (Supabase dashboard açılacaq):

**ADMIN_EMAIL**: Sizin email ünvanınız (məsələn: info@ibrahimabdullayev.com)
**RESEND_API_KEY**: Resend.com-dan API key alın (aşağıda təlimat var)

> **Resend API Key almaq üçün:**
> 1. https://resend.com saytına daxil olun
> 2. Qeydiyyatdan keçin (pulsuz 100 email/gün)
> 3. Domain əlavə edin: ibrahimabdullayev.com
> 4. API Keys -> Create API Key
> 5. Key-i kopyalayın və RESEND_API_KEY environment variable-ına yapışdırın
> 6. Domain verification üçün Resend-in verdiyi DNS records-u domain provider-də (Vercel) əlavə edin

### 2️⃣ Local Environment-də Test Edin

```bash
# 1. Layihəni lokal kompüterinizə yükləyin
cd /path/to/your/project

# 2. Dependencies yükləyin (əgər yüklənməyibsə)
npm install

# 3. Environment variables yaradın
# .env.local faylı yaradın və aşağıdakıları əlavə edin:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id

# 4. Development server başladın
npm run dev

# 5. Browser-də açın: http://localhost:5173
```

### 3️⃣ Kodu GitHub-a Yükləyin

```bash
# Git status yoxlayın
git status

# Yeni faylları əlavə edin
git add .

# Commit edin
git commit -m "feat: added content editor, booking forms and email notifications"

# GitHub-a push edin
git push origin main
```

### 4️⃣ Vercel-də Deploy Edin

Vercel avtomatik olaraq GitHub repository-nizdən yeni kodu deploy edəcək.

**Deploy prosesini izləmək üçün:**
1. https://vercel.com/dashboard saytına daxil olun
2. Layihənizi seçin
3. Deployments bölməsində son deployment-i izləyin
4. Deploy tamamlandıqdan sonra saytı açın

### 5️⃣ Domain DNS Settings (Resend Email üçün)

Resend-dən gələn DNS records-u Vercel DNS-ə əlavə edin:

1. Vercel Dashboard -> Layihə -> Settings -> Domains
2. ibrahimabdullayev.com seçin
3. DNS Records bölməsinə keçin
4. Resend-dən aldığınız TXT, MX və CNAME records-u əlavə edin

**Nümunə DNS Records:**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:...

Type: MX
Name: @
Value: mx.resend.com
Priority: 10

Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3...
```

### 6️⃣ Supabase Edge Function Deploy Edin

```bash
# Supabase CLI quraşdırın (əgər quraşdırılmayıbsa)
npm install -g supabase

# Supabase login
supabase login

# Project ID-ni link edin
supabase link --project-ref your_project_id

# Edge function deploy edin
supabase functions deploy server
```

---

## 🎯 Admin Panel-dən İstifadə

### Content Editor İstifadə Etmək

1. https://ibrahimabdullayev.com/admin ünvanına daxil olun
2. Login olun (admin email və şifrə)
3. Admin paneldə yeni "Məzmun" tab-ı görəcəksiniz
4. "Məzmunu Redaktə Et" düyməsinə basın
5. İstədiyiniz bölməni (Hero, About, Services, Testimonials, Contact) redaktə edin
6. Hər dildə (EN, RU, AZ) məzmunu daxil edin
7. "Yadda Saxla" düyməsinə basın

### Booking Submissions İdarə Etmək

1. Admin panel-də "Sorğular" tab-ına keçin
2. Gələn booking sorğularını görün (Uçuş, Otel, Sığorta, Səfirlik)
3. Hər sorğunun statusunu dəyişin (new -> contacted -> completed)
4. Sorğuları silin (lazım olduqda)

---

## 🧪 Test Etmək

### 1. Content Editor Test

1. Admin panel-ə daxil olun
2. Məzmunu dəyişin (məsələn Hero başlığını)
3. Saxlayın və ana səhifəyə qayıdın
4. Dəyişikliklərin görünməsini yoxlayın

### 2. Booking Form Test

1. Ana səhifədə "Xidmətlər" bölməsinə keçin
2. Hər hansı xidmətin "Book Now" düyməsinə basın
3. Booking formu açılacaq
4. Formu doldurun və göndərin
5. Email-nizə bildiriş gəlməlidir (RESEND_API_KEY düzgün quraşdırılıbsa)

### 3. Email Notification Test

1. Booking form göndərin
2. Admin emailinizi yoxlayın
3. Booking detalları ilə email almaq lazımdır
4. Əgər email gəlmirsə:
   - RESEND_API_KEY düzgün quraşdırılıb?
   - ADMIN_EMAIL düzgün email ünvanıdır?
   - Resend domain verification tamamlanıb?
   - Spam qovluğunu yoxlayın

---

## 🐛 Troubleshooting

### Problem: Email göndərilmir

**Həll:**
1. RESEND_API_KEY düzgündür?
2. Domain verification tamamlanıb? (Resend dashboard-da yoxlayın)
3. Supabase server logs-u yoxlayın:
   ```bash
   supabase functions logs server
   ```
4. Browser console-da error varmı?

### Problem: Content dəyişmir

**Həll:**
1. localStorage-u təmizləyin
2. Səhifəni hard refresh edin (Ctrl + Shift + R)
3. Admin paneldən yenidən saxlayın

### Problem: Booking form göndərilmir

**Həll:**
1. Browser console-da network tab-ı açın
2. Form göndərəndə API request-i uğurlu olur?
3. Server response-da error varmı?
4. Supabase Edge Function işləyir? (health check: /make-server-45a44eb5/health)

---

## 📱 Əlaqə

Hər hansı problem olarsa, aşağıdakı məlumatları toplayın və göndərin:

1. Browser console logs (F12 -> Console)
2. Network tab logs (F12 -> Network)
3. Supabase function logs
4. Dəqiq error mesajı
5. Addım-addım nə etdiniz

---

## ✅ Checklist

Deploy etməzdən əvvəl:

- [ ] RESEND_API_KEY quraşdırıldı
- [ ] ADMIN_EMAIL quraşdırıldı
- [ ] Resend domain verification tamamlandı
- [ ] DNS records əlavə edildi
- [ ] Local-da test edildi
- [ ] Git commit və push edildi
- [ ] Vercel deploy gözlənilir
- [ ] Supabase Edge Function deploy edildi
- [ ] Content editor test edildi
- [ ] Booking form test edildi
- [ ] Email notifications test edildi

---

## 🎉 Uğurlar!

Artıq saytınız tam funksionaldır. Admin paneldən kod yazmadan bütün məzmunu idarə edə və booking sorğularını qəbul edə bilərsiniz!
