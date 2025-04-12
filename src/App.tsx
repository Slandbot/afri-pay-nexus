
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/layouts/DashboardLayout";

// Authentication Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";  // New Admin Login Page
import Terms from "./pages/Terms";

// Dashboard Pages
import NeutralDashboard from "./pages/NeutralDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MerchantDashboard from "./pages/MerchantDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import ServiceRequest from "./pages/ServiceRequest";

// Error Pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />  {/* New Admin Login Route */}
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
              {/* Add other admin routes here */}
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
              {/* Add other merchant routes here */}
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
              {/* Add other agent routes here */}
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
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
