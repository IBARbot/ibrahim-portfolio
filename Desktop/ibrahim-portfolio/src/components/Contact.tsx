import { useState } from "react";
import { Mail, MapPin, MessageCircle, Linkedin, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useLanguage } from "../contexts/LanguageContext";
import { ContactModal } from "./ContactModal";
import { projectId } from "../utils/supabase/info";

export function Contact() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      // Send to Google Sheets via Netlify Function
      const response = await fetch(
        "/.netlify/functions/submit-booking",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type: "contact", ...formData }),
        }
      );

      if (!response.ok) {
        throw new Error('Mesaj göndərilmədi');
      }

      const data = await response.json();
      console.log("✅ Mesaj göndərildi:", data);
      
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("❌ Mesaj göndərilmədi:", error);
      setSubmitStatus("error");
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.emailInfo"),
      value: t("contact.emailValue"),
      href: `mailto:${t("contact.emailValue")}`,
    },
    {
      icon: MessageCircle,
      label: t("contact.phoneInfo"),
      value: t("contact.phoneValue"),
      href: "https://wa.me/994555973923",
    },
    {
      icon: MapPin,
      label: t("contact.locationInfo"),
      value: t("contact.locationValue"),
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/ibrahim-abdullayev-7bb887152",
      color: "hover:text-blue-600",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/994555973923",
      color: "hover:text-green-600",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-slate-900 mb-4">{t("contact.title")}</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto mb-6" />
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {t("contact.subtitle")}
            </p>
            
            {/* Quick Contact Button */}
            <div className="mt-8">
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="mr-2" size={20} />
                {t("contact.quickContact")}
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
                <h3 className="text-slate-900 mb-6">{t("contact.formTitle")}</h3>
                
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800">
                      {t("contact.successMessage")}
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">
                      {t("contact.errorMessage")}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-slate-700">
                      {t("contact.nameLabel")}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t("contact.namePlaceholder")}
                      className="mt-1 border-slate-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-slate-700">
                      {t("contact.emailLabel")}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t("contact.emailPlaceholder")}
                      className="mt-1 border-slate-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-slate-700">
                      {t("contact.phoneLabel")}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={t("contact.phonePlaceholder")}
                      className="mt-1 border-slate-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-slate-700">
                      {t("contact.messageLabel")}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder={t("contact.messagePlaceholder")}
                      rows={6}
                      className="mt-1 border-slate-300 focus:border-teal-600 focus:ring-teal-600"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                    size="lg"
                  >
                    {isSubmitting ? (
                      t("contact.sending")
                    ) : (
                      <>
                        {t("contact.sendButton")}
                        <Send className="ml-2" size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div>
                <h3 className="text-slate-900 mb-6">{t("contact.infoTitle")}</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-slate-500">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-900 hover:text-teal-600 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-slate-900">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-slate-900 mb-6">{t("contact.socialTitle")}</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
                <p className="text-slate-600 mt-4">
                  {t("contact.socialDesc")}
                </p>
              </div>

              {/* Availability Notice */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl text-white">
                <h4 className="text-white mb-2">{t("contact.availabilityTitle")}</h4>
                <p className="text-slate-300">
                  {t("contact.availabilityDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}