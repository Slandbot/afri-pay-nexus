
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const SuperAdminLogin = () => {
  const { superAdminLogin, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSuperAdminLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!emailOrUsername || !password) {
      setError('Please enter both username/email and password');
      return;
    }

    try {
      await superAdminLogin(emailOrUsername, password);
      navigate('/superadmin-dashboard');
      toast({
        title: "SuperAdmin Login Successful",
        description: "Welcome to the SuperAdmin Dashboard",
        variant: "default"
      });
    } catch (err) {
      setError('Invalid SuperAdmin credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 afri-pattern-bg p-4">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      <Card className="w-full max-w-md shadow-lg animate-fade-in dark:bg-gray-800">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold text-afri-secondary dark:text-afri-primary">
            SuperAdmin Login
          </CardTitle>
          <CardDescription className="dark:text-gray-300">
            Enter your SuperAdmin credentials to access the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSuperAdminLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="super-admin-email" className="dark:text-gray-200">Username or Email</Label>
              <Input
                id="super-admin-email"
                type="text"
                placeholder="Enter your username or email"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="super-admin-password" className="dark:text-gray-200">Password</Label>
              <Input
                id="super-admin-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-afri-primary hover:bg-afri-secondary dark:bg-afri-secondary dark:hover:bg-afri-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Login as SuperAdmin
                </>
              )}
            </Button>
            
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="ghost" 
                className="text-sm"
                onClick={() => navigate('/admin-login')}
              >
                Admin Login
              </Button>
              
              <Button 
                type="button" 
                variant="ghost" 
                className="text-sm"
                onClick={() => navigate('/login')}
              >
                User Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminLogin;
