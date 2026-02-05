import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '@/features/auth/model/use-auth'

export function PublicOnlyLayout() {
  //   const { isAuthorized } = useAuth()
  const isAuthorized = true;

  if (isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
