import { useState } from "react";
import { motion } from "framer-motion";
import backgroundImage from "../../assets/background.png";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [selectedUser] = useState({
    name: "CocoroCoin User",
    avatar: "👤",
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [time, setTime] = useState(new Date());

  // Update clock every second
  useState(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "password" || password === "") {
      // Demo purposes only
      onLogin();
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Time and Date */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center text-white">
        <div className="text-6xl font-light mb-2">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="text-xl">
          {time.toLocaleDateString([], {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-[200px] text-center"
      >
        {/* User Avatar */}
        <motion.div
          className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl"
          whileHover={{ scale: 1.05 }}
        >
          {selectedUser.avatar}
        </motion.div>

        {/* User Name */}
        <h2 className="text-xl text-white mb-4">{selectedUser.name}</h2>

        {/* Password Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-64 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm mt-2"
              >
                {error}
              </motion.p>
            )}
          </div>

          <motion.button
            type="submit"
            className="px-8 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>

      {/* Power Options */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button className="text-white hover:text-white/80 transition-colors">
          <span className="text-2xl">⚡</span>
        </button>
        <button className="text-white hover:text-white/80 transition-colors">
          <span className="text-2xl">🔄</span>
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
