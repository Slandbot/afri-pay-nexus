import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

export type UserRole = 'neutral' | 'admin' | 'superAdmin' | 'merchant' | 'agent';

export type AdminPermissions = {
  canAcceptMerchants: boolean;
  canAcceptAgents: boolean;
  createdBy?: string;
};

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email?: string;
  role: UserRole;
  acceptedTerms: boolean;
  adminPermissions?: AdminPermissions;
  createdUsers?: string[];
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNumber: string, otp: string) => Promise<void>;
  adminLogin: (emailOrUsername: string, password: string) => Promise<void>;
  superAdminLogin: (emailOrUsername: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: Omit<User, 'id' | 'role' | 'createdAt'>) => Promise<void>;
  verifyPhone: (phoneNumber: string) => Promise<{exists: boolean}>;
  requestOTP: (phoneNumber: string) => Promise<boolean>;
  verifyOTP: (phoneNumber: string, otp: string) => Promise<boolean>;
  acceptTerms: () => void;
  updateUserRole: (role: UserRole) => void;
  createUser: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<User>;
  promoteToAdmin: (userId: string, permissions: AdminPermissions) => Promise<boolean>;
  updateAdminPermissions: (adminId: string, permissions: Partial<AdminPermissions>) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
  getUsers: (createdByCurrentUserOnly?: boolean) => Promise<User[]>;
  sessionExpiry: Date | null;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_TIMEOUT = 30 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionExpiry, setSessionExpiry] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('afriPayUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      if (JSON.parse(storedUser).role === 'admin' || JSON.parse(storedUser).role === 'superAdmin') {
        refreshSession();
      }
    }
  }, []);

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'superAdmin') || !sessionExpiry) return;
    
    const interval = setInterval(() => {
      if (sessionExpiry && new Date() > sessionExpiry) {
        toast({
          title: "Session Expired",
          description: "Your session has expired due to inactivity",
          variant: "destructive",
        });
        logout();
      }
    }, 60000);
    
    return () => clearInterval(interval);
  }, [sessionExpiry, user]);

  const refreshSession = () => {
    const newExpiry = new Date(Date.now() + SESSION_TIMEOUT);
    setSessionExpiry(newExpiry);
    localStorage.setItem('afriPaySessionExpiry', newExpiry.toISOString());
  };

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'superAdmin')) return;
    
    const activityEvents = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    
    const handleActivity = () => {
      refreshSession();
    };
    
    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity);
    });
    
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [user]);

  const logAuditEvent = (action: string, details: Record<string, any>) => {
    if (!user) return;
    
    const auditEvent = {
      userId: user.id,
      username: user.username,
      role: user.role,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    
    const auditLogs = JSON.parse(localStorage.getItem('afriPayAuditLogs') || '[]');
    auditLogs.push(auditEvent);
    localStorage.setItem('afriPayAuditLogs', JSON.stringify(auditLogs));
    
    console.log('Audit log:', auditEvent);
  };

  const verifyPhone = async (phoneNumber: string): Promise<{exists: boolean}> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const exists = phoneNumber.endsWith('9999');
    
    setIsLoading(false);
    return { exists };
  };

  const requestOTP = async (phoneNumber: string): Promise<boolean> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${phoneNumber}`,
    });
    
    setIsLoading(false);
    return true;
  };

  const verifyOTP = async (phoneNumber: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isValid = otp.length === 4 && /^\d+$/.test(otp);
    
    if (!isValid) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit code",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
    return isValid;
  };

  const signup = async (userData: Omit<User, 'id' | 'role' | 'createdAt'>): Promise<void> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substring(2, 9),
      role: 'neutral',
      createdAt: new Date(),
    };
    
    localStorage.setItem('afriPayUser', JSON.stringify(newUser));
    
    setUser(newUser);
    setIsLoading(false);
    
    toast({
      title: "Account created",
      description: "Your account has been successfully created",
    });
  };

  const login = async (phoneNumber: string, otp: string): Promise<void> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const isOTPValid = await verifyOTP(phoneNumber, otp);
    
    if (!isOTPValid) {
      setIsLoading(false);
      return;
    }
    
    const storedUser = localStorage.getItem('afriPayUser');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        firstName: "Demo",
        lastName: "User",
        username: "demouser",
        phoneNumber,
        role: 'neutral',
        acceptedTerms: true,
        createdAt: new Date(),
      };
      
      localStorage.setItem('afriPayUser', JSON.stringify(mockUser));
      setUser(mockUser);
    }
    
    setIsLoading(false);
    
    toast({
      title: "Login successful",
      description: "You have been logged in successfully",
    });
  };

  const adminLogin = async (emailOrUsername: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if ((emailOrUsername === 'admin@afripay.com' || emailOrUsername === 'admin') && password === 'admin123') {
      const mockAdminUser: User = {
        id: 'admin-' + Math.random().toString(36).substring(2, 9),
        firstName: "Admin",
        lastName: "User",
        username: "adminuser",
        email: "admin@afripay.com",
        phoneNumber: "",
        role: 'admin',
        acceptedTerms: true,
        adminPermissions: {
          canAcceptMerchants: true,
          canAcceptAgents: true,
          createdBy: 'super-admin-1'
        },
        createdUsers: [],
        createdAt: new Date(),
      };
      
      localStorage.setItem('afriPayUser', JSON.stringify(mockAdminUser));
      setUser(mockAdminUser);
      
      refreshSession();
      
      logAuditEvent('login', { loginMethod: 'password' });
      
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the Admin Dashboard",
      });
    } else {
      logAuditEvent('login_failed', { emailOrUsername, reason: 'Invalid credentials' });
      throw new Error('Invalid admin credentials');
    }
    
    setIsLoading(false);
  };

  const superAdminLogin = async (emailOrUsername: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if ((emailOrUsername === 'superadmin@afripay.com' || emailOrUsername === 'superadmin') && password === 'super123') {
      const mockSuperAdminUser: User = {
        id: 'super-admin-1',
        firstName: "Super",
        lastName: "Admin",
        username: "superadmin",
        email: "superadmin@afripay.com",
        phoneNumber: "",
        role: 'superAdmin',
        acceptedTerms: true,
        createdUsers: ['admin-1'],
        createdAt: new Date(),
      };
      
      localStorage.setItem('afriPayUser', JSON.stringify(mockSuperAdminUser));
      setUser(mockSuperAdminUser);
      
      refreshSession();
      
      logAuditEvent('login', { loginMethod: 'password', role: 'superAdmin' });
      
      toast({
        title: "SuperAdmin Login Successful",
        description: "Welcome to the SuperAdmin Dashboard",
      });
    } else {
      logAuditEvent('login_failed', { emailOrUsername, reason: 'Invalid superadmin credentials' });
      throw new Error('Invalid superadmin credentials');
    }
    
    setIsLoading(false);
  };

  const logout = (): void => {
    if (user) {
      logAuditEvent('logout', { role: user.role });
    }
    
    setUser(null);
    setSessionExpiry(null);
    localStorage.removeItem('afriPayUser');
    localStorage.removeItem('afriPaySessionExpiry');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const acceptTerms = (): void => {
    if (user) {
      const updatedUser = { ...user, acceptedTerms: true };
      setUser(updatedUser);
      localStorage.setItem('afriPayUser', JSON.stringify(updatedUser));
    }
  };

  const updateUserRole = (role: UserRole): void => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('afriPayUser', JSON.stringify(updatedUser));
      
      toast({
        title: "Role Updated",
        description: `Your role has been updated to ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      });
    }
  };

  const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    if (!user || (user.role !== 'admin' && user.role !== 'superAdmin')) {
      throw new Error('Unauthorized: Only admins can create users');
    }
    
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date(),
    };
    
    const users = JSON.parse(localStorage.getItem('afriPayUsers') || '[]');
    users.push(newUser);
    localStorage.setItem('afriPayUsers', JSON.stringify(users));
    
    if (user) {
      const updatedUser = {
        ...user,
        createdUsers: [...(user.createdUsers || []), newUser.id]
      };
      setUser(updatedUser);
      localStorage.setItem('afriPayUser', JSON.stringify(updatedUser));
    }
    
    logAuditEvent('user_created', { 
      newUserId: newUser.id, 
      role: newUser.role 
    });
    
    setIsLoading(false);
    
    toast({
      title: "User Created",
      description: `New ${newUser.role} has been created successfully`,
    });
    
    return newUser;
  };

  const promoteToAdmin = async (userId: string, permissions: AdminPermissions): Promise<boolean> => {
    if (!user) {
      throw new Error('Not authenticated');
    }
    
    if (user.role === 'superAdmin' || 
        (user.role === 'admin' && user.createdUsers?.includes(userId))) {
      
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = JSON.parse(localStorage.getItem('afriPayUsers') || '[]');
      const userIndex = users.findIndex((u: User) => u.id === userId);
      
      if (userIndex === -1) {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "User not found",
          variant: "destructive",
        });
        return false;
      }
      
      users[userIndex] = {
        ...users[userIndex],
        role: 'admin',
        adminPermissions: {
          ...permissions,
          createdBy: user.id
        }
      };
      
      localStorage.setItem('afriPayUsers', JSON.stringify(users));
      
      logAuditEvent('user_promoted_to_admin', { 
        userId, 
        promotedBy: user.id,
        permissions
      });
      
      setIsLoading(false);
      
      toast({
        title: "User Promoted",
        description: "User has been promoted to Admin role",
      });
      
      return true;
    } else {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to promote this user",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const updateAdminPermissions = async (adminId: string, permissions: Partial<AdminPermissions>): Promise<boolean> => {
    if (!user) {
      throw new Error('Not authenticated');
    }
    
    if (user.role === 'superAdmin' || 
        (user.role === 'admin' && user.createdUsers?.includes(adminId))) {
      
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = JSON.parse(localStorage.getItem('afriPayUsers') || '[]');
      const adminIndex = users.findIndex((u: User) => u.id === adminId && u.role === 'admin');
      
      if (adminIndex === -1) {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Admin not found",
          variant: "destructive",
        });
        return false;
      }
      
      users[adminIndex] = {
        ...users[adminIndex],
        adminPermissions: {
          ...users[adminIndex].adminPermissions,
          ...permissions
        }
      };
      
      localStorage.setItem('afriPayUsers', JSON.stringify(users));
      
      logAuditEvent('admin_permissions_updated', { 
        adminId, 
        updatedBy: user.id,
        permissions
      });
      
      setIsLoading(false);
      
      toast({
        title: "Permissions Updated",
        description: "Admin permissions have been updated",
      });
      
      return true;
    } else {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to update this admin's permissions",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const deleteUser = async (userId: string): Promise<boolean> => {
    if (!user) {
      throw new Error('Not authenticated');
    }
    
    const users = JSON.parse(localStorage.getItem('afriPayUsers') || '[]');
    const userToDelete = users.find((u: User) => u.id === userId);
    
    if (!userToDelete) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      });
      return false;
    }
    
    const canDelete = user.role === 'superAdmin' ? 
      (userToDelete.role !== 'superAdmin') : 
      (user.role === 'admin' && user.createdUsers?.includes(userId));
    
    if (canDelete) {
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUsers = users.filter((u: User) => u.id !== userId);
      localStorage.setItem('afriPayUsers', JSON.stringify(updatedUsers));
      
      logAuditEvent('user_deleted', { 
        userId, 
        deletedBy: user.id,
        userRole: userToDelete.role
      });
      
      setIsLoading(false);
      
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully",
      });
      
      return true;
    } else {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to delete this user",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const getUsers = async (createdByCurrentUserOnly: boolean = false): Promise<User[]> => {
    if (!user) {
      throw new Error('Not authenticated');
    }
    
    let users = JSON.parse(localStorage.getItem('afriPayUsers') || '[]');
    
    if (user.role === 'admin' && createdByCurrentUserOnly) {
      users = users.filter((u: User) => user.createdUsers?.includes(u.id));
    } else if (user.role === 'admin') {
      users = users.filter((u: User) => 
        u.role !== 'admin' || 
        user.createdUsers?.includes(u.id)
      );
      users = users.filter((u: User) => u.role !== 'superAdmin');
    }
    
    return users;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        adminLogin,
        superAdminLogin,
        logout,
        signup,
        verifyPhone,
        requestOTP,
        verifyOTP,
        acceptTerms,
        updateUserRole,
        createUser,
        promoteToAdmin,
        updateAdminPermissions,
        deleteUser,
        getUsers,
        sessionExpiry,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
