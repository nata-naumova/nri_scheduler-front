import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { HomePage } from '@/pages/home';
import { CompanyPage, EventPage, LocationPage, NotFoundPage, SignInPage } from '@/components/pages';

import { Layout } from './layout';
import { PublicOnlyLayout } from './public-only-layout';
import { ProtectedLayout } from './protected-layout';

const SingUpPage = lazy(() => import('@/components/pages/sign-up/signup'));
const CalendarPage = lazy(() => import('@/components/pages/calendar/calendar'));
const ProfilePage = lazy(() => import('@/components/pages/profile/profile'));
const ShortProfilePage = lazy(() => import('@/components/pages/profile/short-profile'));
const ProfileEdit = lazy(() => import('@/components/pages/profile/profile-edit'));
const VerificationPage = lazy(() => import('@/components/pages/verification/verification'));
// const RegionsPage = lazy(() => import('@/components/pages/regions/regions'));

function AppRouter() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />

          <Route element={<PublicOnlyLayout />}>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SingUpPage />} />
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
