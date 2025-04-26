import { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

export type UserRole = 'neutral' | 'admin' | 'merchant' | 'agent';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  role: UserRole;
  acceptedTerms: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNumber: string, otp: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: Omit<User, 'id' | 'role'>) => Promise<void>;
  verifyPhone: (phoneNumber: string) => Promise<{exists: boolean}>;
  requestOTP: (phoneNumber: string) => Promise<boolean>;
  verifyOTP: (phoneNumber: string, otp: string) => Promise<boolean>;
  acceptTerms: () => void;
  updateUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

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

  const signup = async (userData: Omit<User, 'id' | 'role'>): Promise<void> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substring(2, 9),
      role: 'neutral',
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

  const adminLogin = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email === 'admin@afripay.com' && password === 'admin123') {
      const mockAdminUser: User = {
        id: 'admin-' + Math.random().toString(36).substring(2, 9),
        firstName: "Admin",
        lastName: "User",
        username: "adminuser",
        phoneNumber: "",
        role: 'admin',
        acceptedTerms: true,
      };
      
      localStorage.setItem('afriPayUser', JSON.stringify(mockAdminUser));
      setUser(mockAdminUser);
      
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the Admin Dashboard",
      });
    } else {
      throw new Error('Invalid admin credentials');
    }
    
    setIsLoading(false);
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('afriPayUser');
    
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        adminLogin,
        logout,
        signup,
        verifyPhone,
        requestOTP,
        verifyOTP,
        acceptTerms,
        updateUserRole,
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
