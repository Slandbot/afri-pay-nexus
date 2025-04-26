
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { cn } from "@/lib/utils";

const DashboardLayoutWrapper = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if screen is mobile on component mount and window resize
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);
  
  // On mobile, sidebar is collapsed by default
  useEffect(() => {
    setSidebarCollapsed(isMobile);
  }, [isMobile]);
  
  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header should always be visible */}
      <DashboardHeader toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar is injected by DashboardLayout component */}
        <div 
          className={cn(
            "transition-all duration-300 ease-in-out flex-shrink-0 h-[calc(100vh-4rem)]",
            sidebarCollapsed ? "w-0 -ml-64" : "w-64"
          )}
        />
        
        {/* Main content */}
        <div className="flex-grow p-4 md:p-6 overflow-auto h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayoutWrapper;
