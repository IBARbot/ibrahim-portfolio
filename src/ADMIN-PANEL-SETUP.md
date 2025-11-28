# 🎯 ADMİN PANEL QURAŞDIRMA QAYDASI

## ✨ **HAZıRDA NEÇƏDİR?**

✅ **HAZIRDI:**
- Admin Login səhifəsi
- Admin Dashboard
- Blog Editor (3 dil dəstəyi)
- Bloq əlavə/redaktə/sil
- İstinad idarəetməsi
- Responsive dizayn
- LocalStorage ilə işləyir (müvəqqəti)

⚠️ **SUPABASE QURAŞDIRMA LAZIMDIR:**
- Real database
- Authentication
- Şəkil upload
- Çox cihazdan giriş

---

## 🚀 **ADMİN PANELƏ GİRİŞ**

### **ADDIM 1: Admin səhifəsinə get**

URL-ə `/admin` əlavə edin:

```
https://your-domain.com/admin
```

Və ya local test:
```
http://localhost:5173/admin
```

### **ADDIM 2: Giriş məlumatları (MOCK - Müvəqqəti)**

**⚠️ MÜVƏQQƏTİ TEST GİRİŞİ:**
- **Email:** `admin@example.com`
- **Şifrə:** `admin123`

**🔒 SUPABASE QURAŞDIRANDAN SONRA:**
- Öz email və şifrənizi yaradacaqsınız
- Təhlükəsiz authentication

---

## 📋 **HAZıRKI İMKANLAR (LocalStorage)**

### **✅ İşləyir:**
1. ✅ Login/Logout
2. ✅ Bloq əlavə etmək
3. ✅ Bloq redaktə etmək
4. ✅ Bloq silmək
5. ✅ 3 dildə məzmun əlavə etmək (EN, RU, AZ)
6. ✅ İstinadlar əlavə etmək
7. ✅ URL vasitəsilə şəkil əlavə etmək
8. ✅ Preview görüntüləmək

### **❌ İşləmir (Supabase lazımdır):**
1. ❌ Şəkil upload (yalnız URL)
2. ❌ Başqa cihazdan giriş
3. ❌ Real-time sync
4. ❌ Backup və recovery
5. ❌ Multi-user support

---

## 🔥 **SUPABASE İLƏ TAM QURAŞDIRMA**

### **ADDIM 1: Supabase Project Yarat**

1. **https://supabase.com** - Get Started
2. Sign in (Google və ya GitHub ilə)
3. **"New Project"** klikləyin
4. Project məlumatları:
   - **Name:** `ibrahim-portfolio`
   - **Database Password:** Güclü şifrə (yadda saxlayın!)
   - **Region:** Closest to Azerbaijan (Frankfurt və ya Stockholm)
5. "Create new project" klikləyin
6. 1-2 dəqiqə gözləyin

---

### **ADDIM 2: Database Cədvəli Yarat**

1. Sol menüdən **"Table Editor"** seçin
2. **"Create a new table"** klikləyin
3. Table adı: `blog_posts`
4. **Columns əlavə edin:**

| Column Name | Type | Default Value | Extra |
|-------------|------|---------------|-------|
| `id` | `uuid` | `gen_random_uuid()` | Primary, Auto |
| `created_at` | `timestamp` | `now()` | - |
| `title_en` | `text` | - | - |
| `title_ru` | `text` | - | - |
| `title_az` | `text` | - | - |
| `date_en` | `text` | - | - |
| `date_ru` | `text` | - | - |
| `date_az` | `text` | - | - |
| `excerpt_en` | `text` | - | - |
| `excerpt_ru` | `text` | - | - |
| `excerpt_az` | `text` | - | - |
| `content_en` | `text` | - | - |
| `content_ru` | `text` | - | - |
| `content_az` | `text` | - | - |
| `image_url` | `text` | - | - |
| `references_en` | `text` | - | - |
| `references_ru` | `text` | - | - |
| `references_az` | `text` | - | - |
| `references` | `jsonb` | `'[]'` | - |

