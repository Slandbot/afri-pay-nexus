
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  CheckCheck,
  Clock,
  DollarSign,
  ShoppingBag,
  User,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-afri-secondary">Admin Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,274</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Merchants</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">543</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Agents</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">368</div>
            <p className="text-xs text-muted-foreground">+7.8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$128,405</div>
            <p className="text-xs text-muted-foreground">+14.2% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Pending Approvals */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>Requests requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex justify-between">
                <div>
                  <h3 className="font-medium flex items-center">
                    <Clock className="h-4 w-4 text-amber-500 mr-2" /> Merchant Requests
                  </h3>
                  <p className="text-2xl font-bold mt-2">12</p>
                </div>
                <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-800 hover:bg-amber-100">
                  Review <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex justify-between">
                <div>
                  <h3 className="font-medium flex items-center">
                    <Clock className="h-4 w-4 text-blue-500 mr-2" /> Agent Requests
                  </h3>
                  <p className="text-2xl font-bold mt-2">8</p>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100">
                  Review <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex justify-between">
                <div>
                  <h3 className="font-medium flex items-center">
                    <Clock className="h-4 w-4 text-purple-500 mr-2" /> KYC Verifications
                  </h3>
                  <p className="text-2xl font-bold mt-2">15</p>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-800 hover:bg-purple-100">
                  Review <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Recent Approvals Table */}
            <div className="border rounded-md mt-6">
              <div className="font-medium p-3 border-b bg-muted/50">Recent Approval Activities</div>
              <div className="divide-y">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <User className="h-9 w-9 rounded-full bg-gray-100 p-2" />
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">Merchant Approval</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="flex items-center text-green-600 text-sm mr-4">
                      <CheckCheck className="mr-1 h-4 w-4" /> Approved
                    </span>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <User className="h-9 w-9 rounded-full bg-gray-100 p-2" />
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Agent Approval</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="flex items-center text-red-600 text-sm mr-4">
                      <XCircle className="mr-1 h-4 w-4" /> Rejected
                    </span>
                    <span className="text-sm text-muted-foreground">5 hours ago</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <User className="h-9 w-9 rounded-full bg-gray-100 p-2" />
                    <div>
                      <p className="font-medium">Michael Brown</p>
                      <p className="text-sm text-muted-foreground">KYC Verification</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="flex items-center text-green-600 text-sm mr-4">
                      <CheckCheck className="mr-1 h-4 w-4" /> Approved
                    </span>
                    <span className="text-sm text-muted-foreground">Yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* System Health */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Overall system performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Response Time</span>
                <span className="text-sm text-muted-foreground">245ms</span>
              </div>
              <Progress value={24} className="h-2" />
              <p className="text-xs text-muted-foreground">Healthy (under 300ms threshold)</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Transaction Success Rate</span>
                <span className="text-sm text-muted-foreground">98.7%</span>
              </div>
              <Progress value={98} className="h-2" />
              <p className="text-xs text-muted-foreground">Above target (95% minimum)</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database Load</span>
                <span className="text-sm text-muted-foreground">42%</span>
              </div>
              <Progress value={42} className="h-2" />
              <p className="text-xs text-muted-foreground">Nominal (under 60% threshold)</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>System alerts and messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3 p-3 bg-green-50 border border-green-200 rounded-md">
                <CheckCheck className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Daily Backup Completed</h4>
                  <p className="text-sm text-muted-foreground">Database backup successful</p>
                  <p className="text-xs text-muted-foreground mt-1">Today, 04:30 AM</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <User className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">New Admin User Added</h4>
                  <p className="text-sm text-muted-foreground">User 'janetsmith' was added to admin group</p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday, 3:22 PM</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Scheduled Maintenance</h4>
                  <p className="text-sm text-muted-foreground">System upgrade planned for this weekend</p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday, 9:15 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
