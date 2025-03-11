import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "@headlessui/react";
import {
  SunIcon,
  MoonIcon,
  WifiIcon,
  Battery100Icon as BatteryFullIcon,
} from "@heroicons/react/24/outline";

interface MenuBarProps {
  theme: "light" | "dark";
  onThemeToggle: () => void;
}

const MenuBar = ({ theme, onThemeToggle }: MenuBarProps) => {
  const [time, setTime] = useState(new Date());
  const [isConnected, _setIsConnected] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = {
    "": [
      "About CocoroCoin",
      "Preferences",
      "Services",
      "Hide CocoroCoin",
      "Hide Others",
      "Show All",
      "Quit",
    ],
    File: ["New Window", "Open", "Save", "Save As...", "Close"],
    Edit: ["Undo", "Redo", "Cut", "Copy", "Paste", "Select All"],
    View: ["Show Toolbar", "Show Sidebar", "Enter Full Screen"],
  };

  const MenuDropdown = ({
    label,
    items,
  }: {
    label: string;
    items: string[];
  }) => (
    <Menu as="div" className="relative">
      <Menu.Button className="px-3 py-1 rounded-lg hover:bg-white/10 transition-colors">
        {label === "" ? (
          <svg viewBox="0 0 1024 1024" className="w-4 h-4 fill-current">
            <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-150.8-35.6-77.9 1.1-149.6 45.2-189.6 114.9-81.4 140.9-20.8 349.2 57.2 463.2 38.9 55.9 85.2 118.8 147.6 116.5 58.3-2.4 81.1-37.9 151.8-37.9 71.2 0 91.1 37.9 154.1 36.6 63.7-1.3 103.8-56.4 142.4-112.7 44.3-64.7 62.7-128 63.9-131.2-.6-.3-123.8-47.7-124.8-189.9zm-155-358.7c50.7-59.8 43.5-137.9 42.8-138.2-45.2 1.8-98.4 30.5-130.2 67.2-28.7 33-50.3 83.5-43.5 131.9 48.2 3.7 97.6-24.2 130.9-60.9z" />
          </svg>
        ) : (
          label
        )}
      </Menu.Button>
      <Menu.Items className="absolute top-full left-0 mt-1 w-56 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-lg ring-1 ring-black/5 p-1 space-y-1">
        {items.map((item) => (
          <Menu.Item key={item}>
            {({ active }) => (
              <button
                className={`${
                  active
                    ? "bg-blue-500 text-white"
                    : "text-gray-900 dark:text-gray-100"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                {item}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );

  return (
    <motion.div
      className="h-8 px-2 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-2">
        {Object.entries(menuItems).map(([label, items]) => (
          <MenuDropdown key={label || "apple"} label={label} items={items} />
        ))}
      </div>

      <div className="flex items-center space-x-4 text-sm">
        <button
          onClick={onThemeToggle}
          className="p-1 rounded-full hover:bg-gray-200/20 transition-colors"
        >
          {theme === "light" ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
        </button>
        <WifiIcon
          className={`h-4 w-4 ${isConnected ? "text-green-500" : "text-red-500"}`}
        />
        <BatteryFullIcon className="h-4 w-4 text-green-500" />
        <span>{time.toLocaleTimeString()}</span>
      </div>
    </motion.div>
  );
};

export default MenuBar;
