import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, ChevronRight, 
  Home, ClipboardList, Clock, CheckCircle, XCircle, 
  FileText, Users, Settings, ShoppingBag, UserCheck, 
  LogOut, FileEdit, CreditCard, PieChart, ChevronsUpDown,
  User, FileCheck, Shield, Lock, FileSpreadsheet, Bell
} from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar = ({ collapsed, toggleCollapse }: SidebarProps) => {
  const { user, logout } = useAuth();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  
  const toggleGroup = (group: string) => {
    setOpenGroup(openGroup === group ? null : group);
  };

  const getNeutralMenuItems = () => [
    {
      label: 'Dashboard',
      icon: <Home size={18} />,
      to: '/neutral-dashboard',
    },
    {
      label: 'Request Service',
      icon: <FileEdit size={18} />,
      to: '/service-request',
    },
    {
      label: 'Requests',
      icon: <ClipboardList size={18} />,
      isGroup: true,
      id: 'requests',
      items: [
        {
          label: 'Pending',
          icon: <Clock size={16} />,
          to: '/requests/pending',
        },
        {
          label: 'Completed',
          icon: <CheckCircle size={16} />,
          to: '/requests/completed',
        },
        {
          label: 'Rejected',
          icon: <XCircle size={16} />,
          to: '/requests/rejected',
        },
      ],
    },
  ];

  const getSuperAdminMenuItems = () => [
    {
      label: 'Dashboard',
      icon: <Home size={18} />,
      to: '/superadmin-dashboard',
    },
    {
      label: 'User Management',
      icon: <Users size={18} />,
      to: '/superadmin-dashboard/users',
    },
    {
      label: 'Admin Management',
      icon: <Shield size={18} />,
      to: '/superadmin-dashboard/admins',
    },
    {
      label: 'System Logs',
      icon: <FileSpreadsheet size={18} />,
      to: '/superadmin-dashboard/logs',
    },
    {
      label: 'Approvals',
      icon: <FileCheck size={18} />,
      to: '/superadmin-dashboard/approvals',
    },
    {
      label: 'Notifications',
      icon: <Bell size={18} />,
      to: '/superadmin-dashboard/notifications',
    },
    {
      label: 'Security Settings',
      icon: <Lock size={18} />,
      to: '/superadmin-dashboard/security',
    },
    {
      label: 'System Settings',
      icon: <Settings size={18} />,
      to: '/superadmin-dashboard/settings',
    },
  ];

  const getAdminMenuItems = () => [
    {
      label: 'Dashboard',
      icon: <Home size={18} />,
      to: '/admin-dashboard',
    },
    {
      label: 'Approvals',
      icon: <FileCheck size={18} />,
      to: '/admin-dashboard/approvals',
    },
    {
      label: 'Users',
      icon: <Users size={18} />,
      to: '/admin-dashboard/users',
    },
    {
      label: 'Merchants',
      icon: <ShoppingBag size={18} />,
      to: '/admin-dashboard/merchants',
    },
    {
      label: 'Agents',
      icon: <UserCheck size={18} />,
      to: '/admin-dashboard/agents',
    },
    {
      label: 'Transactions',
      icon: <CreditCard size={18} />,
      to: '/admin-dashboard/transactions',
    },
    {
      label: 'Reports',
      icon: <FileText size={18} />,
      to: '/admin-dashboard/reports',
    },
    {
      label: 'Settings',
      icon: <Settings size={18} />,
      to: '/admin-dashboard/settings',
    },
  ];

  const getMerchantMenuItems = () => [
    {
      label: 'Dashboard',
      icon: <Home size={18} />,
      to: '/merchant-dashboard',
    },
    {
      label: 'Transactions',
      icon: <CreditCard size={18} />,
      to: '/merchant/transactions',
    },
    {
      label: 'Reports',
      icon: <PieChart size={18} />,
      to: '/merchant/reports',
    },
    {
      label: 'Business',
      icon: <ShoppingBag size={18} />,
      to: '/merchant/business',
    },
    {
      label: 'Settings',
      icon: <Settings size={18} />,
      to: '/merchant/settings',
    },
  ];

  const getAgentMenuItems = () => [
    {
      label: 'Dashboard',
      icon: <Home size={18} />,
      to: '/agent-dashboard',
    },
    {
      label: 'Money Transfer',
      icon: <CreditCard size={18} />,
      to: '/agent/transfer',
    },
    {
      label: 'Airtime & Data',
      icon: <FileText size={18} />,
      to: '/agent/airtime',
    },
    {
      label: 'Transactions',
      icon: <ClipboardList size={18} />,
      to: '/agent/transactions',
    },
    {
      label: 'Settings',
      icon: <Settings size={18} />,
      to: '/agent/settings',
    },
  ];

  const getMenuItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'superAdmin':
        return getSuperAdminMenuItems();
      case 'admin':
        return getAdminMenuItems();
      case 'merchant':
        return getMerchantMenuItems();
      case 'agent':
        return getAgentMenuItems();
      default:
        return getNeutralMenuItems();
    }
  };

  const menuItems = getMenuItems();

  const renderMenuItem = (item: any, index: number) => {
    if (item.isGroup) {
      return (
        <Collapsible
          key={index}
          open={openGroup === item.id}
          onOpenChange={() => toggleGroup(item.id)}
          className="w-full"
        >
          <CollapsibleTrigger className={`flex items-center w-full px-3 py-2 rounded-md transition-colors ${collapsed ? 'justify-center' : 'justify-between'} hover:bg-white/10`}>
            <div className="flex items-center gap-3">
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </div>
            {!collapsed && <ChevronsUpDown size={16} />}
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-4 mt-1 space-y-1">
            {item.items.map((subItem: any, subIndex: number) => (
              <NavLink
                key={subIndex}
                to={subItem.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10'
                  }`
                }
              >
                {subItem.icon}
                {!collapsed && <span>{subItem.label}</span>}
              </NavLink>
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <NavLink
        key={index}
        to={item.to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
            isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10'
          } ${collapsed ? 'justify-center' : ''}`
        }
      >
        {item.icon}
        {!collapsed && <span>{item.label}</span>}
      </NavLink>
    );
  };

  return (
    <div
      className={`bg-sidebar text-sidebar-foreground transition-all duration-300 h-screen flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center border-b border-sidebar-border">
        {collapsed ? (
          <div className="mx-auto">
            <Logo size="sm" textColor="text-white" iconColor="text-white" />
          </div>
        ) : (
          <Logo size="md" textColor="text-white" iconColor="text-white" />
        )}
      </div>

      {!collapsed && user && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className={`rounded-full p-1 ${
              user.role === 'superAdmin' 
                ? 'bg-red-400/20' 
                : user.role === 'admin' 
                  ? 'bg-blue-400/20' 
                  : 'bg-white/20'
            }`}>
              {user.role === 'superAdmin' ? (
                <Shield size={24} className="text-red-100" />
              ) : user.role === 'admin' ? (
                <Lock size={24} className="text-blue-100" />
              ) : (
                <User size={24} className="text-white" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.firstName} {user.lastName}</span>
              <span className={`text-xs ${
                user.role === 'superAdmin' 
                  ? 'text-red-200' 
                  : user.role === 'admin' 
                    ? 'text-blue-200' 
                    : 'text-white/70'
              }`}>
                {user.role === 'superAdmin' 
                  ? 'SuperAdmin' 
                  : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 py-4 flex flex-col gap-1 overflow-auto">
        {menuItems.map(renderMenuItem)}
      </div>

      <div className="p-4 border-t border-sidebar-border flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleCollapse}
          className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
        >
          {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /> <span>Collapse</span></>}
        </Button>

        <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`w-full hover:bg-white/10 hover:text-white ${
                collapsed ? "justify-center p-2" : ""
              }`}
            >
              <LogOut size={18} className="mr-2" />
              {!collapsed && "Logout"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setIsLogoutDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                className="bg-afri-primary hover:bg-afri-secondary"
                onClick={() => {
                  logout();
                  setIsLogoutDialogOpen(false);
                }}
              >
                Logout
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Sidebar;
