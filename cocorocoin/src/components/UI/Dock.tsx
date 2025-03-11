import React from "react";
import { motion } from "framer-motion";

interface DockItemType {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: () => void;
}

interface DockProps {
  items: DockItemType[];
}

const Dock: React.FC<DockProps> = ({ items }) => {
  return (
    <div className="flex items-center space-x-2">
      {items.map((item) => (
        <motion.button
          key={item.id}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          onClick={item.action}
          className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <span className="text-2xl">{item.icon}</span>
          <span className="text-xs text-white mt-1">{item.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default Dock;
