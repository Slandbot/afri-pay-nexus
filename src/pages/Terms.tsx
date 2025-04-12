
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const Terms = () => {
  const { acceptTerms } = useAuth();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleAccept = () => {
    acceptTerms();
    navigate('/neutral-dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 afri-pattern-bg p-4">
      <Card className="w-full max-w-2xl shadow-lg animate-scale">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold text-afri-secondary">Terms and Conditions</CardTitle>
          <CardDescription>
            Please read and accept our terms and conditions to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-72 overflow-auto p-4 border border-gray-200 rounded-md text-sm text-gray-700">
            <h3 className="font-semibold mb-2">1. Acceptance of Terms</h3>
            <p className="mb-4">
              By accessing or using AfriPay Nexus, you agree to be bound by these Terms and Conditions. If you do not agree to all the terms and conditions, you may not access or use our services.
            </p>
            
            <h3 className="font-semibold mb-2">2. Service Description</h3>
            <p className="mb-4">
              AfriPay Nexus provides payment processing services for merchants and agents in Africa. We facilitate transactions, manage accounts, and provide analytics for our users.
            </p>
            
            <h3 className="font-semibold mb-2">3. User Accounts</h3>
            <p className="mb-4">
              You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account.
            </p>
            
            <h3 className="font-semibold mb-2">4. Privacy Policy</h3>
            <p className="mb-4">
              Your use of AfriPay Nexus is also governed by our Privacy Policy, which is incorporated by reference into these Terms and Conditions.
            </p>
            
            <h3 className="font-semibold mb-2">5. Fees and Payments</h3>
            <p className="mb-4">
              AfriPay Nexus charges fees for certain services. These fees are clearly disclosed before you use such services. You agree to pay all fees and charges incurred through your account.
            </p>
            
            <h3 className="font-semibold mb-2">6. Termination</h3>
            <p className="mb-4">
              AfriPay Nexus reserves the right to terminate or suspend your access to our services at any time, without notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users, us, or third parties, or for any other reason.
            </p>
            
            <h3 className="font-semibold mb-2">7. Limitation of Liability</h3>
            <p className="mb-4">
              AfriPay Nexus shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the services.
            </p>
            
            <h3 className="font-semibold mb-2">8. Changes to Terms</h3>
            <p className="mb-4">
              We reserve the right to modify these Terms and Conditions at any time. Your continued use of AfriPay Nexus following any changes indicates your acceptance of the new Terms and Conditions.
            </p>
            
            <h3 className="font-semibold mb-2">9. Governing Law</h3>
            <p className="mb-4">
              These Terms and Conditions shall be governed by the laws of the Federal Republic of Nigeria without regard to its conflict of law provisions.
            </p>
            
            <h3 className="font-semibold mb-2">10. Contact Information</h3>
            <p className="mb-4">
              If you have any questions about these Terms and Conditions, please contact us at support@afripaynexus.com.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={isChecked} 
              onCheckedChange={(checked) => setIsChecked(checked === true)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have read and agree to the terms and conditions
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-afri-primary hover:bg-afri-secondary"
            disabled={!isChecked}
            onClick={handleAccept}
          >
            Accept and Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Terms;
