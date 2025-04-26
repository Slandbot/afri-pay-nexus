
import { NotificationCenter } from "@/components/NotificationCenter";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { CurrencySelector } from "@/components/CurrencySelector";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useNotification } from "@/contexts/NotificationContext";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

export function DashboardHeader({ toggleSidebar }: DashboardHeaderProps) {
  const { user, logout } = useAuth();
  const { addNotification } = useNotification();
  
  // Example function to demonstrate notifications
  const handleTestNotification = () => {
    const types = ["info", "success", "warning", "error"] as const;
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    addNotification({
      title: `Test ${randomType} notification`,
      message: `This is a test ${randomType} notification for demonstration purposes.`,
      type: randomType,
    });
  };
  
  return (
    <div className="border-b flex items-center justify-between p-4 h-16 bg-card">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold text-lg">AfriPay Nexus</h1>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Demo button - remove in production */}
        <Button size="sm" variant="outline" onClick={handleTestNotification}>
          Test Notification
        </Button>
        
        <CurrencySelector />
        <NotificationCenter />
        <ThemeSwitcher />
        
        <div className="ml-4">
          <div className="text-xs text-muted-foreground">
            Welcome, {user?.firstName}
          </div>
        </div>
      </div>
    </div>
  );
}
