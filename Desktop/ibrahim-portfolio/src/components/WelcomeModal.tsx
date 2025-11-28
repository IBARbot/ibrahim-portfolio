import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plane, ArrowRight, X, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";

interface WelcomeModalProps {
  onContinue: () => void;
}

export function WelcomeModal({ onContinue }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  // WhatsApp and Instagram constants
  const WHATSAPP_NUMBER = "+994555973923";
  const INSTAGRAM_USERNAME = "ibrahim_abdullar";

  useEffect(() => {
    // Check if user has seen the modal before
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    
    if (!hasSeenWelcome) {
      // Show modal after a brief delay for smooth experience
      setTimeout(() => {
        setIsOpen(true);
      }, 500);
    }
  }, []);

  const handleClose = (action: "whatsapp" | "instagram" | "continue") => {
    setIsOpen(false);
    localStorage.setItem("hasSeenWelcome", "true");
    
    // Wait for animation to complete before executing action
    setTimeout(() => {
      if (action === "whatsapp") {
        // Open WhatsApp with pre-filled message
        const message = encodeURIComponent(t("welcome.whatsappMessage"));
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
      } else if (action === "instagram") {
        // Open Instagram profile
        window.open(`https://instagram.com/${INSTAGRAM_USERNAME}`, "_blank");
      } else {
        onContinue();
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[90]"
            onClick={() => handleClose("continue")}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => handleClose("continue")}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10 hover:bg-slate-100 rounded-full p-1"
              >
                <X size={24} />
              </button>

              {/* Animated plane icon */}
              <div className="bg-gradient-to-br from-teal-600 to-blue-700 p-8 relative overflow-hidden">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="relative z-10"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="inline-block"
                  >
                    <Plane size={48} className="text-white" />
                  </motion.div>
                  <h2 className="text-white mt-4 mb-2">
                    {t("welcome.title")}
                  </h2>
                  <p className="text-teal-100 text-lg">
                    {t("welcome.subtitle")}
                  </p>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              {/* Content */}
              <div className="p-8">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-slate-600 text-center mb-8 text-lg"
                >
                  {t("welcome.question")}
                </motion.p>

                {/* Action buttons */}
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      onClick={() => handleClose("whatsapp")}
                      className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white h-auto py-6 flex flex-col items-center gap-2 group"
                    >
                      <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
                      <span className="font-medium">
                        {t("welcome.whatsappButton")}
                      </span>
                      <span className="text-sm text-white/80">
                        {t("welcome.whatsappDesc")}
                      </span>
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      onClick={() => handleClose("instagram")}
                      className="w-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white h-auto py-6 flex flex-col items-center gap-2 group"
                    >
                      <svg 
                        className="w-6 h-6 group-hover:scale-110 transition-transform" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span className="font-medium">
                        {t("welcome.instagramButton")}
                      </span>
                      <span className="text-sm text-white/80">
                        {t("welcome.instagramDesc")}
                      </span>
                    </Button>
                  </motion.div>
                </div>

                {/* Browse site button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4"
                >
                  <Button
                    onClick={() => handleClose("continue")}
                    variant="ghost"
                    className="w-full text-slate-600 hover:text-teal-600 hover:bg-transparent"
                  >
                    {t("welcome.browseSite")}
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}