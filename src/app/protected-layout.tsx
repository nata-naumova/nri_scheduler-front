import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAuth } from '@/features/auth/model/use-auth'

export function ProtectedLayout() {
  //   const { isAuthorized } = useAuth()
  const isAuthorized = true;
  const location = useLocation();

  if (!isAuthorized) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
