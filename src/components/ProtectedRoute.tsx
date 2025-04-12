
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  requireAcceptedTerms?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  requireAcceptedTerms = true 
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated) {
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
    return <>{children}</>;
  }

  // Redirect based on user role
  if (user?.role === 'neutral') {
    return <Navigate to="/neutral-dashboard" />;
  } else if (user?.role === 'admin') {
    return <Navigate to="/admin-dashboard" />;
  } else if (user?.role === 'merchant') {
    return <Navigate to="/merchant-dashboard" />;
  } else if (user?.role === 'agent') {
    return <Navigate to="/agent-dashboard" />;
  }

  // Default fallback to login
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
