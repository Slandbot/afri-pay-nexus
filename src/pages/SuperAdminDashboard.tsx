
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Users, 
  UserPlus,
  Shield,
  Settings, 
  FileText, 
  Bell,
  AlertCircle,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';

const SuperAdminDashboard = () => {
  const { user, getUsers, isLoading } = useAuth();
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('users');
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await getUsers();
        setAllUsers(users);
      } catch (err) {
        console.error('Error fetching users:', err);
        toast({
          title: "Error",
          description: "Failed to load users",
          variant: "destructive",
        });
      }
    };
    
    // Load audit logs from localStorage for demo
    const loadAuditLogs = () => {
      try {
        const logs = JSON.parse(localStorage.getItem('afriPayAuditLogs') || '[]');
        setAuditLogs(logs);
      } catch (err) {
        console.error('Error loading audit logs:', err);
      }
    };
    
    loadUsers();
    loadAuditLogs();
  }, []);

  const handleUserAction = (userId: string, action: string) => {
    // Demo implementation
    toast({
      title: "Action Triggered",
      description: `${action} action for user ${userId} would be performed here`,
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">SuperAdmin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.firstName} {user?.lastName}
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all user roles
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allUsers.filter(u => u.role === 'admin').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Administrative accounts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Merchant and agent requests
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="admins" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Admin Management
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Audit Logs
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">All Users</h2>
            <Button className="flex items-center">
              <UserPlus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Username</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Created At</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.length > 0 ? (
                      allUsers.map((user, index) => (
                        <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">{user.firstName} {user.lastName}</td>
                          <td className="p-4 align-middle">{user.username}</td>
                          <td className="p-4 align-middle">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              user.role === 'superAdmin' 
                                ? 'bg-red-100 text-red-800' 
                                : user.role === 'admin'
                                  ? 'bg-blue-100 text-blue-800'
                                  : user.role === 'merchant'
                                    ? 'bg-green-100 text-green-800'
                                    : user.role === 'agent'
                                      ? 'bg-purple-100 text-purple-800'
                                      : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 align-middle text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleUserAction(user.id, 'view')}>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUserAction(user.id, 'edit')}>
                                  Edit User
                                </DropdownMenuItem>
                                {user.role !== 'admin' && user.role !== 'superAdmin' && (
                                  <DropdownMenuItem onClick={() => handleUserAction(user.id, 'promote')}>
                                    Promote to Admin
                                  </DropdownMenuItem>
                                )}
                                {user.role !== 'superAdmin' && (
                                  <DropdownMenuItem onClick={() => handleUserAction(user.id, 'delete')}>
                                    Delete User
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-4 text-center">
                          {isLoading ? "Loading users..." : "No users found"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="admins" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Admin Management</h2>
            <Button className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Create New Admin
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-12 px-4 text-left align-middle font-medium">Admin Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Permissions</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Created By</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.filter(u => u.role === 'admin').map((admin, index) => (
                      <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">{admin.firstName} {admin.lastName}</td>
                        <td className="p-4 align-middle">{admin.email}</td>
                        <td className="p-4 align-middle">
                          <div className="flex flex-col space-y-1">
                            <div className="flex items-center">
                              <span className="mr-2">Accept Merchants:</span>
                              {admin.adminPermissions?.canAcceptMerchants ? 
                                <Check className="h-4 w-4 text-green-600" /> :
                                <X className="h-4 w-4 text-red-600" />
                              }
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2">Accept Agents:</span>
                              {admin.adminPermissions?.canAcceptAgents ? 
                                <Check className="h-4 w-4 text-green-600" /> :
                                <X className="h-4 w-4 text-red-600" />
                              }
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          {admin.adminPermissions?.createdBy || "SuperAdmin"}
                        </td>
                        <td className="p-4 align-middle text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleUserAction(admin.id, 'edit-permissions')}>
                                Edit Permissions
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUserAction(admin.id, 'reset-password')}>
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUserAction(admin.id, 'delete')}>
                                Remove Admin
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                    {allUsers.filter(u => u.role === 'admin').length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-4 text-center">No admin users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Audit Logs</h2>
            <Button variant="outline" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto max-h-[400px]">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-12 px-4 text-left align-middle font-medium">Timestamp</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">User</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Action</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.length > 0 ? (
                      auditLogs.map((log, index) => (
                        <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="p-4 align-middle">{log.username}</td>
                          <td className="p-4 align-middle">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              log.role === 'superAdmin' 
                                ? 'bg-red-100 text-red-800' 
                                : log.role === 'admin'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}>
                              {log.role}
                            </span>
                          </td>
                          <td className="p-4 align-middle">{log.action}</td>
                          <td className="p-4 align-middle">
                            <details className="cursor-pointer">
                              <summary>View Details</summary>
                              <pre className="mt-2 text-xs bg-gray-100 p-2 rounded-md overflow-x-auto">
                                {JSON.stringify(log.details, null, 2)}
                              </pre>
                            </details>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-4 text-center">No audit logs found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">System Settings</h2>
            <Button className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure system-wide security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Session Timeout</h3>
                    <p className="text-sm text-muted-foreground">Adjust admin session timeout (currently 30 minutes)</p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Password Policy</h3>
                    <p className="text-sm text-muted-foreground">Set password requirements</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure system notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Configure email alerts</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Admin Alert Thresholds</h3>
                    <p className="text-sm text-muted-foreground">Set thresholds for admin alerts</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Notification Channels</h3>
                    <p className="text-sm text-muted-foreground">Manage notification delivery methods</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminDashboard;
