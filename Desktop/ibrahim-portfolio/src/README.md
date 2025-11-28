# İbrahim Abdullayev - Professional Flight Consultant Portfolio

🌐 **Live Site:** [https://ibrahimabdullayev.com](https://ibrahimabdullayev.com)

Professional portfolio website for flight ticket consultation services with Google Sheets integration, admin panel, blog system, and multilingual support (English, Russian, Azerbaijani).

---

## 📚 IMPORTANT: START HERE!

**Yeni istifadəçi üçün və ya kod dəyişikliyi edəndə oxumalı olduğun fayllar:**

### 🎯 **Əsas Workflow Təlimatları:**
1. **`/MASTER-WORKFLOW-GUIDE.md`** ⭐ - **ƏN VACIB!** Hər dəfə kod dəyişəndə oxu!
2. **`/CMD-QUICK-REFERENCE.md`** - Qısa komanda referansı (çap et və masada saxla!)
3. **`/WORKFLOW-CHECKLIST.txt`** - Checklist (çap edib işarələ!)

### 📊 **Google Sheets Integration:**
4. **`/GOOGLE-SHEETS-SETUP-COMPLETE.md`** - Google Sheets qurulum təlimatı
5. **`/GOOGLE-SHEETS-HEADERS-SETUP.md`** - Sheets başlıqları əlavə et

### 🚀 **Deployment:**
6. **`/DEPLOYMENT-GUIDE.md`** - Netlify deployment təlimatı
7. **`/NETLIFY-DEPLOYMENT-READY.md`** - Deploy checklist

---

## ✨ Features

- 🎨 **Modern Design** - Clean, minimalist UI with smooth animations
- 🌍 **Multilingual** - EN/RU/AZ with geo-location based auto-detection
- 📝 **Blog System** - Full CRUD with admin panel
- 📧 **Contact Management** - Form submissions tracked in admin panel
- 🔐 **Admin Panel** - Secure authentication with Supabase
- 📱 **Responsive** - Mobile-first design
- ⚡ **Fast** - Built with Vite + React
- 🎯 **SEO Optimized** - Meta tags, sitemap, structured data

## 🚀 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animations
- **Shadcn/ui** - UI components
- **Lucide React** - Icons

### Backend & Integration
- **Google Sheets API** - Form submissions storage & email notifications
- **Google Apps Script** - Serverless webhook handler
- **Supabase** - Backend as a Service
  - Auth - User authentication (admin panel)
  - Edge Functions - Serverless API
  - KV Store - Admin data storage
- **Hono** - Lightweight web framework

## 📦 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/ibrahim-abdullayev-portfolio.git
cd ibrahim-abdullayev-portfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run development server:**
```bash
npm run dev
```

5. **Open browser:**
```
http://localhost:5173
```

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**
2. **Import to Vercel** from GitHub
3. **Set environment variables** in Vercel dashboard
4. **Deploy!**

Detailed guide: See `/PRODUCTION-DEPLOYMENT.md`

### Deploy Supabase Functions

```bash
# Login to Supabase
supabase login

# Link project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy function
supabase functions deploy server

# Set secrets
supabase secrets set SUPABASE_URL=your_url
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_key
```

## 🔐 Admin Panel

### First Time Setup

1. Go to `/admin-setup`
2. Create admin account
3. Login at `/admin`

### Features
- ✅ **Blog Management** - Create, edit, delete posts
- ✅ **Contact Messages** - View and manage submissions
- ✅ **Newsletter** - Subscriber management
- ✅ **Analytics** - View site statistics

## 📁 Project Structure

```
ibrahim-abdullayev-portfolio/
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   ├── About.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── Services.tsx
│   ├── AdminDashboard.tsx
│   └── ...
├── pages/              # Page components
│   └── AdminPage.tsx
├── contexts/           # React contexts
│   └── LanguageContext.tsx
├── utils/              # Utility functions
│   ├── api.ts
│   └── supabase/
├── supabase/           # Supabase functions
│   └── functions/
│       └── server/
├── styles/             # Global styles
│   └── globals.css
├── App.tsx             # Main app component
└── index.html
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Environment Variables

**Frontend (.env):**
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Backend (Supabase Secrets):**
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_DB_URL=postgresql://...
```

## 📚 Documentation

- `/PRODUCTION-DEPLOYMENT.md` - Full deployment guide
- `/READY-TO-TEST.md` - Testing checklist
- `/ADMIN-QUICK-START.md` - Admin panel guide
- `/BLOG-GUIDE.md` - Blog system guide

## 🔒 Security

- ✅ **Environment variables** properly configured
- ✅ **CORS** configured for production domain
- ✅ **Auth tokens** secured with Supabase
- ✅ **API endpoints** protected with authentication
- ✅ **XSS protection** headers enabled

## 📞 Contact

**Ibrahim Abdullayev**
- 📧 Email: ibrahim.abdullayev1@gmail.com
- 📱 WhatsApp: +994555973923
- 💼 LinkedIn: [ibrahim-abdullayev-7bb887152](https://linkedin.com/in/ibrahim-abdullayev-7bb887152)
- 📸 Instagram: [@ibrahim_abdullar](https://instagram.com/ibrahim_abdullar)

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ by Ibrahim Abdullayev**