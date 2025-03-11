import { motion } from "framer-motion";
import { DockItem, ThemeMode } from "../../types";

interface DockProps {
  theme: ThemeMode;
}

const dockItems: DockItem[] = [
  {
    id: "explorer",
    name: "Explorer",
    icon: "🔍",
    action: () => console.log("Explorer clicked"),
  },
  {
    id: "wallet",
    name: "Wallet",
    icon: "💰",
    action: () => console.log("Wallet clicked"),
  },
  {
    id: "trade",
    name: "Trade",
    icon: "📈",
    action: () => console.log("Trade clicked"),
  },
  {
    id: "settings",
    name: "Settings",
    icon: "⚙️",
    action: () => console.log("Settings clicked"),
  },
];

const Dock = ({ theme }: DockProps) => {
  return (
    <motion.div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 
        px-4 py-2 rounded-2xl flex items-center space-x-4
        ${theme === "light" ? "bg-dock-bg" : "bg-white/10"}
        backdrop-blur-dock border border-white/20`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {dockItems.map((item) => (
        <motion.button
          key={item.id}
          className="flex flex-col items-center group"
          whileHover={{ scale: 1.2 }}
          onClick={item.action}
        >
          <span className="text-2xl">{item.icon}</span>
          <span
            className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity
            absolute -bottom-6 whitespace-nowrap
            ${theme === "light" ? "text-macos-dark" : "text-white"}`}
          >
            {item.name}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default Dock;
