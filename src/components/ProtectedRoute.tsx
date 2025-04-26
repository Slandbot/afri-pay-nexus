
import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  requireAcceptedTerms?: boolean;
  requireAdminPermissions?: {
    canAcceptMerchants?: boolean;
    canAcceptAgents?: boolean;
  };
}

const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  requireAcceptedTerms = true,
  requireAdminPermissions
}: ProtectedRouteProps) => {
  const { isAuthenticated, user, refreshSession } = useAuth();

  // Refresh admin/superAdmin session on route change
  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'superAdmin')) {
      refreshSession();
    }
  }, []);

  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect based on attempted access
    if (allowedRoles.includes('superAdmin')) {
      return <Navigate to="/superadmin-login" />;
    }
    if (allowedRoles.includes('admin')) {
      return <Navigate to="/admin-login" />;
    }
    return <Navigate to="/login" />;
  }

  // Check if terms need to be accepted
  if (requireAcceptedTerms && !user?.acceptedTerms) {
    return <Navigate to="/terms" />;
  }

  // If no specific roles are required, allow access
  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }

  // Check if user has required role
  if (user && allowedRoles.includes(user.role)) {
    // For admin routes, check if they have required permissions
    if (user.role === 'admin' && requireAdminPermissions) {
      const { canAcceptMerchants, canAcceptAgents } = requireAdminPermissions;
      
      // Check permissions required for this route
      if ((canAcceptMerchants && !user.adminPermissions?.canAcceptMerchants) ||
          (canAcceptAgents && !user.adminPermissions?.canAcceptAgents)) {
        return <Navigate to="/admin-dashboard" />;
      }
    }
    
    return <>{children}</>;
  }

  // Redirect based on user role
  if (user?.role === 'neutral') {
    return <Navigate to="/neutral-dashboard" />;
  } else if (user?.role === 'admin') {
    return <Navigate to="/admin-dashboard" />;
  } else if (user?.role === 'superAdmin') {
    return <Navigate to="/superadmin-dashboard" />;
  } else if (user?.role === 'merchant') {
    return <Navigate to="/merchant-dashboard" />;
  } else if (user?.role === 'agent') {
    return <Navigate to="/agent-dashboard" />;
  }

  // Default fallback to login
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
