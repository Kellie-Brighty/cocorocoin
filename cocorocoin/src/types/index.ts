export interface User {
  id: string;
  name: string;
  avatar: string;
  walletAddress?: string;
}

export interface DockItem {
  id: string;
  name: string;
  icon: string;
  action: () => void;
}

export interface AppWindow {
  id: string;
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  position: {
    x: number;
    y: number;
  };
}

export interface WalletInfo {
  address: string;
  balance: string;
  network: string;
}

export type ThemeMode = "light" | "dark";
