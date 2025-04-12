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

  // Mock function to check if a phone number exists in the system
  const verifyPhone = async (phoneNumber: string): Promise<{exists: boolean}> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, we'll say any number ending with '9999' already exists
    const exists = phoneNumber.endsWith('9999');
    
    setIsLoading(false);
    return { exists };
  };

  // Mock function to request an OTP
  const requestOTP = async (phoneNumber: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${phoneNumber}`,
    });
    
    setIsLoading(false);
    return true;
  };

  // Mock function to verify an OTP
  const verifyOTP = async (phoneNumber: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, any 4-digit OTP will be valid
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

  // Mock signup function
  const signup = async (userData: Omit<User, 'id' | 'role'>): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substring(2, 9),
      role: 'neutral',
    };
    
    // Store user data in local storage for persistence
    localStorage.setItem('afriPayUser', JSON.stringify(newUser));
    
    setUser(newUser);
    setIsLoading(false);
    
    toast({
      title: "Account created",
      description: "Your account has been successfully created",
    });
  };

  // Mock login function
  const login = async (phoneNumber: string, otp: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if the OTP is valid
    const isOTPValid = await verifyOTP(phoneNumber, otp);
    
    if (!isOTPValid) {
      setIsLoading(false);
      return;
    }
    
    // For demo purposes, create a mock user if no stored user exists
    const storedUser = localStorage.getItem('afriPayUser');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Create a mock user if no stored user
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

  // Mock admin login function
  const adminLogin = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, accept specific admin credentials
    // In a real app, this would validate against a backend
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

  // Logout function
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('afriPayUser');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  // Function to accept terms and conditions
  const acceptTerms = (): void => {
    if (user) {
      const updatedUser = { ...user, acceptedTerms: true };
      setUser(updatedUser);
      localStorage.setItem('afriPayUser', JSON.stringify(updatedUser));
    }
  };

  // Function to update user role
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
