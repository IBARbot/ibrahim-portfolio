# 🎯 IBRAHIM ABDULLAYEV PORTFOLIO - PROJECT OVERVIEW

## 📌 PROYEKT HAQQINDA

**Sayt:** https://ibrahimabdullayev.com  
**Məqsəd:** Aviabilet məsləhətçisi üçün professional portfel vebsaytı  
**Status:** ✅ Production-da canlı (Netlify)  
**Son yeniləmə:** 28/11/2025

---

## 🏗️ ARXITEKTURA

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│  React + TypeScript + Tailwind + Vite                  │
│  https://ibrahimabdullayev.com (Netlify)               │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              GOOGLE SHEETS API (Apps Script)            │
│  - Form submissions qəbul edir                          │
│  - Google Sheets-ə yazır                                │
│  - Gmail-a email göndərir                               │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  GOOGLE SHEETS DATABASE                 │
│  "Ibrahim Portfolio Booking API"                        │
│  Columns: Tarix | Növ | Ad | Email | Telefon | Detallar│
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                      GMAIL INBOX                        │
│  ibrahim.abdullayev1@gmail.com                          │
│  Hər submission üçün email notification                 │
└─────────────────────────────────────────────────────────┘
```

---

## 🌟 ƏSAS XÜSUSİYYƏTLƏR

### 1️⃣ **Multilingual Support**
- 🇬🇧 English
- 🇷🇺 Russian
- 🇦🇿 Azerbaijani
- ✅ Geo-location based auto-detection

### 2️⃣ **Booking System**
- ✈️ Flight Booking (one-way, round-trip, multi-city)
- 🏨 Hotel Booking (single, multiple destinations)
- 🛡️ Travel Insurance
- 🏛️ Embassy Appointment Booking
- 📧 Quick Contact Form

### 3️⃣ **Google Sheets Integration**
- ✅ Real-time form data yazılır
- ✅ Email notification avtomatik göndərilir
- ✅ Admin panel tələb olunmur (Google Sheets-də birbaşa baxırsan)

### 4️⃣ **Admin Panel** (localhost və ya VPN ilə)
- 🔐 Secure login
- 📊 Dashboard statistika
- 📝 Blog management (CRUD)
- 📧 Submission view (əvvəlki Supabase data)

### 5️⃣ **Performance & SEO**
- ⚡ Vite build tool
- 🎨 Tailwind CSS v4
- 📱 Responsive design
- 🔍 SEO optimized

---

## 📂 FAYL STRUKTURU

```
ibrahim-portfolio/
├── src/
│   ├── App.tsx                    # Main app & routing
│   └── main.tsx                   # Entry point
├── components/
│   ├── Hero.tsx                   # Ana səhifə (Quick Contact Form)
│   ├── BookingForm.tsx            # Əsas booking modal
│   ├── Contact.tsx                # Əlaqə səhifəsi
│   ├── About.tsx                  # Haqqımda
│   ├── Services.tsx               # Xidmətlər
│   ├── Blog.tsx                   # Blog list
│   ├── AdminDashboard.tsx         # Admin panel
│   ├── Navigation.tsx             # Navbar
│   ├── FloatingWhatsApp.tsx       # WhatsApp floating button
│   └── WelcomeModal.tsx           # Welcome popup
├── contexts/
│   └── LanguageContext.tsx        # Multi-language support
├── utils/
│   ├── api.ts                     # API helper
│   └── supabase/                  # Supabase client
├── styles/
│   └── globals.css                # Global styles + Tailwind
├── supabase/functions/server/
│   ├── index.tsx                  # Edge function (admin routes)
│   └── kv_store.tsx               # Database helper
├── MASTER-WORKFLOW-GUIDE.md       # ⭐ Əsas workflow təlimatı
├── CMD-QUICK-REFERENCE.md         # ⚡ Qısa komanda referansı
├── WORKFLOW-CHECKLIST.txt         # ✅ Checklist
├── GOOGLE-SHEETS-SETUP-COMPLETE.md # 📊 Google Sheets təlimatı
├── package.json                   # Dependencies
├── vite.config.ts                 # Vite config
└── netlify.toml                   # Netlify config
```

---

## 🔌 INTEGRASİYALAR

### **Google Sheets API**
- **URL:** `https://script.google.com/macros/s/AKfycbxLJ.../exec`
- **Funksiya:** Form submissions qəbul edir və Google Sheets-ə yazır
- **Email:** ibrahim.abdullayev1@gmail.com-a notification göndərir

