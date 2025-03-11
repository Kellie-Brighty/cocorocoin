import Layout from "./components/Layout/Layout";
import Window from "./components/UI/Window";
import Finder from "./components/Apps/Finder/Finder";
import { useState } from "react";
import LoginScreen from "./components/Auth/LoginScreen";

function App() {
  const [showWindow, setShowWindow] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <Layout>
      {showWindow && (
        <Window
          title="CocoroCoin Explorer"
          onClose={() => setShowWindow(false)}
          onMinimize={() => setShowWindow(false)}
        >
          <Finder />
        </Window>
      )}
    </Layout>
  );
}

export default App;