5. **"Save"** klikləyin

---

### **ADDIM 3: Storage (Şəkil Upload) Quraşdır**

1. Sol menüdən **"Storage"** seçin
2. **"Create a new bucket"** klikləyin
3. Bucket məlumatları:
   - **Name:** `blog-images`
   - **Public bucket:** ✅ **AÇIQ** (public access)
4. **"Create bucket"** klikləyin
5. Bucket açın və **"Policies"** tab-a get
6. **"New Policy"** → **"For full customization"**
7. Policy adı: `Public Access`
8. Policy definition:
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog-images' );

CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'blog-images' AND auth.role() = 'authenticated' );
```

---

### **ADDIM 4: Authentication Quraşdır**

1. Sol menüdən **"Authentication"** → **"Providers"** seçin
2. **"Email"** provider aktivdir (default)
3. **"Users"** tab-a get
4. **"Add user"** → **"Create new user"**
5. Öz məlumatlarınızı əlavə edin:
   - **Email:** `ibrahim.abdullayev1@gmail.com`
   - **Password:** Güclü şifrə (minimum 6 simvol)
   - **Auto Confirm User:** ✅ **AÇIQ**
6. **"Create user"** klikləyin

---

### **ADDIM 5: API Keys Əldə Et**

1. Sol menüdən **"Settings"** → **"API"** seçin
2. Aşağıdakıları kopyalayın:

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### **ADDIM 6: Kod Konfiqurasiyası**

#### **6.1 Supabase Client Yarat**

`/lib/supabase.ts` faylı yaradın:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

#### **6.2 Package Yüklə**

```bash
npm install @supabase/supabase-js
```

#### **6.3 AdminPage.tsx-i Yenilə**

`/pages/AdminPage.tsx` faylında TODO comment-ləri silin və SUPABASE VERSION kodlarını aktivləşdirin:

**Login funksiyası:**
```typescript
const handleLogin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  localStorage.setItem("adminToken", data.session.access_token);
  setIsAuthenticated(true);
  loadPosts();
};
```

**Load posts funksiyası:**
```typescript
const loadPosts = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  setPosts(data || []);
};
```

**Create post:**
```typescript
const handleCreatePost = async (post: BlogPostData) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{
      title_en: post.titleEn,
      title_ru: post.titleRu,
      title_az: post.titleAz,
      date_en: post.dateEn,
      date_ru: post.dateRu,
      date_az: post.dateAz,
      excerpt_en: post.excerptEn,
      excerpt_ru: post.excerptRu,
      excerpt_az: post.excerptAz,
      content_en: post.contentEn,
      content_ru: post.contentRu,
      content_az: post.contentAz,
      image_url: post.imageUrl,
      references_en: post.referencesEn,
      references_ru: post.referencesRu,
      references_az: post.referencesAz,
      references: post.references,
    }])
    .select();
  
  if (error) throw error;
  
  await loadPosts();
};
```

**Update post:**
```typescript
const handleUpdatePost = async (post: BlogPostData) => {
  const { error } = await supabase
    .from('blog_posts')
    .update({
      title_en: post.titleEn,
      title_ru: post.titleRu,
      title_az: post.titleAz,
      // ... digər fieldlər
    })
    .eq('id', post.id);
  
  if (error) throw error;
  
  await loadPosts();
};
```

**Delete post:**
```typescript
const handleDeletePost = async (id: string) => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  
  await loadPosts();
};
```

**Image upload:**
```typescript
const handleUploadImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `blog-images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('blog-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
```

---

### **ADDIM 7: Blog.tsx-i Yenilə (Frontend)**

`/components/Blog.tsx` faylını yeniləyin ki Supabase-dən oxusun:

