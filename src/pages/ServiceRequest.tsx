
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ServiceRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [serviceType, setServiceType] = useState<'merchant' | 'agent'>('merchant');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Request Submitted",
        description: "Your service request has been submitted for review.",
      });
      navigate('/neutral-dashboard');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate('/neutral-dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardHeader>
          <CardTitle>Service Request</CardTitle>
          <CardDescription>
            Apply for a merchant or agent account to access additional features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base">Select Service Type</Label>
                <RadioGroup 
                  value={serviceType} 
                  onValueChange={(value: 'merchant' | 'agent') => setServiceType(value)}
                  className="flex flex-col space-y-1 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="merchant" id="merchant" />
                    <Label htmlFor="merchant" className="cursor-pointer">
                      <div>Merchant Account</div>
                      <div className="text-xs text-gray-500">For businesses that want to accept payments</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="agent" id="agent" />
                    <Label htmlFor="agent" className="cursor-pointer">
                      <div>Agent Account</div>
                      <div className="text-xs text-gray-500">For individuals offering payment services to others</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">Business/Agent Name</Label>
                <Input 
                  id="businessName" 
                  value={businessName} 
                  onChange={(e) => setBusinessName(e.target.value)} 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Financial Services</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea 
                  id="businessDescription" 
                  value={businessDescription} 
                  onChange={(e) => setBusinessDescription(e.target.value)} 
                  placeholder="Briefly describe your business or services"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address</Label>
                <Textarea 
                  id="businessAddress" 
                  value={businessAddress} 
                  onChange={(e) => setBusinessAddress(e.target.value)} 
                  placeholder="Enter your physical business address"
                  rows={2}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Upload Documents</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {serviceType === 'merchant' 
                      ? 'Business registration, ID, and tax documents' 
                      : 'ID card, proof of address, and profile photo'}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  For demo purposes, document upload is not required
                </p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-4">
                By submitting this request, you agree to our Terms of Service and Privacy Policy.
                Your application will be reviewed by our team.
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit}
            className="w-full bg-afri-primary hover:bg-afri-secondary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Request'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ServiceRequest;
