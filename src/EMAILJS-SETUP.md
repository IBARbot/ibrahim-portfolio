# 📧 EMAIL FORM QURAŞDIRILMASI - EMAİLJS

## ✅ **İNDİKİ VƏZIYYƏT**
Contact formunuz **hazırdır** amma EmailJS credentials lazımdır!

---

## 🚀 **QURAŞDIRMA ADDIMLARI** (5 Dəqiqə)

### **1️⃣ EmailJS Hesabı Yaradın**
1. https://www.emailjs.com/ saytına daxil olun
2. **Sign Up** ilə hesab yaradın (100% pulsuz!)
3. Email-inizi təsdiqləyin

---

### **2️⃣ Email Service Əlavə Edin**
1. Dashboard-a daxil olun: https://dashboard.emailjs.com/admin
2. **Email Services** bölməsinə gedin
3. **Add New Service** düyməsinə basın
4. **Gmail** seçin (və ya başqa email provider)
5. Gmail hesabınızla qoşulun: **ibrahim.abdullayev1@gmail.com**
6. **Service ID** kopyalayın (məs: `service_abc123`)

---

### **3️⃣ Email Template Yaradın**
1. **Email Templates** bölməsinə gedin
2. **Create New Template** düyməsinə basın
3. Aşağıdakı template-i kopyalayın:

```
Yeni Mesaj: {{from_name}}

Göndərən: {{from_name}}
Email: {{from_email}}

Mesaj:
{{message}}

---
Bu mesaj ibrahimabdullayev.com vebsaytından göndərildi.
```

4. **Template ID** kopyalayın (məs: `template_xyz789`)

---

### **4️⃣ Public Key Əldə Edin**
1. **Account** səhifəsinə gedin: https://dashboard.emailjs.com/admin/account
2. **Public Key** kopyalayın (məs: `AbCdEf123456`)

---

### **5️⃣ Code-a Credentials Əlavə Edin**
`/components/Contact.tsx` faylını açın və aşağıdakı sətirləri dəyişdirin:

```typescript
// ❌ KÖHNƏ (sətir 28-36):
const result = await emailjs.send(
  "YOUR_SERVICE_ID",     // ← DEYİŞDİRİN
  "YOUR_TEMPLATE_ID",    // ← DEYİŞDİRİN
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: "ibrahim.abdullayev1@gmail.com",
  },
  "YOUR_PUBLIC_KEY"      // ← DEYİŞDİRİN
);

// ✅ YENİ:
const result = await emailjs.send(
  "service_abc123",      // ← Sizin Service ID
  "template_xyz789",     // ← Sizin Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: "ibrahim.abdullayev1@gmail.com",
  },
  "AbCdEf123456"         // ← Sizin Public Key
);
```

---

## ✅ **TEST EDIN!**

1. Vebsaytı açın
2. Contact formunu doldurun
3. "Send Message" düyməsinə basın
4. **ibrahim.abdullayev1@gmail.com** emailinizi yoxlayın!

---

## 🎉 **TAMAMLANDIĞINDA**

✅ Form işləyir  
✅ Mesajlar email-ə gəlir  
✅ Müştərilər sizinlə əlaqə saxlaya bilir!

---

## ⚠️ **QEYDLƏR**

- **Pulsuz Plan**: 200 email/ay
- **Spam yox**: Bütün mesajlar real
- **Təhlükəsiz**: Public key frontend-də göstərilə bilər

---

## 📞 **Problem Olarsa?**

1. EmailJS dashboard-da "Logs" bölməsinə baxın
2. Browser Console-da error-lara baxın
3. Template variables-in düzgün olduğunu yoxlayın

---

**🚀 HAZIR! EmailJS quraşdırılması tamamlandı!**
