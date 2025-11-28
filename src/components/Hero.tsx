import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Plane, MessageCircle, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner@2.0.3";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function Hero() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Your professional profile image - works everywhere!
  const profileImg = "https://i.imgur.com/64oQNiZ.jpeg";
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  
  const handleQuickContact = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate at least one field
    if (!email && !phone) {
      toast.error("Zəhmət olmasa email və ya telefon nömrəsi daxil edin");
      return;
    }
    
    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Düzgün email daxil edin");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        "/.netlify/functions/submit-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "contact", name: "", email, phone, message: "Quick contact from Hero section" }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "Məlumatınız göndərildi! Tezliklə əlaqə saxlayacağıq.");
        setEmail("");
        setPhone("");
      } else {
        toast.error(data.error || "Xəta baş verdi");
      }
    } catch (error) {
      console.error("Quick contact error:", error);
      toast.error("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 md:pt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900"
    >
      {/* Background Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1574444851660-e549a835d4ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGZsaWdodCUyMHRyYXZlbHxlbnwxfHx8fDE3NjM3OTk0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6">
            <div className="space-y-2">
              <div className="inline-block px-4 py-2 bg-teal-600/20 border border-teal-600/30 rounded-full mb-4">
                <span className="text-teal-300">{t("hero.badge")}</span>
              </div>
              <h1 className="text-slate-50 text-6xl md:text-7xl font-bold tracking-tight leading-tight">
                {t("hero.name")}
              </h1>
              <p className="text-teal-300 text-2xl md:text-3xl font-light">
                {t("hero.tagline")}
              </p>
            </div>

            <div className="space-y-4 text-slate-300 text-lg">
              <p>
                {t("hero.welcome1")}
              </p>
              <p>
                {t("hero.welcome2")}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={() => scrollToSection("services")}
                className="bg-teal-600 hover:bg-teal-700 text-white"
                size="lg"
              >
                {t("hero.exploreServices")}
                <Plane className="ml-2" size={20} />
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-slate-400 text-slate-200 hover:bg-white/10"
                size="lg"
              >
                {t("hero.getInTouch")}
              </Button>
            </div>
            
            {/* Quick Contact Form */}
            <div className="pt-8 mt-8 border-t border-slate-700">
              <p className="text-slate-300 mb-4">
                {t("hero.quickContact") || "Tez əlaqə üçün məlumatınızı buraxın:"}
              </p>
              <form onSubmit={handleQuickContact} className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <Input
                    type="email"
                    placeholder={t("hero.emailPlaceholder") || "Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  <Input
                    type="tel"
                    placeholder={t("hero.phonePlaceholder") || "Telefon (+994...)"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white"
                >
                  {isSubmitting ? "Göndərilir..." : t("hero.submitContact") || "Göndər"}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="relative lg:block hidden">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-teal-600/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-slate-700/30 rounded-full blur-3xl" />

              {/* Profile Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src={profileImg}
                  alt="Ibrahim Abdullayev"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-slate-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}