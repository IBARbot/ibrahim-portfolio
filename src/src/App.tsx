import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { AdminPage } from "../pages/AdminPage";
import { useEffect, useState } from "react";

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
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Handle browser back/forward buttons
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Admin panel route
  if (currentPath === '/admin' || currentPath === '/admin/') {
    return <AdminPage />;
  }

  // Main website
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
