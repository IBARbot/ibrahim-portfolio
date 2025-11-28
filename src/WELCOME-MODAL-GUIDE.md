# ✨ WELCOME MODAL İDARƏETMƏ QAYDASI

## 🎯 Xüsusiyyətlər

### ✅ **Avtomatik Göstərilir:**
- İstifadəçi sayta ilk dəfə daxil olduqda
- localStorage ilə izlənilir
- Bir dəfə göstərildikdən sonra bir daha göstərilmir

### ✅ **Animasiyalı:**
- Framer Motion ilə smooth animasiyalar
- Flying plane icon animasiyası
- Fade in/out effects

### ✅ **İki Seçim:**
1. **"Aviabilet soruğunuz var?"** → Contact bölməsinə smooth scroll
2. **"Sayta davam et"** → Hero/Home bölməsinə scroll

### ✅ **Responsive:**
- Desktop və mobile üçün optimize edilmiş
- İstənilən ekran ölçüsünə uyğun

---

## 🔧 Konfiqurasiya

### **Modal-ı Deaktiv Etmək:**

Əgər modal-ı tam olaraq silmək istəyirsinizsə, `/App.tsx` faylında:

```typescript
// Bunu silin:
<WelcomeModal 
  onContactClick={() => scrollToSection("contact")}
  onContinue={() => scrollToSection("home")}
/>
```

### **Modal-ı Hər Dəfə Göstərmək:**

`/components/WelcomeModal.tsx` faylında:

```typescript
// Bu sətri comment edin:
// const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");

// Və bu condition-u dəyişin:
if (true) {  // Həmişə göstərsin
  setTimeout(() => {
    setIsOpen(true);
  }, 500);
}
```

### **Göstərilmə Vaxtını Dəyişmək:**

```typescript
setTimeout(() => {
  setIsOpen(true);
}, 1000);  // 1 saniyə gözlə (default: 500ms)
```

---

## 🎨 Dizayn Dəyişiklikləri

### **Rəng Sxemi:**

`/components/WelcomeModal.tsx` faylında:

```typescript
// Header background:
<div className="bg-gradient-to-br from-teal-600 to-blue-700 p-8">
  // Teal və Blue əvəzinə istədiyiniz rəng

// Button colors:
<Button className="w-full bg-teal-600 hover:bg-teal-700">
  // İstədiyiniz rəng
```

### **Mətn Dəyişikliyi:**

`/contexts/LanguageContext.tsx` faylında translation key-lərini dəyişin:

```typescript
"welcome.title": "Öz başlığınız",
"welcome.subtitle": "Öz alt başlığınız",
"welcome.question": "Öz sualınız",
// və s.
```

---

## 🗑️ LocalStorage Təmizləmək (Test Üçün)

Modal-ı yenidən test etmək üçün browser console-da:

```javascript
localStorage.removeItem("hasSeenWelcome");
```

Və ya browser Developer Tools → Application → Local Storage → həmin key-i silin.

Daha sonra səhifəni yeniləyin (F5).

---

## 📱 Mobile Görünüş

Modal mobile-də tamam responsive-dir:
- Padding və spacing optimize edilib
- Button-lar vertical stack olur kiçik ekranlarda
- Mətn ölçüləri adaptive

---

## 🔄 Digər Bölmələrə Yönləndirmək

Əgər başqa bölməyə yönləndirmək istəyirsinizsə:

`/App.tsx` faylında:

```typescript
<WelcomeModal 
  onContactClick={() => scrollToSection("services")}  // Services-ə get
  onContinue={() => scrollToSection("about")}         // About-a get
/>
```

Mövcud section ID-lər:
- `home`
- `about`
- `services`
- `blog`
- `contact`

---

## ⚠️ Troubleshooting

### **Modal Göstərilmir:**
1. Browser console-da error yoxlayın
2. localStorage-i təmizləyin
3. Səhifəni hard refresh edin (Ctrl+Shift+R)

### **Animation İşləmir:**
- Motion package düzgün import olunub yoxlayın
- Browser Motion support edirmi yoxlayın

### **Scroll İşləmir:**
- Section ID-lərin doğru olduğundan əmin olun
- Hero section-da `id="home"` olmalıdır

---

## 🎬 İstifadəçi Flow

```
İstifadəçi sayta daxil olur
    ↓
0.5s gözləyir
    ↓
Modal açılır (smooth animation)
    ↓
İstifadəçi seçim edir:
    ├─→ "Aviabilet soruğu" → Contact form-a scroll
    └─→ "Sayta davam et" → Homepage-ə scroll
    ↓
Modal bağlanır
    ↓
localStorage-ə save olur
    ↓
Bir daha göstərilmir
```

---

## 💡 Best Practices

✅ **DO:**
- Modal məzmununu qısa və aydın saxlayın
- Call-to-action button-ları visible edin
- Animation-ları yüngül saxlayın (500ms optimal)

❌ **DON'T:**
- Modal-ı çox tez göstərməyin (<200ms)
- Çox məzmun əlavə etməyin
- Close button-u silməyin
- Backdrop click-i disable etməyin

---

## 📧 Əlavə Məlumat

Modal haqqında suallarınız olarsa, əlaqə saxlayın! 🚀
