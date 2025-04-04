// sidebarContext.tsx
"use client"
import { createContext, useState, useContext, ReactNode } from "react";

// interface ProfileInfo {
//   total_investment?: number;
//   current_value?: number;
//   roi?: number;
//   // Add other profile properties as needed
// }

interface CryptoData {
  $id?: string;
  token_name: string;
  value: number;
  price_direction: boolean | null;
  price_change: string;
}
interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebarCollapse: () => void;
  priceActions: CryptoData[] | null;
  setPriceActions: React.Dispatch<React.SetStateAction<CryptoData[] | null>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  // const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  // const [loggedInUser, setLoggedInUser] = useState<any | null>(null); // Replace 'any' with your user type
  const [priceActions, setPriceActions] = useState<CryptoData[] | null>(null);

  const toggleSidebarCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebarCollapse,
        priceActions,
        setPriceActions,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};