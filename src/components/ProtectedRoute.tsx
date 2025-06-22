import React, { useState, useEffect } from 'react';
import AccessCodePopup from './AccessCodePopup';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const hasAccess = sessionStorage.getItem('hasAccess');
      if (hasAccess === 'true') {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Could not access session storage:', error);
    }
    setIsLoading(false);
  }, []);

  const handleSuccess = () => {
    try {
      sessionStorage.setItem('hasAccess', 'true');
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Could not access session storage:', error);
    }
  };

  if (isLoading) {
    return null; // Or a loading spinner component
  }

  return isAuthenticated ? <>{children}</> : <AccessCodePopup onSuccess={handleSuccess} />;
};

export default ProtectedRoute; 