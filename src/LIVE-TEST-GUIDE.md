# 🚀 LIVE TEST GÖSTƏRİŞİ

## ✅ Sayt İNDİ LIVE-dir və Test Etməyə Hazırdır!

---

## 🎯 TEST ADDIMLAR

### **ADDIM 1: Admin Account Yaratmaq** (5 dəqiqə)

1. **Preview pəncərəsində URL-in sonuna əlavə edin:**
   ```
   /admin-setup
   ```

2. **Formu doldurun:**
   - **Ad Soyad**: İbrahim Abdullayev
   - **Email**: ibrahim@admin.com
   - **Şifrə**: Ibrahim2024! (və ya istədiyiniz şifrə, min 8 simvol)

3. **"Admin Yarat" düyməsinə basın**

4. **Uğurlu olarsa:**
   - ✅ Yaşıl mesaj görəcəksiniz: "Admin Yaradıldı! 🎉"
   - ✅ Email və şifrə göstəriləcək
   - ✅ "Admin Panel-ə Get →" düyməsi görünəcək

---

### **ADDIM 2: Admin Panel-ə Giriş** (2 dəqiqə)

1. **"Admin Panel-ə Get →" düyməsinə basın**  
   Və ya manual olaraq URL-ə gedin:
   ```
   /admin
   ```

2. **Login səhifəsində:**
   - Email: `ibrahim@admin.com`
   - Şifrə: Yaratdığınız şifrə

3. **"Daxil Ol" düyməsinə basın**

4. **Uğurlu olarsa:**
   - ✅ Admin Dashboard açılacaq
   - ✅ 4 tab görəcəksiniz: Bloqlar, Mesajlar, Newsletter, Statistika

---

### **ADDIM 3: Blog Yaratmaq** (5 dəqiqə)

1. **"Yeni Bloq Yarat" düyməsinə basın** (yuxarı sağda və ya ortada)

2. **Blog Editor açılacaq. Formu doldurun:**

   **English (EN):**
   - Title: "How to Find Cheap Flight Tickets"
   - Excerpt: "Expert tips for finding the best deals on flights"
   - Content: "As a flight consultant, I've helped hundreds of clients..."

   **Russian (RU):**
   - Title: "Как найти дешевые авиабилеты"
   - Excerpt: "Советы от эксперта по поиску лучших предложений"
   - Content: "Как консультант по авиабилетам, я помог сотням..."

   **Azerbaijani (AZ):**
   - Title: "Ucuz Aviabilet Necə Tapmaq Olar"
   - Excerpt: "Ən yaxşı təklifləri tapmaq üçün ekspert məsləhətləri"
   - Content: "Aviabilet üzrə məsləhətçi olaraq, yüzlərlə müştəriyə..."

   **Date**: "November 24, 2024"

   **Image URL**: Şəkil əlavə edin (və ya boş buraxın)

   **References**: Əlavə etmək istəsəniz (ixtiyari)

3. **"Yadda Saxla" düyməsinə basın**

4. **Uğurlu olarsa:**
   - ✅ Modal bağlanacaq
   - ✅ Blog siyahıda görünəcək
   - ✅ Ana səhifəyə gedin və Blog bölməsini yoxlayın - orada da görünməlidir!

---

### **ADDIM 4: Ana Səhifədə Test** (10 dəqiqə)

1. **Ana səhifəyə gedin (URL-dən `/admin` silin)**

2. **Blog bölməsini tapın:**
   - ✅ Yaratdığınız bloq görünür?
   - ✅ Şəkil düzgündür?
   - ✅ "Read More" düyməsi işləyir?

3. **Contact Formu test edin:**
   - Ad: "Test İstifadəçi"
   - Email: "test@example.com"
   - Telefon: "+994501234567"
   - Mesaj: "Salam, mən aviabilet məsləhəti almaq istəyirəm"
   - **"Mesaj Göndər" düyməsinə basın**

