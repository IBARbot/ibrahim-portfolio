import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";
import { Stats } from "./components/Stats";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { ProcessSteps } from "./components/ProcessSteps";
import { Blog } from "./components/Blog";
import { WelcomeModal } from "./components/WelcomeModal";
import { ContactModal } from "./components/ContactModal";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { DevTools } from "./components/DevTools";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { AdminPage } from "./pages/AdminPage";
import { AdminSetup } from "./components/AdminSetup";
import { BookingForm } from "./components/BookingForm";
import { useState } from "react";

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-slate-900 text-slate-400 py-8">
      <div className="container mx-auto px-4 text-center">
        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}

function AppContent() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <WelcomeModal 
        onContinue={() => scrollToSection("home")}
      />
      <Navigation onContactModalOpen={() => setIsContactModalOpen(true)} />
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <Hero />
      <Stats />
      <About />
      <ProcessSteps />
      <Services />
      <Testimonials />
      <FAQ />
      <Blog />
      <Contact />
      <FloatingWhatsApp />
      <DevTools />
      <Footer />
    </div>
  );
}

export default function App() {
  // Simple routing based on URL path
  const isAdminRoute = window.location.pathname === "/admin";
  const isAdminSetupRoute = window.location.pathname === "/admin-setup";

  if (isAdminSetupRoute) {
    return <AdminSetup />;
  }

  if (isAdminRoute) {
    return <AdminPage />;
  }

  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}