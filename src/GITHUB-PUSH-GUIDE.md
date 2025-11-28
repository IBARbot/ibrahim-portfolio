# 🚀 GITHUB-A PUSH ETMƏK ÜÇÜN QISA TƏLİMAT

## 📥 ADDIM 1: Kodları Yüklə

### Variant A: Zip File (Ən Asan)
1. Figma Make-də **Export** və ya **Download** düyməsini tap
2. Bütün faylları yüklə
3. Zip-i kompüterinizdə açın

---

## 📂 ADDIM 2: Terminal/Command Prompt Aç

### Windows:
- `Win + R` bas
- `cmd` yaz və Enter
- Proyekt qovluğuna get:
```bash
cd C:\Users\YourName\Desktop\ibrahim-portfolio
```

### Mac/Linux:
- Terminal aç
- Proyekt qovluğuna get:
```bash
cd ~/Desktop/ibrahim-portfolio
```

---

## 🔧 ADDIM 3: Git Yüklə (əgər yoxdursa)

### Windows:
https://git-scm.com/download/win - yüklə və quraşdır

### Mac:
```bash
brew install git
```

### Linux:
```bash
sudo apt-get install git
```

**Test et:**
```bash
git --version
```
Əgər nömrə görsənir (məsələn: `git version 2.40.0`) - hazırsınız! ✅

---

## 🌐 ADDIM 4: GitHub Repository Yarat

1. Brauzerə get: https://github.com/new
2. Repository adı: **`ibrahim-portfolio`**
3. **Public** seç (və ya Private istəyirsinizsə)
4. ❌ **README, .gitignore əlavə ETMƏ** (artıq var!)
5. **"Create repository"** düyməsinə bas

GitHub sizə əmrlər göstərəcək - onları kopyalayın! 📋

---

## 💻 ADDIM 5: Terminal-da Əmrlər

Proyekt qovluğunda terminalda bu əmrləri **sıra ilə** yazın:

### 1️⃣ Git-i başlat
```bash
git init
```

### 2️⃣ Faylları əlavə et
```bash
git add .
```

### 3️⃣ İlk commit
```bash
git commit -m "Initial commit - Full portfolio website"
```

### 4️⃣ GitHub repository əlavə et
```bash
git remote add origin https://github.com/YOUR_USERNAME/ibrahim-portfolio.git
```

**⚠️ DİQQƏT:** `YOUR_USERNAME` əvəzinə **öz GitHub username-nizi** yazın!

**Məsələn:**
```bash
git remote add origin https://github.com/ibrahim-abdullayev/ibrahim-portfolio.git
```

### 5️⃣ Branch adı təyin et
```bash
git branch -M main
```

### 6️⃣ GitHub-a push et
```bash
git push -u origin main
```

---

## ✅ ADDIM 6: Yoxla

1. Brauzerə get: https://github.com/YOUR_USERNAME/ibrahim-portfolio
2. Bütün faylları görməlisiniz! 🎉

---

## 🚀 NÖVBƏTI ADDIM: Vercel Deploy

İndi kodlar GitHub-dadır! Növbəti addım:

1. https://vercel.com - get
2. **"Add New"** → **"Project"**
3. GitHub repository seç: **ibrahim-portfolio**
4. **"Import"** düyməsinə bas
5. Environment variables əlavə et (aşağıda)
6. **"Deploy"** düyməsinə bas

### Environment Variables (Vercel-də)

```env
SUPABASE_URL=https://xxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_DB_URL=postgresql://postgres:...
ADMIN_EMAIL=info@ibrahimabdullayev.com
```

Bu açarları **Supabase dashboard**-dan götürəcəksiniz (növbəti addımda göstərəcəm).

---

## 📋 SON CHECKLIST

Push etməzdən ƏVVƏL yoxla:

- [ ] ✅ `.gitignore` faylı var
- [ ] ✅ `README.md` var
- [ ] ✅ Bütün fayllar qovluqdadır
- [ ] ✅ Terminal proyekt qovluğundadır
- [ ] ✅ GitHub username düzgün yazılıb

---

## 🆘 PROBLEMLƏR?

### **"git: command not found"**
Git quraşdırılmayıb. Yuxarıda ADDIM 3-ə bax.

### **"Permission denied"**
GitHub-a SSH key əlavə et və ya HTTPS ilə login et:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### **"remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/ibrahim-portfolio.git
```

### **"failed to push"**
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 🎯 SONRADAN DƏYİŞİKLİK PUSH ETMƏK

Kodda dəyişiklik etdinizdə:

```bash
# 1. Dəyişiklikləri əlavə et
git add .

# 2. Commit et
git commit -m "Dəyişikliyin təsviri"

# 3. Push et
git push

# ✅ Vercel avtomatik deploy edəcək!
```

---

## 📞 ƏLAVƏ SUALLAR?

Tam deployment guide:
- `/DEPLOYMENT-FINAL.md` - Bütün addımlar (GitHub, Supabase, Vercel)

İndi GitHub-a push edək! 🚀
