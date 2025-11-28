# 📧 Resend API Key Quraşdırma Təlimatı

## 🎯 Məqsəd
Booking formlarından göndərilən məlumatları avtomatik olaraq email vasitəsilə almaq üçün Resend email servisi konfiqurasiya etmək.

---

## 📝 ADDIM 1: Resend Hesabı Yarat

1. **🔗 Linki Aç:**
   ```
   https://resend.com/signup
   ```

2. **✅ Qeydiyyatdan Keç:**
   - Email ünvanını daxil et (məsələn: info@ibrahimabdullayev.com)
   - Parol yarat
   - Email-i təsdiq et

---

## 🔑 ADDIM 2: API Key Al

1. **Dashboard-a Daxil Ol:**
   ```
   https://resend.com/api-keys
   ```

2. **"Create API Key" düyməsinə bas**

3. **Parametrlər:**
   - **Name:** `Ibrahim Portfolio Backend`
   - **Permission:** `Sending access` (Full access)
   - **Domain:** `All domains` (və ya ibrahimabdullayev.com)

4. **API Key-i KOPYALA və SAXLA!** ⚠️
   ```
   re_xxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   
   **⚠️ DİQQƏT:** Bu key yalnız BİR DƏFƏ göstəriləcək! Saxlamağı unutma!

---

## 🌐 ADDIM 3: Domain Verification (Optional but Recommended)

1. **Add Domain:**
   ```
   https://resend.com/domains
   ```

2. **Domain əlavə et:**
   - `ibrahimabdullayev.com`

3. **DNS Records əlavə et:**
   - Resend verdiyi SPF, DKIM və DMARC record-ları domain hostinq panelinə əlavə et
   - Bu, email-lərin spam folder-ə düşməməsi üçün vacibdir

4. **Verify et:**
   - DNS yayılması 24 saata qədər çəkə bilər

---

## ⚙️ ADDIM 4: Supabase-də Environment Variable Əlavə Et

1. **Supabase Dashboard-a Keç:**
   ```
   https://supabase.com/dashboard/project/laubcyyurxrfaijgoczf
   ```

2. **Settings → Edge Functions → Environment Variables**

3. **Yeni Variable Əlavə Et:**
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_xxxxxxxxxxxxxxxxxxxxxxxxxx` (öz API key-ini yapışdır)
   - **Scope:** `Edge Functions`

4. **Save!** ✅

5. **Edge Function Redeploy Et:**
   ```bash
   # Terminal-da proyekt qovluğunda
   cd "C:\Users\Ibrahim ETA\Downloads\Professional Portfolio Website"
   
   # Supabase CLI ilə redeploy
   npx supabase functions deploy make-server-45a44eb5
   ```

---

## 📧 ADDIM 5: Admin Email Konfiqurasiyası

**ADMIN_EMAIL environment variable artıq konfiqurasiya edilib:**
- Email: `info@ibrahimabdullayev.com`

**Əgər dəyişdirmək istəyirsənsə:**
1. Supabase Dashboard → Settings → Edge Functions → Environment Variables
2. `ADMIN_EMAIL` variable-ı tap və redaktə et

---

## ✅ ADDIM 6: Test Et

1. **Saytda booking formu doldur:**
   ```
   http://localhost:3000/
   ```

2. **"İndi Rezerv Et" düyməsinə bas və formu göndər**

3. **Yoxla:**
   - ✅ Toast notification: "Sorğunuz uğurla göndərildi!"
   - ✅ Console-da error yoxdur
   - ✅ info@ibrahimabdullayev.com email-inə notification gəlir

---

## 🚨 PROBLEM HƏLLI

### Error: "API key is invalid"
- ✅ API key-i düzgün kopyaladığından əmin ol
- ✅ Supabase-də environment variable-ın adı dəqiq `RESEND_API_KEY` olduğundan əmin ol
- ✅ Edge Function redeploy etdiyindən əmin ol

### Email gəlmir
- ✅ Spam folder-i yoxla
- ✅ Domain verification statusunu yoxla: https://resend.com/domains
- ✅ Resend Dashboard → Emails → Log-lara bax

### "From" email düzgün deyil
- ✅ Domain verification tamamlanmalıdır
- ✅ Verification tamamlanana qədər: `onboarding@resend.dev` istifadə olunacaq

---

## 📊 Monitoring

**Resend Dashboard:**
```
https://resend.com/emails
```

Buradan göndərilən email-ləri və statuslarını izləyə bilərsən.

---

## 🎉 TAMAMLANDIQDAN SONRA:

✅ Booking formları işləyəcək  
✅ Email-lər avtomatik göndəriləcək  
✅ Müştəri sorğuları birbaşa inbox-a düşəcək  

---

**🔗 Faydalı Linklər:**
- Resend Docs: https://resend.com/docs
- API Reference: https://resend.com/docs/api-reference
- Support: https://resend.com/support
