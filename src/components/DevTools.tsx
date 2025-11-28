import { useState } from "react";
import { Settings, X, RotateCcw, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";

export function DevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Only show in development/testing
  const isDev = window.location.hostname === "localhost" || window.location.hostname.includes("vercel");

  const handleResetWelcome = () => {
    localStorage.removeItem("hasSeenWelcome");
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      window.location.reload();
    }, 1500);
  };

  const handleClearStorage = () => {
    localStorage.clear();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      window.location.reload();
    }, 1500);
  };

  if (!isDev) return null;

  return (
    <>
      {/* Dev Tools Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-24 right-6 z-40"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full shadow-lg flex items-center justify-center text-white transition-all group"
          aria-label="Dev Tools"
        >
          <Settings size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </motion.div>

      {/* Dev Tools Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-40 right-6 z-50 w-80 bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings size={20} className="text-white" />
                  <h3 className="text-white font-semibold">Dev Tools</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Success Message */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2"
                    >
                      <CheckCircle size={18} className="text-green-600" />
                      <span className="text-green-800 text-sm">Reloading...</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Reset Welcome Modal */}
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Reset Welcome Modal</p>
                  <Button
                    onClick={handleResetWelcome}
                    variant="outline"
                    className="w-full justify-start text-left"
                    size="sm"
                  >
                    <RotateCcw size={16} className="mr-2" />
                    Show Welcome Again
                  </Button>
                </div>

                {/* Clear All Storage */}
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Clear All LocalStorage</p>
                  <Button
                    onClick={handleClearStorage}
                    variant="outline"
                    className="w-full justify-start text-left border-red-200 text-red-600 hover:bg-red-50"
                    size="sm"
                  >
                    <RotateCcw size={16} className="mr-2" />
                    Clear All Data
                  </Button>
                </div>

                {/* Info */}
                <div className="bg-slate-50 rounded-lg p-3 mt-4">
                  <p className="text-xs text-slate-500">
                    Dev tools are only visible in development/testing environments.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
