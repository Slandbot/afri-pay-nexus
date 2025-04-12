
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 afri-pattern-bg p-4">
      <Card className="w-full max-w-md shadow-lg animate-scale">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold text-afri-secondary">Welcome to AfriPay Nexus</CardTitle>
          <CardDescription>
            Your comprehensive payment back office solution for Africa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2 py-4">
            <h3 className="font-semibold text-lg text-afri-primary">Seamless Payment Solutions</h3>
            <p className="text-gray-600">
              AfriPay Nexus provides a powerful platform for merchants, agents, and administrators
              to manage payments, transactions, and business operations across Africa.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="text-center p-3 bg-afri-primary/10 rounded-md">
              <h4 className="font-medium text-afri-primary">Multi-Currency Support</h4>
              <p className="text-xs text-gray-600 mt-1">USD, EUR, GBP and local currencies</p>
            </div>
            <div className="text-center p-3 bg-afri-primary/10 rounded-md">
              <h4 className="font-medium text-afri-primary">Real-time Notifications</h4>
              <p className="text-xs text-gray-600 mt-1">Stay updated on all transactions</p>
            </div>
            <div className="text-center p-3 bg-afri-primary/10 rounded-md">
              <h4 className="font-medium text-afri-primary">Secure Platform</h4>
              <p className="text-xs text-gray-600 mt-1">Advanced security measures</p>
            </div>
            <div className="text-center p-3 bg-afri-primary/10 rounded-md">
              <h4 className="font-medium text-afri-primary">Role-Based Access</h4>
              <p className="text-xs text-gray-600 mt-1">Customized for different user types</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-afri-primary hover:bg-afri-secondary"
            onClick={handleAccept}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Accept & Continue'}
          </Button>
        </CardFooter>
        <div className="text-center text-xs text-gray-500 pb-4">
          By clicking "Accept & Continue", you agree to our Terms of Service
        </div>
      </Card>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>&copy; 2023 AfriPay Nexus. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
