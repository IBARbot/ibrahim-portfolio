import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage, Language } from "../contexts/LanguageContext";

interface NavigationProps {
  onContactModalOpen?: () => void;
}

export function Navigation({ onContactModalOpen }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  // Your professional profile image
  const profileImg = "https://i.imgur.com/64oQNiZ.jpeg";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: t("nav.home"), href: "home" },
    { label: t("nav.about"), href: "about" },
    { label: t("nav.services"), href: "services" },
    { label: t("nav.blog"), href: "blog" },
    { label: t("nav.addressContact"), href: "contact" },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: "az", label: "AZ" },
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-4"
          : "bg-white/95 backdrop-blur-sm py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Ultra Creative: Logo + Menu Integrated */}
          <div className="flex items-center gap-4">
            {/* Desktop Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
            >
              <div className="relative">
                {/* Profile Image */}
                <div className="relative overflow-hidden rounded-full">
                  <img
                    src={profileImg}
                    alt="Ibrahim Abdullayev"
                    className="w-11 h-11 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-teal-600 ring-offset-2 group-hover:ring-teal-700 group-hover:scale-105 transition-all duration-300"
                  />
                  {/* Animated gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                </div>
                {/* Online Status Badge with pulse */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-white">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-slate-900 tracking-tight group-hover:text-teal-600 transition-colors font-semibold">
                  {t("nav.yourName")}
                </div>
                <div className="text-xs text-slate-500 group-hover:text-teal-500 transition-colors">
                  {t("hero.badge")}
                </div>
              </div>
            </button>

            {/* Mobile: Creative Hamburger Menu with Profile Integration */}
            <div className="md:hidden relative">
              <button
                className={`relative w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ${ 
                  isMobileMenuOpen 
                    ? "bg-gradient-to-br from-teal-600 to-blue-700 shadow-lg" 
                    : "bg-slate-100 hover:bg-gradient-to-br hover:from-teal-50 hover:to-blue-50"
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {/* Animated Hamburger Lines */}
                <div
                  className={`w-5 h-0.5 rounded-full transition-all duration-300 ${ 
                    isMobileMenuOpen 
                      ? "rotate-45 translate-y-2 bg-white" 
                      : "bg-slate-700"
                  }`}
                />
                <div
                  className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen 
                      ? "opacity-0 bg-white" 
                      : "bg-slate-700"
                  }`}
                />
                <div
                  className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen 
                      ? "-rotate-45 -translate-y-2 bg-white" 
                      : "bg-slate-700"
                  }`}
                />
                
                {/* Notification Badge (when closed) */}
                {!isMobileMenuOpen && (
                  <div className="absolute -top-1 -right-1 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-teal-600 rounded-full animate-pulse" />
                    <div className="absolute w-2.5 h-2.5 bg-teal-600 rounded-full animate-ping" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-slate-700 hover:text-teal-600 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full" />
              </button>
            ))}
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 border-l border-slate-300 pl-6">
              <Globe size={18} className="text-slate-500" />
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1 rounded transition-colors ${
                    language === lang.code
                      ? "bg-teal-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            
            {/* Quick Contact Button - opens modal */}
            <Button
              onClick={() => onContactModalOpen?.()}
              className="bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all"
            >
              {t("nav.getInTouch")}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop - click outside to close */}
            <div 
              className="md:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[-1]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4 animate-in slide-in-from-top">
              <div className="flex flex-col gap-4">
                {/* Quick Contact Button - Moved to Top */}
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onContactModalOpen?.();
                  }}
                  className="bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800 text-white w-full shadow-md hover:shadow-lg transition-all"
                  size="lg"
                >
                  {t("nav.getInTouch")}
                </Button>
                
                {/* Divider */}
                <div className="border-t border-slate-200" />
                
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-slate-700 hover:text-teal-600 transition-colors text-left py-2 px-3 rounded-lg hover:bg-slate-50"
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Mobile Language Switcher */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200 mt-2">
                  <Globe size={18} className="text-slate-500" />
                  <span className="text-slate-600 mr-2 text-sm">Language:</span>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        language === lang.code
                          ? "bg-teal-600 text-white shadow-sm"
                          : "text-slate-600 bg-slate-100 hover:bg-slate-200"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}