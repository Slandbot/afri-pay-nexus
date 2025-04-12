
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  FileEdit, 
  PlusCircle 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

const statCards = [
  {
    title: 'Pending Requests',
    value: '2',
    icon: <Clock className="text-amber-500" size={24} />,
    color: 'bg-amber-100 border-amber-200',
  },
  {
    title: 'Approved Requests',
    value: '5',
    icon: <CheckCircle className="text-green-500" size={24} />,
    color: 'bg-green-100 border-green-200',
  },
  {
    title: 'Rejected Requests',
    value: '1',
    icon: <XCircle className="text-red-500" size={24} />,
    color: 'bg-red-100 border-red-200',
  },
];

const recentRequests = [
  {
    id: 'REQ-001',
    type: 'Merchant Account',
    status: 'pending',
    date: '2023-05-10',
  },
  {
    id: 'REQ-002',
    type: 'Agent Account',
    status: 'approved',
    date: '2023-05-08',
  },
  {
    id: 'REQ-003',
    type: 'Merchant Account',
    status: 'rejected',
    date: '2023-04-30',
    reason: 'Incomplete documentation',
  },
];

const NeutralDashboard = () => {
  const { user } = useAuth();
  const [pendingProgress] = useState(75);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">Pending</span>;
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-afri-secondary">Welcome, {user?.firstName}</h1>
        <p className="text-gray-500 mt-1">Here's an overview of your service requests</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((card, index) => (
          <Card key={index} className={`${card.color} border`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Service Requests</CardTitle>
            <CardDescription>Track the status of your applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentRequests.length > 0 ? (
              recentRequests.map((request, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <div className="font-medium">{request.type}</div>
                    <div className="text-xs text-gray-500">ID: {request.id} • {request.date}</div>
                    {request.reason && <div className="text-xs text-red-500 mt-1">Reason: {request.reason}</div>}
                  </div>
                  <div>{getStatusBadge(request.status)}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">No service requests yet</div>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/service-request">
                <FileEdit className="mr-2 h-4 w-4" />
                View All Requests
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Application Progress</CardTitle>
            <CardDescription>Your service approval process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Application Process</span>
                <span className="font-medium">{pendingProgress}%</span>
              </div>
              <Progress value={pendingProgress} className="h-2" />
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Next Steps:</h4>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Account Created</p>
                    <p className="text-xs text-gray-500">Your account has been set up</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone Verified</p>
                    <p className="text-xs text-gray-500">Your phone number has been verified</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="text-amber-500 mr-2 h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Service Request</p>
                    <p className="text-xs text-gray-500">Admin review in progress</p>
                  </div>
                </div>
                <div className="flex items-start text-gray-400">
                  <PlusCircle className="mr-2 h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Role Assignment</p>
                    <p className="text-xs">Access your role-specific dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-afri-primary hover:bg-afri-secondary">
              <Link to="/service-request">
                <PlusCircle className="mr-2 h-4 w-4" />
                Request New Service
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NeutralDashboard;
