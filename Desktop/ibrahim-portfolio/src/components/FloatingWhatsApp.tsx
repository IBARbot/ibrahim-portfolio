import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function FloatingWhatsApp() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { t } = useLanguage();

  const WHATSAPP_NUMBER = "+994555973923";

  const handleClick = () => {
    const message = encodeURIComponent(t("whatsapp.defaultMessage"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-40"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-lg flex items-center justify-center text-white transition-colors group relative"
          aria-label="Contact on WhatsApp"
        >
          {/* Pulse animation */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-[#25D366] rounded-full"
          />

          {/* Icon */}
          <MessageCircle size={28} className="relative z-10" strokeWidth={2} />

          {/* Notification badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white"
          >
            1
          </motion.div>
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {isTooltipVisible && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
            >
              <div className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
                {t("whatsapp.tooltip")}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-slate-900" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
