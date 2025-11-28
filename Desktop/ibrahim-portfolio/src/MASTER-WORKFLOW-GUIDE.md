# 🎯 MASTER WORKFLOW GUIDE - HƏR DƏFƏ İSTİFADƏ ET!

## ⚡ QISA BAXIŞ - 5 ƏSAS ADDIM

```
1. PULL (Yeniliklər yüklə)
2. CHANGE (Dəyişiklik et)
3. TEST (Test et)
4. PUSH (GitHub-a göndər)
5. VERIFY (Netlify-da yoxla)
```

---

## 📋 DETALLI ADDIM-ADDIM TƏLİMAT

---

## **ADDIM 1: GITHUB-DAN YENİLİKLƏRİ YÜKLƏ** ⬇️

### **CMD-də proyekt qovluğuna get:**

```bash
cd C:\Users\YourUsername\Desktop\ibrahim-portfolio
```

*(Qovluq yolunu dəyiş - proyektin olduğu yerə uyğun)*

---

### **Ən son dəyişiklikləri GitHub-dan çək:**

```bash
git pull origin main
```

**Cavab belə olmalıdır:**
```
Already up to date.
```
və ya
```
Updating abc123..def456
Fast-forward
 src/App.tsx | 10 +++++++---
 1 file changed, 7 insertions(+), 3 deletions(-)
```

---

## **ADDIM 2: DEYİŞİKLİKLƏRİ ET** ✏️

### **VS Code-da faylları redaktə et:**

```bash
code .
```

*(Bu komanda VS Code-u açır)*

və ya **manuel olaraq** Figma Make-də və ya VS Code-da faylları dəyiş.

---

## **ADDIM 3: LOKAL TEST** 🧪

### **Development server-i işə sal:**

```bash
npm run dev
```

**Brauzerdə aç:**
```
http://localhost:5173
```

### **Yoxla:**
- ✅ Dizayn düzgündürmü?
- ✅ Funksiyalar işləyirmi?
- ✅ Console-da error yoxdur?
- ✅ Formlar submit olur?

### **Test bitdikdən sonra server-i dayandır:**
```
CTRL + C
```

---

## **ADDIM 4: GIT COMMIT VƏ PUSH** 🚀

### **A) Dəyişiklikləri yoxla:**

```bash
git status
```

**Qırmızı rəngdə** dəyişmiş faylları görəcəksən:
```
modified:   src/App.tsx
modified:   components/Hero.tsx
```

---

### **B) Bütün dəyişiklikləri stage-ə əlavə et:**

```bash
git add .
```

*(nöqtə `.` bütün faylları əlavə edir)*

və ya **xüsusi fayl əlavə et:**
```bash
git add src/App.tsx
git add components/Hero.tsx
```

---

### **C) Commit message yaz:**

```bash
git commit -m "✅ Dəyişikliyin izahı buraya"
```

**Yaxşı commit message nümunələri:**
```bash
git commit -m "✅ Google Sheets integration əlavə edildi"
git commit -m "🐛 Hero section form bug düzəldildi"
git commit -m "🎨 Contact page dizaynı yeniləndi"
git commit -m "⚡ Performance optimization"
git commit -m "📧 Email sistem yeniləndi"
```

---

### **D) GitHub-a push et:**

```bash
git push origin main
```

**Cavab belə olmalıdır:**
```
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Writing objects: 100% (3/3), 280 bytes | 280.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0)
To https://github.com/username/ibrahim-portfolio.git
   abc123..def456  main -> main
```

---

## **ADDIM 5: NETLIFY-DA YOXLA** ✅

### **A) Netlify Dashboard-a get:**

1. Aç: https://app.netlify.com/
2. **"ibrahim-portfolio"** siteni tap
3. **"Deploys"** tab-ına get

---

### **B) Deploy statusunu yoxla:**

Deploy prosesi **2-5 dəqiqə** çəkir:

```
🟡 Building...  (Quraşdırılır)
⬇️ 
🟢 Published   (Yayımlandı) ✅
```

---

### **C) Canlı saytı yoxla:**

```
https://ibrahimabdullayev.com
```

### **Yoxlamalı olduqların:**
- ✅ Dəyişikliklər görünür?
- ✅ Heç bir broken link yoxdur?
- ✅ Formlar işləyir?
- ✅ Console-da error yoxdur? (F12)

---

## 🔧 **ÜMUMI GIT KOMANDALAR**

### **Status yoxla:**
```bash
git status
```

### **Dəyişiklikləri gör:**
```bash
git diff
```

### **Commit tarixçəsi:**
```bash
git log --oneline
```

### **Son commit-i geri al (DIQQAT!):**
```bash
git reset --soft HEAD~1
```

### **Lokal dəyişiklikləri sil və GitHub-dakı versiyaya qayıt:**
```bash
git reset --hard origin/main
```

---

## 🆘 **PROBLEM HƏLL ETMƏ**

### **❌ Problem: "git push" işləmir**

**Səbəb 1:** Əvvəlcə pull etməlisən
```bash
git pull origin main
git push origin main
```

**Səbəb 2:** Konflikt var (merge conflict)
```bash
git status
# Konfliktli faylları VS Code-da aç və düzəlt
git add .
git commit -m "🔧 Merge conflict həll edildi"
git push origin main
```

---

### **❌ Problem: "npm run dev" işləmir**

**Həll 1:** Node modules yenidən yüklə
```bash
npm install
npm run dev
```

**Həll 2:** Cache-i təmizlə
```bash
npm cache clean --force
rm -rf node_modules
npm install
npm run dev
```

---

### **❌ Problem: Netlify deploy uğursuz oldu**

**Yoxla:**
1. Netlify Deploy logs-a bax (hansı error var?)
2. Build command düzgündürmü: `npm run build`
3. Publish directory düzgündürmü: `dist`
4. Node version uyğundurmu? (Netlify settings)

