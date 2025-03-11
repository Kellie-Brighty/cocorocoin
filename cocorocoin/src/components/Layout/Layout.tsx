import { useState, useEffect } from "react";
import MenuBar from "../UI/MenuBar";
import Dock from "../UI/Dock";
import { AnimatePresence, motion } from "framer-motion";
import Window from "../UI/Window";
import Finder from "../Apps/Finder/Finder";
import DesktopIcon from "../UI/DesktopIcon";
import { XIcon, TelegramIcon } from "../UI/Icons";
import backgroundImage from "../../assets/background.png";
import logo from "../../assets/logo.png";
import demoVideo from "../../assets/video.mp4";
import image1 from "../../assets/image-1.png";

interface LayoutProps {
  children: React.ReactNode;
}

interface AppWindow {
  id: string;
  isOpen: boolean;
  component: React.ReactNode;
  title: string;
}

interface DesktopItem {
  id: string;
  name: string;
  icon: string;
  position: { x: number; y: number };
  content: React.ReactNode;
  title: string;
}

interface DockItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: () => void;
}

const Layout = ({ children }: LayoutProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 640px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const desktopItems: DesktopItem[] = [
    {
      id: "media",
      name: "Media",
      icon: "🎬",
      position: { x: 20, y: 20 },
      content: (
        <div className="p-4 space-y-6">
          <h2 className="text-xl font-bold mb-4">CocoroCoin Media</h2>
          <div className="space-y-6">
            {/* Logo */}
            <div className="space-y-2">
              <h3 className="font-semibold">Logo</h3>
              <img
                src={logo}
                alt="CocoroCoin Logo"
                className="max-w-[200px] rounded-lg shadow-lg"
              />
            </div>

            {/* Demo Video */}
            <div className="space-y-2">
              <h3 className="font-semibold">Demo Video</h3>
              <video
                controls
                className="w-full rounded-lg shadow-lg"
                poster={image1}
              >
                <source src={demoVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Additional Image */}
            <div className="space-y-2">
              <h3 className="font-semibold">Featured Image</h3>
              <img
                src={image1}
                alt="CocoroCoin Feature"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      ),
      title: "Media Gallery",
    },
    {
      id: "documents",
      name: "Documents",
      icon: "📁",
      position: { x: 20, y: 120 },
      content: (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Documents</h2>
          <div className="flex items-center justify-center h-32 text-gray-400">
            <p>No documents yet</p>
          </div>
        </div>
      ),
      title: "Documents",
    },
    {
      id: "projects",
      name: "Projects",
      icon: "📂",
      position: { x: 20, y: 220 },
      content: (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Projects</h2>
          <div className="flex items-center justify-center h-32 text-gray-400">
            <p>No projects yet</p>
          </div>
        </div>
      ),
      title: "Projects",
    },
    {
      id: "downloads",
      name: "Downloads",
      icon: "📥",
      position: { x: 20, y: 320 },
      content: (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Downloads</h2>
          <div className="flex items-center justify-center h-32 text-gray-400">
            <p>No downloads yet</p>
          </div>
        </div>
      ),
      title: "Downloads",
    },
  ];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const openWindow = (
    id: string,
    component: React.ReactNode,
    title: string
  ) => {
    setWindows((prev) => {
      const existingWindow = prev.find((w) => w.id === id);
      if (existingWindow) {
        return prev.map((w) => (w.id === id ? { ...w, isOpen: true } : w));
      }
      return [...prev, { id, isOpen: true, component, title }];
    });
  };

  const closeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
  };

  const dockItems: DockItem[] = [
    {
      id: "finder",
      name: "Explorer",
      icon: "🔍",
      action: () => openWindow("finder", <Finder />, "CocoroCoin Explorer"),
    },

    {
      id: "chart",
      name: "Charts",
      icon: "📈",
      action: () =>
        openWindow(
          "chart",
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Market Charts</h2>
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart integration coming soon...</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-lg font-bold">$0.01</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-500">24h Change</p>
                <p className="text-lg font-bold text-green-500">+5.2%</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-500">Volume</p>
                <p className="text-lg font-bold">$1.2M</p>
              </div>
            </div>
          </div>,
          "Market Charts"
        ),
    },
    {
      id: "telegram",
      name: "Telegram",
      icon: (
        <TelegramIcon
          className={`w-7 h-7 ${isMobile ? "text-black dark:text-white" : "text-white"}`}
        />
      ),
      action: () =>
        openWindow(
          "telegram",
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <TelegramIcon className="w-8 h-8 text-blue-500" />
              <h2 className="text-2xl font-bold">Telegram Community</h2>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
              <p className="mb-4">
                Join our Telegram community to stay updated!
              </p>
              <a
                href="https://t.me/ETHcocorocoin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <TelegramIcon className="w-5 h-5" />
                <span>Join Telegram</span>
              </a>
            </div>
          </div>,
          "Telegram"
        ),
    },
    {
      id: "twitter",
      name: "X",
      icon: (
        <XIcon
          className={`w-7 h-7 ${isMobile ? "text-black dark:text-white" : "text-white"}`}
        />
      ),
      action: () =>
        openWindow(
          "twitter",
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <XIcon className="w-8 h-8" />
              <h2 className="text-2xl font-bold">X (Twitter)</h2>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
              <p className="mb-4">Follow us on X for the latest updates!</p>
              <a
                href="https://x.com/cocorocoineth"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <XIcon className="w-5 h-5" />
                <span>Follow on X</span>
              </a>
            </div>
          </div>,
          "X (Twitter)"
        ),
    },
    {
      id: "settings",
      name: "Settings",
      icon: "⚙️",
      action: () =>
        openWindow(
          "settings",
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <span>Dark Mode</span>
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md"
                >
                  Toggle
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <span>Notifications</span>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md">
                  Enable
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <span>Language</span>
                <select className="bg-transparent">
                  <option>English</option>
                  <option>Japanese</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>
          </div>,
          "Settings"
        ),
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background with blur effect */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: windows.some((w) => w.isOpen) ? "blur(5px)" : "none",
        }}
      />

      {/* Overlay for better readability */}
      <motion.div
        className="fixed inset-0 bg-black/10 dark:bg-black/30 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: windows.some((w) => w.isOpen) ? 1 : 0 }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <MenuBar theme={theme} onThemeToggle={toggleTheme} />

        <main className="relative h-[calc(100vh-2rem)] p-4">
          {/* Desktop Icons */}
          <div className="absolute top-0 left-0 right-0 z-20 p-4">
            <div className="grid grid-cols-3 gap-4 sm:block">
              {desktopItems.map((item) => (
                <div
                  key={item.id}
                  className={`sm:absolute ${
                    !window.matchMedia("(min-width: 640px)").matches
                      ? ""
                      : "cursor-pointer"
                  }`}
                  style={{
                    top: window.matchMedia("(min-width: 640px)").matches
                      ? item.position.y
                      : "auto",
                    left: window.matchMedia("(min-width: 640px)").matches
                      ? item.position.x
                      : "auto",
                  }}
                >
                  <DesktopIcon
                    name={item.name}
                    icon={item.icon}
                    position={item.position}
                    onClick={() =>
                      openWindow(item.id, item.content, item.title)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Windows */}
          <AnimatePresence>
            {windows.map(
              (window) =>
                window.isOpen && (
                  <Window
                    key={window.id}
                    title={window.title}
                    onClose={() => closeWindow(window.id)}
                    onMinimize={() => minimizeWindow(window.id)}
                  >
                    {window.component}
                  </Window>
                )
            )}
            {children}
          </AnimatePresence>
        </main>

        {/* Dock */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-4 z-50">
          <div className="mx-4 px-2 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 px-2 min-w-fit">
              <Dock items={dockItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
