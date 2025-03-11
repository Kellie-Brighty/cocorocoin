import Layout from "./components/Layout/Layout";
import { useState } from "react";
import LoginScreen from "./components/Auth/LoginScreen";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Layout>{null}</Layout>;
}

export default App;