### **WhatsApp**
- **Nömrə:** +994555973923
- **Link:** `https://wa.me/994555973923`
- **Yer:** Floating button (hər səhifədə) + Contact section

### **Instagram**
- **Username:** @ibrahim_abdullar
- **Link:** `https://instagram.com/ibrahim_abdullar`
- **Yer:** Contact section + Footer

### **Gmail**
- **Email:** ibrahim.abdullayev1@gmail.com
- **İstifadə:** Form submissions notification alır

---

## 🚀 DEPLOYMENT FLOW

```
1. Lokal kod dəyişikliyi (VS Code / Figma Make)
         ↓
2. Lokal test (npm run dev)
         ↓
3. Git commit & push
         ↓
4. GitHub repository yenilənir
         ↓
5. Netlify auto-deploy (2-5 dəq)
         ↓
6. https://ibrahimabdullayev.com yenilənir ✅
```

---

## 📋 HƏR DƏFƏ KOD DEYİŞƏNDƏ (WORKFLOW)

```bash
# 1. Proyektə get
cd C:\Users\...\ibrahim-portfolio

# 2. Yenilikləri çək
git pull origin main

# 3. [Kod dəyişikliyi et - VS Code/Figma Make]

# 4. Test et
npm run dev
# → http://localhost:5173
# → CTRL + C (dayandır)

# 5. Commit et
git add .
git commit -m "✅ Dəyişiklik təsviri"
git push origin main

# 6. Netlify-da gözlə (2-5 dəq)
# → https://app.netlify.com/

# 7. Yoxla
# → https://ibrahimabdullayev.com
```

**📖 Detallı təlimat:** `/MASTER-WORKFLOW-GUIDE.md`

---

## 🧪 TESTING CHECKLIST

### **Lokal Test (http://localhost:5173)**
- [ ] Ana səhifə açılır
- [ ] Dil dəyişikliyi işləyir (EN/RU/AZ)
- [ ] Quick Contact Form submit olur
- [ ] Booking modal açılır (hər 4 növ)
- [ ] Navigation işləyir
- [ ] WhatsApp button işləyir
- [ ] Responsive dizayn düzgündür
- [ ] Console-da error yoxdur (F12)

### **Production Test (https://ibrahimabdullayev.com)**
- [ ] Sayt açılır
- [ ] SSL sertifikatı işləyir (🔒)
- [ ] Booking form submit olur
- [ ] Google Sheets-də yeni sətir görünür
- [ ] Gmail-a email gəlir
- [ ] Admin panel açılır (/admin)
- [ ] Blog səhifəsi işləyir
- [ ] Bütün linklər işləyir

---

## 🔐 CREDENTIALS & ACCESS

### **Google Sheets**
- **Spreadsheet:** "Ibrahim Portfolio Booking API"
- **URL:** https://docs.google.com/spreadsheets/
- **Apps Script:** https://script.google.com/home/projects/

### **Netlify**
- **Dashboard:** https://app.netlify.com/
- **Site:** ibrahim-portfolio (və ya custom domain)
- **Domain:** https://ibrahimabdullayev.com

### **GitHub**
- **Repo:** ibrahim-portfolio (private/public)
- **URL:** https://github.com/[username]/ibrahim-portfolio

### **Gmail**
- **Email:** ibrahim.abdullayev1@gmail.com
- **İstifadə:** Form notification alır

---

## 📊 GOOGLE SHEETS STRUKTUR

| Sütun | Məlumat |
|-------|---------|
| **A (Tarix)** | 28/11/2025 15:30:45 |
| **B (Növ)** | Uçuş Sifarişi ✈️ |
| **C (Ad)** | İbrahim Abdullayev |
| **D (Email)** | ibrahim@example.com |
| **E (Telefon)** | +994555973923 |
| **F (Detallar)** | Bakı → Dubai \| 01/12/2025... |

---

## 🛠️ DEVELOPMENT COMMANDS

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check