```typescript
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      // Transform data to match component format
      const transformedPosts = data.map(post => ({
        id: post.id,
        titleKey: post.title_en, // Use directly instead of translation key
        dateKey: post.date_en,
        excerptKey: post.excerpt_en,
        contentKey: post.content_en,
        imageUrl: post.image_url,
        referencesKey: post.references_en,
        references: post.references,
      }));
      setPosts(transformedPosts);
    }
    
    setIsLoading(false);
  };

  // Rest of component...
}
```

---

## 🎯 **QURAŞDIRMA CHECKLIST**

- [ ] Supabase project yaratdınız
- [ ] `blog_posts` table yaratdınız
- [ ] `blog-images` storage bucket yaratdınız
- [ ] Storage policies konfiqurasiya etdiniz
- [ ] Admin user yaratdınız
- [ ] API keys kopyaladınız
- [ ] `/lib/supabase.ts` yaratdınız
- [ ] `@supabase/supabase-js` package yüklədiniz
- [ ] `AdminPage.tsx` yenilədiniz
- [ ] `Blog.tsx` yenilədiniz
- [ ] Test etdiniz

---

## 🧪 **TEST ETMƏK**

### **1. Local Test:**
```bash
npm run dev
```

**Admin Panel:** http://localhost:5173/admin

### **2. Login Test:**
- Email və şifrənizi daxil edin
- "Daxil Ol" düyməsinə basın
- Dashboard açılmalıdır

### **3. Bloq Yarat:**
- "Yeni Bloq Yarat" düyməsinə basın
- 3 dildə məlumat doldurun
- Şəkil URL və ya upload edin
- "Yadda saxla" düyməsinə basın
- Bloq listdə görünməlidir

### **4. Frontend Test:**
- Ana səhifəyə qayıdın: http://localhost:5173
- Blog section-da yeni bloq görünməlidir

---

## 🔒 **TƏHLÜKƏSİZLİK**

### **✅ ETMƏK LAZIMDIR:**
1. ✅ Güclü şifrə istifadə edin (min 12 simvol)
2. ✅ Email-i gizli saxlayın
3. ✅ API keys-i GitHub-a push etməyin
4. ✅ `.env` faylında saxlayın

### **`.env` Faylı:**

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

**`.gitignore`-ə əlavə edin:**
```
.env
.env.local
```

**`supabase.ts`-də istifadə edin:**
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

---

## 🚀 **VERCEL DEPLOY**

### **Environment Variables əlavə et:**

1. Vercel dashboard-a get
2. Project seçin
3. **Settings** → **Environment Variables**
4. Əlavə edin:
   - `VITE_SUPABASE_URL` = your_url
   - `VITE_SUPABASE_ANON_KEY` = your_key
5. **Save**
6. **Redeploy** edin

---

## 📱 **TELEFONDAN İSTİFADƏ**

### **URL:**
```
https://your-domain.com/admin
```

1. URL-ə daxil olun
2. Login/password daxil edin
3. Bloq əlavə edin
4. Şəkil upload edin (telefon kamerasından)
5. 3 dildə mətn yazın
6. Publish edin!

**✨ Real-time işləyəcək! Kompüterdən və telefondan eyni vaxtda!**

---

## 🆘 **PROBLEM HƏLLI**

### **"Invalid login credentials"**
→ Email və şifrəni yoxlayın. Supabase-də user yaratdınızmı?

### **"Failed to fetch"**
→ Supabase URL və API key düzgündür?

### **"Permission denied"**
→ Row Level Security (RLS) policies düzgün konfiqurasiya olunub?

### **"Image upload failed"**
→ Storage bucket public-dir? Policies düzgündür?

---

## 💡 **TÖVSİYƏLƏR**

1. ✅ İlk öncə test bloq yaradın
2. ✅ Hər 3 dildə translation test edin
3. ✅ Şəkil upload test edin
4. ✅ Telefon və kompüterdən test edin
5. ✅ Password manager istifadə edin (1Password, Bitwarden)

---

## 📞 **KÖMƏK LAZIMDIR?**

Supabase quraşdırma zamanı problem olarsa, bildirin! 🚀
