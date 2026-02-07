import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { PublicOnlyLayout } from './public-only-layout';
import { ProtectedLayout } from './protected-layout';
import { Layout } from './layout';

import { EventPage } from '@/pages/event/ui/event';
import { CompanyPage } from '@/pages/company/company';
import { SignInPage } from '@/pages/sign-in/sing-in';
import { LocationPage } from '@/pages/location/location';
import { NotFoundPage } from '@/pages/not-found/not-found';
import { HomePage } from '@/pages/home';

const SingUpPage = lazy(() => import('@/pages/sign-up/signup'));
const CalendarPage = lazy(() => import('@/pages/calendar/ui/calendar'));
const ProfilePage = lazy(() => import('@/pages/profile/profile'));
const ShortProfilePage = lazy(() => import('@/pages/profile/short-profile'));
const ProfileEdit = lazy(() => import('@/pages/profile/profile-edit'));
const VerificationPage = lazy(() => import('@/pages/verification/verification'));
// const RegionsPage = lazy(() => import('@/components/pages/regions/regions'));

function AppRouter() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />

          <Route element={<PublicOnlyLayout />}>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SingUpPage />} />
          </Route>

          <Route element={<ProtectedLayout />}>
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/company/:id" element={<CompanyPage />} />
            <Route path="/location/:id" element={<LocationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<ShortProfilePage />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/verification" element={<VerificationPage />} />
            {/* <Route path="/regions" element={<RegionsPage />} /> */}
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