# Lint
npm run lint
```

---

## 📦 KEY DEPENDENCIES

```json
{
  "react": "^18.3.1",
  "typescript": "^5.6.3",
  "vite": "^6.0.1",
  "tailwindcss": "^4.0.0",
  "motion": "^11.14.4",
  "lucide-react": "latest",
  "@radix-ui/react-*": "latest",
  "sonner": "^2.0.3"
}
```

---

## 🐛 TROUBLESHOOTING

### **Problem: git push işləmir**
```bash
git pull origin main
git push origin main
```

### **Problem: npm run dev işləmir**
```bash
rm -rf node_modules
npm install
npm run dev
```

### **Problem: Netlify deploy fail**
```bash
npm run build  # lokal test
# Error-u düzəlt
git add .
git commit -m "🐛 Build error fix"
git push origin main
```

### **Problem: Google Sheets-ə yazılmır**
- Apps Script URL düzgündürmü?
- Apps Script deploy edilib?
- İzinlər verilmişdir?
- Console error varmı? (F12)

### **Problem: Email gəlmir**
- Gmail spam qovluğunu yoxla
- Apps Script `GmailApp.sendEmail()` çağırır?
- Email adresi düzgündürmü?

---

## 📞 SUPPORT & CONTACT

**İbrahim Abdullayev**
- 📱 WhatsApp: +994555973923
- 📧 Email: ibrahim.abdullayev1@gmail.com
- 📷 Instagram: @ibrahim_abdullar
- 🌐 Website: https://ibrahimabdullayev.com

---

## 📚 DOCUMENTATION FILES

| Fayl | Məqsəd |
|------|--------|
| `/MASTER-WORKFLOW-GUIDE.md` | ⭐ Əsas workflow - hər dəfə oxu! |
| `/CMD-QUICK-REFERENCE.md` | ⚡ Qısa komanda referansı |
| `/WORKFLOW-CHECKLIST.txt` | ✅ Checklist - çap et! |
| `/GOOGLE-SHEETS-SETUP-COMPLETE.md` | 📊 Google Sheets təlimatı |
| `/GOOGLE-SHEETS-HEADERS-SETUP.md` | 📊 Sheets başlıqları |
| `/PROJECT-OVERVIEW.md` | 📋 Bu fayl - proyekt overview |
| `/README.md` | 📖 Proyekt README |
| `/DEPLOYMENT-GUIDE.md` | 🚀 Deployment təlimatı |

---

## 🎯 NEXT STEPS (Gələcək təkmilləşdirmələr)

- [ ] Admin panel-də Google Sheets data göstər
- [ ] Email template customization
- [ ] SMS notification (Twilio)
- [ ] Payment integration
- [ ] Analytics dashboard
- [ ] Multi-user admin support
- [ ] Mobile app (React Native)

---

## ⚖️ LICENSE

**Private/Proprietary**  
© 2025 Ibrahim Abdullayev. Bütün hüquqlar qorunur.

---

## 📊 PROJECT STATS

- **Lines of Code:** ~15,000+
- **Components:** 30+
- **Routes:** 5 main pages + admin
- **Languages:** 3 (EN/RU/AZ)
- **Forms:** 5 types
- **Deployment:** Automated (GitHub → Netlify)
- **Uptime:** 99.9% (Netlify SLA)

---

## 🎉 VERSION HISTORY

### **v2.0 - Google Sheets Integration (28/11/2025)**
- ✅ Google Sheets API əlavə edildi
- ✅ Email notification sistemi (Gmail)
- ✅ Bütün booking formları yeniləndi
- ✅ Workflow documentation yaradıldı

### **v1.5 - Full Premium (Əvvəlki versiya)**
- ✅ Welcome Modal
- ✅ Blog system
- ✅ Admin panel
- ✅ Multi-language
- ✅ Supabase backend

### **v1.0 - Initial Release**
- ✅ Basic portfolio
- ✅ Contact form
- ✅ Services showcase

---

**📌 SON YENİLƏMƏ:** 28/11/2025  
**🚀 STATUS:** Production Ready ✅  
**🌐 LIVE:** https://ibrahimabdullayev.com

---

**🎯 BU FAYIL PROYEKT HAQQINDA ÜMUMI MƏLUMAT VERİR!**  
**📖 Detallı workflow üçün `/MASTER-WORKFLOW-GUIDE.md` oxu!** ⭐
