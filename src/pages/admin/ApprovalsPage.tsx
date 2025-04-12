
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle, Eye, FileText, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for service requests
const mockRequests = [
  {
    id: '1',
    userId: 'user-123',
    name: 'John Doe',
    serviceType: 'merchant',
    businessName: 'JD Electronics',
    businessType: 'Electronics Store',
    documentLinks: ['ID.pdf', 'BusinessReg.pdf', 'TaxCert.pdf'],
    submittedAt: '2025-04-10T13:45:00',
    status: 'pending',
  },
  {
    id: '2',
    userId: 'user-124',
    name: 'Sarah Johnson',
    serviceType: 'agent',
    businessName: 'SJ Financial Services',
    businessType: 'Financial Services',
    documentLinks: ['ID.pdf', 'AgentCert.pdf'],
    submittedAt: '2025-04-11T09:30:00',
    status: 'pending',
  },
  {
    id: '3',
    userId: 'user-125',
    name: 'Michael Smith',
    serviceType: 'merchant',
    businessName: 'MS Groceries',
    businessType: 'Grocery Store',
    documentLinks: ['ID.pdf', 'BusinessReg.pdf', 'LocationCert.pdf'],
    submittedAt: '2025-04-08T15:20:00',
    status: 'approved',
  },
  {
    id: '4',
    userId: 'user-126',
    name: 'Emily Brown',
    serviceType: 'agent',
    businessName: 'EB Mobile Money',
    businessType: 'Mobile Money Agent',
    documentLinks: ['ID.pdf', 'AgentCert.pdf'],
    submittedAt: '2025-04-07T11:15:00',
    status: 'rejected',
    rejectionReason: 'Incomplete documentation. Please provide proof of address.',
  },
];

