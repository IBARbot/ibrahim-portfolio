# 🔐 Admin Panel Quraşdırma Təlimatı

## 📋 Ümumi Məlumat

Bu təlimat sizin üçün admin panel quraşdırılmasını asanlaşdırmaq üçün hazırlanıb.

---

## 🎯 Quraşdırma Addımları

### 1️⃣ Admin İstifadəçi Yaradın

İlk dəfə admin hesabı yaratmaq üçün bu addımları izləyin:

#### API Request:
```bash
POST https://[PROJECT_ID].supabase.co/functions/v1/make-server-45a44eb5/auth/signup

Headers:
{
  "Content-Type": "application/json",
  "Authorization": "Bearer [ANON_KEY]"
}

Body:
{
  "email": "admin@example.com",
  "password": "YourStrongPassword123!",
  "name": "Ibrahim Abdullayev"
}
```

#### cURL ilə:
```bash
curl -X POST \
  https://[PROJECT_ID].supabase.co/functions/v1/make-server-45a44eb5/auth/signup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [ANON_KEY]" \
  -d '{
    "email": "admin@example.com",
    "password": "YourStrongPassword123!",
    "name": "Ibrahim Abdullayev"
  }'
```

**⚠️ VACIB:** 
- `[PROJECT_ID]` və `[ANON_KEY]` yerlərinə Supabase layihənizin məlumatlarını yazın
- Bu məlumatları `/utils/supabase/info.tsx` faylında tapa bilərsiniz
- **Güclü şifrə seçin!**

---

### 2️⃣ Admin Panel-ə Daxil Olun

Admin hesabını yaratdıqdan sonra:

1. Brauzerinizdə `/admin` URL-ə gedin:
   ```
   https://your-site.com/admin
   ```

2. Yaratdığınız email və şifrə ilə daxil olun

3. İndi blog yazıları əlavə edə, redaktə edə və silə bilərsiniz!

---

## 🔑 Mövcud Admin Credentials (Müvəqqəti)

**⚠️ Bu test məlumatlarıdır - dərhal dəyişdirin!**

```
Email: admin@example.com
Şifrə: admin123
```

---

## 📝 Blog Yazısı Yaratma

Admin panel-də "Yeni Yazı" düyməsini klikləyin və aşağıdakı sahələri doldurun:

### Sahələr:

1. **Başlıq (EN/RU/AZ)**: Yazının başlığını hər üç dildə yazın
2. **Məzmun (EN/RU/AZ)**: Yazının məzmununu hər üç dildə yazın
3. **Şəkil URL**: Yazının şəkil linki (Unsplash və ya digər)
4. **Müəllif**: Sizin adınız
5. **Tarix**: Yazı tarixi (format: 2024-01-15)
6. **Kateqoriya**: Yazı kateqoriyası (məs. "Travel Tips")
7. **Gizli İstinadlar**: Optional - JSON format

### Gizli İstinadlar Format (Optional):
```json
[
  {
    "title": "IATA Travel Report 2024",
    "url": "https://www.iata.org",
    "source": "IATA"
  },
  {
    "title": "Best Flight Booking Practices",
    "url": "https://example.com",
    "source": "Travel Magazine"
  }
]
```

---

## 🎨 Admin Panel Funksiyaları

### ✅ Mövcud Funksiyalar:

- **Yazı Yaratma**: Yeni blog yazısı əlavə edin
- **Yazı Redaktəsi**: Mövcud yazını dəyişdirin
- **Yazı Silinməsi**: Yazını tamamilə silin
- **Canlı Preview**: Yazını yaratdıqca görün
- **Multi-Language**: 3 dildə dəstək (EN/RU/AZ)
- **Image Upload**: Şəkil linki əlavə edin
- **Hidden References**: Gizli mənbə istinadları

---

## 🔄 Backup və Recovery

### localStorage Backup:
Sistem avtomatik olaraq blog yazılarını localStorage-də də saxlayır. Bu səbəbdən:

1. Server problemləri olsa belə data itirilmir
2. Offline rejim dəstəyi
3. Sürətli load time

### Manuel Backup:
```javascript
// Browser Console-da:
const posts = localStorage.getItem("blogPosts");
console.log(JSON.parse(posts));
```

---

## 🔐 Təhlükəsizlik Tövsiyələri

### ✅ VACIB:

1. **Şifrəni Dəyişdirin**: Test şifrəsini dərhal dəyişdirin
2. **Güclü Şifrə**: Minimum 12 simvol, hərflər və rəqəmlər
3. **Email Təhlükəsizliyi**: Şəxsi emaildən istifadə edin
4. **HTTPS**: Yalnız HTTPS ilə istifadə edin
5. **Regular Logout**: İstifadə etmədikdə logout olun

### ⚠️ TÖVSİYƏLƏR:

- Public Wi-Fi-da admin panel-ə daxil olmayın
- Şifrəni heç kimlə paylaşmayın
- Şəkil URL-ləri HTTPS olsun
- Regular backuplar aparın

---

## 🐛 Troubleshooting

### Problem: "Icazə verilmədi" error

**Həll:**
1. Logout və yenidən login olun
2. Browser cache təmizləyin
3. Session yenilənsin

### Problem: Blog yazıları görünmür

**Həll:**
1. Dev Tools açın (F12)
2. Console-da errorları yoxlayın
3. localStorage-də `blogPosts` key-i yoxlayın
4. Server status-u yoxlayın

### Problem: Admin panel açılmır

**Həll:**
1. URL-in düzgün olduğunu yoxlayın: `/admin`
2. JavaScript aktiv olsun
3. Browser console errorları yoxlayın

---

## 📱 Mobile İstifadə

Admin panel mobile-da da işləyir:

- ✅ Responsive dizayn
- ✅ Touch-friendly
- ✅ Mobile optimizasiya

---

## 🚀 Növbəti Addımlar

Admin panel quraşdırıldıqdan sonra:

1. ✅ Test şifrəsini dəyişdirin
2. ✅ İlk blog yazınızı yaradın
3. ✅ Şəkilləri optimize edin
4. ✅ Regular backuplar aparın
5. ✅ Saytı test edin

---

## 📞 Dəstək

Problem yaşasanız:

1. Console errorları yoxlayın
2. Network requests yoxlayın (Dev Tools → Network)
3. Backend logs yoxlayın

---

## 🎉 Uğurlar!

Admin paneliniz hazırdır və istifadəyə hazırdır! Professional blog yazıları yaradıb saytınızı daha da zənginləşdirə bilərsiniz.

**İstəklərimizlə,**  
**Make Development Team** 🚀