**Düzəlt:**
```bash
# Lokal build test et
npm run build

# Əgər error varsa, onu həll et
# Sonra push et
git add .
git commit -m "🐛 Build error həll edildi"
git push origin main
```

---

## 📦 **TƏMİZ WORKFLOW (TEMPLATE)**

Hər dəfə bu ardıcıllığı izlə:

```bash
# 1. Proyekt qovluğuna get
cd C:\path\to\ibrahim-portfolio

# 2. GitHub-dan son versiyani çək
git pull origin main

# 3. VS Code aç və dəyişiklik et
code .

# 4. Test et
npm run dev
# (Browser: http://localhost:5173)
# (Ctrl+C ilə dayandır)

# 5. Dəyişiklikləri yoxla
git status

# 6. Stage-ə əlavə et
git add .

# 7. Commit et
git commit -m "✅ Dəyişikliyin təsviri"

# 8. GitHub-a push et
git push origin main

# 9. Netlify-da yoxla (2-5 dəqiqə gözlə)
# https://app.netlify.com/
# https://ibrahimabdullayev.com
```

---

## 🎯 **EMOJI GUIDE (Commit Messages üçün)**

```
✅ - Feature əlavə edildi
🐛 - Bug düzəldildi
🎨 - Dizayn dəyişikliyi
⚡ - Performance təkmilləşdirilməsi
📧 - Email sistemi
🔧 - Konfiqurasiya dəyişikliyi
📝 - Dokumentasiya yeniləndi
🚀 - Deploy və ya release
🔒 - Təhlükəsizlik yamağı
♻️ - Kod refactor
🗑️ - Kod və ya fayl silindi
```

---

## 📞 **YARDIM LAZIM OLSA**

### **Git problemləri:**
```bash
git status
git log --oneline
```
Screenshot çək və soruş!

### **Build problemləri:**
```bash
npm run build
```
Error mesajını kopyala və soruş!

### **Netlify problemləri:**
Netlify deploy log screenshot-ini göndər!

---

## 🎓 **ƏLAVƏ ÖYRƏNMƏK ÜÇÜN**

### **Git öyrən:**
- https://git-scm.com/doc
- https://learngitbranching.js.org/

### **GitHub öyrən:**
- https://docs.github.com/en/get-started

### **Netlify öyrən:**
- https://docs.netlify.com/

---

## ⚡ **QISA REFERANS KART**

```
┌─────────────────────────────────────────┐
│  EVERYDAY GIT WORKFLOW                  │
├─────────────────────────────────────────┤
│  git pull origin main                   │  ← Yenilikləri çək
│  [code changes]                         │  ← Dəyişiklik et
│  npm run dev                            │  ← Test et
│  git add .                              │  ← Stage-ə əlavə et
│  git commit -m "✅ Message"             │  ← Commit et
│  git push origin main                   │  ← Push et
│  [check Netlify]                        │  ← Yoxla
└─────────────────────────────────────────┘
```

---

## 🎯 **ÖNƏMLİ QEYDLƏR**

1. ✅ **Həmişə əvvəlcə `git pull`** - konfliktləri minimuma endir
2. ✅ **Həmişə lokal test et** - broken code push etmə
3. ✅ **Commit message aydın olsun** - gələcəkdə tapmaq asan olsun
4. ✅ **Kiçik commit-lər et** - böyük dəyişikliklər əvəzinə
5. ✅ **Netlify deploy-u yoxla** - push etdikdən 5 dəqiqə sonra

---

## 📚 **YARATILMIŞ TƏLİMAT FAYLLAR**

1. `/MASTER-WORKFLOW-GUIDE.md` ← **BU FAYL** (hər dəfə oxu!)
2. `/GOOGLE-SHEETS-SETUP-COMPLETE.md` ← Google Sheets setup
3. `/GOOGLE-SHEETS-HEADERS-SETUP.md` ← Sheets başlıqları
4. `/DEPLOYMENT-GUIDE.md` ← Deployment təlimatı
5. `/README.md` ← Proyekt haqqında

---

## 🎉 **BU FAYLDAN NECƏ İSTİFADƏ EDİM?**

### **Hər dəfə kod dəyişikliyi edəndə:**

1. Bu faylı aç: `/MASTER-WORKFLOW-GUIDE.md`
2. **"TƏMİZ WORKFLOW"** bölməsini izlə
3. Komandaları bir-bir icra et
4. Problem olarsa **"PROBLEM HƏLL ETMƏ"** bölməsinə bax

### **CMD-də hər dəfə:**

```bash
# Bu komandaları yadda saxla və hər dəfə işlət:

git pull origin main         # Çək
# [dəyişiklik et]
npm run dev                  # Test et
git add .                    # Əlavə et
git commit -m "✅ Message"   # Commit
git push origin main         # Push et
```

---

## 💡 **PRO TIP**

Bu faylı **CMD yanında** aç və hər addımı izlə!

**Windows:**
```
Win + Right Arrow  (CMD sağda)
Win + Left Arrow   (VS Code solda)
```

---

**🎯 BU FAYLIN ƏSAS MƏQSƏDI:**
**Hər dəfə kod dəyişəndə addım-addım workflow!** 🚀

**🔖 Bookmark et və hər dəfə istifadə et!** ⭐

---

## ✅ YARADILIŞ TARİXİ

- **Tarix:** 28/11/2025
- **Məqsəd:** Master workflow referansı
- **Yeniləmə:** Lazım olduqca yenilə

---

**📌 BU FAYIL HƏMIŞƏ ƏLINDƏ OLSUN! HƏR COD DEYİŞİKLİYİ ÜÇÜN REFERANS!** 🎯
