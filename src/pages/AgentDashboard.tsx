
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRight, 
  CircleDollarSign, 
  CreditCard, 
  DollarSign, 
  Phone, 
  PlusCircle, 
  ShieldCheck, 
  Smartphone, 
  Wallet 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const AgentDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-afri-secondary">Agent Dashboard</h1>
      
      {/* Agent Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124.50</div>
            <p className="text-xs text-muted-foreground">From 18 transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Weekly Earnings</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$876.25</div>
            <p className="text-xs text-muted-foreground">+12.3% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,243.85</div>
            <p className="text-xs text-muted-foreground">Available for withdrawal</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-afri-primary to-afri-secondary text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> Money Transfer
            </CardTitle>
            <CardDescription className="text-white/80">Send money to users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Quick and secure money transfers to any recipient.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="secondary" className="w-full bg-white text-afri-primary hover:bg-gray-100">
              Transfer <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" /> Airtime & Data
            </CardTitle>
            <CardDescription className="text-white/80">Phone recharge services</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Recharge airtime and data for all networks.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="secondary" className="w-full bg-white text-amber-600 hover:bg-gray-100">
              Recharge <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" /> Bill Payments
            </CardTitle>
            <CardDescription className="text-white/80">Pay utilities & services</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Pay electricity, water, TV subscriptions and more.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="secondary" className="w-full bg-white text-blue-600 hover:bg-gray-100">
              Pay Bills <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> Cash Out
            </CardTitle>
            <CardDescription className="text-white/80">Withdraw your earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Transfer your earnings to your bank account.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="secondary" className="w-full bg-white text-purple-600 hover:bg-gray-100">
              Withdraw <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Commission Earnings */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Earnings</CardTitle>
          <CardDescription>Your performance and earnings by service</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Money Transfer</span>
              <span className="text-sm text-muted-foreground">$452.40 (36%)</span>
            </div>
            <Progress value={36} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Airtime & Data</span>
              <span className="text-sm text-muted-foreground">$328.75 (26%)</span>
            </div>
            <Progress value={26} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Bill Payments</span>
              <span className="text-sm text-muted-foreground">$245.60 (20%)</span>
            </div>
            <Progress value={20} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cash Out</span>
              <span className="text-sm text-muted-foreground">$225.30 (18%)</span>
            </div>
            <Progress value={18} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      {/* Transactions & Customer Management */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h4 className="font-medium">Money Transfer</h4>
                  <p className="text-xs text-muted-foreground">To: John Doe (+234-123-456-7890)</p>
                  <p className="text-xs text-muted-foreground">Today, 10:45 AM</p>
                </div>
                <div className="text-right">
                  <div className="font-medium">$120.00</div>
                  <div className="text-xs text-green-500">+$2.40 commission</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h4 className="font-medium">Airtime Recharge</h4>
                  <p className="text-xs text-muted-foreground">For: +234-987-654-3210</p>
                  <p className="text-xs text-muted-foreground">Today, 9:32 AM</p>
                </div>
                <div className="text-right">
                  <div className="font-medium">$25.00</div>
                  <div className="text-xs text-green-500">+$0.50 commission</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h4 className="font-medium">Bill Payment</h4>
                  <p className="text-xs text-muted-foreground">Electricity: ABC123456789</p>
                  <p className="text-xs text-muted-foreground">Today, 8:15 AM</p>
                </div>
                <div className="text-right">
                  <div className="font-medium">$45.00</div>
                  <div className="text-xs text-green-500">+$0.90 commission</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Data Bundle</h4>
                  <p className="text-xs text-muted-foreground">For: +234-555-123-4567</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 5:22 PM</p>
                </div>
                <div className="text-right">
                  <div className="font-medium">$15.00</div>
                  <div className="text-xs text-green-500">+$0.30 commission</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Transactions
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
            <CardDescription>Your most frequent customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-afri-primary/20 rounded-full h-10 w-10 flex items-center justify-center text-afri-primary font-bold">
                    JD
                  </div>
                  <div>
                    <h4 className="font-medium">John Doe</h4>
                    <p className="text-xs text-muted-foreground">+234-123-456-7890</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">12 transactions</div>
                  <div className="text-xs text-muted-foreground">Last activity: Today</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-afri-accent/20 rounded-full h-10 w-10 flex items-center justify-center text-afri-accent font-bold">
                    SJ
                  </div>
                  <div>
                    <h4 className="font-medium">Sarah Johnson</h4>
                    <p className="text-xs text-muted-foreground">+234-987-654-3210</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">8 transactions</div>
                  <div className="text-xs text-muted-foreground">Last activity: Yesterday</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-full h-10 w-10 flex items-center justify-center text-blue-500 font-bold">
                    MB
                  </div>
                  <div>
                    <h4 className="font-medium">Michael Brown</h4>
                    <p className="text-xs text-muted-foreground">+234-555-123-4567</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">5 transactions</div>
                  <div className="text-xs text-muted-foreground">Last activity: 3 days ago</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-afri-primary hover:bg-afri-secondary">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Customer
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;
