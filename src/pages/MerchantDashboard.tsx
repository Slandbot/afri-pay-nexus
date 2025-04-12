
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, CreditCard, DollarSign, MoreHorizontal, Percent, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const transactions = [
  {
    id: "TX-2305-1234",
    customer: "John Smith",
    amount: "$125.00",
    status: "completed",
    date: "Today, 10:45 AM",
  },
  {
    id: "TX-2305-1233",
    customer: "Emma Johnson",
    amount: "$78.50",
    status: "completed",
    date: "Today, 9:32 AM",
  },
  {
    id: "TX-2305-1232",
    customer: "Michael Brown",
    amount: "$245.75",
    status: "completed",
    date: "Yesterday, 4:15 PM",
  },
  {
    id: "TX-2305-1231",
    customer: "Sarah Williams",
    amount: "$54.20",
    status: "failed",
    date: "Yesterday, 2:30 PM",
  },
];

const MerchantDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-afri-secondary">Merchant Dashboard</h1>
        <Button className="bg-afri-primary hover:bg-afri-secondary">
          <DollarSign className="mr-2 h-4 w-4" /> New Transaction
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,546</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">578</div>
            <p className="text-xs text-muted-foreground">+12.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">182</div>
            <p className="text-xs text-muted-foreground">+3.4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
          <CardDescription>Your revenue trends for the past 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full flex items-end gap-2">
            <div className="h-full flex items-end flex-1">
              <div className="w-full bg-afri-primary/20 relative h-[60%] rounded-t-md">
                <div className="absolute bottom-0 w-full text-center text-xs font-medium py-0.5">Mon</div>
              </div>
            </div>
            <div className="h-full flex items-end flex-1">
              <div className="w-full bg-afri-primary/20 relative h-[45%] rounded-t-md">
                <div className="absolute bottom-0 w-full text-center text-xs font-medium py-0.5">Tue</div>
              </div>
            </div>
            <div className="h-full flex items-end flex-1">
              <div className="w-full bg-afri-primary/20 relative h-[75%] rounded-t-md">
                <div className="absolute bottom-0 w-full text-center text-xs font-medium py-0.5">Wed</div>
              </div>
            </div>
            <div className="h-full flex items-end flex-1">
              <div className="w-full bg-afri-primary/20 relative h-[55%] rounded-t-md">
                <div className="absolute bottom-0 w-full text-center text-xs font-medium py-0.5">Thu</div>
              </div>
            </div>
            <div className="h-full flex items-end flex-1">
              <div className="w-full bg-afri-primary/20 relative h-[80%] rounded-t-md">
                <div className="absolute bottom-0 w-full text-center text-xs font-medium py-0.5">Fri</div>
              </div>
            </div>
            <div className="h-full flex items-end flex-1">
              <div className="w-full bg-afri-primary relative h-[90%] rounded-t-md">
                <div className="absolute bottom-0 w-full text-center text-xs font-medium py-0.5 text-white">Sat</div>
              </div>
            </div>
            <div className="h-full flex items-end flex-1">
              <div className="w-full bg-afri-primary/20 relative h-[70%] rounded-t-md">
                <div className="absolute bottom-0 w-full text-center text-xs font-medium py-0.5">Sun</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest payment activities</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8">
              View All <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">{transaction.customer}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{transaction.id}</span>
                      <span className="mx-1">•</span>
                      <span>{transaction.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`text-right ${transaction.status === 'failed' ? 'text-red-500' : ''}`}>
                      {transaction.amount}
                      {transaction.status === 'failed' && (
                        <div className="text-xs text-red-500">Failed</div>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Options */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Your configured payment options</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="disabled">Disabled</TabsTrigger>
              </TabsList>
              <TabsContent value="active">
                <div className="space-y-2">
                  <div className="border rounded-lg p-4 bg-gray-50 flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div className="bg-afri-primary rounded-md p-1 w-10 h-10 flex items-center justify-center text-white">
                        MP
                      </div>
                      <div>
                        <h4 className="font-medium">Mobile Money</h4>
                        <p className="text-xs text-muted-foreground">Default | Commission: 1.2%</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div className="bg-blue-500 rounded-md p-1 w-10 h-10 flex items-center justify-center text-white">
                        BT
                      </div>
                      <div>
                        <h4 className="font-medium">Bank Transfer</h4>
                        <p className="text-xs text-muted-foreground">Commission: 0.8%</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div className="bg-amber-500 rounded-md p-1 w-10 h-10 flex items-center justify-center text-white">
                        CC
                      </div>
                      <div>
                        <h4 className="font-medium">Credit Card</h4>
                        <p className="text-xs text-muted-foreground">Commission: 2.5%</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="disabled">
                <div className="border rounded-lg p-4 bg-gray-50 flex justify-between items-center opacity-70">
                  <div className="flex gap-3 items-center">
                    <div className="bg-gray-400 rounded-md p-1 w-10 h-10 flex items-center justify-center text-white">
                      QR
                    </div>
                    <div>
                      <h4 className="font-medium">QR Code Payments</h4>
                      <p className="text-xs text-muted-foreground">Commission: 1.0%</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                
                <div className="text-center text-sm text-muted-foreground py-6">
                  Contact support to enable additional payment options for your account.
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Monthly Target */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Target</CardTitle>
          <CardDescription>Your performance against set targets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Revenue Target</span>
              <span className="text-sm text-muted-foreground">$12,546 of $15,000</span>
            </div>
            <Progress value={83} className="h-2" />
            <p className="text-xs text-muted-foreground">83% of monthly target reached</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Transaction Volume</span>
              <span className="text-sm text-muted-foreground">578 of 800</span>
            </div>
            <Progress value={72} className="h-2" />
            <p className="text-xs text-muted-foreground">72% of monthly target reached</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">New Customers</span>
              <span className="text-sm text-muted-foreground">42 of 50</span>
            </div>
            <Progress value={84} className="h-2" />
            <p className="text-xs text-muted-foreground">84% of monthly target reached</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantDashboard;
