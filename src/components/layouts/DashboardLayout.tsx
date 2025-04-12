
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // If on mobile, use Sheet for sidebar
  if (isMobile) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 z-50"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar collapsed={false} toggleCollapse={() => {}} />
          </SheetContent>
        </Sheet>

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <div className="p-4 bg-white shadow-sm flex items-center justify-between">
            <div className="ml-10">
              <h1 className="text-lg font-bold text-gray-800">
                {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Dashboard
              </h1>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <Outlet />
          </div>
        </main>
      </div>
    );
  }

  // For desktop view
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="p-4 bg-white shadow-sm">
          <h1 className="text-lg font-bold text-gray-800">
            {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Dashboard
          </h1>
        </div>
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
