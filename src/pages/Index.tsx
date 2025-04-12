
import { Navigate } from "react-router-dom";

const Index = () => {
  // This page simply redirects to the home page
  return <Navigate to="/" replace />;
};

export default Index;
