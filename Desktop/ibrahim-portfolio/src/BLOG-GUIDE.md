# 📝 BLOG İDARƏETMƏ QAYDASI

## 🎯 Yeni Blog Əlavə Etmək

### 1️⃣ Blog Post Strukturu

`/components/Blog.tsx` faylında `blogPosts` array-inə yeni post əlavə edin:

```typescript
{
  id: "unique-blog-id",                    // Unikal ID
  titleKey: "blog.postX.title",            // Translation key
  dateKey: "blog.postX.date",              // Tarix key
  excerptKey: "blog.postX.excerpt",        // Qısa məzmun key
  contentKey: "blog.postX.content",        // Tam mətn key
  imageUrl: "https://...",                 // Şəkil URL
  referencesKey: "blog.postX.referencesTitle",  // İstinadlar başlığı
  references: [
    {
      title: "İstinad başlığı",
      url: "https://...",
      source: "Mənbə adı"                  // Optional
    }
  ]
}
```

---

## 2️⃣ Translation Əlavə Etmək

### `/contexts/LanguageContext.tsx` faylında 3 dildə translation əlavə edin:

#### **İNGİLİS (EN):**
```typescript
// Blog
"blog.badge": "Travel Insights",
"blog.title": "Flight Booking Tips & Insights",
"blog.subtitle": "Expert advice and industry insights to help you book smarter.",
"blog.noPosts": "No blog posts yet. Check back soon!",

// Post 1 (example)
"blog.post1.title": "Top 10 Flight Booking Tips for 2024",
"blog.post1.date": "December 2024",
"blog.post1.excerpt": "Learn the best strategies to save money on flights...",
"blog.post1.content": "Full detailed content here...\n\nUse \\n\\n for paragraphs.",
"blog.post1.referencesTitle": "References & Sources",
```

#### **RUS (RU):**
```typescript
// Blog
"blog.badge": "Советы по Путешествиям",
"blog.title": "Советы и Рекомендации по Бронированию",
"blog.subtitle": "Экспертные советы для умного бронирования.",
"blog.noPosts": "Пока нет постов. Скоро будет!",

// Post 1
"blog.post1.title": "10 Лучших Советов по Бронированию 2024",
"blog.post1.date": "Декабрь 2024",
"blog.post1.excerpt": "Узнайте лучшие стратегии экономии...",
"blog.post1.content": "Полное содержание здесь...",
"blog.post1.referencesTitle": "Источники и Ссылки",
```

#### **AZƏRBAYCAN (AZ):**
```typescript
// Blog
"blog.badge": "Səyahət Məsləhətləri",
"blog.title": "Aviabilet Rezervasiya Məsləhətləri",
"blog.subtitle": "Ağıllı rezervasiya üçün ekspert məsləhətləri.",
"blog.noPosts": "Hələ blog yazısı yoxdur. Tezliklə!",

// Post 1
"blog.post1.title": "2024 üçün Top 10 Rezervasiya Məsləhəti",
"blog.post1.date": "Dekabr 2024",
"blog.post1.excerpt": "Uçuşlarda pul qənaət etmək üçün ən yaxşı strategiyalar...",
"blog.post1.content": "Tam ətraflı məzmun burada...",
"blog.post1.referencesTitle": "İstinadlar və Mənbələr",
```

---

## 3️⃣ AUTO-TRANSLATION (Avtomatik Tərcümə)

### ⚠️ MÜHİM QEYD:
Avtomatik tərcümə üçün **API Key** lazımdır. İki variant:

### **VARIANT A: Google Translate API (Ödənişli)**

#### 1. Google Cloud Console-da API aktivləşdirin
#### 2. API Key əldə edin
#### 3. Kod nümunəsi:

```typescript
async function translateText(text: string, targetLang: string) {
  const API_KEY = "YOUR_GOOGLE_TRANSLATE_API_KEY";
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      target: targetLang,
      format: "text"
    })
  });
  
  const data = await response.json();
  return data.data.translations[0].translatedText;
}

// İstifadə:
const ruTranslation = await translateText("Hello world", "ru");
const azTranslation = await translateText("Hello world", "az");
```

### **VARIANT B: LibreTranslate (Pulsuz, Self-hosted)**

```typescript
async function translateText(text: string, targetLang: string) {
  const response = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "en",
      target: targetLang,
      format: "text"
    })
  });
  
  const data = await response.json();
  return data.translatedText;
}
```

### **VARIANT C: Manual (Hazırkı Yol - ÖNƏRİLƏN)**

1. İNGİLİS dilində yazın
2. Google Translate və ya ChatGPT istifadə edərək tərcümə edin
3. Keyfiyyətli tərcümə üçün nəzərdən keçirin
4. 3 dildə də LanguageContext.tsx-ə əlavə edin

**ÖNƏRİ:** Manual yol daha keyfiyyətli tərcümə verir!

---

## 4️⃣ Şəkil Əlavə Etmək

