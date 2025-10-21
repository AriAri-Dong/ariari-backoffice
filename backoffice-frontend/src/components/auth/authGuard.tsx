import { Navigate, useLocation } from 'react-router';
import  { useIsAuthenticated } from '../../stores/authStore';
import type { PropsWithChildren } from 'react';

const AuthGuard = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
        replace
      />
    );
  }

  return children
};

export default AuthGuard;