const ApprovalsPage = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [viewDocumentDialog, setViewDocumentDialog] = useState(false);
  const [approvalDialog, setApprovalDialog] = useState(false);
  const [rejectionDialog, setRejectionDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [requests, setRequests] = useState(mockRequests);
  const { toast } = useToast();

  // Filter requests based on active tab
  const filteredRequests = requests.filter(request => request.status === activeTab);

  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setViewDocumentDialog(true);
  };

  const handleApproveRequest = (request: any) => {
    setSelectedRequest(request);
    setApprovalDialog(true);
  };

  const handleRejectRequest = (request: any) => {
    setSelectedRequest(request);
    setRejectionDialog(true);
  };

  const confirmApproval = () => {
    // In a real app, this would make an API call to update the status
    const updatedRequests = requests.map(req => 
      req.id === selectedRequest.id ? { ...req, status: 'approved' } : req
    );
    setRequests(updatedRequests);
    setApprovalDialog(false);
    
    toast({
      title: "Request Approved",
      description: `${selectedRequest.name}'s service request has been approved.`,
    });
  };

  const confirmRejection = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would make an API call to update the status
    const updatedRequests = requests.map(req => 
      req.id === selectedRequest.id ? { 
        ...req, 
        status: 'rejected',
        rejectionReason: rejectionReason.trim() 
      } : req
    );
    setRequests(updatedRequests);
    setRejectionDialog(false);
    setRejectionReason('');
    
    toast({
      title: "Request Rejected",
      description: `${selectedRequest.name}'s service request has been rejected.`,
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Service Request Approvals</h1>
        <p className="text-muted-foreground">Review and manage service requests from users.</p>
      </div>

      <Tabs defaultValue="pending" onValueChange={(val) => setActiveTab(val as 'pending' | 'approved' | 'rejected')}>
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock size={16} />
            <span>Pending</span>
            <Badge variant="outline" className="ml-1">{requests.filter(r => r.status === 'pending').length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle size={16} />
            <span>Approved</span>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <XCircle size={16} />
            <span>Rejected</span>
          </TabsTrigger>
        </TabsList>

        {['pending', 'approved', 'rejected'].map((status) => (
          <TabsContent key={status} value={status}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {status.charAt(0).toUpperCase() + status.slice(1)} Requests
                </CardTitle>
                <CardDescription>
                  {status === 'pending' 
                    ? 'Review these requests and approve or reject them.'
                    : status === 'approved' 
                      ? 'These requests have been approved.'
                      : 'These requests have been rejected.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRequests.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      No {status} requests to display.
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {filteredRequests.map((request) => (
                        <Card key={request.id}>
                          <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <User size={18} className="text-muted-foreground" />
                                  <h3 className="font-semibold">{request.name}</h3>
                                  <Badge className={
                                    request.serviceType === 'merchant' 
                                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                                      : 'bg-purple-100 text-purple-800 hover:bg-purple-100'
                                  }>
                                    {request.serviceType.charAt(0).toUpperCase() + request.serviceType.slice(1)}
                                  </Badge>
                                </div>
                                <p className="text-muted-foreground text-sm mt-1">{request.businessName} - {request.businessType}</p>
                                <p className="text-xs text-muted-foreground mt-2">Submitted: {formatDate(request.submittedAt)}</p>
                                
                                {request.status === 'rejected' && (
                                  <div className="mt-2 bg-red-50 border border-red-100 rounded p-2">
                                    <p className="text-sm text-red-700 font-medium">Rejection reason:</p>
                                    <p className="text-sm text-red-600">{request.rejectionReason}</p>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex items-center gap-1"
                                  onClick={() => handleViewRequest(request)}
                                >
                                  <Eye size={16} />
                                  <span>View</span>
                                </Button>
                                
                                {request.status === 'pending' && (
                                  <>
                                    <Button 
                                      variant="default" 
                                      size="sm" 
                                      className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                                      onClick={() => handleApproveRequest(request)}
                                    >
                                      <CheckCircle size={16} />
                                      <span>Approve</span>
                                    </Button>
                                    <Button 
                                      variant="destructive" 
                                      size="sm"
                                      className="flex items-center gap-1" 
                                      onClick={() => handleRejectRequest(request)}
                                    >
                                      <XCircle size={16} />
                                      <span>Reject</span>
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* View Document Dialog */}
      <Dialog open={viewDocumentDialog} onOpenChange={setViewDocumentDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">User Information</h3>
                  <div className="bg-muted rounded-md p-3 mt-1">
                    <p><span className="font-medium">Name:</span> {selectedRequest.name}</p>
                    <p><span className="font-medium">User ID:</span> {selectedRequest.userId}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium">Business Information</h3>
                  <div className="bg-muted rounded-md p-3 mt-1">
                    <p><span className="font-medium">Business Name:</span> {selectedRequest.businessName}</p>
                    <p><span className="font-medium">Business Type:</span> {selectedRequest.businessType}</p>
                    <p>
                      <span className="font-medium">Service Type:</span> 
                      <Badge className="ml-2">
                        {selectedRequest.serviceType}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Submitted Documents</h3>
                <div className="grid md:grid-cols-3 gap-2">
                  {selectedRequest.documentLinks.map((doc: string, index: number) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 bg-muted p-2 rounded-md hover:bg-muted/80 cursor-pointer"
                    >
                      <FileText size={18} />
                      <span className="text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Note: In a production environment, these documents would be viewable/downloadable.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDocumentDialog(false)}>Close</Button>
            
            {selectedRequest && selectedRequest.status === 'pending' && (
              <>
                <Button 
                  variant="default" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setViewDocumentDialog(false);
                    setApprovalDialog(true);
                  }}
                >
                  <CheckCircle size={16} className="mr-2" />
                  Approve
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => {
                    setViewDocumentDialog(false);
                    setRejectionDialog(true);
                  }}
                >
                  <XCircle size={16} className="mr-2" />
                  Reject
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Approval Confirmation Dialog */}
      <Dialog open={approvalDialog} onOpenChange={setApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Approval</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this service request? This will grant the user access to the requested role and features.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setApprovalDialog(false)}>Cancel</Button>
            <Button onClick={confirmApproval} className="bg-green-600 hover:bg-green-700">
              Confirm Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Rejection Dialog */}
      <Dialog open={rejectionDialog} onOpenChange={setRejectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this request. The user will be notified.
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            placeholder="Enter rejection reason..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="min-h-[100px]"
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectionDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmRejection}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApprovalsPage;
