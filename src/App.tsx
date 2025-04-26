
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/layouts/DashboardLayout";

// Authentication Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Terms from "./pages/Terms";

// Dashboard Pages
import NeutralDashboard from "./pages/NeutralDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MerchantDashboard from "./pages/MerchantDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import ServiceRequest from "./pages/ServiceRequest";

// Admin Pages
import ApprovalsPage from "./pages/admin/ApprovalsPage";

// Error Pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <CurrencyProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/terms" element={<Terms />} />
                  
                  {/* Neutral User Routes */}
                  <Route 
                    path="/neutral-dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['neutral', 'admin', 'merchant', 'agent']}>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<NeutralDashboard />} />
                    <Route path="service-request" element={<ServiceRequest />} />
                  </Route>
                  
                  <Route 
                    path="/service-request" 
                    element={
                      <ProtectedRoute allowedRoles={['neutral', 'admin', 'merchant', 'agent']}>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<ServiceRequest />} />
                  </Route>
                  
                  {/* Admin Routes */}
                  <Route 
                    path="/admin-dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<AdminDashboard />} />
                    <Route path="approvals" element={<ApprovalsPage />} />
                    <Route path="users" element={<div className="p-4">Users management page (coming soon)</div>} />
                    <Route path="merchants" element={<div className="p-4">Merchants management page (coming soon)</div>} />
                    <Route path="agents" element={<div className="p-4">Agents management page (coming soon)</div>} />
                    <Route path="transactions" element={<div className="p-4">Transactions page (coming soon)</div>} />
                    <Route path="reports" element={<div className="p-4">Reports page (coming soon)</div>} />
                    <Route path="settings" element={<div className="p-4">Settings page (coming soon)</div>} />
                  </Route>
                  
                  {/* Merchant Routes */}
                  <Route 
                    path="/merchant-dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['merchant']}>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<MerchantDashboard />} />
                    <Route path="transactions" element={<div className="p-4">Transactions page (coming soon)</div>} />
                    <Route path="reports" element={<div className="p-4">Reports page (coming soon)</div>} />
                    <Route path="business" element={<div className="p-4">Business page (coming soon)</div>} />
                    <Route path="settings" element={<div className="p-4">Settings page (coming soon)</div>} />
                  </Route>
                  
                  {/* Agent Routes */}
                  <Route 
                    path="/agent-dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['agent']}>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<AgentDashboard />} />
                    <Route path="transfer" element={<div className="p-4">Money Transfer page (coming soon)</div>} />
                    <Route path="airtime" element={<div className="p-4">Airtime & Data page (coming soon)</div>} />
                    <Route path="transactions" element={<div className="p-4">Transactions page (coming soon)</div>} />
                    <Route path="settings" element={<div className="p-4">Settings page (coming soon)</div>} />
                  </Route>
                  
                  {/* For testing dashboards during development */}
                  {/* These routes would be removed in production */}
                  <Route path="/dev/admin" element={<DashboardLayout />}>
                    <Route index element={<AdminDashboard />} />
                  </Route>
                  <Route path="/dev/merchant" element={<DashboardLayout />}>
                    <Route index element={<MerchantDashboard />} />
                  </Route>
                  <Route path="/dev/agent" element={<DashboardLayout />}>
                    <Route index element={<AgentDashboard />} />
                  </Route>
                  
                  {/* Redirect root to home */}
                  <Route path="/index" element={<Navigate to="/" replace />} />
                  
                  {/* 404 Page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CurrencyProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
