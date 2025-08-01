import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type SuccessToastProps = {
  message: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
};

const SuccessToast = ({
  message,
  description,
  duration = 4000,
  onClose,
}: SuccessToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed z-50 w-full max-w-[90%] sm:max-w-sm px-4", // responsive width

            // 🌐 Position abhängig vom Viewport
            "bottom-4 left-1/2 -translate-x-1/2",       // default: centered
            "md:left-auto md:right-6 md:translate-x-0"  // ab md: bottom right
          )}
        >
          <div className="rounded-xl shadow-lg border border-neon-green bg-white p-4 text-black">
            <div className="flex items-start gap-3">
              <FiCheckCircle className="text-neon-green mt-1 shrink-0" size={24} />
              <div className="min-w-0">
                <h4 className="font-semibold text-sm sm:text-base">{message}</h4>
                {description && (
                  <p className="text-xs sm:text-sm text-gray-700 mt-1 break-words">{description}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessToast;
