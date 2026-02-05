import { Outlet } from 'react-router-dom';
import { Header } from '@/shared/ui/header';

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
