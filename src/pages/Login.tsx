
import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Loader2, Key } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

// Country codes for dropdown
const countryCodes = [
  { code: '+234', country: 'Nigeria' },
  { code: '+233', country: 'Ghana' },
  { code: '+229', country: 'Benin' },
  { code: '+225', country: 'Côte d\'Ivoire' },
  { code: '+237', country: 'Cameroon' },
  { code: '+254', country: 'Kenya' },
  { code: '+27', country: 'South Africa' },
  { code: '+256', country: 'Uganda' },
  { code: '+255', country: 'Tanzania' },
  { code: '+251', country: 'Ethiopia' },
];

const Login = () => {
  const { login, signup, requestOTP, verifyOTP, verifyPhone, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('login');
  const [countryCode, setCountryCode] = useState('+234');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCredentialForm, setShowCredentialForm] = useState(false);
  const [error, setError] = useState('');
  const [accountExists, setAccountExists] = useState<boolean | null>(null);

  // Handler for phone number verification
  const handleVerifyPhone = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate phone number
    if (!phoneNumber.trim()) {
      setError('Please enter a phone number');
      return;
    }
    
    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      const { exists } = await verifyPhone(fullPhoneNumber);
      
      setAccountExists(exists);
      
      if (activeTab === 'signup' && exists) {
        setError('An account with this phone number already exists. Please log in.');
        setActiveTab('login');
        return;
      }
      
      if (activeTab === 'login' && !exists) {
        setError('No account found with this phone number. Please sign up.');
        setActiveTab('signup');
        setShowCredentialForm(false);
        return;
      }
      
      // Request OTP
      const otpSent = await requestOTP(fullPhoneNumber);
      if (otpSent) {
        setShowOtpInput(true);
        toast({
          title: "OTP Sent",
          description: `A verification code has been sent to ${fullPhoneNumber}`,
        });
      }
    } catch (err) {
      setError('Failed to verify phone number. Please try again.');
    }
  };

  // Handler for OTP verification
  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate OTP
    if (!otp.trim() || otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }
    
    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      const isValid = await verifyOTP(fullPhoneNumber, otp);
      
      if (isValid) {
        if (activeTab === 'login') {
          // Proceed with login
          await login(fullPhoneNumber, otp);
          navigate('/neutral-dashboard');
        } else {
          // Show credential form for signup
          setShowCredentialForm(true);
          setShowOtpInput(false);
        }
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again.');
    }
  };

  // Handler for signup
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate required fields
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Validate password strength
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      await signup({
        firstName,
        lastName,
        username,
        phoneNumber: fullPhoneNumber,
        acceptedTerms: false,
      });
      
      navigate('/terms');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 afri-pattern-bg p-4">
      <Card className="w-full max-w-md shadow-lg animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold text-afri-secondary">
            {showCredentialForm ? 'Complete Your Registration' : 'Welcome Back'}
          </CardTitle>
          <CardDescription>
            {showCredentialForm 
              ? 'Please fill in your information to complete registration' 
              : 'Log in to access your account or sign up to create a new one'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {!showCredentialForm && (
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                {!showOtpInput ? (
                  <form onSubmit={handleVerifyPhone} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-phone">Phone Number</Label>
                      <div className="flex gap-2">
                        <Select value={countryCode} onValueChange={setCountryCode}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.code} ({country.country})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          id="login-phone"
                          placeholder="Phone Number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-afri-primary hover:bg-afri-secondary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        'Request OTP'
                      )}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        placeholder="4-Digit Code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={4}
                      />
                      <p className="text-xs text-gray-500">
                        A 4-digit code has been sent to your phone number
                      </p>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-afri-primary hover:bg-afri-secondary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        'Verify OTP'
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => setShowOtpInput(false)}
                    >
                      Back
                    </Button>
                  </form>
                )}
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                {!showOtpInput ? (
                  <form onSubmit={handleVerifyPhone} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Phone Number</Label>
                      <div className="flex gap-2">
                        <Select value={countryCode} onValueChange={setCountryCode}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.code} ({country.country})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          id="signup-phone"
                          placeholder="Phone Number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        We'll check if you already have an account
                      </p>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-afri-primary hover:bg-afri-secondary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Checking...
                        </>
                      ) : (
                        'Continue'
                      )}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        placeholder="4-Digit Code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={4}
                      />
                      <p className="text-xs text-gray-500">
                        A 4-digit code has been sent to your phone number
                      </p>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-afri-primary hover:bg-afri-secondary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        'Verify OTP'
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => setShowOtpInput(false)}
                    >
                      Back
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          )}
          
          {showCredentialForm && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-afri-primary hover:bg-afri-secondary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => {
                  setShowCredentialForm(false);
                  setShowOtpInput(false);
                }}
              >
                Back
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="flex justify-center mb-2">
            <p className="text-sm text-gray-500">
              {activeTab === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <Button variant="link" className="p-0 h-auto text-afri-primary" onClick={() => setActiveTab('signup')}>
                    Sign up
                  </Button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Button variant="link" className="p-0 h-auto text-afri-primary" onClick={() => setActiveTab('login')}>
                    Log in
                  </Button>
                </>
              )}
            </p>
          </div>
          
          {/* New Admin Login Link */}
          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              className="text-sm text-gray-500 hover:text-afri-primary"
              onClick={() => navigate('/admin-login')}
            >
              <Key className="mr-2 h-4 w-4" />
              Admin Login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
