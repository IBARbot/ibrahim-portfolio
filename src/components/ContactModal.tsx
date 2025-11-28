import { motion, AnimatePresence } from "motion/react";
import { X, MessageCircle, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage();

  const WHATSAPP_NUMBER = "+994555973923";
  const INSTAGRAM_USERNAME = "ibrahim_abdullar";
  const EMAIL = "ibrahim.abdullayev1@gmail.com";

  const handleWhatsApp = () => {
    const message = encodeURIComponent(t("contact.whatsappMessage"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    onClose();
  };

  const handleInstagram = () => {
    window.open(`https://instagram.com/${INSTAGRAM_USERNAME}`, "_blank");
    onClose();
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(t("contact.emailSubject"));
    const body = encodeURIComponent(t("contact.emailBody"));
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    onClose();
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
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[9999]"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10 hover:bg-slate-100 rounded-full p-1"
              >
                <X size={24} />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-br from-teal-600 to-blue-700 p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={32} className="text-white" />
                  </div>
                </motion.div>
                <h3 className="text-white mb-2">{t("contact.modalTitle")}</h3>
                <p className="text-teal-100">{t("contact.modalSubtitle")}</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                {/* WhatsApp */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Button
                    onClick={handleWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white h-auto py-4 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle
                        size={24}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <div className="text-left">
                        <div className="font-medium">WhatsApp</div>
                        <div className="text-sm text-white/80">
                          {t("contact.whatsappDesc")}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </Button>
                </motion.div>

                {/* Instagram */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    onClick={handleInstagram}
                    className="w-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white h-auto py-4 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6 group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <div className="text-left">
                        <div className="font-medium">Instagram</div>
                        <div className="text-sm text-white/80">
                          {t("contact.instagramDesc")}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    >
                      →
                    </motion.div>
                  </Button>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    onClick={handleEmail}
                    variant="outline"
                    className="w-full border-2 border-slate-300 hover:border-teal-600 hover:bg-teal-50 h-auto py-4 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <Mail
                        size={24}
                        className="text-teal-600 group-hover:scale-110 transition-transform"
                      />
                      <div className="text-left">
                        <div className="font-medium text-slate-900">Email</div>
                        <div className="text-sm text-slate-600">
                          {t("contact.emailDesc")}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                      className="text-slate-600"
                    >
                      →
                    </motion.div>
                  </Button>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6">
                <p className="text-center text-sm text-slate-500">
                  {t("contact.modalFooter")}
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}