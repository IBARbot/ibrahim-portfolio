# 🚀 Supabase Backend Deployment Guide

## Problem
Vercel-də "Failed to fetch" error-u alırsınız, çünki backend Supabase Edge Function-lar local kompüterinizdə yerləşir və Vercel-də çalışmır.

## Həll: Backend-i Supabase-ə Deploy Etmək

### ADDIM 1: Supabase CLI Quraşdırın

**Windows üçün (Scoop ilə):**
```bash
# Scoop quraşdırın (əgər yoxdursa)
irm get.scoop.sh | iex

# Supabase CLI quraşdırın
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

**Və ya NPM ilə:**
```bash
npm install -g supabase
```

### ADDIM 2: Supabase-ə Login Edin

Terminal-da bu əmri yazın:
```bash
supabase login
```

Browser açılacaq - GitHub və ya email ilə login edin.

### ADDIM 3: Supabase Project-ə Link Edin

```bash
# Project root directory-də (Professional Portfolio Website folderində)
supabase link --project-ref laubcyyurxrfaijgoczf
```

Supabase database password soruşacaq. Əgər xatırlamırsınızsa, Supabase dashboard-dan yeni password yarada bilərsiniz.

### ADDIM 4: Edge Functions Deploy Edin

```bash
# Backend function-ı deploy edin
supabase functions deploy make-server-45a44eb5 --project-ref laubcyyurxrfaijgoczf
```

Bu əmr `/supabase/functions/server/index.tsx` faylını deploy edəcək.

### ADDIM 5: Environment Variables Set Edin

Supabase Dashboard-da:

1. 👉 https://supabase.com/dashboard/project/laubcyyurxrfaijgoczf/settings/functions
2. Sol menüdə **Edge Functions** seçin
3. **Environment Variables** hissəsində bu dəyişənləri əlavə edin:

```
SUPABASE_URL = https://laubcyyurxrfaijgoczf.supabase.co
SUPABASE_SERVICE_ROLE_KEY = [Your service role key from Project Settings > API]
```

Service role key-i tapmaq üçün:
- Settings > API > Project API keys > service_role (gizli)

### ADDIM 6: Test Edin

Terminal-da test edin:
```bash
curl https://laubcyyurxrfaijgoczf.supabase.co/functions/v1/make-server-45a44eb5/health
```

Əgər `{"status":"ok","timestamp":"...","message":"Server işləyir"}` cavabı gəlirsə, backend hazırdır! ✅

### ADDIM 7: Vercel-də Redeploy Edin

```bash
# GitHub-a push edin
git add .
git commit -m "Fix vercel.json outputDirectory"
git push origin main
```

Vercel avtomatik redeploy edəcək və backend Supabase-də çalışacaq! 🎉

---

## Alternativ: LocalStorage Mode (Test üçün)

Əgər backend-i deploy etmək istəmirsinizsə, sayt localStorage-dən istifadə edəcək (artıq Blog.tsx-də var).

Bu halda:
- ✅ Admin panel işləyəcək (localStorage ilə)
- ✅ Blog posts localStorage-də saxlanacaq
- ❌ Real-time sync olmayacaq
- ❌ Server-side features (analytics, contact forms) işləməyəcək

---

## Tövsiyə

**Backend-i deploy etmək tövsiyə edilir!** 5-10 dəqiqə çəkir və tam funksionallıq əldə edirsiniz.
