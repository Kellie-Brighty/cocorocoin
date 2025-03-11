import { motion } from "framer-motion";

interface DesktopIconProps {
  name: string;
  icon: string;
  position: { x: number; y: number };
  onClick: () => void;
}

const DesktopIcon = ({ name, icon, onClick }: DesktopIconProps) => {
  return (
    <motion.button
      className="flex flex-col items-center justify-center w-full h-24 cursor-pointer group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="text-4xl mb-1">{icon}</div>
      <div className="text-sm text-white text-center break-words px-2 py-1 rounded-md bg-black/40 group-hover:bg-black/60">
        {name}
      </div>
    </motion.button>
  );
};

export default DesktopIcon;