4. **Admin Panel-ə qayıdın və "Mesajlar" tab-ına gedin:**
   - ✅ Göndərdiyiniz mesaj görünür?
   - ✅ Status "new" olaraq qeyd edilib?
   - ✅ Status dəyişdirə bilirsiniz?

---

### **ADDIM 5: Blog Redaktə və Silmə** (5 dəqiqə)

1. **Admin Panel → Bloqlar tab-ında:**

2. **"Redaktə" düyməsinə basın:**
   - ✅ Blog Editor açılır və məlumatlar yüklənir?
   - Başlığı dəyişdirin: "UPDATED: How to Find..."
   - "Yadda Saxla" düyməsinə basın
   - ✅ Dəyişikliklər qeyd edildi?

3. **"Sil" düyməsinə basın:**
   - ✅ Təsdiq dialoqu açılır?
   - "Bəli, sil" düyməsinə basın
   - ✅ Blog silindi?
   - ✅ Ana səhifədə artıq görünmür?

---

### **ADDIM 6: Statistika Yoxlama** (2 dəqiqə)

1. **Admin Panel → Statistika tab-ı:**
   - ✅ Ümumi bloqlar sayı düzgündür?
   - ✅ Mesajlar sayı düzgündür?
   - ✅ Bu gün ziyarətçilər qeyd olunur?

---

## 🐛 PROBLEM HAL EDƏK

### **Console-u açın (F12 → Console tab):**

**Ümumi Xətalar:**

1. **"Network error" və ya "Failed to fetch"**
   - ✔️ İnternet bağlantısını yoxlayın
   - ✔️ Browser console-da API URL-i yoxlayın
   - ✔️ Supabase serverlər işləyir?

2. **"İcazə verilmədi" (401 Unauthorized)**
   - ✔️ Yenidən login edin
   - ✔️ Session-un expire olmadığını yoxlayın
   - ✔️ Admin Panel-dən logout edib yenidən giriş edin

3. **"Admin yaradıla bilmədi"**
   - ✔️ Email artıq istifadə olunub?
   - ✔️ Şifrə çox qısa (min 8 simvol)?
   - ✔️ Console-da error mesajını oxuyun

4. **"Blog yaradıla bilmədi"**
   - ✔️ Bütün tələb olunan sahələr doldurulub?
   - ✔️ Auth token mövcuddur?
   - ✔️ Console-da error mesajını oxuyun

5. **Backend işləmir**
   - ✔️ Bu URL-ə gedin: `/make-server-45a44eb5/health`
   - ✔️ `{"status":"ok"}` görünürsə server işləyir
   - ✔️ Error görünsə, Supabase server yoxlanmalıdır

---

## ✅ NƏTICƏ

Bütün addımları tamamlasanız:

- ✅ Admin account yaradıldı
- ✅ Login/Logout işləyir
- ✅ Blog CRUD (Create, Read, Update, Delete) işləyir
- ✅ Contact mesajları backend-ə göndərilir və Admin Panel-də görünür
- ✅ Backend tam işləyir (Supabase + KV Store)
- ✅ Data davamlıdır (localStorage-ə deyil, backend-ə yazılır)

---

## 🎉 MÜVƏFFƏQIYYƏT!

Əgər bütün testlər uğurlu keçibsə, saytınız **production-a hazırdır!**

### Növbəti Addımlar:

1. **Newsletter komponenti əlavə etmək** (Frontend-də subscribe formu)
2. **Analytics auto-tracking** (Hər səhifə yüklənəndə pageview)
3. **Image upload** (Blog-da şəkil yükləmək)
4. **Email notifications** (Yeni mesaj gələndə email göndərmək)

---

## 📞 ƏLAQƏ

Problem yaranarsa:
- Console-u yoxlayın (F12)
- Network tab-da API requests-i izləyin
- Error mesajlarını oxuyun

**Sualınız var? Soruşun!** 🚀