### **Unsplash (Tövsiyə Olunan):**
```
https://images.unsplash.com/photo-[ID]?w=800&q=80
```

### **Öz Şəkiliniz:**
1. Şəkili `/public/images/` folderinə yükləyin
2. URL: `/images/your-image.jpg`

### **External URL:**
İstənilən şəkil URL istifadə edə bilərsiniz.

---

## 5️⃣ Nümunə - Tam Blog Post

### **Blog.tsx-ə əlavə:**
```typescript
{
  id: "azerbaijan-travel-2024",
  titleKey: "blog.post4.title",
  dateKey: "blog.post4.date",
  excerptKey: "blog.post4.excerpt",
  contentKey: "blog.post4.content",
  imageUrl: "https://images.unsplash.com/photo-1557843656-7a2b1f8b9e71?w=800&q=80",
  referencesKey: "blog.post4.referencesTitle",
  references: [
    {
      title: "Azerbaijan Tourism Board",
      url: "https://azerbaijan.travel",
      source: "Official Tourism"
    },
    {
      title: "IATA Baku Hub Report",
      url: "https://www.iata.org",
      source: "IATA"
    }
  ]
}
```

### **LanguageContext.tsx-ə translations:**

```typescript
// EN
"blog.post4.title": "Flying to Azerbaijan: Complete Guide 2024",
"blog.post4.date": "November 2024",
"blog.post4.excerpt": "Everything you need to know about booking flights to Baku and exploring Azerbaijan.",
"blog.post4.content": "Azerbaijan is becoming increasingly popular...\n\nBaku International Airport (GYD) serves as the main hub...\n\nBest time to visit: April-June and September-October.",
"blog.post4.referencesTitle": "Useful Resources",

// RU
"blog.post4.title": "Полет в Азербайджан: Полное Руководство 2024",
"blog.post4.date": "Ноябрь 2024",
"blog.post4.excerpt": "Всё, что нужно знать о бронировании рейсов в Баку и путешествиях по Азербайджану.",
"blog.post4.content": "Азербайджан становится всё более популярным...",
"blog.post4.referencesTitle": "Полезные Ресурсы",

// AZ
"blog.post4.title": "Azərbaycana Uçuş: Tam Bələdçi 2024",
"blog.post4.date": "Noyabr 2024",
"blog.post4.excerpt": "Bakıya uçuş rezervasiyası və Azərbaycanda səyahət haqqında bilməli olduğunuz hər şey.",
"blog.post4.content": "Azərbaycan getdikcə daha populyar olur...",
"blog.post4.referencesTitle": "Faydalı Mənbələr",
```

---

## 6️⃣ İstinadları Gizli Saxlamaq

✅ **AVTOMATIK!** İstinadlar default olaraq **gizli** (collapsed) olur.

İstifadəçi "References (3)" düyməsinə basanda açılır.

---

## 7️⃣ Tips & Best Practices

### ✅ **Şəkil Optimizasyonu:**
- 800px width kifayətdir
- WebP format tövsiyə olunur
- Unsplash `?w=800&q=80` parametrləri istifadə edin

### ✅ **SEO:**
- Başlıqlar aydın və descriptive olsun
- 150-200 simvol excerpt
- Şəkillərə alt text əlavə olunur avtomatik

### ✅ **Mətn Formatı:**
- `\n\n` istifadə edərək paraqraflar ayırın
- 300-800 söz optimal uzunluqdur
- Bullet points üçün `• ` istifadə edin

### ✅ **İstinadlar:**
- Minimum 2-3 etibarlı mənbə əlavə edin
- Rəsmi saytları prioritet verin
- Source field-i optional-dır

---

## 8️⃣ Yeni Post Əlavə Etmək - Checklist

- [ ] Blog.tsx-də yeni post object yarat
- [ ] Unikal ID təyin et
- [ ] Şəkil URL tap (Unsplash recommended)
- [ ] EN translation yaz
- [ ] RU translation yaz (manual və ya ChatGPT)
- [ ] AZ translation yaz (manual və ya ChatGPT)
- [ ] İstinadlar əlavə et
- [ ] Test et (localhost)
- [ ] GitHub-a push et
- [ ] Live saytda yoxla

---

## 🚀 Sual & Cavab

**S: Neçə blog post əlavə edə bilərəm?**  
C: Limitsiz! Lakin 6-12 post optimal UX verir.

**S: Video əlavə edə bilərəm?**  
C: Bəli! `<iframe>` və ya video URL istifadə edə bilərsiniz. Content field-ə HTML əlavə edin.

**S: Blog post-u necə silirəm?**  
C: Blog.tsx-dən həmin post object-i silin və translation key-ləri saxlaya bilərsiniz (optional).

**S: Auto-translation quality yaxşıdır?**  
C: API translations yaxşıdır, amma manual review tövsiyə olunur. ChatGPT ilə tərcümə + manual review = best quality.

---

## 📧 Əlaqə

Suallarınız olarsa, mənimlə əlaqə saxlayın! 🚀
