import { motion } from "framer-motion";
import { XMarkIcon as CloseIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  isActive?: boolean;
}

const Window = ({
  title,
  children,
  onClose,
  onMinimize,
  isActive = true,
}: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      className={`fixed ${
        isMobile ? "inset-0" : "w-[600px] h-[400px]"
      } bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-lg shadow-lg overflow-hidden z-30`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/10 dark:bg-black/10 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"
          >
            {onClose && (
              <CloseIcon className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100" />
            )}
          </button>
          <button
            onClick={onMinimize}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600"
          >
            {onMinimize && (
              <MinusIcon className="w-2 h-2 text-yellow-800 opacity-0 group-hover:opacity-100" />
            )}
          </button>
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-sm font-medium">
          {title}
        </h1>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-2rem)] overflow-auto">{children}</div>
    </motion.div>
  );
};

export default Window;
