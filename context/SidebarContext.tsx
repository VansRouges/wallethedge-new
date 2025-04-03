// sidebarContext.tsx
"use client"
import { createContext, useState, useContext, ReactNode } from "react";

interface ProfileInfo {
  total_investment?: number;
  current_value?: number;
  roi?: number;
  // Add other profile properties as needed
}

interface PriceActions {
  // Define the structure of priceActions if needed
  [key: string]: any;
}

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebarCollapse: () => void;
  loggedInUser: any | null; // Replace 'any' with your user type
  profileInfo: ProfileInfo | null;
  priceActions: PriceActions | null;
  setProfileInfo: React.Dispatch<React.SetStateAction<ProfileInfo | null>>;
  setLoggedInUser: React.Dispatch<React.SetStateAction<any | null>>; // Replace 'any' with your user type
  setPriceActions: React.Dispatch<React.SetStateAction<PriceActions | null>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<any | null>(null); // Replace 'any' with your user type
  const [priceActions, setPriceActions] = useState<PriceActions | null>(null);

  const toggleSidebarCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebarCollapse,
        loggedInUser,
        profileInfo,
        priceActions,
        setProfileInfo,
        setLoggedInUser,
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