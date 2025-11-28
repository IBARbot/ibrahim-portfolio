# 🔧 Development Notes

## ⚠️ Email Functionality

### Current Status:
- **Backend:** Supabase Edge Functions (Production)
- **Email Service:** Resend API (Requires configuration)
- **Development Mode:** Email errors are logged but don't break booking submissions

### Email Error: "API key is invalid"

Bu error **NORMAL-dir** development mode-da, çünki:

1. ✅ **Booking hələ də qeydə alınır** (database-ə yazılır)
2. ✅ **Form uğurla submit olunur**
3. ❌ **Email göndərilmir** (API key konfiqurasiya olunmayıb)

---

## 📧 Email Funksionallığını Aktivləşdirmək

### Addımlar:

1. **Resend hesabı yarat:**
   ```
   https://resend.com/signup
   ```

2. **API Key al:**
   ```
   https://resend.com/api-keys
   → Create API Key
   → Name: Ibrahim Portfolio
   → Permission: Sending access
   → KOPYALA!
   ```

3. **Supabase Dashboard-da konfiqurasiya et:**
   ```
   https://supabase.com/dashboard/project/laubcyyurxrfaijgoczf/settings/functions
   → Environment Variables
   → Add variable:
      Name: RESEND_API_KEY
      Value: re_xxxxxxxxxxxxxxxx
   → Save
   ```

4. **Edge Function redeploy et:**
   ```bash
   npx supabase functions deploy make-server-45a44eb5
   ```

5. **Test et:**
   - Form göndər
   - Email gəlməlidir: info@ibrahimabdullayev.com

---

## 🚀 Local Development

### Server İşə Salmaq:

```bash
cd "C:\Users\Ibrahim ETA\Downloads\Professional Portfolio Website"
npm run dev
```

Browser: `http://localhost:3000/`

### LocalStorage Təmizləmək:

Console-da (F12):
```javascript
localStorage.clear();
location.reload();
```

---

## 📋 Booking Flow

1. **User fills form** → Frontend (React)
2. **Submit** → Supabase Edge Function
3. **Save to DB** → Key-Value Store
4. **Send Email** → Resend API (optional)
5. **Return Success** → Frontend shows toast

**⚠️ Qeyd:** Email uğursuz olsa belə booking qeydə alınır!

---

## 🔐 Environment Variables

### Frontend (.env.local) - OPTIONAL for local dev:
```
VITE_SUPABASE_URL=https://laubcyyurxrfaijgoczf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
VITE_ADMIN_EMAIL=info@ibrahimabdullayev.com
```

### Backend (Supabase Dashboard) - REQUIRED for production:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=info@ibrahimabdullayev.com
SUPABASE_URL=https://laubcyyurxrfaijgoczf.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
SUPABASE_DB_URL=postgresql://...
```

---

## 🧪 Testing

### Test Booking Form:
1. Open http://localhost:3000/
2. Scroll to Services section
3. Click "İndi Rezerv Et"
4. Fill form and submit
5. Check console for success log
6. Check toast notification

### Expected Console Output (DEV mode):
```
✅ Booking submitted successfully: {
  id: "booking_123456789",
  type: "flight",
  name: "Test User",
  email: "test@example.com"
}
```

---

## 📦 Deployment

### Vercel (Frontend):
- GitHub push → Auto deploy
- Domain: ibrahimabdullayev.com

### Supabase (Backend):
- Edge Functions auto-deploy
- Database: PostgreSQL with KV store

---

## 🐛 Common Issues

### 1. "API key is invalid"
- **Cause:** RESEND_API_KEY not configured in Supabase
- **Impact:** Email not sent, but booking still saved
- **Fix:** Configure Resend API key (see above)

### 2. Modal not opening
- **Cause:** LocalStorage cache
- **Fix:** `localStorage.clear(); location.reload();`

### 3. Form not submitting
- **Check:** Browser console for errors
- **Check:** Network tab in DevTools
- **Check:** Supabase Edge Function logs

---

## 📞 Contacts

- **WhatsApp:** +994555973923
- **Instagram:** ibrahim_abdullar
- **Email:** info@ibrahimabdullayev.com
- **Website:** ibrahimabdullayev.com

---

## ✅ TODO

- [ ] Configure Resend API key
- [ ] Test email notifications
- [ ] Set up domain verification in Resend
- [ ] Add email templates for different booking types
- [ ] Set up monitoring for booking submissions
